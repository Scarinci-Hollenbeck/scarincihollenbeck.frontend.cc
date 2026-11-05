// Release smoke check over HTTP: every sitemap URL, a sample of posts, every
// permanent redirect and every rewrite.
//
//   node scripts/smoke-compare.js <target> [<reference>] [options]
//
//   <reference>          another deployment URL, or a snapshot file written by
//                        an earlier run with --save
//   --save <file>        write the target's results to <file> as a snapshot at
//                        the end (marked `complete: false` if the sweep stopped)
//   --max-renders <n>    renders this sweep may keep running at once (default 1,
//                        at most 4 against real hosts)
//   --render-wait <s>    how long one render is assumed to run (default 70,
//                        at least 60 against real hosts)
//   --min-gap <s>        pause between any two requests, cached pages too
//                        (default 1.5, at least 1 against real hosts)
//
// With only <target>, it fails on sitemap pages, posts and parameterless
// rewrites that are not 200, redirects that do not land where
// utils/permanent-redirects.js says, and any 5xx. With <reference>, it also
// fails on any difference in status, Location, title, canonical, robots, h1 or
// JSON-LD count; with a snapshot, pages of the snapshot missing from the
// target's sitemap are checked too. Sitemaps are read from the target; nothing
// else is fetched. URLs that got a 5xx or no answer are retried once at the
// end, and only what fails twice counts. Three 502/503/504 or unanswered
// requests in a row stop the sweep (WordPress is struggling); the report of
// what was checked so far is still printed.
//
// Pacing. Every deployment renders through the same WordPress, which starts
// timing out at about 8 parallel renders. Pages revalidate every 60-600 s, so
// most hits answer `x-vercel-cache: STALE` (or PRERENDER on a deployment that
// has not served the page since its build): Vercel replies at once and renders
// the page in the background. There is no way to see that render finish
// without requesting the page again, and a request to a page whose render is
// still running starts one more render (2026-11-03: a 3 s poll loop timed out
// /practices/education-law every 3 s). So the sweep never polls: after a
// STALE or PRERENDER answer (or a request that got no answer) it counts a
// render as running for --render-wait seconds, Vercel's 60 s function limit
// plus a margin. It sends nothing while --max-renders such renders are
// counted, and never requests a URL while its own render is counted.
// A full sweep of a mostly stale deployment therefore takes hours.
//
// Cached (HIT) answers start no render, but they still go through the Vercel
// Firewall: the site answers 429 above 60 pages a minute from one IP, and a
// fast burst trips Vercel's DDoS mitigation (403 challenge for the whole IP,
// 2026-11-05). So every request, sitemaps included, starts at least --min-gap
// after the previous one, which keeps the sweep at most 40 requests a minute.

/* eslint-disable no-console, no-restricted-syntax, no-await-in-loop -- CLI report; the loops keep requests sequential */

const fs = require('fs');
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
// A WordPress failure makes the sitemaps come back (and get cached) almost
// empty; a short list would otherwise pass as "all OK".
const MIN_URLS = { 'sitemap.xml': 200, 'sitemap-posts.xml': 1000 };
// Cache states after which Vercel (x-vercel-cache) or `next start`
// (x-nextjs-cache) may be rendering the page in the background.
const BACKGROUND_RENDER = new Set(['STALE', 'PRERENDER']);
const REQUEST_TIMEOUT_MS = 90000;
// This many gateway errors or failed requests in a row mean WordPress is
// struggling. A plain 500 is a broken page, not overload, so it does not count.
const MAX_ERRORS_IN_A_ROW = 3;
const OVERLOAD_STATUSES = new Set([502, 503, 504]);
// Floors for real hosts; WordPress breaks at about 8 parallel renders and a
// render runs up to 60 s. Local stubs (tests) may go faster.
const MAX_RENDERS_LIMIT = 4;
const MIN_RENDER_WAIT_MS = 60000;
const MIN_GAP_LIMIT_MS = 1000;

const stopError = (message) => Object.assign(new Error(message), { stop: true });

const sleep = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

