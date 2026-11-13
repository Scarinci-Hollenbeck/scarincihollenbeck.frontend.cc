import { test, expect } from '@playwright/test';
import blockAnalytics from './support/block-analytics';

/**
 * Tasks #12: on a post page the only headings below the h1 are the post's own
 * sections, so search engines and AI tools read the article's outline, not
 * the template blocks (Key Contacts, lawyers, Related Posts, subscription
 * banner). The text in WordPress is not touched, so the expected headings are
 * the ones in the post content the page was built from.
 */

const POSTS = [
  // Sections as h2 (current editor template), FAQ questions as h3.
  '/law-firm-insights/rule-26-expert-discovery-ai',
  // Older post: one h2 intro, sections as h3.
  '/law-firm-insights/examining-sec-enforcement-trends',
  // No headings in the text; has "Lawyers mentioned in this article".
  '/firm-events/the-irs-has-contacted-me-now-what-seminar',
];

test.describe.configure({ retries: 1 });
test.use({ viewport: { width: 1440, height: 900 } });

test.beforeEach(async ({ page }) => {
  await blockAnalytics(page);
});

POSTS.forEach((path) => {
  test(`${path}: headings under the h1 come from the post text only`, async ({
    page,
  }) => {
    await page.goto(path);
    // Template blocks below the text are dynamic imports; wait for the last.
    await expect(
      page.getByText('to get the latest from our attorneys!'),
    ).toBeVisible();

    const { onPage, inText } = await page.evaluate(() => {
      const outline = (root) => [...root.querySelectorAll('h2, h3, h4, h5, h6')].map(
        (h) => `${h.tagName} ${h.textContent.replace(/\s+/g, ' ').trim()}`,
      );
      // eslint-disable-next-line no-underscore-dangle
      const { content } = window.__NEXT_DATA__.props.pageProps.post;
      const text = new DOMParser().parseFromString(content, 'text/html');
      return { onPage: outline(document), inText: outline(text) };
    });

    expect(await page.locator('h1').count()).toBe(1);
    expect(onPage).toEqual(inText);

    // The blocks stay reachable for screen readers as landmarks instead.
    await expect(
      page.getByRole('region', { name: 'Key Contacts' }),
    ).toBeVisible();
    await expect(
      page.getByRole('region', { name: 'Related Posts' }),
    ).toBeVisible();
    await expect(
      page.getByRole('region', {
        name: 'Sign up to get the latest from our attorneys',
      }),
    ).toBeVisible();
  });
});
