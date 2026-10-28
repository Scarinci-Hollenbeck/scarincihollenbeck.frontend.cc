import { test, expect } from '@playwright/test';
import blockAnalytics from './support/block-analytics';

/**
 * Share buttons (react-share): accessible names and the share URLs they open.
 * react-share 5 dropped its default aria-labels, so SocialShare sets them.
 */

const SHARE_HOSTS = (url) => /(^|\.)(facebook|twitter|x|linkedin)\.com$/.test(url.hostname);

test.beforeEach(async ({ page, context }) => {
  await blockAnalytics(page);
  // Popups must not reach the social networks. A 204 never commits the popup's
  // navigation, so Playwright would not report the popup at all.
  await context.route(SHARE_HOSTS, (route) => route.fulfill({ status: 200, contentType: 'text/html', body: '' }));
});

['/practices/construction-lawyers', '/location/little-falls'].forEach(
  (path) => {
    test(`${path} share buttons are labelled and carry no stray attributes`, async ({
      page,
    }) => {
      await page.goto(path);

      // The page renders a share box per layout; one of them is visible.
      await Promise.all(
        ['facebook', 'twitter', 'linkedin'].map((name) => expect(
          page
            .getByRole('button', { name, exact: true })
            .filter({ visible: true })
            .first(),
        ).toBeVisible()),
      );
      await expect(
        page.locator('.react-share__ShareButton[quote]'),
      ).toHaveCount(0);
    });
  },
);

test('Facebook share opens the sharer with the production URL of the page', async ({
  page,
}) => {
  await page.goto('/practices/construction-lawyers');
  const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    page
      .getByRole('button', { name: 'facebook', exact: true })
      .filter({ visible: true })
      .first()
      .click(),
  ]);
  const url = new URL(popup.url());
  expect(url.hostname).toBe('www.facebook.com');
  expect(url.searchParams.get('u')).toBe(
    'https://scarincihollenbeck.com/practices/construction-lawyers',
  );
});
