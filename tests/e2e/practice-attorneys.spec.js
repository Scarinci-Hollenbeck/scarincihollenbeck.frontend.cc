import { test, expect } from '@playwright/test';
import blockAnalytics from './support/block-analytics';

/**
 * Attorneys block (`PracticeAttorneys`). Practice pages show every attorney,
 * without the "See all" button. Office pages keep
 * the first row and the button, and so does "Lawyers mentioned in this
 * article" on posts (same component, default `collapsible`).
 * Both pages have more attorneys than fit in one row at 1440 px. The block is
 * loaded with next/dynamic, so it gets LOAD_MS to appear.
 */

const PRACTICE = '/practices/litigation';
const OFFICE = '/location/little-falls';

test.use({ viewport: { width: 1440, height: 900 } });

test.beforeEach(async ({ page }) => {
  await blockAnalytics(page);
});

const LOAD_MS = 30000;

const block = (page) => page.getByTestId('collapse-attorneys');

// The wrapper clips everything below the first row while the list is closed.
const clippedPx = (page) => block(page)
  .locator('.attorneys-practice__wrapper')
  .evaluate((el) => el.scrollHeight - el.clientHeight);

test('practice page shows all attorneys without the See all button', async ({
  page,
}) => {
  await page.goto(PRACTICE);
  const cards = block(page).locator('.attorney__link');
  await expect(cards.nth(7)).toBeAttached({ timeout: LOAD_MS });
  await expect(
    block(page).getByRole('button', { name: /see all/i }),
  ).toHaveCount(0);
  // The list opens through a 0.5 s grid transition only when it starts closed,
  // so it must be open right away.
  expect(await clippedPx(page)).toBeLessThanOrEqual(1);
});

test('office page keeps the first row and the See all button', async ({
  page,
}) => {
  await page.goto(OFFICE);
  const button = block(page).getByRole('button', { name: /see all/i });
  await expect(button).toBeVisible({ timeout: LOAD_MS });
  expect(await clippedPx(page)).toBeGreaterThan(100);

  await button.click();
  await expect(
    block(page).getByRole('button', { name: /hide/i }),
  ).toBeVisible();
  await expect
    .poll(() => clippedPx(page), { timeout: 3000 })
    .toBeLessThanOrEqual(1);
});
