// Release smoke check over HTTP: every sitemap URL, a sample of posts, every
// permanent redirect and every rewrite.
//
//   node scripts/smoke-compare.js <target> [<reference>]
//
// With only <target>, it fails on pages that are not 200, redirects that do not
// land where utils/permanent-redirects.js says, and any 5xx.
// With <reference> (e.g. the current production before a release, or the
// previous production deployment URL after one), it also fails on any
// difference in status, Location, title, canonical, robots, h1 or JSON-LD count.
//
// Requests go one URL at a time on purpose: WordPress renders every uncached
// page, and a handful of parallel renders already makes its login time out
// (504) on the live site.

/* eslint-disable no-console, no-restricted-syntax -- CLI report; the loop keeps requests sequential */

const { PERMANENT_REDIRECTS } = require('../utils/permanent-redirects');
const {
  POST_TYPE_REWRITES,
  POST_CATEGORY_REWRITES,
  SITE_PAGES_REWRITES,
} = require('../utils/rewrites');

const PRODUCTION = 'https://scarincihollenbeck.com';
const POST_SAMPLE = 40;
const FIELDS = [
  'status',
  'location',
  'title',
  'canonical',
  'robots',
  'h1',
  'jsonld',
];
const SAMPLE = { ':slug*': 'sample-a/sample-b', ':slug': 'sample-slug' };

const [target, reference] = process.argv
  .slice(2)
  .map((u) => u && u.replace(/\/$/, ''));
if (!target) {
  console.error('Usage: node scripts/smoke-compare.js <target> [<reference>]');
  process.exit(2);
}

const concrete = (pattern) => pattern.replace(/:\w+\*?/g, (param) => SAMPLE[param] || 'sample-slug');

const pick = (re, html) => {
  const match = html.match(re);
  return match ? match[1].trim().replace(/\s+/g, ' ') : null;
};

async function sitemapPaths(file) {
  const xml = await (await fetch(`${PRODUCTION}/${file}`)).text();
  return (xml.match(/<loc>[^<]*/g) || []).map(
    (loc) => loc.replace('<loc>', '').replace(PRODUCTION, '') || '/',
  );
}

async function probe(host, path) {
  try {
    const res = await fetch(host + path, { redirect: 'manual' });
    const isHtml = res.status === 200
      && (res.headers.get('content-type') || '').includes('html');
    const html = isHtml ? await res.text() : '';
    if (!isHtml) await res.arrayBuffer();
    return {
      status: res.status,
      location: (res.headers.get('location') || '')
        .replace(host, '')
        .replace(PRODUCTION, ''),
      title: pick(/<title[^>]*>([^<]*)<\/title>/i, html),
      canonical: pick(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i, html),
      robots: pick(/<meta[^>]*name="robots"[^>]*content="([^"]*)"/i, html),
      h1: pick(/<h1[^>]*>(?:<[^>]+>)*([^<]*)/i, html),
      jsonld: (html.match(/application\/ld\+json/g) || []).length,
    };
  } catch (error) {
    return { status: `ERR ${error.message}` };
  }
}

// Next applies the first redirect whose source matches, so a later, more
// specific rule can be shadowed by an earlier wildcard.
const sourceRegex = (source) => new RegExp(
  `^${source
    .split(/(:\w+\*?)/)
    .map((part) => {
      if (!part.startsWith(':')) return part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return part.endsWith('*') ? '(.*)' : '([^/]+)';
    })
    .join('')}$`,
);

function appliedRedirect(path) {
  const rule = PERMANENT_REDIRECTS.find((r) => sourceRegex(r.source).test(path));
  if (!rule) return null;
  const values = path.match(sourceRegex(rule.source)).slice(1);
  const names = rule.source.match(/:\w+\*?/g) || [];
  const byName = Object.fromEntries(names.map((name, i) => [name, values[i]]));
  return {
    rule,
    destination: rule.destination.replace(/:\w+\*?/g, (name) => byName[name]),
  };
}

