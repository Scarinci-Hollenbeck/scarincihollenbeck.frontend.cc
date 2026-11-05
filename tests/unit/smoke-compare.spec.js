// Runs scripts/smoke-compare.js against local stub servers that mimic
// Vercel's ISR cache, so the pacing is checked without touching production,
// staging or WordPress. A preload makes any fetch outside 127.0.0.1 throw.

const { test, expect } = require('@playwright/test');
const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');
const {
  appliedRedirect,
  parseArgs,
  RenderPacer,
} = require('../../scripts/smoke-compare');

const SCRIPT = path.join(__dirname, '../../scripts/smoke-compare.js');
// NODE_OPTIONS eats backslashes, so Windows paths need forward slashes.
const LOCAL_ONLY = path
  .join(__dirname, 'support/local-fetch-only.js')
  .replace(/\\/g, '/');
const RENDER_MS = 150;
const RENDER_WAIT_S = '0.3';
const PAGES = Array.from({ length: 200 }, (_, i) => `/page-${i}`);
const POSTS = Array.from(
  { length: 1000 },
  (_, i) => `/law-firm-insights/post-${i}`,
);
const STALE = new Set(PAGES.slice(1, 9));
const PRERENDER = new Set(PAGES.slice(9, 13));

const sitemap = (paths) => `<?xml version="1.0"?><urlset>${paths
  .map((p) => `<url><loc>https://scarincihollenbeck.com${p}</loc></url>`)
  .join('')}</urlset>`;

// Like Vercel: a STALE or PRERENDER answer starts a background render, and so
// does every further request to that page until the render is done (the
// 2026-11-03 incident). Stubs given the same `wordpress` share its count of
// running renders, as deployments share one WordPress.
const newWordpress = () => ({ running: 0, maxParallel: 0 });

function startStub({
  titles = {},
  statusFor = () => null, // a status to answer instead of the page, or null
  wordpress = newWordpress(),
} = {}) {
  const stats = { requests: 0, renders: 0, rerenders: 0 };
  const rendering = new Set();
  const fresh = new Set();
  const render = (p) => {
    stats.renders += 1;
    if (rendering.has(p)) stats.rerenders += 1;
    rendering.add(p);
    wordpress.running += 1;
    wordpress.maxParallel = Math.max(wordpress.maxParallel, wordpress.running);
    setTimeout(() => {
      wordpress.running -= 1;
      rendering.delete(p);
      fresh.add(p);
    }, RENDER_MS);
  };
  const server = http.createServer((req, res) => {
    stats.requests += 1;
    // Redirect sources are written encoded (`/%20`), so match the raw path.
    const p = req.url;
    const sitemapFile = p === '/sitemap.xml' || p === '/sitemap-posts.xml';
    const status = statusFor(p);
    if (status) {
      res.writeHead(status).end();
      return;
    }
    if (sitemapFile) {
      res.writeHead(200, { 'content-type': 'application/xml' });
      res.end(sitemap(p === '/sitemap.xml' ? ['/', ...PAGES] : POSTS));
      return;
    }
    const redirect = appliedRedirect(p);
    if (redirect) {
      res.writeHead(308, { location: redirect.destination }).end();
      return;
    }
    let cache = 'HIT';
    if ((STALE.has(p) || PRERENDER.has(p)) && !fresh.has(p)) {
      cache = STALE.has(p) ? 'STALE' : 'PRERENDER';
      render(p);
    }
    res.writeHead(200, {
      'content-type': 'text/html; charset=utf-8',
      'x-vercel-cache': cache,
    });
    res.end(
      `<html><head><title>${
        titles[p] || p
      }</title></head><body><h1>${p}</h1></body></html>`,
    );
  });
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve({
      url: `http://127.0.0.1:${server.address().port}`,
      stats,
      wordpress,
      close: () => new Promise((done) => {
        server.close(done);
      }),
    }));
  });
}

function run(args) {
  return new Promise((resolve) => {
    const child = spawn(
      process.execPath,
      [SCRIPT, ...args, '--render-wait', RENDER_WAIT_S],
      { env: { ...process.env, NODE_OPTIONS: `--require "${LOCAL_ONLY}"` } },
    );
    let output = '';
    child.stdout.on('data', (d) => {
      output += d;
    });
    child.stderr.on('data', (d) => {
      output += d;
    });
    child.on('close', (code) => resolve({ code, output }));
  });
}

