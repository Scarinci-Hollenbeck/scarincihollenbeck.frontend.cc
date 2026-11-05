const { test, expect } = require('@playwright/test');

// Workbox installs the service worker only if every precache request
// succeeds. next-pwa precaches the webpack assets Next emits, so a new
// server-only file in a Next release (Next 16: dynamic-css-manifest.json)
// can turn into a 404 here; next.config.js excludes the known ones.
test('every precached /_next/ file outside /_next/static/ exists', async ({
  request,
}) => {
  const sw = await request.get('/sw.js');
  const body = sw.status() === 200 ? await sw.text() : '';
  // With PWA disabled (NEXT_PUBLIC_PROJECT_MODE=development) there is no
  // sw.js on Vercel, and locally public/ may hold a stale dev one.
  test.skip(
    !body.includes('precacheAndRoute'),
    'PWA disabled on this deployment',
  );

  const urls = [...body.matchAll(/url:"([^"]+)"/g)].map(([, url]) => url);
  expect(urls.length).toBeGreaterThan(0);
  expect(urls).not.toContain('/_next/dynamic-css-manifest.json');

  // Hashed /_next/static/ chunks come from the same build; the rest is the
  // set a Next upgrade can break. Sequential, a handful of static files.
  const others = urls.filter(
    (url) => url.startsWith('/_next/') && !url.startsWith('/_next/static/'),
  );
  const missing = await others.reduce(async (soFar, url) => {
    const list = await soFar;
    const response = await request.get(url);
    return response.status() === 200
      ? list
      : [...list, `${url} ${response.status()}`];
  }, Promise.resolve([]));
  expect(missing).toEqual([]);
});
