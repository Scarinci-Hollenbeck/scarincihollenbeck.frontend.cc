import { BsFillBriefcaseFill, BsPeopleFill } from 'react-icons/bs';
import { GiBookCover } from 'react-icons/gi';

export const tileContentArr = [
  {
    title: 'Get in touch',
    textContent:
      'If you are looking to get in touch with an attorney in regard to becoming a new client, please call <u>201-896-4100.</u>',
    link: 'tel:201-896-4100',
    image: '/images/contact-tiles-4.webp',
    id: 'contact-tile-01',
  },
  {
    title: 'For clients',
    textContent:
      'If you are a client, please get in touch with your <u>Scarinci Hollenbeck, LLC attorneys</u> contact directly.',
    link: '/attorneys',
    image: '/images/contact-tiles-3.webp',
    id: 'contact-tile-02',
  },
  {
    title: 'For job opportunities',
    textContent: 'Please visit our <u>Careers page</u>.',
    link: '/careers',
    id: 'contact-tile-03',
    image: '/images/contact-tiles-2.webp',
  },
  {
    title: 'For media inquiries',
    textContent:
      'Please contact <u>Peter S. Moeller</u>, Chief Growth Officer.',
    link: '/administration/peter-s-moeller',
    id: 'contact-tile-04',
    image: '/images/contact-tiles-1.webp',
  },
];

export const tile404ContentArr = [
  {
    title: 'Attorneys',
    textContent: `
    If you are a client, please get in touch with your 
    <a href='/attorneys'>Scarinci Hollenbeck, LLC attorneys</a> contact directly.
    `,
    icon: <BsPeopleFill />,
    id: 0,
  },
  {
    title: 'Practices',
    textContent: `
      <strong>Scarinci Hollenbeck, LLC</strong> attorneys routinely represent corporate,
      governmental, and individual clients in a wide range of <a href='/services'>practices</a>.
    `,
    icon: <BsFillBriefcaseFill />,
    id: 1,
  },
];

export const tilesErrorContentArr = [
  {
    title: '',
    textContent: "<a href='/library'>The posts Library</a>",
    icon: <GiBookCover />,
    id: 0,
  },
];