test.describe.configure({ timeout: 60000 });

test('one host: all OK, never more than one render, no re-renders', async () => {
  const stub = await startStub();
  try {
    const { code, output } = await run([stub.url]);
    expect(output).toMatch(/All \d+ URLs OK/);
    expect(code).toBe(0);
    expect(output).not.toMatch(/blocked non-local fetch/);
    expect(stub.stats.renders).toBe(STALE.size + PRERENDER.size);
    expect(stub.stats.rerenders).toBe(0);
    expect(stub.wordpress.maxParallel).toBe(1);
  } finally {
    await stub.close();
  }
});

test('two hosts share one render budget and differences fail', async () => {
  const wordpress = newWordpress();
  const target = await startStub({
    titles: { '/page-50': 'Changed' },
    wordpress,
  });
  const reference = await startStub({ wordpress });
  try {
    const { code, output } = await run([target.url, reference.url]);
    expect(output).toContain('[page] /page-50');
    expect(output).toContain('title: "Changed" vs reference "/page-50"');
    expect(output).toMatch(/1 of \d+ URLs failed/);
    expect(code).toBe(1);
    expect(target.stats.rerenders + reference.stats.rerenders).toBe(0);
    expect(wordpress.maxParallel).toBe(1);
  } finally {
    await target.close();
    await reference.close();
  }
});

test('--max-renders allows that many renders at once', async () => {
  const stub = await startStub();
  try {
    const { code } = await run([stub.url, '--max-renders', '3']);
    expect(code).toBe(0);
    expect(stub.wordpress.maxParallel).toBeGreaterThan(1);
    expect(stub.wordpress.maxParallel).toBeLessThanOrEqual(3);
    expect(stub.stats.rerenders).toBe(0);
  } finally {
    await stub.close();
  }
});

