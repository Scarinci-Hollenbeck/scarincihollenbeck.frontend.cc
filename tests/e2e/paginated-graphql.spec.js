import { test, expect } from '@playwright/test';
import blockAnalytics from './support/block-analytics';

/**
 * Client-side paginated GraphQL sections (attorney "Articles"). Pins what the
 * Apollo 2 client used to give: a loader on the server render and the first
 * client render, one request per new page, and pages already fetched in this
 * session shown instantly from cache.
 */

const ATTORNEY = '/attorneys/donald-scarinci';

const isQuery = (name) => (request) => request.method() === 'POST'
  && /graphql/.test(request.url())
  && (request.postData() || '').includes(name);

const trackQueries = (page, name) => {
  const seen = [];
  page.on('request', (r) => {
    if (isQuery(name)(r)) seen.push(JSON.parse(r.postData()).variables);
  });
  return seen;
};

// Records whether a loader shows up anywhere until the next call.
const watchLoader = (page) => page.evaluate(() => {
  window.loaderSeen = !!document.querySelector('.loader');
  const observer = new MutationObserver(() => {
    if (document.querySelector('.loader')) window.loaderSeen = true;
  });
  observer.observe(document.body, { childList: true, subtree: true });
});

// The closest <section> around the "Articles" heading (sections are nested).
const articlesBox = (page) => page.locator('xpath=//h2[normalize-space()="Articles"]/ancestor::section[1]');
const articleCards = (page) => articlesBox(page).locator('article');
const articleTitles = (page) => articleCards(page).locator('.news-card-title').allInnerTexts();
const goToArticlesPage = (page, n) => articlesBox(page)
  .locator('.pagination a', { hasText: new RegExp(`^${n}$`) })
  .click();

test.beforeEach(async ({ page }) => {
  await blockAnalytics(page);
});

test('server render shows the loader where the attorney articles go', async ({
  request,
}) => {
  const html = await (await request.get(ATTORNEY)).text();
  const start = html.indexOf('>Articles</h2>');
  expect(start).toBeGreaterThan(0);
  const section = html.slice(start, html.indexOf('</section>', start));
  expect(section).toContain('loader');
  expect(section).not.toContain('news-card');
});

test('attorney articles: one request per new page, cached pages need none', async ({
  page,
}) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error' && /hydrat|did not match/i.test(m.text())) errors.push(m.text());
  });
  const queries = trackQueries(page, 'AttorneyPostsQuery');

  await page.goto(ATTORNEY);
  await expect(articleCards(page)).toHaveCount(3);
  const firstPage = await articleTitles(page);
  // Articles and News each fetch their first page once.
  expect(queries.map((v) => v.offsetPosts)).toEqual([0, 0]);
  queries.length = 0;

  await goToArticlesPage(page, 2);
  await expect(page).toHaveURL(/articles-page=2/);
  await expect
    .poll(async () => {
      const titles = await articleTitles(page);
      return titles.length === 3 && titles.join() !== firstPage.join();
    })
    .toBe(true);
  const secondPage = await articleTitles(page);
  expect(queries).toHaveLength(1);
  expect(queries[0]).toMatchObject({
    offsetPosts: 3,
    postsPerPage: 3,
    categories: [599],
  });
  queries.length = 0;

  await watchLoader(page);
  await goToArticlesPage(page, 1);
  await expect(page).not.toHaveURL(/articles-page/);
  await expect.poll(() => articleTitles(page)).toEqual(firstPage);
  await page.waitForTimeout(1500);
  expect(queries).toHaveLength(0);
  expect(await page.evaluate(() => window.loaderSeen)).toBe(false);

  await watchLoader(page);
  await goToArticlesPage(page, 2);
  await expect.poll(() => articleTitles(page)).toEqual(secondPage);
  await page.waitForTimeout(1500);
  expect(queries).toHaveLength(0);
  expect(await page.evaluate(() => window.loaderSeen)).toBe(false);

  expect(errors).toEqual([]);
});

test('fetched pages stay cached after leaving the page for a while', async ({
  page,
}) => {
  await page.clock.install();
  const queries = trackQueries(page, 'AttorneyPostsQuery');

  await page.goto(ATTORNEY);
  await expect(articleCards(page)).toHaveCount(3);
  await goToArticlesPage(page, 2);
  await expect(page).toHaveURL(/articles-page=2/);
  await expect.poll(() => queries.length).toBe(3);

  // Leave client-side (the sections unmount), let ten minutes pass, come back.
  await page.evaluate(() => window.next.router.push('/attorneys'));
  await expect(page).toHaveURL(/\/attorneys$/);
  await page.clock.fastForward('10:00');
  await page.goBack();
  await expect(page).toHaveURL(/articles-page=2/);
  await expect(articleCards(page)).toHaveCount(3);
  await goToArticlesPage(page, 1);
  await expect(page).not.toHaveURL(/articles-page/);
  await expect(articleCards(page)).toHaveCount(3);
  await page.waitForTimeout(1500);
  expect(queries).toHaveLength(3);
});

test('a GraphQL error hides the articles list without breaking the page', async ({
  page,
}) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.route(/graphql/, (route) => {
    if (!isQuery('AttorneyPostsQuery')(route.request())) return route.continue();
    return route.fulfill({
      json: { errors: [{ message: 'Internal server error' }], data: null },
      headers: { 'access-control-allow-origin': '*' },
    });
  });

  await page.goto(ATTORNEY);
  await expect(
    page.getByRole('heading', { name: 'Articles', exact: true }),
  ).toBeVisible();
  await page.waitForTimeout(3000);
  await expect(articleCards(page)).toHaveCount(0);
  await expect(page.locator('.loader')).toHaveCount(0);
  expect(errors).toEqual([]);
});
