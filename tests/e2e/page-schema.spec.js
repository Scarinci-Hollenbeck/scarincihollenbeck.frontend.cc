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

const nodesIn = (blocks) => blocks
  .map((block) => JSON.parse(block))
  .flatMap((json) => (json['@graph'] ? json['@graph'] : [json]));

const nodeTypes = (node) => [].concat(node['@type']);

const fetchArticleAuthors = async (request, path) => {
  const article = nodesIn(
    expectHealthyBlocks(await fetchHead(request, path), path),
  ).find((node) => nodeTypes(node).includes('Article'));

  expect(article, `${path} should emit an Article node`).toBeTruthy();
  return [].concat(article.author);
};

/** The firm-wide FAQ must stay visible on the page: only its markup goes. */
const expectVisibleFirmFaq = async (request, path) => {
  const html = await (await request.get(path)).text();
  const body = html.slice(html.indexOf('</head>'));

  expect(body).toContain('data-testid="faq-wrapper"');
  expect(body).toContain('How do you pronounce');
};

/**
 * Tasks repo #10. Paths depend on WordPress content as of 2026-11-13: if one
 * fails, first check the page still matches its description.
 */
test.describe('code schemas tell the truth (tasks #10)', () => {
  test('a practice without its own FAQ emits no FAQPage', async ({
    request,
  }) => {
    // No practicesIncluded.faq and no pageSchemaJsonLd in WordPress.
    const path = '/practices/ip-litigation';
    const types = typesIn(
      expectHealthyBlocks(await fetchHead(request, path), path),
    );

    expect(types).not.toContain('FAQPage');
    await expectVisibleFirmFaq(request, path);
  });

  test('a practice with its own FAQ keeps its FAQPage', async ({ request }) => {
    const path = '/practices/real-estate-litigation';
    const types = typesIn(
      expectHealthyBlocks(await fetchHead(request, path), path),
    );

    expect(types).toContain('FAQPage');
  });

  test('a location without its own FAQ emits no FAQPage', async ({
    request,
  }) => {
    const path = '/location/little-falls';
    const types = typesIn(
      expectHealthyBlocks(await fetchHead(request, path), path),
    );

    expect(types).not.toContain('FAQPage');
    await expectVisibleFirmFaq(request, path);
  });

  test('the firm as post author is the organization, not a Person', async ({
    request,
  }) => {
    // Author picked in WordPress: the "Scarinci Hollenbeck, LLC" profile.
    const path = '/firm-news/new-jersey-super-lawyers-2027';
    const authors = await fetchArticleAuthors(request, path);

    expect(authors).toHaveLength(1);
    expect(authors[0]['@type']).toBe('LegalService');
    expect(authors[0]['@id']).toMatch(/\/#organization$/);
  });

  test('an attorney as post author stays a Person', async ({ request }) => {
    const path = '/law-firm-insights/bess-emergency-response-planning';
    const authors = await fetchArticleAuthors(request, path);

    expect(authors.length).toBeGreaterThan(0);
    authors.forEach((author) => {
      expect(author['@type']).toBe('Person');
      expect(author['@id']).toContain('/attorneys/');
    });
  });

  test('every LegalService on a location page has the same hours and price range', async ({
    request,
  }) => {
    // Covers the code schemas and the editor-written pageSchemaJsonLd.
    const path = '/location/little-falls';
    const services = nodesIn(
      expectHealthyBlocks(await fetchHead(request, path), path),
    ).filter((node) => nodeTypes(node).includes('LegalService'));

    expect(services.length).toBeGreaterThan(1);
    expect(new Set(services.map((node) => node.openingHours)).size).toBe(1);
    expect(new Set(services.map((node) => node.priceRange)).size).toBe(1);
  });
});
