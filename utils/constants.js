/**
 * This file contains lists of links used in the header navigation, sidebar navigation, footer navigation
 * through out the site. This file also contains constant data found throughout the site.
 */

import {
  HawCanIGet,
  HawDoIKnow,
  WhatAreTheFirms,
  WhereIsYheFirmLocated,
} from 'components/atoms/micro-templates/Faq-templates';
import { BsFacebook, BsLinkedin } from 'react-icons/bs';
import AboutAuthorFormCard from '../components/organisms/post/AboutAuthorFormCard';

export const LETTERS_LIST = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

/** Change the company name, phone, fax, email through out the site */
export const SITE_TITLE = 'Scarinci Hollenbeck';
export const SITE_PHONE = '201-896-4100';
export const SITE_FAX = '201-896-8660';
export const SITE_EMAIL = 'info@sh-law.com';

export const THANKS_MESSAGE = {
  title: 'Thank you!',
  getInTouch: 'Thank you for reaching out! We will get in touch with you soon.',
};

export const footerNavList = [
  {
    linkTitle: 'Attorneys',
    link: '/attorneys',
    id: 1,
  },
  {
    linkTitle: 'Careers',
    link: '/careers',
    id: 2,
  },
  {
    linkTitle: 'Firm Overview',
    link: '/firm-overview',
    id: 3,
  },
  {
    linkTitle: 'Legal practices',
    link: '/practices',
    id: 4,
  },
  {
    linkTitle: 'Locations',
    link: '/location/little-falls',
    id: 5,
  },
];
/** List of firm blog category links found in the sidebar */
export const FIRM_BLOG_PAGES = [
  {
    id: 'firm-news',
    label: 'Firm News',
    slug: '/library/category/firm-news',
  },
  {
    id: 'firm-events',
    label: 'Firm Events',
    slug: '/library/category/firm-events',
  },
  {
    id: 'firm-insights',
    label: 'Firm Insights',
    slug: '/library/category/law-firm-insights',
  },
];

export const ScarinciHollenbeckAuthor = [
  {
    uri: '/attorneys',
    title: 'Scarinci Hollenbeck',
    databaseId: 10000000000001,
    attorneyMainInformation: {
      profileImage: {
        sourceUrl: '/images/sh-mini-diamond-PNG.svg',
      },
      email: SITE_EMAIL,
      phoneNumber: SITE_PHONE,
      designation: 'The Firm',
    },
    attorneyPrimaryRelatedPracticesLocationsGroups: {
      keyContactByPractice: null,
    },
    attorneyBiography: {
      miniBio: `With a growing practice of more than 60 experienced attorneys,
     Scarinci Hollenbeck is a regional alternative to a National 250 law firm. With offices in New
      Jersey, New York City, and the District of Columbia, we serve the niche practice areas most often
       required by institutions, corporations, entities, and the people who own and control them.`,
    },
  },
];

export const ScarinciHollenbeckKeyContact = {
  databaseId: 10000000000001,
  link: '/attorneys',
  display_name: 'Scarinci Hollenbeck',
  keyContactsByPractice: null,
  profileImage: '/images/sh-mini-diamond-PNG.svg',
  designation: 'The Firm',
  phoneNumber: SITE_PHONE,
  email: SITE_EMAIL,
  officeLocation: [
    {
      databaseId: 29438,
      uri: '/location/new-york',
      title: 'New York City',
    },
    {
      databaseId: 29440,
      uri: '/location/washington-dc',
      title: 'Washington, D.C.',
    },
    {
      databaseId: 29437,
      uri: '/location/red-bank',
      title: 'Red Bank, NJ',
    },
    {
      databaseId: 29436,
      uri: '/location/little-falls',
      title: 'Little Falls, NJ',
    },
  ],
};

/* List of Firm Pages found in the sidebar and in the footer */
export const FIRM_PAGES = [
  {
    id: 'community-involvement',
    label: 'Community Involvement',
    slug: '/community-involvement',
  },
  {
    id: 'diversity',
    label: 'Diversity',
    slug: '/diversity',
  },
  {
    id: 'pro-bono',
    label: 'Pro Bono',
    slug: '/pro-bono',
  },
  {
    id: 'women-lead',
    label: 'Women Lead',
    slug: '/women-lead',
  },
];

export const sitemapAddon = [
  'community-involvement',
  'diversity',
  'pro-bono',
  'women-lead',
  'contact',
  'privacy-policy',
  'terms-of-use',
  'awards',
  'covid-19-crisis-management-unit',
];

