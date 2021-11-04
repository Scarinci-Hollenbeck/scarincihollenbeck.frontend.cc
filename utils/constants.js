export const FIRM_BLOG_PAGES = [
  {
    id: 'YFtFOuJeUHBy2WL',
    title: 'Firm News',
    slug: '/library/category/firm-news',
  },
  {
    id: 'pmSgjQiss0Mbz6p',
    title: 'Firm Events',
    slug: '/library/category/firm-events',
  },
  {
    id: '2oTGonRQMAwEDZL',
    title: 'Firm Insights',
    slug: '/library/category/law-firm-insights',
  },
];

export const FIRM_PAGES = [
  {
    id: 'WF7jMpVJP3PTnuP',
    title: 'Pro Bono',
    slug: '/pro-bono',
  },
  {
    id: 'vehm0rQb7cpMH92',
    title: 'Women Lead',
    slug: '/women-lead',
  },
  {
    id: 'SjveurE3BK1R1l2',
    title: 'Community Involvement',
    slug: '/community-involvement',
  },
  {
    id: 'p4mdVc653adf98fbn',
    title: 'Diversity',
    slug: '/diversity',
  },
];

export const SITE_NAVIGATION = [
  {
    id: 1,
    label: 'The Firm',
    slug: null,
    children: [
      {
        id: 1,
        label: 'Administration',
        slug: '/administration',
      },
      {
        id: 2,
        label: 'Careers',
        slug: '/careers',
      },
      {
        id: 3,
        label: 'Community Involvement',
        slug: '/community-involvement',
      },
      {
        id: 4,
        label: 'COVID-19 Crisis Management Unit',
        slug: '/covid-19-crisis-management-unit',
      },
      {
        id: 5,
        label: 'Diversity',
        slug: '/diversity',
      },
      {
        id: 6,
        label: 'Firm Overview',
        slug: '/firm-overview',
      },
      {
        id: 7,
        label: 'Pro Bono',
        slug: '/pro-bono',
      },
      {
        id: 8,
        label: 'Women Lead',
        slug: '/women-lead',
      },
    ],
  },
  {
    id: 2,
    label: 'Attorneys',
    slug: '/attorneys',
    children: null,
  },
  {
    id: 3,
    label: 'Practices',
    slug: '/practices',
    children: null,
  },
  {
    id: 4,
    label: 'Library',
    slug: null,
    children: [
      {
        id: 1,
        label: 'Firm News',
        slug: '/library/category/firm-news',
      },
      {
        id: 2,
        label: 'Firm Events',
        slug: '/library/category/firm-events',
      },
      {
        id: 3,
        label: 'Firm Insights',
        slug: '/library/category/law-firm-insights',
      },
    ],
  },
  {
    id: 5,
    label: 'Locations',
    slug: '/locations',
    children: null,
  },
  {
    id: 6,
    label: 'Contact',
    slug: '/contact',
    children: null,
  },
];

export const SITE_FOOTER_NAVIGATION = [
  {
    id: 1,
    slug: '/attorneys',
    label: 'Attorneys',
  },

  {
    id: 2,
    label: 'COVID-19 Crisis Management Unit',
    slug: '/covid-19-crisis-management-unit',
  },

  {
    id: 3,
    slug: '/firm-overview',
    label: 'Firm Overview',
  },
  {
    id: 4,
    slug: '/practices',
    label: 'Legal Practices',
  },
  {
    id: 5,
    slug: '/locations',
    label: 'Locations',
  },
];
export const ERROR_PAGE_CONTENT = {
  subTitle: 'Sorry, there was an issue getting your requested page',
  mainMessage:
    "It's possible you entered the address incorrectly, we moved the desired page, or there is an issue on our servers. Try searching our site to find what you are looking for.",
};

export const FUNERAL_SLUGS = [
  '/funeral-announcements/passing-attorney-harvey-r-poe',
  '/funeral-announcements/passing-attorney-david-a-einhorn',
];

export const SITE_FORM_SLUGS = ['/site-forms/new-attorney', '/site-forms/current-attorney'];

export const HOLIDAY_SLUGS = ['/holiday/2019-happy-holidays', '/holiday/2020-happy-holidays'];

export const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
export const ALGOLIA_PUBLIC_API = process.env.NEXT_PUBLIC_ALGOLIA_PUBLIC_API;
export const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
export const ALGOLIA_SEARCH_INDEX = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_INDEX;

export const CLIENT_ALERTS = [
  {
    id: 20098,
    slug: 'client-alert',
    name: 'Client Alert',
  },
  {
    id: 20250,
    slug: 'covid-19-alerts',
    name: 'COVID-19 Alerts',
  },
  {
    id: 22896,
    slug: 'covid-19-education-alert',
    name: 'COVID-19 Education Alerts',
  },
  {
    id: 18675,
    slug: 'cyber-security-client-alert',
    name: 'Cyber Security Client Alert',
  },
];

export const OFFICE_LOCATIONS = [
  {
    id: 1,
    slug: '/location/lyndhurst',
    label: 'Lyndhurst, NJ',
  },
  {
    id: 2,
    slug: '/location/red-bank',
    label: 'Red Bank, NJ',
  },
  {
    id: 3,
    slug: '/location/new-york',
    label: 'New York, NY',
  },
  {
    id: 4,
    slug: '/location/washington-dc',
    label: 'Washington, D.C.',
  },
];

export const CORE_PRACTICES = [
  {
    id: 1,
    slug: '/practices/bankruptcy-and-creditors-rights',
    title: "Bankruptcy & Creditors' Rights",
  },
  {
    id: 2,
    slug: '/practices/commercial-real-estate',
    title: 'Commercial Real Estate',
  },
  {
    id: 3,
    slug: '/practices/corporate-transactions-business',
    title: 'Corporate Transactions & Business',
  },
  {
    id: 4,
    slug: '/practices/education-law',
    title: 'Education Law',
  },
  {
    id: 5,
    slug: '/practices/environmental',
    title: 'Environmental',
  },
  {
    id: 6,
    slug: '/practices/government-strategies',
    title: 'Government Strategies',
  },
  {
    id: 7,
    slug: '/practices/intellectual-property',
    title: 'Intellectual Property',
  },
  {
    id: 8,
    slug: '/practices/labor-employment',
    title: 'Labor & Employment',
  },
  {
    id: 9,
    slug: '/practices/litigation',
    title: 'Litigation',
  },
  {
    id: 10,
    slug: '/practices/public-law',
    title: 'Public Law',
  },
  {
    id: 11,
    slug: '/practices/tax-trusts-estates',
    title: 'Tax, Trusts & Estates',
  },
];
