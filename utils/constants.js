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
import { FaSquareXTwitter } from 'react-icons/fa6';
import { FaFacebookSquare, FaLinkedin } from 'react-icons/fa';
import SHDiamond from '../public/images/sh-mini-diamond-PNG.svg';

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
export const SITE_TITLE = 'Scarinci Hollenbeck, LLC';
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
    linkTitle: 'Practices',
    link: '/services',
    id: 2,
  },
  {
    linkTitle: 'Industries',
    link: '/services#industries',
    id: 3,
  },
  {
    linkTitle: 'Careers',
    link: '/careers',
    id: 4,
  },
  {
    linkTitle: 'Firm Overview',
    link: '/firm-overview',
    id: 5,
  },
  {
    linkTitle: 'Library',
    link: '/library/category/client-alert',
    id: 6,
  },
  {
    linkTitle: 'Awards Methodology',
    link: '/awards',
    id: 7,
  },
];

/** List of firm blog category links found in the sidebar */
export const FIRM_BLOG_PAGES = [
  {
    id: 'client-alerts',
    label: 'Client Alerts',
    slug: '/library/category/client-alert',
  },
  {
    id: 'firm-events',
    label: 'Firm Events',
    slug: '/library/category/firm-events',
  },
  {
    id: 'firm-news',
    label: 'Firm News',
    slug: '/library/category/firm-news',
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
    display_name: 'Scarinci Hollenbeck, LLC',
    databaseId: 10000000000001,
    description: `With a growing practice of more than 60 experienced attorneys,
      Scarinci Hollenbeck, LLC is a regional alternative to a National 250 law firm. With offices in New 
      Jersey, New York City, and the District of Columbia, we serve the niche practice areas most often 
      required by institutions, corporations, entities, and the people who own and control them.`,
    profileImage: SHDiamond,
    email: SITE_EMAIL,
    phoneNumber: SITE_PHONE,
    designation: 'The Firm',
    author: {
      uri: '/firm-overview',
    },
  },
];

export const ScarinciHollenbeckKeyContact = {
  databaseId: 10000000000001,
  link: '/firm-overview',
  display_name: 'Scarinci Hollenbeck, LLC',
  keyContactsByPractice: null,
  profileImage: SHDiamond,
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
      databaseId: 29436,
      uri: '/location/little-falls',
      title: 'Little Falls, NJ',
    },
    {
      databaseId: 29437,
      uri: '/location/red-bank',
      title: 'Red Bank, NJ',
    },
    {
      databaseId: 29440,
      uri: '/location/washington-dc',
      title: 'Washington, D.C.',
    },
  ],
};

