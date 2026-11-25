import { test, expect } from '@playwright/test';
import blockAnalytics from './support/block-analytics';

/**
 * Related articles on industry pages. An industry with an "Articles tag" in
 * WordPress (GraphQL `articlesTagId`) shows up to 12 of the newest posts with
 * that tag, and "Open library" opens the library filtered by the tag. An
 * industry without one keeps up to 6 posts linked to it and the library
 * filtered by the industry.
 * Defaults match production; a WordPress copy without these industries or
 * tags sets E2E_TAGGED_INDUSTRY / E2E_UNTAGGED_INDUSTRY. Update the untagged
 * default once every industry has a tag.
 */

const TAGGED = process.env.E2E_TAGGED_INDUSTRY || '/industries/data-centers';
const UNTAGGED = process.env.E2E_UNTAGGED_INDUSTRY || '/industries/cannabis';

test.use({ viewport: { width: 1440, height: 900 } });

test.beforeEach(async ({ page }) => {
  await blockAnalytics(page);
});

const section = (page) => page.locator('#articles-section');
const libraryLink = (page) => section(page).getByRole('link', { name: 'Open library' });

test('a tagged industry shows up to 12 tagged posts and opens the tag in the library', async ({
  page,
}) => {
  await page.goto(TAGGED);
  await expect(libraryLink(page)).toHaveAttribute(
    'href',
    /^\/library\/search\?tag=\d+$/,
    { timeout: 30000 },
  );
  const slides = await section(page).locator('swiper-slide').count();
  expect(slides).toBeGreaterThan(0);
  expect(slides).toBeLessThanOrEqual(12);
});

test('an untagged industry keeps up to 6 industry posts and the industry filter', async ({
  page,
}) => {
  await page.goto(UNTAGGED);
  await expect(libraryLink(page)).toHaveAttribute(
    'href',
    /^\/library\/search\?industries=\d+$/,
    { timeout: 30000 },
  );
  const slides = await section(page).locator('swiper-slide').count();
  expect(slides).toBeGreaterThan(0);
  expect(slides).toBeLessThanOrEqual(6);
});
