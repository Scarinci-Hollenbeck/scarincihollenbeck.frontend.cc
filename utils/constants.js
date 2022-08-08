/**
 * This file contains lists of links used in the header navigation, sidebar navigation, footer navigation
 * through out the site. This file also contains constant data found throughout the site.
 */

/** List of firm blog category links found in the sidebar */
export const FIRM_BLOG_PAGES = [
  {
    id: 'firm-news',
    title: 'Firm News',
    slug: '/library/category/firm-news',
  },
  {
    id: 'firm-events',
    title: 'Firm Events',
    slug: '/library/category/firm-events',
  },
  {
    id: 'firm-insights',
    title: 'Firm Insights',
    slug: '/library/category/law-firm-insights',
  },
];

/* List of Firm Pages found in the sidebar and in the footer */
export const FIRM_PAGES = [
  {
    id: 'pro-bono',
    title: 'Pro Bono',
    slug: '/pro-bono',
  },
  {
    id: 'women-lead',
    title: 'Women Lead',
    slug: '/women-lead',
  },
  {
    id: 'community-involvement',
    title: 'Community Involvement',
    slug: '/community-involvement',
  },
  {
    id: 'diversity',
    title: 'Diversity',
    slug: '/diversity',
  },
];

/** Header navigation links */
export const SITE_NAVIGATION = [
  {
    id: 1,
    label: 'The Firm',
    menuId: 'the-firm',
    slug: null,
    children: [
      {
        id: 1,
        label: 'Administration',
        slug: '/administration',
        menuId: 'administration',
      },
      {
        id: 2,
        label: 'Careers',
        slug: '/careers',
        menuId: 'careers',
      },
      {
        id: 3,
        label: 'Community Involvement',
        slug: '/community-involvement',
        menuId: 'community-involvement',
      },
      {
        id: 4,
        label: 'COVID-19 Crisis Management Unit',
        menuId: 'covid-19-crisis-management-unit',
        slug: '/covid-19-crisis-management-unit',
      },
      {
        id: 5,
        label: 'Diversity',
        menuId: 'diversity',
        slug: '/diversity',
      },
      {
        id: 6,
        label: 'Firm Overview',
        menuId: 'firm-overview',
        slug: '/firm-overview',
      },
      {
        id: 7,
        label: 'Pro Bono',
        menuId: 'pro-bono',
        slug: '/pro-bono',
      },
      {
        id: 8,
        label: 'Women Lead',
        menuId: 'women-lead',
        slug: '/women-lead',
      },
    ],
  },
  {
    id: 2,
    label: 'Attorneys',
    slug: '/attorneys',
    children: null,
    menuId: 'attorneys',
  },
  {
    id: 3,
    label: 'Practices',
    slug: '/practices',
    menuId: 'practices',
    children: null,
  },
  {
    id: 4,
    label: 'Library',
    menuId: 'library',
    slug: null,
    children: [
      {
        id: 1,
        label: 'Client Alerts',
        menuId: 'client-alerts',
        slug: '/library/category/client-alert',
      },
      {
        id: 2,
        label: 'Firm News',
        menuId: 'firm-news',
        slug: '/library/category/firm-news',
      },
      {
        id: 3,
        label: 'Firm Events',
        menuId: 'firm-events',
        slug: '/library/category/firm-events',
      },
      {
        id: 4,
        label: 'Firm Insights',
        menuId: 'firm-insights',
        slug: '/library/category/law-firm-insights',
      },
    ],
  },
  {
    id: 5,
    label: 'Locations',
    slug: '/locations',
    menuId: 'locations',
    children: null,
  },
  {
    id: 6,
    label: 'Contact',
    slug: '/contact',
    menuId: 'contact',
    children: null,
  },
];

/** The links in the dark gray banner in the footer */
export const SITE_FOOTER_NAVIGATION = [
  {
    id: 1,
    slug: '/attorneys',
    label: 'Attorneys',
  },
  {
    id: 2,
    label: 'Careers',
    slug: '/careers',
  },
  {
    id: 3,
    label: 'COVID-19',
    slug: '/covid-19-crisis-management-unit',
  },

  {
    id: 4,
    slug: '/firm-overview',
    label: 'Firm Overview',
  },
  {
    id: 5,
    slug: '/practices',
    label: 'Legal Practices',
  },
  {
    id: 6,
    slug: '/locations',
    label: 'Locations',
  },
];

/** List of Client Alert links on the covid pages and category landing pages */
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

