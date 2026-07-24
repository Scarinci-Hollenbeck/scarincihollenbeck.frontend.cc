import { test, expect } from '@playwright/test';

/**
 * These tests read the RAW server HTML (the `request` fixture, no browser, no
 * JS) — that is exactly what a crawler sees. A tag injected client-side by GTM
 * would not show up here, which is the whole point of the task.
 */

/** Pilot post — the editor seeds `pageSchemaJsonLd` with an FAQPage object. */
const SCHEMA_PAGE_PATH = process.env.E2E_SCHEMA_PATH || '/client-alert/new-jersey-data-broker-law';

/**
 * One page per remaining priority route. These assertions hold whether or not
 * the field happens to be filled, so they do not depend on WordPress content.
 */
const PRIORITY_ROUTES = [
  { name: 'practice', path: '/practices/construction-lawyers' },
  { name: 'industry', path: '/industries/cannabis' },
  { name: 'attorney', path: '/attorneys/donald-scarinci' },
  { name: 'location', path: '/location/little-falls' },
];

const LD_JSON_TAG_REGEX = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;

const EMPTY_LD_JSON_TAG_REGEX = /<script[^>]*type="application\/ld\+json"[^>]*>\s*<\/script>/;

const getLdJsonBlocks = (html) => [...html.matchAll(LD_JSON_TAG_REGEX)].map((match) => match[1]);

const fetchHead = async (request, path) => {
  const res = await request.get(path);
  expect(res.status(), `${path} should respond 200`).toBe(200);

  const html = await res.text();
  const end = html.indexOf('</head>');
  expect(end, `${path} should contain a </head>`).toBeGreaterThan(-1);

  return html.slice(0, end);
};

const expectHealthyBlocks = (head, path) => {
  expect(head, `${path} must not render an empty ld+json tag`).not.toMatch(
    EMPTY_LD_JSON_TAG_REGEX,
  );

  const blocks = getLdJsonBlocks(head);
  expect(
    blocks.length,
    `${path} should still emit code schemas`,
  ).toBeGreaterThan(0);

  blocks.forEach((block) => {
    expect(block.trim()).not.toBe('');
    expect(() => JSON.parse(block), `invalid JSON-LD on ${path}`).not.toThrow();
  });

  return blocks;
};

const typesIn = (blocks) => blocks
  .map((block) => JSON.parse(block))
  .flatMap((json) => (json['@graph'] ? json['@graph'] : [json]))
  .flatMap((node) => node['@type']);

test.describe('field schema on the pilot post', () => {
  test('renders server-side, exactly once', async ({ request }) => {
    const head = await fetchHead(request, SCHEMA_PAGE_PATH);
    const faqBlocks = getLdJsonBlocks(head).filter((block) => block.includes('"FAQPage"'));

    expect(
      faqBlocks,
      `expected exactly one FAQPage ld+json block in the head of ${SCHEMA_PAGE_PATH}. `
        + 'If this fails with 0, the pageSchemaJsonLd field is empty in WordPress '
        + '(or the page has not been revalidated since it was filled).',
    ).toHaveLength(1);

    expect(JSON.parse(faqBlocks[0])['@type']).toBe('FAQPage');
  });

  test('never emits a raw < that could break out of the script tag', async ({
    request,
  }) => {
    const head = await fetchHead(request, SCHEMA_PAGE_PATH);

    getLdJsonBlocks(head).forEach((block) => {
      expect(block).not.toContain('<');
    });
  });

  test('does not replace the code-generated schemas', async ({ request }) => {
    const head = await fetchHead(request, SCHEMA_PAGE_PATH);
    const types = typesIn(expectHealthyBlocks(head, SCHEMA_PAGE_PATH));

    expect(types).toContain('Article');
    expect(types).toContain('FAQPage');
  });
});

test.describe('remaining priority routes', () => {
  PRIORITY_ROUTES.forEach(({ name, path }) => {
    test(`${name} page renders no empty ld+json tag and keeps its code schemas`, async ({
      request,
    }) => {
      const head = await fetchHead(request, path);
      const types = typesIn(expectHealthyBlocks(head, path));

      expect(
        types.length,
        `${path} lost its code-generated schemas`,
      ).toBeGreaterThan(0);
    });
  });
});