/** Header navigation links */
export const SITE_NAVIGATION = [
  {
    id: 1,
    label: 'The Firm',
    menuId: 'the-firm',
    slug: '',
    children: [
      {
        databaseId: 101,
        title: 'Administration',
        uri: '/administration',
      },
      {
        databaseId: 102,
        title: 'Careers',
        uri: '/careers',
      },
      {
        databaseId: 103,
        title: 'Community Involvement',
        uri: '/community-involvement',
      },
      {
        databaseId: 104,
        title: 'COVID-19 Crisis Management Unit',
        uri: '/covid-19-crisis-management-unit',
      },
      {
        databaseId: 105,
        title: 'Diversity',
        uri: '/diversity',
      },
      {
        databaseId: 106,
        title: 'Firm Overview',
        uri: '/firm-overview',
      },
      {
        databaseId: 107,
        title: 'Pro Bono',
        uri: '/pro-bono',
      },
      {
        databaseId: 108,
        title: 'Women Lead',
        uri: '/women-lead',
      },
    ],
  },
  {
    id: 2,
    label: 'Attorneys',
    slug: '/attorneys',
    children: undefined,
    menuId: 'attorneys',
  },
  {
    id: 4,
    label: 'Library',
    menuId: 'library',
    slug: '',
    children: [
      {
        databaseId: 401,
        title: 'Client Alerts',
        uri: '/library/category/client-alert',
      },
      {
        databaseId: 402,
        title: 'Firm News',
        uri: '/library/category/firm-news',
      },
      {
        databaseId: 403,
        title: 'Firm Events',
        uri: '/library/category/firm-events',
      },
      {
        databaseId: 404,
        title: 'Firm Insights',
        uri: '/library/category/law-firm-insights',
      },
    ],
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
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5375.6334332077395!2d-74.19960021040134!3d40.87248074962538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2fe482a4faf77%3A0x17707b4c60656ad!2s150%20Clove%20Rd%2C%20Little%20Falls%2C%20NJ%2007424!5e0!3m2!1sen!2sus!4v1659974943790!5m2!1sen!2sus',
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
    label: "Bankruptcy & Creditors' Rights",
  },
  {
    id: 2,
    slug: '/practices/commercial-real-estate',
    label: 'Commercial Real Estate',
  },
  {
    id: 3,
    slug: '/practices/corporate-transactions-business',
    label: 'Corporate Transactions & Business',
  },
  {
    id: 4,
    slug: '/practices/education-law',
    label: 'Education Law',
  },
  {
    id: 5,
    slug: '/practices/environmental',
    label: 'Environmental',
  },
  {
    id: 6,
    slug: '/practices/government-strategies',
    label: 'Government Strategies',
  },
  {
    id: 7,
    slug: '/practices/intellectual-property',
    label: 'Intellectual Property',
  },
  {
    id: 8,
    slug: '/practices/labor-employment',
    label: 'Labor & Employment',
  },
  {
    id: 9,
    slug: '/practices/litigation',
    label: 'Litigation',
  },
  {
    id: 10,
    slug: '/practices/public-law',
    label: 'Public Law',
  },
  {
    id: 11,
    slug: '/practices/tax-trusts-estates',
    label: 'Tax, Trusts & Estates',
  },
  {
    id: 12,
    slug: '/practices/entertainment-and-media',
    label: 'Entertainment & Media',
  },
  {
    id: 13,
    slug: '/practices/new-jersey-cannabis-law',
    label: 'Cannabis Law',
  },
];

/** Social Media links found in the footer */
export const SOCIAL_MEDIA_LINKS = [
  {
    id: 1,
    url: 'https://www.linkedin.com/company/scarinci-hollenbeck-llc',
    label: 'LinkedIn',
    icon: <BsLinkedin />,
  },
  {
    id: 2,
    url: 'https://www.facebook.com/ScarinciHollenbeck',
    label: 'Facebook',
    icon: <BsFacebook />,
  },
];

/** the content found on 404 or 500 error pages */
export const ERROR_PAGE_CONTENT = {
  mainMessage:
    "It's possible you entered the address incorrectly, we moved the desired page, or there is an issue on our servers. Try searching our site to find what you are looking for.",
};

/** content for /practices and /attorneys FAQ's component */

