import { test, expect } from '@playwright/test';
import blockAnalytics from './support/block-analytics';

/**
 * Industry "clients" block. No industry has clients in WordPress yet, so the
 * client-side GraphQL query is answered with synthetic clients.
 */

const INDUSTRY = '/industries/cannabis';

// Shaped like the real WPGraphQL response, __typename included (Apollo
// discards results without it).
const makeClients = (offset, size, total) => ({
  data: {
    clients: {
      __typename: 'RootQueryToClientConnection',
      edges: Array.from(
        { length: Math.max(0, Math.min(size, total - offset)) },
        (_, i) => {
          const n = offset + i + 1;
          return {
            __typename: 'RootQueryToClientConnectionEdge',
            node: {
              __typename: 'Client',
              databaseId: 900000 + n,
              title: `Test Client ${n}`,
              clientsFields: {
                __typename: 'Client_Clientsfields',
                // Every fifth client has no logo, as editors may leave it empty.
                clientImage:
                  n % 5 === 0
                    ? null
                    : {
                      __typename: 'MediaItem',
                      sourceUrl: '/images/no-image-found-diamond-750x350.png',
                      title: `Logo ${n}`,
                    },
                proffesion: `Profession ${n}`,
              },
            },
          };
        },
      ),
      pageInfo: {
        __typename: 'RootQueryToClientConnectionPageInfo',
        offsetPagination: {
          __typename: 'OffsetPaginationPageInfo',
          total,
          hasPrevious: offset > 0,
          hasMore: offset + size < total,
        },
      },
    },
  },
});

const isClientsQuery = (request) => request.method() === 'POST'
  && /graphql/.test(request.url())
  && /ClientsQuery/.test(request.postData() || '');

test.beforeEach(async ({ page }) => {
  await blockAnalytics(page);
});

test('clients block renders the clients, including ones without a logo', async ({
  page,
}) => {
  const consoleErrors = [];
  page.on('console', (m) => {
    if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) consoleErrors.push(m.text());
  });
  page.on('pageerror', (e) => consoleErrors.push(e.message));
  await page.route(/graphql/, async (route) => {
    if (!isClientsQuery(route.request())) return route.continue();
    const { variables } = JSON.parse(route.request().postData());
    return route.fulfill({
      json: makeClients(variables.offsetPosts, variables.postsPerPage, 20),
      headers: { 'access-control-allow-origin': '*' },
    });
  });

  await page.goto(INDUSTRY);
  const section = page.locator('#clients-section');
  await expect(section).toBeVisible();
  await expect(section.getByText(/^Test Client \d+$/)).toHaveCount(12 * 2);
  // Clients 5 and 10 have no logo: exactly ten logos, none without a source
  // (React 19 drops src="" on its own, so count the images instead).
  await expect(section.locator('img')).toHaveCount(10);
  await expect(section.locator('img:not([src]), img[src=""]')).toHaveCount(0);
  expect(consoleErrors.filter((t) => /src/.test(t))).toEqual([]);
});

test('clients pagination fetches each page once', async ({ page }) => {
  const offsets = [];
  await page.route(/graphql/, async (route) => {
    if (!isClientsQuery(route.request())) return route.continue();
    const { variables } = JSON.parse(route.request().postData());
    offsets.push(variables.offsetPosts);
    return route.fulfill({
      json: makeClients(variables.offsetPosts, variables.postsPerPage, 20),
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  const section = page.locator('#clients-section');
  const titles = section.getByText(/^Test Client \d+$/);
  const goTo = (n) => section.locator('.pagination a', { hasText: new RegExp(`^${n}$`) }).click();

  await page.goto(INDUSTRY);
  await expect(titles).toHaveCount(12 * 2);
  expect(offsets).toEqual([0]);

  await goTo(2);
  await expect(page).toHaveURL(/client-page=2/);
  await expect(titles).toHaveCount(8 * 2);
  await expect(
    section.getByText('Test Client 13', { exact: true }).first(),
  ).toBeAttached();
  expect(offsets).toEqual([0, 12]);

  await goTo(1);
  await expect(page).not.toHaveURL(/client-page/);
  await expect(titles).toHaveCount(12 * 2);
  await page.waitForTimeout(1500);
  expect(offsets).toEqual([0, 12]);
});

test('a GraphQL error hides the clients block', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.route(/graphql/, (route) => {
    if (!isClientsQuery(route.request())) return route.continue();
    return route.fulfill({
      json: { errors: [{ message: 'Internal server error' }], data: null },
      headers: { 'access-control-allow-origin': '*' },
    });
  });

  await page.goto(INDUSTRY);
  await page.waitForTimeout(3000);
  await expect(page.locator('#clients-section')).toHaveCount(0);
  expect(errors).toEqual([]);
});
