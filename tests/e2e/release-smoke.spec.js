import { test, expect } from '@playwright/test';
import blockAnalytics from './support/block-analytics';

/**
 * Browser smoke checks for a release: run against the preview before switching
 * production and against production right after (E2E_BASE_URL).
 * Run with --workers=1 (see CLAUDE.md): every uncached page is a WordPress
 * render.
 */

// One page of every type; slugs picked to be long-lived.
const PAGES = [
  '/',
  '/attorneys',
  '/attorneys/donald-scarinci',
  '/practices/real-estate-litigation',
  '/services',
  '/library',
  '/library/category/firm-news',
  '/client-alert/new-intoxicating-hemp-law',
  '/location/little-falls',
  '/contact-us',
  '/careers',
  '/awards',
  '/diversity',
  '/firm-overview',
  '/administration',
  '/library/search?query=tax',
];

// WordPress times out now and then even under normal traffic; only what fails
// twice counts.
test.describe.configure({ retries: 1 });
test.use({ viewport: { width: 1440, height: 900 } });

test.beforeEach(async ({ page }) => {
  await blockAnalytics(page);
});

PAGES.forEach((path) => {
  test(`${path} renders without page errors`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));

    const response = await page.goto(path);
    expect(response.status()).toBe(200);
    await expect(page.locator('h1').first()).toBeVisible();
    // GTM is injected after hydration, so it may arrive after `load`.
    await page.waitForFunction(() => !!window.google_tag_manager, null, {
      timeout: 15000,
    });
    expect(errors).toEqual([]);
  });
});

test('Lead forms are initialised by Kwes', async ({ page }) => {
  await page.goto('/contact-us');
  await expect(page.locator('.kwes-form-init').first()).toBeAttached({
    timeout: 15000,
  });
});

test('header search returns Algolia results', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Search opener').first().click();
  await page
    .locator('input[placeholder="Search"]:visible')
    .first()
    .fill('real estate');
  await expect(
    page.locator('.search-result-container:visible a').first(),
  ).toBeVisible({ timeout: 15000 });
});

test('YouTube embeds load the player on click', async ({ page }) => {
  await page.goto('/attorneys/donald-scarinci');
  // The lite-youtube element is defined by a script loaded on idle; clicking
  // it before that does nothing.
  await page.waitForFunction(() => !!customElements.get('lite-youtube'));
  const video = page.locator('lite-youtube').first();
  await video.scrollIntoViewIfNeeded();
  await video.click();
  await expect(page.locator('iframe[src*="youtube"]').first()).toBeAttached();
});

test('Google Maps embed loads', async ({ page, baseURL }) => {
  test.skip(
    baseURL.includes('.vercel.app') || baseURL.includes('localhost'),
    'the Maps key only allows the site domains',
  );
  const maps = page.waitForResponse(/google\.com\/maps\/embed/);
  await page.goto('/location/little-falls');
  // The embed iframe is loading="lazy"; bring it into view so it loads.
  await page
    .locator('iframe[src*="maps/embed"]')
    .first()
    .scrollIntoViewIfNeeded();
  expect((await maps).status()).toBe(200);
});

// SEO signals from tasks #11; they must not come back.
test('home page shares a real image, not the placeholder', async ({ page }) => {
  await page.goto('/');
  const images = await Promise.all(
    ['meta[property="og:image"]', 'meta[name="twitter:image"]'].map(
      (selector) => page.locator(selector).getAttribute('content'),
    ),
  );
  images.forEach((image) => {
    expect(image).toMatch(/^https?:\/\//);
    expect(image).not.toContain('no-image-found');
  });
});

test('sitemap lastmod is a WordPress date, not the render time', async ({
  page,
}) => {
  const response = await page.goto('/sitemap.xml');
  const xml = await response.text();
  expect(xml).toContain(
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  );
  const entry = (path) => xml
    .split('<url>')
    .find((block) => new RegExp(`<loc>[^<]*${path}</loc>`).test(block));
  // Library categories have no date in WordPress, so they carry no lastmod at
  // all; listings that are WordPress pages carry the page's date. (A "not
  // today" check on the home page would fail on the day editors change it.)
  ['/library/category/firm-news', '/library/category/client-alert'].forEach(
    (path) => {
      expect(entry(path), path).toBeTruthy();
      expect(entry(path), path).not.toContain('<lastmod>');
    },
  );
  expect(entry('/attorneys')).toContain('<lastmod>');
  const home = xml.split('<url>')[1];
  const homeDate = home.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
  if (homeDate) {
    expect(Date.parse(homeDate)).toBeLessThan(Date.now());
  }
});

test('paginated library listing is self-canonical', async ({ page }) => {
  await page.goto('/library/category/firm-news?page=2');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    /\/library\/category\/firm-news\?page=2$/,
  );
});

test('library search is noindex', async ({ page }) => {
  await page.goto('/library/search?query=tax');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    /noindex/,
  );
});

test('www redirects permanently', async ({ page, baseURL }) => {
  test.skip(
    !baseURL.startsWith('https://scarincihollenbeck.com'),
    'only the production domain has a www alias',
  );
  const response = await page.goto('https://www.scarincihollenbeck.com/');
  const redirect = await response.request().redirectedFrom()?.response();
  expect(redirect?.status()).toBe(308);
  expect(response.url()).toBe('https://scarincihollenbeck.com/');
});
