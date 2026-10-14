import { test, expect } from '@playwright/test';

/**
 * Browser smoke checks for a release: run against the preview before switching
 * production and against production right after (E2E_BASE_URL).
 * Analytics, ads and call-tracking beacons are aborted so the run does not add
 * visits or conversions to the client's reports.
 */

const BEACONS = /google-analytics\.com\/(g\/)?collect|google\.com\/(g\/collect|rmkt|pagead|ccm)|googleadservices\.com|doubleclick\.net\/(pagead|ccm)|\.callrail\.com\/(?!companies\/.*\.js)/;

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
  '/contact',
  '/careers',
  '/awards',
  '/diversity',
  '/firm-overview',
  '/administration',
  '/library/search?query=tax',
];

// Each uncached page is a WordPress render; keep them one at a time.
test.describe.configure({ mode: 'serial' });
test.use({ viewport: { width: 1440, height: 900 } });

test.beforeEach(async ({ page }) => {
  await page.route(BEACONS, (route) => route.abort());
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
  await page.goto('/contact');
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
  expect((await maps).status()).toBe(200);
});
