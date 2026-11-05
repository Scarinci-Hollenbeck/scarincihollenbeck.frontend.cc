const { test, expect } = require('@playwright/test');

// Bots request the literal route paths; Next renders the page without params.
// They must be a plain 404, not a 500 from code that expects a slug.
[
  '/law-firm-insights/%5B...slug%5D',
  '/library/category/%5Bslug%5D',
  '/library/author/%5Bslug%5D',
].forEach((path) => {
  test(`literal route path ${path} is a 404`, async ({ request }) => {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status()).toBe(404);
  });
});