function parseArgs(argv) {
  const options = { maxRenders: 1, renderWaitMs: 70000, minGapMs: 1500 };
  const positional = [];
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--save') {
      i += 1;
      options.save = argv[i];
    } else if (arg === '--max-renders') {
      i += 1;
      options.maxRenders = Number(argv[i]);
    } else if (arg === '--render-wait') {
      i += 1;
      options.renderWaitMs = Number(argv[i]) * 1000;
    } else if (arg === '--min-gap') {
      i += 1;
      options.minGapMs = Number(argv[i]) * 1000;
    } else if (arg.startsWith('-')) {
      return null;
    } else {
      positional.push(arg);
    }
  }
  const [target, reference] = positional;
  options.target = target && target.replace(/\/$/, '');
  if (reference && /^https?:\/\//.test(reference)) {
    options.reference = reference.replace(/\/$/, '');
  } else if (reference) {
    options.snapshot = reference;
  }
  const local = [options.target, options.reference]
    .filter(Boolean)
    .every((url) => /^https?:\/\/127\.0\.0\.1[:/]/.test(`${url}/`));
  const valid = options.target
    && /^https?:\/\//.test(options.target)
    && positional.length <= 2
    && Number.isInteger(options.maxRenders)
    && options.maxRenders >= 1
    && options.renderWaitMs > 0
    && options.minGapMs >= 0
    && (local
      || (options.maxRenders <= MAX_RENDERS_LIMIT
        && options.renderWaitMs >= MIN_RENDER_WAIT_MS
        && options.minGapMs >= MIN_GAP_LIMIT_MS))
    && (!argv.includes('--save')
      || (options.save && !options.save.startsWith('-')));
  return valid ? options : null;
}

// Holds every request back while `maxRenders` background renders may still be
// running, and never requests a URL while its own render may be running. A
// render is assumed to start with the request and to last `renderWaitMs` after
// the answer. Any two requests start at least `minGapMs` apart.
class RenderPacer {
  constructor(maxRenders, renderWaitMs, minGapMs = 0) {
    this.maxRenders = maxRenders;
    this.renderWaitMs = renderWaitMs;
    this.minGapMs = minGapMs;
    this.lastRequestAt = -Infinity;
    this.renders = []; // { url, end }
    this.started = 0;
  }

  async beforeRequest(url) {
    for (;;) {
      const gap = this.lastRequestAt + this.minGapMs - Date.now();
      if (gap > 0) await sleep(gap);
      const now = Date.now();
      this.renders = this.renders.filter((r) => r.end > now);
      const own = this.renders.filter((r) => r.url === url);
      const blocking = this.renders.length >= this.maxRenders ? this.renders : own;
      if (!blocking.length) {
        this.lastRequestAt = Date.now();
        return;
      }
      await sleep(Math.min(...blocking.map((r) => r.end)) - now);
    }
  }

  renderStarted(url) {
    this.renders.push({ url, end: Date.now() + this.renderWaitMs });
    this.started += 1;
  }

