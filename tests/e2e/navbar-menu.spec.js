import { test, expect } from '@playwright/test';

/**
 * The header dropdowns animate open with `overflow: hidden` and must switch to
 * `overflow: visible` once open, otherwise the Attorneys filter lists are
 * clipped at the bottom of the panel. framer-motion 12 does not render a value
 * that only appears in `transitionEnd`, so this runs in a real browser.
 */

test.use({ viewport: { width: 1440, height: 900 } });

test('attorneys filter list is not clipped by the header panel', async ({
  page,
}) => {
  await page.goto('/');
  await page
    .locator('header')
    .getByText('Attorneys', { exact: true })
    .first()
    .click();

  const panel = page.locator('.navbar-content');
  await expect(panel).toHaveCSS('overflow', 'visible');

  await panel
    .getByRole('button')
    .filter({ has: page.locator('input[placeholder="Filter by Practice"]') })
    .click();

  const panelBottom = (await panel.boundingBox()).y + (await panel.boundingBox()).height;
  const options = await page.evaluate(() => {
    const list = [...document.querySelectorAll('.navbar-content *')].find(
      (el) => getComputedStyle(el).position === 'absolute'
        && el.getBoundingClientRect().height > 50,
    );
    return list && list.getBoundingClientRect().bottom;
  });

  expect(options, 'practice options list should open').toBeTruthy();
  expect(options, 'the list extends below the panel').toBeGreaterThan(
    panelBottom,
  );
  await expect(panel).toHaveCSS('overflow', 'visible');
});

test('header panel clips its content while it opens and closes', async ({
  page,
}) => {
  await page.goto('/');
  const attorneys = page
    .locator('header')
    .getByText('Attorneys', { exact: true })
    .first();
  await expect(attorneys).toBeVisible();

  // Click and read two frames later, well inside the 0.3s open animation.
  const overflowWhileOpening = await attorneys.evaluate(async (el) => {
    el.click();
    await new Promise((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(resolve));
    });
    const panel = document.querySelector('.navbar-content');
    return panel && getComputedStyle(panel).overflow;
  });

  expect(overflowWhileOpening).toBe('hidden');
  await expect(page.locator('.navbar-content')).toHaveCSS(
    'overflow',
    'visible',
  );

  const overflowWhileClosing = await attorneys.evaluate(async (el) => {
    el.click();
    await new Promise((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(resolve));
    });
    const panel = document.querySelector('.navbar-content');
    return panel && getComputedStyle(panel).overflow;
  });

  expect(overflowWhileClosing).toBe('hidden');
  await expect(page.locator('.navbar-content')).toHaveCount(0);
});
