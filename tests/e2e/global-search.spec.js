import { test, expect } from '@playwright/test';
import blockAnalytics from './support/block-analytics';

/**
 * Header search (Algolia, live index). Pins the behaviour of the
 * react-instantsearch-dom 6 version, recorded before the move to
 * react-instantsearch 7, plus one deliberate fix: a new query starts from
 * page 1 (v6 kept the page the previous query was on).
 */

const searches = (page) => {
  const seen = [];
  page.on('request', (r) => {
    if (!/algolia/.test(r.url()) || r.method() !== 'POST') return;
    (JSON.parse(r.postData()).requests || []).forEach((q) => {
      const params = Object.fromEntries(new URLSearchParams(q.params));
      // Skip the extra facet-count query sent while a filter is on.
      if (params.analytics !== 'false') seen.push(params);
    });
  });
  return seen;
};

const visible = (page, selector, options) => page.locator(selector, options).filter({ visible: true });
const input = (page) => visible(page, 'input[placeholder="Search"]');
const panel = (page) => visible(page, '.search-result-container');
const hits = (page) => panel(page).locator('.ais-Hits-item');
const filterToggles = (page) => panel(page).locator('.filter-toggle');
const activeFilters = (page) => panel(page)
  .locator('.filter-toggle.active .search-filter-label')
  .allInnerTexts();
const noFilter = (page) => panel(page).locator('.search-filter-label.clear');
const pagination = (page) => panel(page).locator('.ais-Pagination');
const selectedPage = (page) => pagination(page).locator('.ais-Pagination-item--selected');
const pageLink = (page, n) => pagination(page).locator('a.ais-Pagination-link', {
  hasText: new RegExp(`^${n}$`),
});

const openSearch = async (page) => {
  await visible(page, '[aria-label="Search opener"]').first().click();
  await expect(input(page)).toBeFocused();
};

const search = async (page, text) => {
  await input(page).fill(text);
  await expect(input(page)).toHaveValue(text);
};

test.beforeEach(async ({ page }) => {
  await blockAnalytics(page);
  await page.goto('/');
});

test('opening the search focuses the input and lists the post type filters', async ({
  page,
}) => {
  await openSearch(page);
  await expect(filterToggles(page).first()).toBeVisible();
  const labels = await filterToggles(page)
    .locator('.search-filter-label')
    .allInnerTexts();
  const order = [
    'Attorneys',
    'Practices',
    'Industries',
    'Office Locations',
    'Careers',
    'Posts',
  ];
  expect(labels.length).toBeGreaterThan(1);
  expect(labels.every((l) => order.includes(l))).toBe(true);
  expect(
    [...labels].sort((a, b) => order.indexOf(a) - order.indexOf(b)),
  ).toEqual(labels);
  await expect(
    filterToggles(page).locator('.search-filter-count').first(),
  ).toHaveText(/^\d+$/);
  await expect(hits(page)).toHaveCount(0);
  await expect(pagination(page)).toHaveCount(0);
});

test('a query shows highlighted hits and the v6 pagination', async ({
  page,
}) => {
  const queries = searches(page);
  await openSearch(page);
  await search(page, 'real estate');

  await expect(hits(page)).toHaveCount(20);
  const title = hits(page).first().locator('.ais-Highlight');
  await expect(
    title.locator('em.ais-Highlight-highlighted').first(),
  ).toBeVisible();
  await expect(
    title.locator('span.ais-Highlight-nonHighlighted').first(),
  ).toBeAttached();
  await expect(title.locator('mark')).toHaveCount(0);

  // « ‹ 1–7 ›, nothing after "next"; disabled links are spans.
  const items = pagination(page).locator('li');
  await expect(items).toHaveCount(10);
  await expect(selectedPage(page)).toHaveText('1');
  await expect(
    pagination(page).locator('.ais-Pagination-link--selected'),
  ).toHaveAttribute('aria-label', 'Page 1');
  await expect(
    pagination(page).locator('.ais-Pagination-item--lastPage'),
  ).toHaveCount(0);
  await expect(
    pagination(page).locator('.ais-Pagination-item--firstPage'),
  ).toHaveClass(/ais-Pagination-item--disabled/);
  await expect(
    pagination(page).locator(
      '.ais-Pagination-item--firstPage > span.ais-Pagination-link',
    ),
  ).toHaveText('«');
  await expect(
    pagination(page).locator(
      '.ais-Pagination-item--previousPage > span.ais-Pagination-link',
    ),
  ).toHaveText('‹');
  await expect(
    pagination(page).locator('.ais-Pagination-item--nextPage a'),
  ).toHaveAttribute('aria-label', 'Next page');
  await expect(pageLink(page, 7)).toHaveAttribute('href', '#');

  queries.length = 0;
  await pageLink(page, 2).click();
  await expect(selectedPage(page)).toHaveText('2');
  await expect(page).toHaveURL(/\/$/);
  expect(queries.at(-1)).toMatchObject({ query: 'real estate', page: '1' });

  await pagination(page).locator('.ais-Pagination-item--nextPage a').click();
  await expect(selectedPage(page)).toHaveText('3');
  await expect(
    pagination(page).locator('.ais-Pagination-item--firstPage a'),
  ).toHaveAttribute('aria-label', 'First page');

  await pagination(page).locator('.ais-Pagination-item--firstPage a').click();
  await expect(selectedPage(page)).toHaveText('1');
});

