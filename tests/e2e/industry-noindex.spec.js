import { test, expect } from '@playwright/test';
import blockAnalytics from './support/block-analytics';

/**
 * An industry without its full content yet ("Page ready" off in WordPress,
 * `pageReady` false) answers with `noindex, follow`, so search engines keep it
 * out of the index until editors turn the switch on. A ready industry has no
 * robots tag. Read from the server HTML, as a crawler sees it.
 *
 * Defaults match production on 27.11.2026; other WordPress copies set
 * E2E_NOT_READY_INDUSTRY and E2E_READY_INDUSTRY.
 */

const NOT_READY = process.env.E2E_NOT_READY_INDUSTRY || '/industries/gaming';
const READY = process.env.E2E_READY_INDUSTRY || '/industries/data-centers';

const robots = (page) => page.locator('head meta[name="robots"]');

test.use({ javaScriptEnabled: false });

test.beforeEach(async ({ page }) => {
  await blockAnalytics(page);
});

test('an industry that is not ready is noindex, follow', async ({ page }) => {
  const response = await page.goto(NOT_READY);
  expect(response.status()).toBe(200);
  await expect(robots(page)).toHaveCount(1);
  await expect(robots(page)).toHaveAttribute('content', 'noindex, follow');
});

test('a ready industry has no robots tag', async ({ page }) => {
  const response = await page.goto(READY);
  expect(response.status()).toBe(200);
  await expect(robots(page)).toHaveCount(0);
});
