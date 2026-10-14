import { test, expect } from '@playwright/test';

/**
 * Browser smoke checks for a release: run against the preview before switching
 * production and against production right after (E2E_BASE_URL).
 * Analytics, ads and call-tracking beacons are aborted so the run does not add
 * visits or conversions to the client's reports. The PWA service worker is
 * kept from registering too: requests it sends itself never reach page.route.
 * (Playwright's `serviceWorkers: 'block'` removes navigator.serviceWorker, and
 * the PWA register script then throws.)
 * Run with --workers=1 (see CLAUDE.md): every uncached page is a WordPress
 * render.
 */

const AD_HOSTS = /(^|\.)(google-analytics\.com|doubleclick\.net|googleadservices\.com|googlesyndication\.com|analytics\.google\.com)$/;
// Google Ads also pings google.<country TLD>, e.g. google.com.ua/pagead.
const GOOGLE_HOST = /(^|\.)google\.[a-z]{2,3}(\.[a-z]{2})?$/;
const GOOGLE_BEACON_PATH = /^\/(g\/collect|rmkt|pagead|ccm|ads|measurement)\b/;

const isBeacon = ({ hostname, pathname }) => AD_HOSTS.test(hostname)
  || (GOOGLE_HOST.test(hostname) && GOOGLE_BEACON_PATH.test(pathname))
  || (hostname === 'www.googletagmanager.com' && pathname === '/a')
  // CallRail: let the swap script load, block everything it reports.
  || (/(^|\.)callrail\.com$/.test(hostname)
    && !/^\/companies\/.+\.js$/.test(pathname));

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

// WordPress times out now and then even under normal traffic; only what fails
// twice counts.
test.describe.configure({ retries: 1 });
test.use({ viewport: { width: 1440, height: 900 } });

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.register = () => new Promise(() => {});
    }
  });
  await page.route(isBeacon, (route) => route.abort());
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
  expect((await maps).status()).toBe(200);
});