test('a new query starts from page 1', async ({ page }) => {
  const queries = searches(page);
  await openSearch(page);
  await search(page, 'real estate');
  await pageLink(page, 3).click();
  await expect(selectedPage(page)).toHaveText('3');

  queries.length = 0;
  await search(page, 'tax');
  await expect(hits(page)).toHaveCount(20);
  await expect(selectedPage(page)).toHaveText('1');
  expect(queries.at(-1)).toMatchObject({ query: 'tax' });
  expect(queries.at(-1).page || '0').toBe('0');
});

test('post type filters are single-select and go back to page 1', async ({
  page,
}) => {
  const queries = searches(page);
  await openSearch(page);
  await search(page, 'tax');
  await expect(hits(page)).toHaveCount(20);
  await expect(noFilter(page)).toHaveCount(0);

  await filterToggles(page).filter({ hasText: 'Practices' }).click();
  await expect.poll(() => activeFilters(page)).toEqual(['Practices']);
  await expect(noFilter(page)).toBeVisible();
  expect(queries.at(-1).facetFilters).toBe('[["post_type_label:Practices"]]');

  await filterToggles(page).filter({ hasText: 'Posts' }).click();
  await expect.poll(() => activeFilters(page)).toEqual(['Posts']);
  expect(queries.at(-1).facetFilters).toBe('[["post_type_label:Posts"]]');

  // Clicking the active filter keeps it and goes back to page 1 (as in v6).
  await pageLink(page, 2).click();
  await expect(selectedPage(page)).toHaveText('2');
  await filterToggles(page).filter({ hasText: 'Posts' }).click();
  await expect(selectedPage(page)).toHaveText('1');
  expect(await activeFilters(page)).toEqual(['Posts']);

  await pageLink(page, 2).click();
  await expect(selectedPage(page)).toHaveText('2');

  // The filter survives a new query.
  await search(page, 'taxes');
  await expect(selectedPage(page)).toHaveText('1');
  await expect.poll(() => activeFilters(page)).toEqual(['Posts']);
  await pageLink(page, 2).click();
  await expect(selectedPage(page)).toHaveText('2');

  queries.length = 0;
  await noFilter(page).click();
  await expect.poll(() => activeFilters(page)).toEqual([]);
  await expect(noFilter(page)).toHaveCount(0);
  await expect(selectedPage(page)).toHaveText('1');
  expect(queries.at(-1).facetFilters).toBeUndefined();
});

test('no results or an empty query hide the results', async ({ page }) => {
  await openSearch(page);
  await search(page, 'zzqxjvw');
  await expect(filterToggles(page)).toHaveCount(0);
  await expect(panel(page).locator('.results-container')).toHaveCount(0);
  await expect(pagination(page)).toHaveCount(0);

  await search(page, '');
  await expect(filterToggles(page).first()).toBeVisible();
  await expect(hits(page)).toHaveCount(0);
  await expect(pagination(page)).toHaveCount(0);
});

test('clicking a hit opens it and closes the search', async ({ page }) => {
  await openSearch(page);
  await search(page, 'donald scarinci');
  const first = hits(page).first().locator('a');
  await expect(first).toHaveAttribute('href', '/attorneys/donald-scarinci');
  await first.click();
  await expect(page).toHaveURL(/\/attorneys\/donald-scarinci$/);
  await expect(input(page)).toHaveCount(0);

  // Reopened search starts empty.
  await openSearch(page);
  await expect(input(page)).toHaveValue('');
  await expect(hits(page)).toHaveCount(0);
});

test('the X button and a click outside close the search', async ({ page }) => {
  await openSearch(page);
  await search(page, 'cannabis');
  await expect(hits(page).first()).toBeVisible();
  await visible(page, 'form svg[role="button"]').click();
  await expect(input(page)).toHaveCount(0);

  await openSearch(page);
  await search(page, 'law');
  await expect(hits(page).first()).toBeVisible();
  await page.mouse.click(5, 450);
  await expect(input(page)).toHaveCount(0);
});

test('search talks to the Algolia search hosts only', async ({ page }) => {
  const hosts = new Set();
  page.on('request', (r) => {
    const { hostname } = new URL(r.url());
    if (/algolia/.test(hostname)) hosts.add(hostname);
  });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') errors.push(m.text());
  });

  await openSearch(page);
  await search(page, 'real estate');
  await expect(hits(page)).toHaveCount(20);
  await hits(page).first().locator('a').click();
  await page.waitForLoadState('load');

  expect([...hosts].length).toBeGreaterThan(0);
  expect(
    [...hosts].filter(
      (h) => !/-dsn\.algolia\.net$|\.algolianet\.com$|\.algolia\.net$/.test(h),
    ),
  ).toEqual([]);
  expect([...hosts].filter((h) => /insights/.test(h))).toEqual([]);
  expect(errors.filter((e) => /instantsearch|algolia/i.test(e))).toEqual([]);
});