  async fetch(url) {
    await this.beforeRequest(url);
    try {
      const res = await fetch(url, {
        redirect: 'manual',
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      const body = await res.text();
      const cache = res.headers.get('x-vercel-cache')
        || res.headers.get('x-nextjs-cache')
        || '';
      if (BACKGROUND_RENDER.has(cache.toUpperCase())) this.renderStarted(url);
      return { res, body };
    } catch (error) {
      // The request may have started a render before it failed.
      this.renderStarted(url);
      throw error;
    }
  }
}

const concrete = (pattern) => pattern.replace(/:\w+\*?/g, (param) => SAMPLE[param] || 'sample-slug');

const pick = (re, html) => {
  const match = html.match(re);
  return match ? match[1].trim().replace(/\s+/g, ' ') : null;
};

// Next applies the first redirect whose source matches, so a later, more
// specific rule can be shadowed by an earlier wildcard. Like Next, matching is
// case-insensitive and `/:slug*` also matches the bare prefix.
const sourceRegex = (source) => new RegExp(
  `^${source
    .split(/(\/:\w+\*|:\w+)/)
    .map((part) => {
      if (/^\/:\w+\*$/.test(part)) return '(?:/(.*))?';
      if (/^:\w+$/.test(part)) return '([^/]+)';
      return part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    })
    .join('')}$`,
  'i',
);

function appliedRedirect(path) {
  const rule = PERMANENT_REDIRECTS.find((r) => sourceRegex(r.source).test(path));
  if (!rule) return null;
  const values = path.match(sourceRegex(rule.source)).slice(1);
  const names = rule.source.match(/:\w+\*?/g) || [];
  const byName = Object.fromEntries(names.map((name, i) => [name, values[i]]));
  return {
    rule,
    // An empty `/:slug*` drops its slash too: /attorneys/:slug* -> /attorneys.
    destination: rule.destination.replace(/(\/?)(:\w+\*?)/g, (_, slash, name) => (byName[name] ? `${slash}${byName[name]}` : '')),
  };
}

// Returns [failures, warnings] for the target's own response.
function ownProblems(c, t) {
  if (typeof t.status !== 'number' || t.status >= 500) return [[`status ${t.status}`], []];
  const isListed = c.kind === 'page' || c.kind === 'post';
  if (isListed && t.status >= 300 && t.status < 400) {
    return [
      [],
      [`sitemap lists a redirecting URL (${t.status} -> ${t.location})`],
    ];
  }
  if (isListed && t.status !== 200) return [[`status ${t.status}, expected 200`], []];
  if (c.kind === 'rewrite') {
    // Redirects run before rewrites; parameterised ones get a made-up slug,
    // so only a 5xx counts for them.
    if (/:\w/.test(c.source)) return [[], []];
    const applied = appliedRedirect(c.path);
    const expected = applied ? `308 -> ${applied.destination}` : '200';
    const actual = t.status === 308 ? `308 -> ${t.location}` : String(t.status);
    return [actual === expected ? [] : [`${actual}, expected ${expected}`], []];
  }
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

const report = (rows, key) => rows
  .filter((row) => row[key].length)
  .forEach((row) => {
    console.log(`[${row.kind}] ${row.path}`);
    row[key].forEach((p) => console.log(`  ${p}`));
  });

const minutes = (ms) => `${Math.round(ms / 60000)} min`;

async function main(options) {
  const {
    target,
    reference,
    snapshot,
    save,
    maxRenders,
    renderWaitMs,
    minGapMs,
  } = options;
  const pacer = new RenderPacer(maxRenders, renderWaitMs, minGapMs);
  const startedAt = Date.now();
  let errorsInARow = 0;

  const rows = [];
  const stop = (why) => {
    throw stopError(
      `Stopped after ${minutes(Date.now() - startedAt)} and ${
        rows.length
      } URLs: ${why}. WordPress may be overloaded; check the Vercel logs before running again.`,
    );
  };

  // Returns { status, res, body }; status is a string for a failed request.
  const request = async (host, path) => {
    let answer;
    try {
      const { res, body } = await pacer.fetch(host + path);
      answer = { status: res.status, res, body };
    } catch (error) {
      answer = { status: `ERR ${error.message}` };
    }
    const overload = typeof answer.status !== 'number' || OVERLOAD_STATUSES.has(answer.status);
    errorsInARow = overload ? errorsInARow + 1 : 0;
    if (errorsInARow >= MAX_ERRORS_IN_A_ROW) {
      stop(
        `${errorsInARow} requests in a row failed, last ${host}${path}: ${answer.status}`,
      );
    }
    return answer;
  };

  const probe = async (host, path) => {
    const { status, res, body } = await request(host, path);
    if (!res) return { status };
    const html = status === 200 && (res.headers.get('content-type') || '').includes('html')
      ? body
      : '';
    return {
      status,
      location: (res.headers.get('location') || '')
        .replace(host, '')
        .replace(PRODUCTION, ''),
      title: pick(/<title[^>]*>([^<]*)<\/title>/i, html),
      canonical: pick(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i, html),
      robots: pick(/<meta[^>]*name="robots"[^>]*content="([^"]*)"/i, html),
      h1: pick(/<h1[^>]*>(?:<[^>]+>)*([^<]*)/i, html),
      jsonld: (html.match(/application\/ld\+json/g) || []).length,
    };
  };

  const sitemapPaths = async (file) => {
    const { status, body } = await request(target, `/${file}`);
    const paths = status === 200
      ? (body.match(/<loc>[^<]*/g) || []).map(
        (loc) => loc
          .replace('<loc>', '')
          .trim()
          .replace(/^https?:\/\/[^/]+/, '') || '/',
      )
      : [];
    if (paths.length < MIN_URLS[file]) {
      stop(
        `${target}/${file}: status ${status}, ${paths.length} URLs (expected at least ${MIN_URLS[file]})`,
      );
    }
    return paths;
  };

  let referenceResults = null;
  if (snapshot) {
    let saved;
    try {
      saved = JSON.parse(fs.readFileSync(snapshot, 'utf8'));
    } catch (error) {
      throw stopError(
        `Cannot read the reference snapshot ${snapshot}: ${error.message}`,
      );
    }
    referenceResults = new Map(saved.results.map((r) => [r.path, r]));
    console.log(`Reference: ${snapshot} (${saved.target}, ${saved.savedAt})`);
    if (saved.complete === false) {
      console.warn(
        `  incomplete snapshot (${saved.stoppedBecause}); URLs it lacks get a warning, not a comparison`,
      );
    }
  }
  // Fail on an unwritable --save folder now, not after hours of sweeping. The
  // file itself is written only at the end, so an earlier snapshot at that
  // path survives a run that dies.
  if (save) {
    const probeFile = `${save}.${process.pid}.tmp`;
    try {
      fs.writeFileSync(probeFile, '');
      fs.unlinkSync(probeFile);
    } catch (error) {
      throw stopError(`Cannot write --save next to ${save}: ${error.message}`);
    }
  }
  const writeSnapshot = (stoppedBecause) => {
    const tmp = `${save}.${process.pid}.tmp`;
    fs.writeFileSync(
      tmp,
      `${JSON.stringify(
        {
          target,
          savedAt: new Date().toISOString(),
          complete: !stoppedBecause,
          ...(stoppedBecause && { stoppedBecause }),
          results: rows.map((row) => ({
            kind: row.kind,
            path: row.path,
            ...row.result,
          })),
        },
        null,
        1,
      )}\n`,
    );
    fs.renameSync(tmp, save);
    console.log(
      `Saved ${rows.length} results to ${save}${
        stoppedBecause ? ' (INCOMPLETE: the sweep stopped)' : ''
      }`,
    );
  };

  const check = async (c) => {
    const t = await probe(target, c.path);
    let r = null;
    if (reference) r = await probe(reference, c.path);
    if (referenceResults) r = referenceResults.get(c.path) || null;
    const [failures, warnings] = ownProblems(c, t);
    if (r) {
      FIELDS.filter((f) => String(t[f]) !== String(r[f])).forEach((f) => failures.push(
        `${f}: ${JSON.stringify(t[f])} vs reference ${JSON.stringify(r[f])}`,
      ));
    } else if (referenceResults) {
      warnings.push('not in the reference snapshot');
    }
    return {
      ...c,
      result: t,
      referenceResult: reference ? r : null,
      failures,
      warnings,
    };
  };

  const posts = await sitemapPaths('sitemap-posts.xml');
  const pages = await sitemapPaths('sitemap.xml');
  // Compare the same posts as the snapshot, or a sample spread over the list.
  const snapshotPosts = referenceResults
    && [...referenceResults.values()]
      .filter((r) => r.kind === 'post')
      .map((r) => r.path);
  // Snapshot pages missing from the target's sitemap are checked too, so a
  // release that drops pages from the sitemap still shows up.
  const snapshotPages = referenceResults
    ? [...referenceResults.values()]
      .filter((r) => r.kind === 'page' && !pages.includes(r.path))
      .map((r) => r.path)
    : [];
  if (snapshotPages.length) {
    console.log(
      `${snapshotPages.length} snapshot pages are not in the target's sitemap; checking them too`,
    );
  }
  const step = Math.max(1, Math.ceil(posts.length / POST_SAMPLE));
  const all = [
    ...[...pages, ...snapshotPages].map((path) => ({ kind: 'page', path })),
    ...(snapshotPosts && snapshotPosts.length
      ? snapshotPosts
      : posts.filter((_, i) => i % step === 0)
    ).map((path) => ({ kind: 'post', path })),
    ...PERMANENT_REDIRECTS.map((rule) => ({
      kind: 'redirect',
      path: concrete(rule.source),
      rule,
    })),
    ...[
      ...POST_TYPE_REWRITES,
      ...POST_CATEGORY_REWRITES,
      ...SITE_PAGES_REWRITES,
    ].map((r) => ({
      kind: 'rewrite',
      path: concrete(r.source),
      source: r.source,
    })),
  ];
  // Redirects stay even when repeated: a duplicate source is a shadowed rule.
  const cases = all.filter(
    (c, i) => c.kind === 'redirect' || all.findIndex((o) => o.path === c.path) === i,
  );

  console.log(
    `Checking ${cases.length} URLs on ${target}${
      reference ? ` against ${reference}` : ''
    }; at most ${maxRenders} background render(s) at a time, each counted for ${
      renderWaitMs / 1000
    } s`,
  );
  let stopped = null;
  try {
    for (const [i, c] of cases.entries()) {
      rows.push(await check(c));
      if ((i + 1) % 25 === 0) {
        console.log(
          `  ${i + 1}/${cases.length}, ${
            pacer.started
          } renders started, ${minutes(Date.now() - startedAt)}`,
        );
      }
    }

    // WordPress hiccups (5xx, no answer) are common; only what fails twice
    // counts. Other differences repeat on every try, and each try may cost one
    // more render, so they are not retried.
    const hiccup = (result) => Boolean(result)
      && (typeof result.status !== 'number' || result.status >= 500);
    const failed = rows.filter(
      (row) => row.failures.length
        && (hiccup(row.result) || hiccup(row.referenceResult)),
    );
    if (failed.length) {
      console.log(`Retrying ${failed.length} URLs that got a 5xx or no answer`);
    }
    for (const row of failed) {
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
  } catch (error) {
    if (!error.stop) throw error;
    stopped = error;
  }

  const warned = rows.filter((row) => row.warnings.length);
  const failing = rows.filter((row) => row.failures.length);
  if (warned.length) {
    console.log(`\nWarnings (${warned.length}), not caused by a release:`);
    report(rows, 'warnings');
  }
  if (failing.length) {
    console.log(`\nFailures (${failing.length}):`);
    report(rows, 'failures');
  }
  console.log(
    `\n${pacer.started} background renders started in ${minutes(
      Date.now() - startedAt,
    )}.`,
  );
  if (save) writeSnapshot(stopped && stopped.message);
  if (stopped) throw stopped;
  console.log(
    failing.length
      ? `${failing.length} of ${cases.length} URLs failed`
      : `All ${cases.length} URLs OK`,
  );
  process.exitCode = failing.length ? 1 : 0;
}

if (require.main === module) {
  const options = parseArgs(process.argv.slice(2));
  if (!options) {
    console.error(
      `Usage: node scripts/smoke-compare.js <target> [<reference URL> | <snapshot.json>] [--save <file>] [--max-renders <n>] [--render-wait <seconds>] [--min-gap <seconds>]
Against real hosts --max-renders is at most ${MAX_RENDERS_LIMIT}, --render-wait at least ${
  MIN_RENDER_WAIT_MS / 1000
} and --min-gap at least ${MIN_GAP_LIMIT_MS / 1000}.`,
    );
    process.exit(2);
  }
  main(options).catch((error) => {
    console.error(`\n${error.stop ? error.message : error.stack}`);
    process.exitCode = 1;
  });
}

module.exports = { appliedRedirect, parseArgs, RenderPacer };
