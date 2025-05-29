// redirects for change url naming
const POST_TYPE_REWRITES = [
  // {
  //   source: '/attorney/:path*',
  //   destination: '/attorneys/:path*',
  // },
  // {
  //   source: '/practices/:path*',
  //   destination: '/practice/:path*',
  // },
  // {
  //   source: '/locations/:path*',
  //   destination: '/location/:path*',
  // },
  // {
  //   source: '/careers/:path*',
  //   destination: '/career/:path*',
  // },
  {
    source: '/attorneys/scarinci-hollenbeck',
    destination: '/firm-overview',
  },
];

/** List of top level categories */
const POST_CATEGORY_REWRITES = [
  /** Start of Firm Pages */
  {
    source: '/diversity',
    destination: '/firm-page/diversity',
  },
  {
    source: '/community-involvement',
    destination: '/firm-page/community-involvement',
  },
  {
    source: '/pro-bono',
    destination: '/firm-page/pro-bono',
  },
  /** End of firm pages */
  {
    source: '/law-firm-insights/:slug*',
    destination: '/post/:slug*?category=law-firm-insights',
  },
  {
    source: '/client-alert/:slug*',
    destination: '/post/:slug*?category=client-alert',
  },
  {
    source: '/firm-events/:slug*',
    destination: '/post/:slug*?category=firm-events',
  },
  {
    source: '/firm-news/:slug*',
    destination: '/post/:slug*?category=firm-news',
  },
  {
    source: '/news/:slug*',
    destination: '/post/:slug*?category=firm-news',
  },
  {
    source: '/сommunity-involvement/:slug*',
    destination: '/post/:slug*?category=сommunity-involvement',
  },
  {
    source: '/congratulations/:slug*',
    destination: '/post/:slug*?category=congratulations',
  },
  {
    source: '/diversity/:slug*',
    destination: '/post/:slug*?category=diversity',
  },
  {
    source: '/legal-updates/:slug*',
    destination: '/post/:slug*?category=legal-updates',
  },
  {
    source: '/litigation-alert/:slug*',
    destination: '/post/:slug*?category=litigation-alert',
  },
  {
    source: '/pro-bono/:slug*',
    destination: '/post/:slug*?category=pro-bono',
  },
  {
    source: '/quick-news/:slug*',
    destination: '/post/:slug*?category=quick-news',
  },
  {
    source: '/real-estate-news/:slug*',
    destination: '/post/:slug*?category=real-estate-news',
  },
  {
    source: '/women-lead/:slug*',
    destination: '/post/:slug*?category=women-lead',
  },
  {
    source: '/uncategorized/:slug*',
    destination: '/post/:slug*?category=uncategorized',
  },
];

const SITE_PAGES_REWRITES = [
  /** Start of Simple Pages */
  {
    source: '/awards',
    destination: '/basic-page/awards',
  },
  {
    source: '/terms-of-use',
    destination: '/basic-page/terms-of-use',
  },
  {
    source: '/privacy-policy',
    destination: '/basic-page/privacy-policy',
  },
  {
    source: '/disclaimer',
    destination: '/basic-page/disclaimer',
  },
  {
    source: '/work-life-integration',
    destination: '/basic-page/work-life-integration',
  },
  /** End of Simple Pages */
  /** Start of Funeral Pages */
  {
    source: '/passing-attorney-harvey-r-poe',
    destination: '/memorials/harvey-poe',
  },
  {
    source: '/passing-attorney-david-a-einhorn',
    destination: '/memorials/david-a-einhorn',
  },
  {
    source: '/the-passing-of-harold-friedman',
    destination: '/memorials/harold-friedman',
  },
  {
    source: '/the-passing-of-peter-r-yarem',
    destination: '/memorials/peter-r-yarem',
  },
  /** End of Funeral Pages */
  {
    source: '/proxy-image/:path*',
    destination: 'https://wp.scarincihollenbeck.com/:path*',
  },
  {
    source: '/practices',
    destination: '/services',
  },
  {
    source: '/industries',
    destination: '/services#industries',
  },
  {
    source: '/practices/new-jersey-cannabis-law',
    destination: '/industries/cannabis',
  },
  {
    source: '/practices/entertainment-and-media',
    destination: '/industries/entertainment-and-media',
  },
];

module.exports = {
  SITE_PAGES_REWRITES,
  POST_TYPE_REWRITES,
  POST_CATEGORY_REWRITES,
};
