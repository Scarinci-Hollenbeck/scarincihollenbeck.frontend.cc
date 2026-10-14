// Collects Content-Security-Policy-Report-Only violations (see
// utils/security-headers.js) and logs a short line per report, so they can be
// read in the Vercel logs. Browsers send two formats:
// - report-uri: `application/csp-report`, `{ "csp-report": { "blocked-uri", ... } }`
// - report-to:  `application/reports+json`, `[{ type: "csp-violation", body: { blockedURL, ... } }]`
// The endpoint is public, so the body is capped and only a few fields are logged.

const MAX_BODY_BYTES = 64 * 1024;
const MAX_REPORTS_PER_REQUEST = 20;

export const config = {
  api: { bodyParser: false },
};

const readBody = (req) => new Promise((resolve, reject) => {
  let size = 0;
  const chunks = [];

  req.on('data', (chunk) => {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) {
      reject(new Error('CSP report too large'));
      req.destroy();
      return;
    }
    chunks.push(chunk);
  });
  req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  req.on('error', reject);
});

const trim = (value) => (typeof value === 'string' ? value.slice(0, 300) : undefined);

const normalize = (payload) => {
  if (Array.isArray(payload)) {
    return payload
      .filter((report) => report?.type === 'csp-violation' && report.body)
      .map(({ body }) => ({
        directive: body.effectiveDirective,
        blocked: body.blockedURL,
        document: body.documentURL,
        source: body.sourceFile,
        line: body.lineNumber,
        disposition: body.disposition,
      }));
  }

  const report = payload?.['csp-report'];
  if (!report) return [];

  return [
    {
      directive: report['effective-directive'] || report['violated-directive'],
      blocked: report['blocked-uri'],
      document: report['document-uri'],
      source: report['source-file'],
      line: report['line-number'],
      disposition: report.disposition,
    },
  ];
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }

  let payload;
  try {
    payload = JSON.parse(await readBody(req));
  } catch (error) {
    return res.status(400).end();
  }

  normalize(payload)
    .slice(0, MAX_REPORTS_PER_REQUEST)
    .forEach((report) => {
      console.warn(
        '[csp-report]',
        JSON.stringify({
          directive: trim(report.directive),
          blocked: trim(report.blocked),
          document: trim(report.document),
          source: trim(report.source),
          line: Number.isFinite(report.line) ? report.line : undefined,
          disposition: trim(report.disposition),
        }),
      );
    });

  return res.status(204).end();
}
