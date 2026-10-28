import { test, expect } from '@playwright/test';
import blockAnalytics from './support/block-analytics';

/**
 * Cookie banner (react-cookie-consent). The cookie name, value and lifetime
 * must stay the same across library upgrades, or the banner shows again to
 * every visitor who already answered it.
 */

const banner = (page) => page.locator('.CookieConsent');
const DAY = 24 * 60 * 60;

test.beforeEach(async ({ page }) => {
  await blockAnalytics(page);
});

test('accepting stores CookieConsent=true for a year and hides the banner', async ({
  page,
  context,
}) => {
  await page.goto('/');
  await expect(banner(page)).toBeVisible();
  await expect(banner(page)).toContainText('This website uses cookies');

  await page.locator('#rcc-confirm-button').click();
  await expect(banner(page)).toBeHidden();

  const cookie = (await context.cookies()).find(
    (c) => c.name === 'CookieConsent',
  );
  expect(cookie?.value).toBe('true');
  const days = (cookie.expires - Date.now() / 1000) / DAY;
  expect(days).toBeGreaterThan(364);
  expect(days).toBeLessThan(366);

  await page.reload();
  await expect(banner(page)).toHaveCount(0);
});

test('declining stores CookieConsent=false and hides the banner', async ({
  page,
  context,
}) => {
  await page.goto('/');
  await page.locator('#rcc-decline-button').click();
  await expect(banner(page)).toBeHidden();
  const cookie = (await context.cookies()).find(
    (c) => c.name === 'CookieConsent',
  );
  expect(cookie?.value).toBe('false');
});

test('a consent cookie set by the previous version keeps the banner hidden', async ({
  page,
  context,
  baseURL,
}) => {
  await context.addCookies([
    { name: 'CookieConsent', value: 'true', url: baseURL },
  ]);
  await page.goto('/');
  await page.waitForLoadState('load');
  await expect(banner(page)).toHaveCount(0);
});
