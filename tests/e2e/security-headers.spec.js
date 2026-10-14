import { test, expect } from '@playwright/test';

/**
 * Security headers from utils/security-headers.js, read with the `request`
 * fixture (no browser). The values are spelled out here on purpose: they must
 * match what the WordPress backend sends, so a change has to be deliberate.
 */

const ROUTES = [
  { name: 'home', path: '/' },
  { name: 'rewritten practice', path: '/practices/construction-lawyers' },
  { name: 'post', path: '/client-alert/new-jersey-data-broker-law' },
  { name: 'API route', path: '/api/csp-report', method: 'post' },
];

const EXPECTED_HEADERS = {
  'x-frame-options': 'SAMEORIGIN',
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'permissions-policy': 'camera=(), microphone=(), geolocation=()',
};

const ONE_YEAR_SECONDS = 365 * 24 * 60 * 60;

const parseCsp = (value) => Object.fromEntries(
  value
    .split(';')
    .map((directive) => directive.trim().split(/\s+/))
    .filter(([name]) => name)
    .map(([name, ...sources]) => [name, sources]),
);

test.describe('security headers', () => {
  ROUTES.forEach(({ name, path, method = 'get' }) => {
    test(`${name} (${path}) sends them`, async ({ request }) => {
      const res = await request[method](
        path,
        method === 'post' ? { data: {} } : undefined,
      );
      const headers = res.headers();

      Object.entries(EXPECTED_HEADERS).forEach(([header, value]) => {
        expect(headers[header], `${header} on ${path}`).toBe(value);
      });

      const maxAge = Number(
        /max-age=(\d+)/.exec(headers['strict-transport-security'] || '')?.[1],
      );
      expect(maxAge, `HSTS max-age on ${path}`).toBeGreaterThanOrEqual(
        ONE_YEAR_SECONDS,
      );

      expect(
        headers['x-powered-by'],
        `x-powered-by on ${path}`,
      ).toBeUndefined();
    });
  });

  test('CSP is report-only and reports to /api/csp-report', async ({
    request,
  }) => {
    const headers = (await request.get('/')).headers();

    expect(
      headers['content-security-policy'],
      'the enforcing CSP must stay off until the reports are clean',
    ).toBeUndefined();

    const csp = parseCsp(headers['content-security-policy-report-only'] || '');

    expect(csp['default-src']).toEqual(["'self'"]);
    expect(csp['object-src']).toEqual(["'none'"]);
    expect(csp['frame-ancestors']).toEqual(["'self'"]);
    expect(csp['base-uri']).toEqual(["'self'"]);
    expect(csp['report-uri']).toEqual(['/api/csp-report']);
    expect(csp['report-to']).toEqual(['csp-endpoint']);
    expect(headers['reporting-endpoints']).toBe(
      'csp-endpoint="/api/csp-report"',
    );

    // The third parties the site depends on.
    expect(csp['script-src']).toEqual(
      expect.arrayContaining([
        'https://www.googletagmanager.com',
        'https://cdn.callrail.com',
        'https://www.google.com',
        'https://kwes.io',
      ]),
    );
    expect(csp['connect-src']).toEqual(
      expect.arrayContaining([
        'https://*.algolia.net',
        'https://kwes.io',
        'https://*.google-analytics.com',
        // GA4 collects on the bare host, which *.analytics.google.com does not match.
        'https://analytics.google.com',
      ]),
    );
  });
});

test.describe('CSP report endpoint', () => {
  test('accepts a report-uri report', async ({ request }) => {
    const res = await request.post('/api/csp-report', {
      headers: { 'Content-Type': 'application/csp-report' },
      data: JSON.stringify({
        'csp-report': {
          'document-uri': 'https://scarincihollenbeck.com/',
          'effective-directive': 'script-src-elem',
          'blocked-uri': 'https://e2e.invalid/script.js',
        },
      }),
    });

    expect(res.status()).toBe(204);
  });

  test('accepts a report-to batch', async ({ request }) => {
    const res = await request.post('/api/csp-report', {
      headers: { 'Content-Type': 'application/reports+json' },
      data: JSON.stringify([
        {
          type: 'csp-violation',
          body: {
            documentURL: 'https://scarincihollenbeck.com/',
            effectiveDirective: 'img-src',
            blockedURL: 'https://e2e.invalid/pixel.gif',
            disposition: 'report',
          },
        },
      ]),
    });

    expect(res.status()).toBe(204);
  });

  test('rejects anything but POST with JSON', async ({ request }) => {
    expect((await request.get('/api/csp-report')).status()).toBe(405);

    const res = await request.post('/api/csp-report', {
      headers: { 'Content-Type': 'application/csp-report' },
      data: 'not json',
    });
    expect(res.status()).toBe(400);
  });
});