export const ATTORNEYS_FAQ = [
  {
    id: 1,
    title: 'How can I get in touch with an attorney?',
    body: <HawCanIGet />,
  },
  {
    id: 2,
    title: 'How do I know which attorney to contact?',
    body: <HawDoIKnow />,
  },
  {
    id: 3,
    title: 'What are the firm`s main practice areas?',
    body: <WhatAreTheFirms />,
  },
  {
    id: 4,
    title: 'Where is the firm located?',
    body: <WhereIsYheFirmLocated />,
  },
  {
    id: 5,
    title:
      'I am located outside of New Jersey and New York. Can you still help me?',
    body: `
    It depends on the nature of the matter. <strong>Scarinci Hollenbeck</strong> represents clients around the world.
    We service our clients in a large variety of matters. In areas such as Intellectual Property,
    including trademark, copyright, or patent-related matters, we can service these requests regardless
    of where our clients are based. However, we predominantly handle legal matters whose jurisdiction
    is New Jersey, New York, the tri-state metropolitan area, and Washington, D.C. We also have <strong>attorneys
    who are licensed</strong> to practice in Connecticut, Florida, Massachusetts, Pennsylvania, and other states.
    We recommend calling one of our dedicated staff members who can help identify if we have an attorney at
    the firm that can assist you. Feel free to reach out to us at <a href="tel:201-806-3364"> 201-806-3364</a>.
    `,
  },
  {
    id: 6,
    title: 'What kind of clients does your firm service?',
    body: `Scarinci Hollenbeck routinely serves business owners, corporate entities, leaders, and operators
     of small businesses and Fortune 500 companies alike.`,
  },
  {
    id: 7,
    title: 'I am not a business owner. Could your firm still help me?',
    body: `We are a general practice law firm that services businesses, corporations, and entities.
    We typically only represent people who own and operate these organizations. However, you are free to call 
    our business development group at <a href="tel:201-806-3364"> 201-806-3364</a> or email us at 
    <a href="mailto:info@sh-law.com">info@sh-law.com</a> A member of our group can direct you to an 
    attorney in our firm that may be able to assist.
    `,
  },
  {
    id: 8,
    title: 'How do you pronounce "Scarinci Hollenbeck"?',
    body: 'SCUH-RIN-SEE HALL-EN-BEK',
  },
];

export const firmOverViewTitles = [
  { name: 'Firm management', order: 1 },
  // this was committed(2.02.2022). it need for /firm-overview.
  // { name: 'Practice Leaders', order: 2 },
  { name: 'Directors', order: 3 },
];

export const administrationTitles = [
  { name: 'Firm management', order: 2 },
  { name: 'Administrative Management', order: 3 },
];

export const inputsCareerForm = [
  {
    type: 'text',
    name: 'FirstName',
    placeholder: 'First name',
    rules: 'required|max:255',
  },
  {
    type: 'text',
    name: 'LastName',
    placeholder: 'Last name',
    rules: 'required|max:255',
  },
  {
    type: 'email',
    name: 'Email',
    placeholder: 'Email address',
    rules: 'required|max:255',
  },
  {
    type: 'tel',
    name: 'Phone',
    placeholder: 'Phone number',
    rules:
      'required|regex:/^(\\+?1[-.\\s]?)?(\\()?\\d{3}(\\))?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$/',
    maxLength: 17,
    title: `Please use these formats: 
    (123) 456-7890
    123-456-7890
    123.456.7890
    123 456 7890
    +1 123-456-7890
    +1 (123) 456-7890
    `,
  },
  {
    id: 'coverLetter',
    type: 'file',
    name: 'coverLetter',
    rules: 'required',
    label: 'Upload your cover letter',
    accept: '.txt, .rtf, .doc, .docx, .pdf, .odt, .tex, .md, .csv, .html, .xml',
    htmlFor: 'coverLetter',
  },
  {
    id: 'resume',
    type: 'file',
    name: 'resume',
    rules: 'required',
    label: 'Upload your resume',
    accept: '.txt, .rtf, .doc, .docx, .pdf, .odt, .tex, .md, .csv, .html, .xml',
  },
  {
    id: 'writing',
    type: 'file',
    name: 'writing',
    label: 'Upload a writing sample',
    accept: '.txt, .rtf, .doc, .docx, .pdf, .odt, .tex, .md, .csv, .html, .xml',
  },
  {
    id: 'transcript',
    type: 'file',
    name: 'transcript',
    label: 'Upload a transcript',
    accept: '.txt, .rtf, .doc, .docx, .pdf, .odt, .tex, .md, .csv, .html, .xml',
  },
];

export const inputsGetInTouchAttributes = [
  {
    type: 'text',
    name: 'FirstName',
    placeholder: 'First name',
    rules: 'required|max:255',
  },
  {
    type: 'text',
    name: 'LastName',
    placeholder: 'Last name',
    rules: 'required|max:255',
  },
  {
    type: 'email',
    name: 'Email',
    placeholder: 'Email address',
    rules: 'required|max:255',
  },
  {
    type: 'tel',
    name: 'Phone',
    placeholder: 'Phone number',
    rules:
      'required|regex:/^(\\+?1[-.\\s]?)?(\\()?\\d{3}(\\))?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$/',
    maxLength: 17,
    title: `Please use these formats: 
    (123) 456-7890
    123-456-7890
    123.456.7890
    123 456 7890
    +1 123-456-7890
    +1 (123) 456-7890
    `,
  },
  {
    type: 'text',
    name: 'Subject',
    placeholder: 'Subject',
    rules: 'required|max:1000',
  },
  {
    type: 'textarea',
    name: 'Message',
    placeholder: 'Message',
    rules: 'required|max:1000',
    rows: 8,
    cols: 4,
  },
];

