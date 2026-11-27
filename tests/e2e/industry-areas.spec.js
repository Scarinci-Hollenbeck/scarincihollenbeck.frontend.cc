import { test, expect } from '@playwright/test';
import blockAnalytics from './support/block-analytics';

/**
 * Industry page template: Areas of Service (headings in a grid, one panel
 * below), the order of the sections and of the jump links, and the sign up
 * beside the contact form.
 *
 * Every area must be readable without JavaScript: all panels in the server
 * HTML, inactive ones hidden with CSS only. The page also carries its data in
 * a `__NEXT_DATA__` script, so a phrase found anywhere in the HTML proves
 * nothing; these tests look for each area's text inside its own panel.
 *
 * Defaults match production; a WordPress copy without this industry sets
 * E2E_AREAS_INDUSTRY and E2E_AREAS_LAST_PHRASE (a phrase from the last area).
 */

const INDUSTRY = process.env.E2E_AREAS_INDUSTRY || '/industries/data-centers';
const LAST_PHRASE = process.env.E2E_AREAS_LAST_PHRASE || 'prerogative writs';

const SECTION_ORDER = [
  'filled-section',
  'spotlight-section',
  'tabs-section',
  'articles-section',
  'attorneys-section',
  'awards-section',
  'clients-section',
  'faq-section',
  'why-choose-us-section',
];

const headings = (page) => page.locator('#tabs-section [role="tab"]');
const panels = (page) => page.locator('#tabs-section [role="tabpanel"]');

test.describe('server HTML, no JavaScript', () => {
  test.use({
    javaScriptEnabled: false,
    viewport: { width: 1440, height: 900 },
  });

  test('every area is in its own panel, with its title and text; only the first is shown', async ({
    page,
  }) => {
    await page.goto(INDUSTRY);

    const count = await headings(page).count();
    expect(count).toBeGreaterThan(1);
    await expect(panels(page)).toHaveCount(count);

    for (let i = 0; i < count; i += 1) {
      const heading = headings(page).nth(i);
      const panel = page.locator(
        `#${await heading.getAttribute('aria-controls')}`,
      );
      const name = (await heading.innerText()).replace(/^\d+\s*/, '').trim();

      await expect(panel.locator('h3')).toHaveText(name);
      const text = await panel.textContent();
      expect(text.length, `area ${i + 1} has text`).toBeGreaterThan(
        name.length + 100,
      );

      if (i === 0) await expect(panel).toBeVisible();
      else await expect(panel).toBeHidden();
    }

    const last = panels(page).last();
    expect(await last.textContent()).toContain(LAST_PHRASE);
  });

  test('related practices sit in the panel as links, not in the area text', async ({
    page,
  }) => {
    await page.goto(INDUSTRY);

    // No "Related practices:" paragraph is left in any area's text, on every
    // industry: a paragraph the split missed would show up here.
    expect(
      await panels(page)
        .locator('p', { hasText: /^\s*Related practices\s*:/ })
        .count(),
    ).toBe(0);

    // Only some industries list related practices in their areas (on
    // 25.11 only Data Centers did); the default industry must have them.
    const columns = panels(page).getByText('Related practices', {
      exact: true,
    });
    const columnCount = await columns.count();
    if (!process.env.E2E_AREAS_INDUSTRY) {
      expect(columnCount).toBeGreaterThan(0);
    }
    test.skip(columnCount === 0, `${INDUSTRY} lists no related practices`);

    for (let i = 0; i < columnCount; i += 1) {
      const links = columns
        .nth(i)
        .locator('..')
        .locator('a[href*="/practices/"]');
      expect(await links.count(), `column ${i + 1} has links`).toBeGreaterThan(
        0,
      );
    }
  });

  test('sections and jump links follow the page order', async ({ page }) => {
    await page.goto(INDUSTRY);

    // querySelectorAll returns elements in document order.
    const ids = await page.evaluate(
      (order) => Array.from(
        document.querySelectorAll(order.map((id) => `#${id}`).join(',')),
        (el) => el.id,
      ),
      SECTION_ORDER,
    );
    expect(ids).toEqual(SECTION_ORDER.filter((id) => ids.includes(id)));
    expect(ids.indexOf('articles-section')).toBe(
      ids.indexOf('tabs-section') + 1,
    );

    const jumps = await page
      .locator('a[href*="#"]')
      .evaluateAll((links) => links
        .map((a) => a.getAttribute('href').split('#')[1])
        .filter((id, i, all) => all.indexOf(id) === i));
    const jumpSections = jumps.filter((id) => SECTION_ORDER.includes(id));
    expect(jumpSections).toEqual(ids.filter((id) => jumpSections.includes(id)));
  });

  test('the contact form is in the sign up section', async ({ page }) => {
    await page.goto(INDUSTRY);
    const banner = page.locator('section.has-aside');
    await expect(
      banner.getByText('Sign up', { exact: false }).first(),
    ).toBeVisible();
    await expect(banner.locator('form')).toHaveCount(1);
  });
});

test.describe('desktop', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test.beforeEach(async ({ page }) => {
    await blockAnalytics(page);
    await page.goto(INDUSTRY);
    await headings(page).first().scrollIntoViewIfNeeded();
  });

  test('a heading swaps the panel without moving the page', async ({
    page,
  }) => {
    const before = await page.evaluate(() => window.scrollY);
    await headings(page).nth(2).click();

    await expect(headings(page).nth(2)).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await expect(panels(page).nth(2)).toBeVisible();
    await expect(panels(page).first()).toBeHidden();
    await page.waitForTimeout(500);
    expect(await page.evaluate(() => window.scrollY)).toBe(before);
  });

  test('"Next" opens the following area and wraps after the last one', async ({
    page,
  }) => {
    const count = await headings(page).count();
    await headings(page)
      .nth(count - 1)
      .click();
    await panels(page)
      .nth(count - 1)
      .getByRole('button', { name: /^Next:/ })
      .click();
    await expect(panels(page).first()).toBeVisible();
    await expect(headings(page).first()).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  test('arrow keys move between headings', async ({ page }) => {
    await headings(page).first().focus();
    await page.keyboard.press('ArrowRight');
    await expect(headings(page).nth(1)).toBeFocused();
    await expect(panels(page).nth(1)).toBeVisible();
    await page.keyboard.press('ArrowLeft');
    await expect(panels(page).first()).toBeVisible();
  });

  test('sign up and contact form sit side by side', async ({ page }) => {
    const banner = page.locator('section.has-aside');
    const signUp = await banner.locator('h2').first().boundingBox();
    const form = await banner.locator('form').boundingBox();
    expect(form.x).toBeGreaterThan(signUp.x + signUp.width / 2);
  });
});

test.describe('phone', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test.beforeEach(async ({ page }) => {
    await blockAnalytics(page);
    await page.goto(INDUSTRY);
  });

  test('a heading whose panel opens below the screen brings the panel into view', async ({
    page,
  }) => {
    const count = await headings(page).count();
    await headings(page).first().scrollIntoViewIfNeeded();
    await headings(page)
      .nth(Math.min(2, count - 1))
      .click();

    const panel = panels(page).nth(Math.min(2, count - 1));
    await expect(panel).toBeVisible();
    await expect(panel).toBeInViewport({ timeout: 5000 });
  });

  test('sign up comes first, the contact form below it', async ({ page }) => {
    const banner = page.locator('section.has-aside');
    const signUp = await banner.locator('h2').first().boundingBox();
    const form = await banner.locator('form').boundingBox();
    expect(form.y).toBeGreaterThan(signUp.y);
  });
});
