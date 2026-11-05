const { test, expect } = require('@playwright/test');
const { PERMANENT_REDIRECTS } = require('../../utils/permanent-redirects');
const { appliedRedirect, finalPath } = require('../../utils/redirect-match');
const { finalSitemapEntries } = require('../../utils/sitemap-entries');

const concrete = (source) => source.replace(/:\w+\*?/g, 'sample-slug');

// Three rules for one source with two destinations; the first one
// (entertainment-and-media) is what the site does. Which one is right is the
// client's call (tasks repo #8), so the duplicates stay until they choose.
const AWAITING_CLIENT = '/practices/sports-and-entertainment-law/intellectual-property-and-technology-law';

test('every redirect rule is the one Next applies to its own source', () => {
  const shadowed = PERMANENT_REDIRECTS.filter(
    (rule) => rule.source !== AWAITING_CLIENT
      && appliedRedirect(concrete(rule.source)).rule !== rule,
  ).map((rule) => rule.source);
  expect(shadowed).toEqual([]);
});

test('corporate sub-paths go to their own practices, not the wildcard', () => {
  const base = '/practices/corporate-transactions-and-business-law';
  expect(appliedRedirect(`${base}/labor-and-employment-law`).destination).toBe(
    '/practices/labor-employment',
  );
  expect(
    appliedRedirect(`${base}/securities-offerings-and-corporate-disclosure`)
      .destination,
  ).toBe(
    '/practices/finra-defense-lawyers-securities-litigation-finra-arbitrations',
  );
  expect(appliedRedirect(`${base}/crisis-management`).destination).toBe(
    '/practices/crisis-risk-management',
  );
  expect(appliedRedirect(`${base}/anything-else`).destination).toBe(
    '/practices/corporate-transactions-business',
  );
  expect(appliedRedirect('/attorneys/counsel/dan-brecher').destination).toBe(
    '/attorneys/dan-brecher',
  );
});

test('finalPath follows a chain of redirects', () => {
  expect(finalPath('/practices/sports-and-entertainment')).toBe(
    '/industries/entertainment-and-media',
  );
  expect(finalPath('/contact')).toBe('/contact-us');
  expect(finalPath('/contact-us')).toBe('/contact-us');
});

test('sitemap lists final URLs only, each once', () => {
  const entry = (slug) => ({ slug, title: slug, date_modified: 'd' });
  const result = finalSitemapEntries([
    entry('/attorneys/scarinci-hollenbeck'),
    entry('/firm-overview'),
    entry('/subscriptions'),
    entry('/subscribe'),
    entry('/podcasts-2'),
    entry('/contact'),
    entry('/practices'),
    entry('/attorneys/jane-doe'),
  ]).map(({ slug }) => slug);
  expect(result).toEqual([
    '/firm-overview',
    '/library/subscriptions',
    '/contact-us',
    '/services',
    '/attorneys/jane-doe',
  ]);
});

test('sitemap keeps the entry that WordPress lists under its final URL', () => {
  const result = finalSitemapEntries([
    { slug: '/contact', date_modified: 'old' },
    { slug: '/contact-us', date_modified: 'new' },
  ]);
  expect(result).toEqual([{ slug: '/contact-us', date_modified: 'new' }]);
});