/* List of locations in the footer of the website * */
export const OFFICE_LOCATIONS = [
  {
    id: 1,
    slug: '/location/little-falls',
    label: 'Little Falls, NJ',
    address: '150 Clove Road, 9th Floor, Little Falls, NJ 07424',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3020.1668721445153!2d-74.11046358459224!3d40.80232667932217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c256174fd409ef%3A0xe46c0af03865c18!2s1100+Valley+Brook+Ave%2C+Lyndhurst%2C+NJ+07071!5e0!3m2!1sen!2sus!4v1537300224657',
    tel: '201-896-4100',
    fax: '201-896-8660',
  },
  {
    id: 2,
    slug: '/location/red-bank',
    label: 'Red Bank, NJ',
    address: '331 Newman Springs Road Red Bank, NJ 07701',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3041.34467374956!2d-74.09794688434188!3d40.33469936854769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c231df5cc8d921%3A0x41ee2239f0384ab0!2s331+Newman+Springs+Rd%2C+Red+Bank%2C+NJ+07701!5e0!3m2!1sen!2sus!4v1537300318797',
    tel: '732-780-5590',
    fax: '732-695-8108',
  },
  {
    id: 3,
    slug: '/location/new-york',
    label: 'New York, NY',
    address: '589 8th Avenue, 16th Floor, New York, NY 10018',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.305278781976!2d-73.99361708459378!3d40.75530987932725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259acdec357a3%3A0x25fd7e9975e1d4d8!2s589%208th%20Ave%2C%20New%20York%2C%20NY%2010018!5e0!3m2!1sen!2sus!4v1590683744779!5m2!1sen!2sus',
    tel: '212-286-0747',
    fax: '212-808-4155',
  },
  {
    id: 4,
    slug: '/location/washington-dc',
    label: 'Washington, D.C.',
    address: 'Suite 250 1000 Potomac St., N.W. Washington D.C. 20007',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3104.895582561126!2d-77.06740448437249!3d38.90350305418882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b64f2644b13d%3A0xb55e5bb3e6365035!2s1000+Potomac+St+NW+%23250%2C+Washington%2C+DC+20007!5e0!3m2!1sen!2sus!4v1537300455274',
    tel: '202-452-1334',
  },
];
/** List the Core Practices in the sidebar of the practice pages and in the footer */
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

/** Social Media links found in the footer */
export const SOCIAL_MEDIA_LINKS = [
  {
    url: 'https://www.linkedin.com/company/scarinci-hollenbeck-llc',
    label: 'LinkedIn',
  },
  {
    url: 'https://www.facebook.com/ScarinciHollenbeck',
    label: 'Facebook',
  },
];

/** Make a payment link found in the footer */
export const MAKE_A_PAYMENT_URLS = [
  {
    url: 'https://secure.lawpay.com/pages/scarincihollenbeck/operating',
    label: 'Make a payment',
  },
];

/** the content found on 404 or 500 error pages */
export const ERROR_PAGE_CONTENT = {
  subTitle: 'Sorry, there was an issue getting your requested page',
  mainMessage:
    "It's possible you entered the address incorrectly, we moved the desired page, or there is an issue on our servers. Try searching our site to find what you are looking for.",
};

/** Change the company name, phone, fax, email through out the site */
export const SITE_TITLE = 'Scarinci Hollenbeck';
export const SITE_PHONE = '201-896-4100';
export const SITE_FAX = '201-896-8660';
export const SITE_EMAIL = 'info@sh-law.com';

/**  external blog urls  */
export const MUSIC_ESQ_URL = 'https://musicesq.com';
export const CON_LAW_URL = 'https://constitutionallawreporter.com';
export const GOV_LAW_URL = 'https://scarincilawyer.com';

/** the blog id for covid pages  */
export const COVID_POSTS_ID = 20250;

/** Image CDN URLs */
export const IMAGE_NOT_FOUND_URL = 'https://res.cloudinary.com/scarinci-hollenbeck/images/v1637157143/wp.scarincihollenbeck/no-image-found-diamond_33141f5498/no-image-found-diamond_33141f5498-png?_i=AA';
export const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/scarinci-hollenbeck/wp.scarincihollenbeck/';

/** a helper header data when making requests to WP backend */
export const headers = { Accept: 'application/json', 'Content-Type': 'application/json' };

/** constant data that comes from hidden files for security */
export const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
export const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_BASE_GRAPHQL_API_URL;
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
export const ALGOLIA_PUBLIC_API = process.env.NEXT_PUBLIC_ALGOLIA_PUBLIC_API;
export const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
export const ALGOLIA_SEARCH_INDEX = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_INDEX;
export const CURRENT_DOMAIN = process.env.NODE_ENV === 'production' ? 'https://scarincihollenbeck.com' : 'http://localhost:7700';
