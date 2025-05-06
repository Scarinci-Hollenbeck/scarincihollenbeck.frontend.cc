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
  {
    source: '/law-firm-insights/:slug*',
    destination: '/post/:slug*?category=law-firm-insights',
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
    source: '/client-alert/:slug*',
    destination: '/post/:slug*?category=client-alert',
  },
  {
    source: '/covid-19-alerts/:slug*',
    destination: '/post/:slug*?category=covid-19-alerts',
  },
  {
    source: '/covid-19-education-alert/:slug*',
    destination: '/post/:slug*?category=covid-19-education-alert',
  },
  {
    source: '/cyber-security-client-alert/:slug*',
    destination: '/post/:slug*?category=cyber-security-client-alert',
  },
  {
    source: '/featured/:slug*',
    destination: '/post/:slug*?category=featured',
  },
  {
    source: '/federal-payroll-protection-act/:slug*',
    destination: '/post/:slug*?category=federal-payroll-protection-act',
  },
  {
    source: '/firm-events/:slug*',
    destination: '/post/:slug*?category=firm-events',
  },
  {
    source: '/headlines/:slug*',
    destination: '/post/:slug*?category=headlines',
  },
  {
    source: '/just-in/:slug*',
    destination: '/post/:slug*?category=just-in',
  },
  {
    source: '/art-law/:slug*',
    destination: '/post/:slug*?category=art-law',
  },
  {
    source: '/quick-news/:slug*',
    destination: '/post/:slug*?category=quick-news',
  },
  {
    source: '/mandarin/:slug*',
    destination: '/post/:slug*?category=mandarin',
  },
  {
    source: '/women-lead/:slug*',
    destination: '/post/:slug*?category=women-lead',
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
    source: '/work-life-balance',
    destination: '/basic-page/work-life-balance',
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
  /** Start of Firm Pages */
  {
    source: '/diversity',
    destination: '/firm-page/diversity',
  },
  {
    source: '/diversity/:slug*',
    destination: '/post/:slug*?category=diversity',
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