/* List of Firm Pages found in the sidebar and in the footer */
export const FIRM_PAGES = [
  {
    databaseId: 'menu-firm-05',
    title: 'Firm Overview',
    uri: '/firm-overview',
  },
  {
    databaseId: 'firm-administrations',
    title: 'Administration',
    uri: '/administration',
  },
  {
    databaseId: 'community-involvement',
    title: 'Community Involvement',
    uri: '/community-involvement',
  },
  {
    databaseId: 'diversity',
    title: 'Diversity',
    uri: '/diversity',
  },
  {
    databaseId: 'pro-bono',
    title: 'Pro Bono',
    uri: '/pro-bono',
  },
  {
    databaseId: 'firm-in-memorials',
    title: 'In Memoriam',
    uri: '/memorials',
  },
  {
    databaseId: 'work-life-balance',
    title: 'Work Life Balance',
    uri: '/work-life-balance',
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
    slug: '/location/new-york',
    label: 'New York, NY',
    address: '589 8th Avenue, 16th Floor, New York, NY 10018',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.305278781976!2d-73.99361708459378!3d40.75530987932725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259acdec357a3%3A0x25fd7e9975e1d4d8!2s589%208th%20Ave%2C%20New%20York%2C%20NY%2010018!5e0!3m2!1sen!2sus!4v1590683744779!5m2!1sen!2sus',
    tel: '212-286-0747',
    fax: '212-808-4155',
  },
  {
    id: 2,
    slug: '/location/little-falls',
    label: 'Little Falls, NJ',
    address: '150 Clove Road, 9th Floor, Little Falls, NJ 07424',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5375.6334332077395!2d-74.19960021040134!3d40.87248074962538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2fe482a4faf77%3A0x17707b4c60656ad!2s150%20Clove%20Rd%2C%20Little%20Falls%2C%20NJ%2007424!5e0!3m2!1sen!2sus!4v1659974943790!5m2!1sen!2sus',
    tel: '201-896-4100',
    fax: '201-896-8660',
  },
  {
    id: 3,
    slug: '/location/red-bank',
    label: 'Red Bank, NJ',
    address: '331 Newman Springs Road Red Bank, NJ 07701',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3041.34467374956!2d-74.09794688434188!3d40.33469936854769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c231df5cc8d921%3A0x41ee2239f0384ab0!2s331+Newman+Springs+Rd%2C+Red+Bank%2C+NJ+07701!5e0!3m2!1sen!2sus!4v1537300318797',
    tel: '732-780-5590',
    fax: '732-695-8108',
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
    description: <HawCanIGet />,
  },
  {
    id: 2,
    title: 'How do I know which attorney to contact?',
    description: <HawDoIKnow />,
  },
  {
    id: 3,
    title: 'What are the firm`s main practice areas?',
    description: <WhatAreTheFirms />,
  },
  {
    id: 4,
    title: 'Where is the firm located?',
    description: <WhereIsYheFirmLocated />,
  },
  {
    id: 5,
    title:
      'I am located outside of New Jersey and New York. Can you still help me?',
    description: `
    It depends on the nature of the matter. <strong>Scarinci Hollenbeck, LLC</strong> represents clients around the world.
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
    description: `Scarinci Hollenbeck, LLC routinely serves business owners, corporate entities, leaders, and operators
    of small businesses and Fortune 500 companies alike.`,
  },
  {
    id: 7,
    title: 'I am not a business owner. Could your firm still help me?',
    description: `We are a general practice law firm that services businesses, corporations, and entities.
    We typically only represent people who own and operate these organizations. However, you are free to call 
    our business development group at <a href="tel:201-806-3364"> 201-806-3364</a> or email us at 
    <a href="mailto:info@sh-law.com">info@sh-law.com</a> A member of our group can direct you to an 
    attorney in our firm that may be able to assist.
    `,
  },
  {
    id: 8,
    title: 'How do you pronounce "Scarinci Hollenbeck, LLC"?',
    description: 'SCUH-RIN-SEE HALL-EN-BEK',
  },
];

export const firmOverViewTitles = [
  { name: 'Firm management', order: 1 },
  { name: 'Directors', order: 2 },
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
    'aria-label': 'First name',
    title: 'First name',
  },
  {
    type: 'text',
    name: 'LastName',
    placeholder: 'Last name',
    rules: 'required|max:255',
    'aria-label': 'Last name',
    title: 'Last name',
  },
  {
    type: 'email',
    name: 'Email',
    placeholder: 'Email address',
    rules: 'required|max:255',
    'aria-label': 'Email address',
    title: 'Email address',
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
    'aria-label': 'Phone number',
  },
  {
    type: 'text',
    name: 'Subject',
    placeholder: 'Subject',
    rules: 'required|max:1000',
    'aria-label': 'Subject',
    title: 'Subject',
  },
  {
    type: 'textarea',
    name: 'Message',
    placeholder: 'Message (optional)',
    rows: 8,
    cols: 4,
    'aria-label': 'Message',
    title: 'Message',
  },
];

export const subscriptionInputs = [
  {
    type: 'text',
    name: 'firstName',
    placeholder: 'First name',
    rules: 'required|max:255',
  },
  {
    type: 'text',
    name: 'lastName',
    placeholder: 'Last name',
    rules: 'required|max:255',
  },
  {
    type: 'email',
    name: 'email',
    placeholder: 'Email address',
    rules: 'required|max:255',
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
    href: '/contact-us',
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

export const GOV_LAW_URL = 'https://scarincilawyer.com';

export const IMAGE_UPLOAD_CLOUDINARY = 'https://res.cloudinary.com/scarinci-hollenbeck/images/v';
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
export const PROJECT_MODE = process.env.NEXT_PUBLIC_PROJECT_MODE;

export const NEXT_PUBLIC_WP_REST_KEY = process.env.NEXT_PUBLIC_WP_REST_KEY;

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const initialAdminFCM = {
  clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
  // this is temporary solution. In this time Vercel can't read big keys. When this problem will be solved we need to change this to process.env.FIREBASE_PRIVAT_KEY
  privateKey:
    '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDy2BXx9BbtdOOh\n0QhoN3d0eH60frAUWQ1t7BiR7ky04XyBf9z8aNWZLJQ5yTGd9bG6OraYRnU9BLZW\nVv0/IbvKdkRTKOdEkcgaUfdc8VRc5wVee/uG+HrsYnNXwoar7qqTUBpQJCHTTV7L\nesKfP62TEiKac6fnQU4fr7oHK9oI1vhAIDahkHY0JlTgCmJV2r0opV3XEWVnT+jm\nrNeN2Uc8mh10J7DIFCyqHUdfEut4lS57Qf9O38mnnyhzcdCaUmO0ECgDKWSINl14\nhY+OMw3MbZt6x8dXVF6dpMVj1AdJssj+KpcFjuGy3yHsKzo6rJXbWr028l+bGU5r\nx0KiMUg1AgMBAAECggEAB311csCkEdxphm3fUeBfBPDcv9zl7RXwmkPF1yooVy5r\nyLS9MoZaLUdye1Z12RShNlVH/3sYUb+DXBT56lEBE2tBrcRqGrwVjUl4piG5IYDS\nw2dysNXMjiH+1EfRykalyosNgx02c1aNAhzKw7yXS8e8lMGyqG1shRJojzqIDlxq\nUUXL9gR0tEiVGGi49lCqp6rJ1rzOQ3hboqmHTa6S9oF/FlAZBrArhsmNalWPBnIz\nRAXICFm9MMFK+Ool3yUd0UV3O15I7GV4/6F1op93U49f36eUQiH605bGOZ1HMhiI\n9oZfpga4nHmLC5ef9RiU46+SF+fFPP/fAOJeftOZywKBgQD7bZFXreJ0Qtm3RaKT\nukrmNyJbAGXFT6ZJpWYbaGfXqg8SK5eenl0CJ3W7ajVE1M1MjKZ15eEu7g6wsuLZ\nJ2ePdyXQ0jWoKsOprCvGxzI8Edcw2WByvN9ZsBSNSweADbM7mlPlO2/jeFnFUhz4\n0gCwEdgKpAM3ujFBMuk2PaBKLwKBgQD3Qo8ExFHut3/RRaAwkY2Y+IOZ8jxevLkd\nUjFFyxd+cGmnAeVKfjtTFcQdG7qHRvMVpceSyD2rXfVdLS1CmzjbVxUxe+3gl7ka\nELUYy47feJD95FRzMyNMkmlD1H1HnUwYMim+l/ObhlEGQOvNHV/5fkqgCBqoX8jQ\n3z87P6DO2wKBgA1HIwbTWwMyyJaiKczNaMkxnjHaGoXKCAkZoAPQhrNf+r3F6ZLp\n4BWOCeyk1j1VU6Y4Q040nqjAz6vLNqmrKA/uheO6RjUkVQLv4bv0pxV/B7M/t5U3\nnj/5SYyQqsu7bXy3ULjpY6ZKo8sE5BzL0ld6CcO+F6FoxtMfoitII9/nAoGACr65\nuFtPtDAFPfLoozOwE5W5IleEiBlrcfrAaWgJ/VSlQryyWipiKZooi5tI39gVeDtc\nEOTiyS+sGgB8lwhn0CBYq23XSItPX/KZ7Bnse4mhw2bIxLjUL9+s82WojBQp2mNT\nrRStYXTU0JDBrog4Q39ZftrbTbXb5DfPZ6O8OUECgYAoIWNX7wmxDb2JmeVpc/2/\nf4biXp9w2NbsW5oFo9Q74Bkj1tNO768eKDZPwCmV2Ylr/ekQTCV23ZVuPUDM6Kgd\nJPvlOXoZOv3CXkw+zppWyAPy7J6LbeDcm5QzkpfNBSCAjXShB1bsZvjYEGakBiYl\nV2ZRL/mCkwdyca2qNYDXRA==\n-----END PRIVATE KEY-----\n',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

export const googleLocationIds = {
  'little-falls': 'ChIJT4-XoRdWwokR_STT5apGtEc',
  'new-york': 'ChIJZSMV5ABZwokRvTg94J92jfU',
  'washington-dc': 'ChIJMxTvAVS3t4kRnkctX9qxKtc',
  'red-bank': 'ChIJ41CJnUMvwokR-JVUIXV0IMI',
};

export const ALT_PREFIX = 'Image showing the text: ';

export const NAVIGATION_OPENERS = ['Attorneys', 'Services', 'Locations'];

/** List of basic pages links found in the sidebar, SubheaderDefault menu, footer */
export const SIDEBAR_POLITIC_LINKS = [
  {
    databaseId: 'privacy-policy',
    title: 'Privacy Policy',
    uri: '/privacy-policy',
  },
  {
    databaseId: 'terms-of-use',
    title: 'Terms of Use',
    uri: '/terms-of-use',
  },
  {
    databaseId: 'disclaimer',
    title: 'Disclaimer',
    uri: '/disclaimer',
  },
  {
    databaseId: 'awards',
    title: 'Awards Methodology',
    uri: '/awards',
  },
];

export const SOCIAL_LINKS = [
  {
    id: 'linkedin',
    title: 'LinkedIn',
    icon: <FaLinkedin />,
    url: 'https://www.linkedin.com/company/scarinci-hollenbeck-llc/',
  },
  {
    id: 'facebook',
    title: 'Facebook',
    icon: <FaFacebookSquare />,
    url: 'https://www.facebook.com/ScarinciHollenbeck',
  },
  {
    id: 'x',
    title: 'X/Twitter',
    icon: <FaSquareXTwitter />,
    url: 'https://twitter.com/S_H_Law',
  },
];

export const slogans = ['Distinct Vision', 'Real Impact'];

export const latestPostTabs = [
  {
    id: 'firmNewsPosts',
    label: 'News',
  },
  {
    id: 'clientAlertsPosts',
    label: 'Client Alerts',
  },
  {
    id: 'firmInsightsPosts',
    label: 'Insights',
  },
  {
    id: 'allPosts',
    label: 'All Posts',
  },
];

export const reservedAccordionTitles = [
  'Clients List',
  'Awards',
  'Full Biography',
  'Affiliations Area',
  'Representative Matters',
  'Gallery',
  'Media',
  'Presentations',
  'Publications',
  'Videos',
  'News & Press Releases',
  'Blog',
  'Events',
  'Government & Law',
];

export const NAVBAR_SERVICES_TABS = ['Practices', 'Industries'];

export const readyIndustriesUrls = [
  '/industries/cannabis',
  '/industries/entertainment-and-media',
  '/industries/government-strategies',
];

export const defaultWhyChooseUsData = [
  {
    title: 'Dedicated attorneys',
    description:
      'At Scarinci Hollenbeck, our attorneys are forward-thinking professionals dedicated to the ongoing enhancement of their legal expertise. They stay informed of legal developments, engage in professional bar associations, contribute to legislative initiatives, and actively engage in speaking opportunities—all to provide the highest quality service possible.',
  },
  {
    title: 'Strategic Counsel',
    description:
      "In today's dynamic economy, businesses face complex challenges. We understand that these challenges require innovative, multi-faceted solutions. Through a collaborative, cross-practice approach, our attorneys leverage a wealth of experience across various legal disciplines to devise effective strategies tailored to meet our clients’ needs.",
  },
  {
    title: 'Proven Experience',
    description:
      'For over 35 years, Scarinci Hollenbeck has offered comprehensive legal services to businesses both locally and globally. Our attorneys draw on extensive industry knowledge, representing clients in sectors such as real estate, entertainment, technology, and energy. We take pride in the successful outcomes we consistently achieve.',
  },
  {
    title: 'Client-First Focus',
    description:
      'Our commitment to being a client-first law firm is rooted in open communication, meticulous attention to detail, and adaptability. We work closely with clients to ensure a transparent process, earning their trust through comprehensive guidance. This steadfast commitment is why clients continue to rely on us for their most complex legal challenges.',
  },
];

export const excludedPrintFooter = ['/attorneys/[slug]', '/practices/[slug]'];

export const desiredOrder = [
  'Katerin Traugh',
  'John Palumbo',
  'Peter S. Moeller',
  'Dan Scarpulla',
];

export const LIBRARY_NAV = [
  {
    id: 'filters-nav-01',
    title: 'All',
    href: '/library',
  },
  {
    id: 'filters-nav-02',
    title: 'Client Alert',
    href: '/library/category/client-alert',
  },
  {
    id: 'filters-nav-03',
    title: 'Firm News',
    href: '/library/category/firm-news',
  },
  {
    id: 'filters-nav-04',
    title: 'Firm Events',
    href: '/library/category/firm-events',
  },
  {
    id: 'filters-nav-05',
    title: 'Firm Insights',
    href: '/library/category/law-firm-insights',
  },
  {
    id: 'filters-nav-06',
    title: 'Podcasts',
    href: '/podcasts',
  },
];