test('a saved snapshot works as the reference without a second host', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'smoke-compare-'));
  const file = path.join(dir, 'before.json');
  const before = await startStub();
  try {
    const saved = await run([before.url, '--save', file]);
    expect(saved.code).toBe(0);
    const snapshot = JSON.parse(fs.readFileSync(file, 'utf8'));
    expect(snapshot.results.length).toBeGreaterThan(300);
  } finally {
    await before.close();
  }
  const after = await startStub({ titles: { '/page-70': 'Changed' } });
  try {
    const { code, output } = await run([after.url, file]);
    expect(output).toContain('title: "Changed" vs reference "/page-70"');
    expect(output).toMatch(/1 of \d+ URLs failed/);
    expect(code).toBe(1);
  } finally {
    await after.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('stops after 3 gateway errors in a row and still reports', async () => {
  // page-18 is a lone 504 (page-19 resets the count); pages 20-22 fail in a row.
  const failing = new Set(['/page-20', '/page-21', '/page-22']);
  const stub = await startStub({
    statusFor: (p) => {
      if (p === '/page-18') return 504;
      return failing.has(p) ? 503 : null;
    },
  });
  try {
    const { code, output } = await run([stub.url]);
    expect(code).toBe(1);
    expect(output).toMatch(
      /Stopped after .* 3 requests in a row failed, last .*\/page-22: 503/,
    );
    expect(output).toContain('[page] /page-18');
    expect(output).toContain('[page] /page-21');
    // 2 sitemaps, then "/" and page-0 .. page-22.
    expect(stub.stats.requests).toBe(2 + 1 + 23);
  } finally {
    await stub.close();
  }
});

test('a plain 500 is a broken page, not overload: no stop, retried once', async () => {
  const broken = new Set(['/page-30', '/page-31', '/page-32', '/page-33']);
  const stub = await startStub({
    statusFor: (p) => (broken.has(p) ? 500 : null),
  });
  try {
    const { code, output } = await run([stub.url]);
    expect(output).not.toMatch(/Stopped/);
    expect(output).toContain('Retrying 4 URLs that got a 5xx or no answer');
    expect(output).toMatch(/4 of \d+ URLs failed/);
    expect(code).toBe(1);
  } finally {
    await stub.close();
  }
});

test('parseArgs rejects unknown flags and unsafe pacing on real hosts', () => {
  const real = 'https://example.com';
  expect(parseArgs([real])).toMatchObject({
    maxRenders: 1,
    renderWaitMs: 70000,
  });
  expect(parseArgs([real, '--maxrenders', '3'])).toBeNull();
  expect(parseArgs([real, '--save=x.json'])).toBeNull();
  expect(parseArgs([real, '--save', '--max-renders', '2'])).toBeNull();
  expect(parseArgs([real, '--max-renders', '5'])).toBeNull();
  expect(parseArgs([real, '--render-wait', '30'])).toBeNull();
  expect(
    parseArgs([real, 'http://127.0.0.1:1', '--render-wait', '1']),
  ).toBeNull();
  expect(
    parseArgs(['http://127.0.0.1:1', '--render-wait', '0.3']),
  ).toMatchObject({
    renderWaitMs: 300,
  });
  expect(parseArgs([real, 'before.json'])).toMatchObject({
    snapshot: 'before.json',
  });
});

test('an unwritable --save path fails before any request', async () => {
  const stub = await startStub();
  try {
    const { code, output } = await run([
      stub.url,
      '--save',
      path.join(os.tmpdir(), 'no-such-dir-smoke', 'x.json'),
    ]);
    expect(code).toBe(1);
    expect(output).toMatch(/ENOENT/);
    expect(stub.stats.requests).toBe(0);
  } finally {
    await stub.close();
  }
});

test('--save keeps an existing file until the end of the run', async () => {
  // The run dies on the sitemap, before any result; the old snapshot at the
  // --save path must survive untouched, and no temp file is left behind.
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'smoke-compare-'));
  const file = path.join(dir, 'prod.json');
  fs.writeFileSync(file, 'OLD SNAPSHOT');
  const stub = await startStub({
    statusFor: (p) => (p === '/sitemap-posts.xml' ? 503 : null),
  });
  try {
    const { code } = await run([stub.url, '--save', file]);
    expect(code).toBe(1);
    expect(fs.readFileSync(file, 'utf8')).toBe('OLD SNAPSHOT');
    expect(fs.readdirSync(dir)).toEqual(['prod.json']);
  } finally {
    await stub.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('a stopped sweep still saves a snapshot marked incomplete', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'smoke-compare-'));
  const file = path.join(dir, 'partial.json');
  const failing = new Set(['/page-20', '/page-21', '/page-22']);
  const stub = await startStub({
    statusFor: (p) => (failing.has(p) ? 503 : null),
  });
  try {
    const { code, output } = await run([stub.url, '--save', file]);
    expect(code).toBe(1);
    expect(output).toContain('(INCOMPLETE: the sweep stopped)');
    const saved = JSON.parse(fs.readFileSync(file, 'utf8'));
    expect(saved.complete).toBe(false);
    expect(saved.stoppedBecause).toMatch(/3 requests in a row failed/);
    // "/" and page-0 .. page-21; the check of page-22 is cut short.
    expect(saved.results.map((r) => r.path)).toEqual([
      '/',
      ...Array.from({ length: 22 }, (_, i) => `/page-${i}`),
    ]);
  } finally {
    await stub.close();
  }
  // Used as a reference, it says so, and later URLs only get a warning.
  const after = await startStub();
  try {
    const { output } = await run([after.url, file]);
    expect(output).toMatch(/incomplete snapshot \(Stopped after/);
    expect(output).toMatch(
      /\[page\] \/page-50\s+not in the reference snapshot/,
    );
  } finally {
    await after.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('a complete snapshot is marked complete', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'smoke-compare-'));
  const file = path.join(dir, 'full.json');
  const stub = await startStub();
  try {
    expect((await run([stub.url, '--save', file])).code).toBe(0);
    const saved = JSON.parse(fs.readFileSync(file, 'utf8'));
    expect(saved.complete).toBe(true);
    expect(saved.stoppedBecause).toBeUndefined();
  } finally {
    await stub.close();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('RenderPacer never requests a URL while its own render may run', async () => {
  // With free render slots (as in the retry pass, or with --max-renders > 1)
  // a second request to the same STALE page must wait for its render.
  const stub = await startStub();
  try {
    const pacer = new RenderPacer(3, 300);
    await pacer.fetch(`${stub.url}/page-1`);
    const started = Date.now();
    await pacer.fetch(`${stub.url}/page-2`);
    expect(Date.now() - started).toBeLessThan(100);
    await pacer.fetch(`${stub.url}/page-1`);
    expect(Date.now() - started).toBeGreaterThanOrEqual(250);
    expect(stub.stats.renders).toBe(2);
    expect(stub.stats.rerenders).toBe(0);
  } finally {
    await stub.close();
  }
});