export const CategoriesButtonsStructure = [
  {
    slug: 'client-alert',
    label: 'Client Alert',
    databaseId: 20098,
  },
  {
    slug: 'firm-news',
    label: 'News',
    databaseId: 98,
  },
  {
    slug: 'firm-events',
    label: 'Events',
    databaseId: 99,
  },
  {
    slug: 'law-firm-insights',
    label: 'Insights',
    databaseId: 599,
  },
];

export const Links404NavArr = [
  {
    id: 1,
    title: 'Home Page',
    href: '/',
  },
  {
    id: 2,
    title: 'Contact us',
    href: '/contact',
  },
  {
    id: 3,
    title: 'Locations',
    href: '/location',
  },
  {
    id: 4,
    title: 'Firm News',
    href: '/library/category/firm-news',
  },
  {
    id: 5,
    title: 'Firm Events',
    href: '/library/category/firm-events',
  },
  {
    id: 6,
    title: 'Firm Insights',
    href: '/library/category/law-firm-insights',
  },
];

export const locationInfoBlockArticles = [
  {
    id: 0,
    article: `
    <p>
      OUR commitment to excellence, combined with our mission to deliver outstanding client service, has earned our firm a solid reputation.
    </p>
    <p>
      Scarinci Hollenbeck is a business law firm based in New Jersey, New York, and Washington, D.C servicing clients worldwide.
    </p>
    `,
    image: '/images/sh-mini-diamond-PNG.svg',
    reactComponent: null,
  },
  {
    id: 1,
    article: `
    <p>
      Our focus is niche areas of law most often required by corporate entities, owners, leaders, and operators. 
      Our prestigious roster of attorneys offers the experience and proven results that businesses need to move projects forward.
    </p>
    <p>
      Regardless of the size of your business or the scale of the project, we embrace the unique complexity that comes 
      with doing business in an evolving economy. Contact us today to learn more about how we can assist you
    </p>
    `,
    image: '/images/beautiful-office.webp',
    reactComponent: null,
  },
  {
    id: 2,
    article: '',
    reactComponent: 'custom',
  },
  {
    id: 3,
    article: `
    <p>
      Scarinci Hollenbeck also offers services in a wide range of other legal practice areas not listed here.
    </p>
    <p>
      If you have a legal need that is not mentioned, please contact us to discuss how we may help you.
    </p>
    <p>
      Our experienced attorneys are ready to provide the quality representation you deserve.
    </p>
    `,
    image: '/images/beautiful-office.webp',
    isBackgroundImage: true,
    reactComponent: <AboutAuthorFormCard blockName="articleBlock" />,
  },
];
export const GOV_LAW_URL = 'https://scarincilawyer.com';

/** the blog id for covid pages  */
export const COVID_POSTS_ID = 20250;

export const EMAGE_UPLOAD_CLOUDINARY = 'https://res.cloudinary.com/scarinci-hollenbeck/images/v';
export const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/scarinci-hollenbeck/wp.scarincihollenbeck/';

/** a helper header data when making requests to WP backend */
export const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const MAKE_A_PAYMENT = 'https://secure.lawpay.com/pages/scarincihollenbeck/operating';

/** constant data that comes from hidden files for security */
export const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
export const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_BASE_GRAPHQL_API_URL;
export const PRODUCTION_URL = process.env.NEXT_PUBLIC_PRODUCTION_URL;
export const ALGOLIA_PUBLIC_API = process.env.NEXT_PUBLIC_ALGOLIA_PUBLIC_API;
export const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
export const ALGOLIA_SEARCH_INDEX = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_INDEX;
export const CURRENT_DOMAIN = process.env.NODE_ENV === 'production'
  ? 'https://scarincihollenbeck.com'
  : 'http://localhost:7700';
export const KWES_API = process.env.NEXT_PUBLIC_KWES_API;
export const GET_IN_TOUCH_FORM_API = process.env.NEXT_PUBLIC_GET_IN_TOUCH_FORM_API;
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
// thats url for exceptions for wrong urls
export const HTTP_PRODUCTION_URL = 'http://scarincihollenbeck.com';
export const HTTP_WWW_PRODUCTION_URL = 'http://www.scarincihollenbeck.com';

export const googleLocationIds = {
  'little-falls': 'ChIJT4-XoRdWwokR_STT5apGtEc',
  'new-york': 'ChIJZSMV5ABZwokRvTg94J92jfU',
  'washington-dc': 'ChIJMxTvAVS3t4kRnkctX9qxKtc',
  'red-bank': 'ChIJ41CJnUMvwokR-JVUIXV0IMI',
};