// Returns [failures, warnings] for the target's own response.
function ownProblems(c, t) {
  if (typeof t.status !== 'number' || t.status >= 500) return [[`status ${t.status}`], []];
  if (c.kind === 'page' && t.status >= 300 && t.status < 400) {
    return [
      [],
      [`sitemap lists a redirecting URL (${t.status} -> ${t.location})`],
    ];
  }
  if (c.kind === 'page' && t.status !== 200) return [[`status ${t.status}, expected 200`], []];
  if (c.kind === 'redirect') {
    const applied = appliedRedirect(c.path);
    const warnings = applied.rule === c.rule
      ? []
      : [
        `rule ${c.rule.source} -> ${c.rule.destination} is shadowed by earlier ${applied.rule.source} -> ${applied.rule.destination}`,
      ];
    if (t.status !== 308 || t.location !== applied.destination) {
      return [
        [
          `${t.status} -> ${t.location}, expected 308 -> ${applied.destination}`,
        ],
        warnings,
      ];
    }
    return [[], warnings];
  }
  return [[], []];
}

async function check(c) {
  // Two hosts at once is still one render per deployment.
  const [t, r] = await Promise.all([
    probe(target, c.path),
    reference && probe(reference, c.path),
  ]);
  const [failures, warnings] = ownProblems(c, t);
  if (r) {
    FIELDS.filter((f) => String(t[f]) !== String(r[f])).forEach((f) => failures.push(
      `${f}: ${JSON.stringify(t[f])} vs reference ${JSON.stringify(r[f])}`,
    ));
  }
  return { ...c, failures, warnings };
}

const report = (rows, key) => rows
  .filter((row) => row[key].length)
  .forEach((row) => {
    console.log(`[${row.kind}] ${row.path}`);
    row[key].forEach((p) => console.log(`  ${p}`));
  });

(async () => {
  const posts = await sitemapPaths('sitemap-posts.xml');
  const step = Math.max(1, Math.ceil(posts.length / POST_SAMPLE));
  const all = [
    ...(await sitemapPaths('sitemap.xml')).map((path) => ({
      kind: 'page',
      path,
    })),
    ...posts
      .filter((_, i) => i % step === 0)
      .map((path) => ({ kind: 'post', path })),
    ...PERMANENT_REDIRECTS.map((rule) => ({
      kind: 'redirect',
      path: concrete(rule.source),
      rule,
    })),
    ...[
      ...POST_TYPE_REWRITES,
      ...POST_CATEGORY_REWRITES,
      ...SITE_PAGES_REWRITES,
    ].map((r) => ({ kind: 'rewrite', path: concrete(r.source) })),
  ];
  // Redirects stay even when repeated: a duplicate source is a shadowed rule.
  const cases = all.filter(
    (c, i) => c.kind === 'redirect' || all.findIndex((o) => o.path === c.path) === i,
  );

  console.log(
    `Checking ${cases.length} URLs on ${target}${
      reference ? ` against ${reference}` : ''
    }`,
  );
  const rows = [];
  for (const [i, c] of cases.entries()) {
    // eslint-disable-next-line no-await-in-loop
    rows.push(await check(c));
    if ((i + 1) % 50 === 0) console.log(`  ${i + 1}/${cases.length}`);
  }

  // WordPress hiccups are common; only what fails twice counts.
  const failed = rows.filter((row) => row.failures.length);
  if (failed.length) console.log(`Retrying ${failed.length} failed URLs`);
  for (const row of failed) {
    // eslint-disable-next-line no-await-in-loop
    const again = await check(row);
    rows[rows.indexOf(row)] = again.failures.length
      ? {
        ...again,
        failures: [
          ...again.failures,
          `(also failed on first try: ${row.failures[0]})`,
        ],
      }
      : again;
  }

  const warned = rows.filter((row) => row.warnings.length);
  const failing = rows.filter((row) => row.failures.length);
  if (warned.length) {
    console.log(`
Warnings (${warned.length}), not caused by a release:`);
    report(rows, 'warnings');
  }
  if (failing.length) {
    console.log(`
Failures (${failing.length}):`);
    report(rows, 'failures');
  }
  console.log(`
${
  failing.length
    ? `${failing.length} of ${cases.length} URLs failed`
    : `All ${cases.length} URLs OK`
  }`);
  process.exit(failing.length ? 1 : 0);
})();
