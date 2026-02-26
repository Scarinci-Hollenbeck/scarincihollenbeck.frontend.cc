import {
  CURRENT_DOMAIN,
  SITE_TITLE,
  SITE_EMAIL,
  LOGO_URL,
} from 'utils/constants';
import { stripHtml } from 'utils/helpers';

const siteDescription = `${SITE_TITLE} is an alternative to a National 250 law firm. With offices in New Jersey, New York City, and the District of Columbia, we serve the niche practice areas most often required by institutions, corporations, entities, and the people who own and control them.`;

const SOCIAL_LINKS = [
  'https://www.facebook.com/ScarinciHollenbeck/',
  'https://www.linkedin.com/company/scarinci-hollenbeck-llc',
  'https://twitter.com/s_h_law',
];

const FIRM_AREA_SERVED = [
  { '@type': 'State', name: 'New Jersey' },
  { '@type': 'State', name: 'New York' },
  { '@type': 'AdministrativeArea', name: 'Washington, D.C.' },
];

export const articleSchema = (body) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      publisher: {
        '@id': `${CURRENT_DOMAIN}/#organization`,
      },
      ...body,
    },
  ],
});

export const buildBusinessSchema = (geo = null) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LegalService',
      '@id': `${CURRENT_DOMAIN}/#organization`,
      name: SITE_TITLE,
      description: siteDescription,
      url: CURRENT_DOMAIN,
      image: {
        '@type': 'ImageObject',
        url: LOGO_URL,
      },
      priceRange: '$$$$',
      telephone: '201-896-4100',
      email: SITE_EMAIL,
      hasMap:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5375.6334332077395!2d-74.19960021040134!3d40.87248074962538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2fe482a4faf77%3A0x17707b4c60656ad!2s150%20Clove%20Rd%2C%20Little%20Falls%2C%20NJ%2007424!5e0!3m2!1sen!2sus!4v1659974943790!5m2!1sen!2sus',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '150 Clove Road, 9th Floor',
        addressLocality: 'Little Falls',
        addressRegion: 'NJ',
        postalCode: '07424',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: (geo?.latitude ?? '40.871378894707746').trim(),
        longitude: (geo?.longitude ?? '-74.19506817327908').trim(),
      },
      areaServed: FIRM_AREA_SERVED,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '201-896-4100',
          email: SITE_EMAIL,
          contactType: 'customer service',
          areaServed: 'US',
          availableLanguage: 'en',
        },
      ],
      sameAs: SOCIAL_LINKS,
      openingHours: 'Mo-Fr 8:30-18:00',
    },
    {
      '@type': 'WebSite',
      '@id': `${CURRENT_DOMAIN}/#website`,
      url: `${CURRENT_DOMAIN}/`,
      name: SITE_TITLE,
      description: siteDescription,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${CURRENT_DOMAIN}/library/search?keyword={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
      publisher: {
        '@id': `${CURRENT_DOMAIN}/#organization`,
      },
      inLanguage: 'en-US',
    },
  ],
});

export const buildPersonSchema = (persons) => ({
  '@context': 'https://schema.org',
  '@graph': persons,
});

export const buildLocationSchema = (location) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LegalService',
      '@id': `${location.url}/#legalservice`,
      name: location.name || SITE_TITLE,
      url: location.url || CURRENT_DOMAIN,
      ...(location.telephone && { telephone: location.telephone }),
      ...(location.faxNumber && { faxNumber: location.faxNumber }),
      ...(location.email && { email: location.email }),
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
      },
      ...(location.image && { image: location.image }),
      address: {
        '@type': 'PostalAddress',
        streetAddress: location.streetAddress,
        addressLocality: location.addressLocality,
        addressRegion: location.addressRegion,
        postalCode: location.postalCode,
        addressCountry: location.addressCountry || 'US',
      },
      openingHours: 'Mo-Fr 09:00-17:00',
      ...(location.mapAddress && {
        hasMap: location.mapAddress.startsWith('http')
          ? location.mapAddress
          : `https://www.google.com/maps?q=${location.mapAddress}`,
      }),
      ...(location.latitude
        && location.longitude && {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: parseFloat(location.latitude),
          longitude: parseFloat(location.longitude),
        },
      }),
      priceRange: '$$',
      ...(location.areaServed && { areaServed: location.areaServed }),
      parentOrganization: {
        '@type': 'Organization',
        '@id': `${CURRENT_DOMAIN}/#organization`,
      },
      ...(location.telephone && {
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: location.telephone,
            contactType: 'customer service',
            areaServed: 'US',
            availableLanguage: 'en',
          },
        ],
      }),
      sameAs: SOCIAL_LINKS,
    },
  ],
});

export const buildAttorneyProfileSchema = ({
  name,
  url,
  imageUrl,
  socialMediaLinks,
  jobTitle,
  description,
  email,
  telephone,
  knowsAbout,
  alumniOf,
  barAdmissions,
  affiliations,
  awards,
}) => {
  const links = socialMediaLinks?.length > 0
    ? socialMediaLinks.map((link) => link.url)
    : SOCIAL_LINKS;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': url,
        name,
        url,
        image: {
          '@type': 'ImageObject',
          url: imageUrl,
        },
        ...(jobTitle && { jobTitle }),
        ...(description && { description }),
        ...(email && { email }),
        ...(telephone && { telephone }),
        ...(knowsAbout?.length > 0 && { knowsAbout }),
        ...(alumniOf?.length > 0 && {
          alumniOf: alumniOf.map((item) => ({
            '@type': 'EducationalOrganization',
            name: item,
          })),
        }),
        ...(barAdmissions?.length > 0 && {
          hasCredential: barAdmissions.map((item) => ({
            '@type': 'EducationalOccupationalCredential',
            name: item,
          })),
        }),
        ...(affiliations?.length > 0 && {
          memberOf: affiliations.map((item) => ({
            '@type': 'Organization',
            name: item,
          })),
        }),
        ...(awards?.length > 0 && { award: awards }),
        sameAs: links,
        worksFor: {
          '@type': 'LegalService',
          '@id': `${CURRENT_DOMAIN}/#organization`,
        },
      },
    ],
  };
};

export const STANDARD_SCHEMA = `{"@context":"https://schema.org","@type":"WebSite","@id":"${CURRENT_DOMAIN}/#website","name":"${SITE_TITLE}","url":"${CURRENT_DOMAIN}","publisher":{"@id":"${CURRENT_DOMAIN}/#organization"},"potentialAction":{"@type":"SearchAction","target":"${CURRENT_DOMAIN}/library/search?keyword={search_term_string}","query-input":"required name=search_term_string"}}`;

export const buildFaqSchema = (faqItems) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ title, description }) => ({
    '@type': 'Question',
    name: title,
    acceptedAnswer: {
      '@type': 'Answer',
      text: stripHtml(description),
    },
  })),
});

export const buildBreadcrumbSchema = (breadcrumbs) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    ...(crumb.url && { item: crumb.url }),
  })),
});

export const buildItemListSchema = (items, meta = {}) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  ...(meta.url && { '@id': `${meta.url}#itemlist` }),
  ...(meta.name && { name: meta.name }),
  ...(meta.url && { url: meta.url }),
  numberOfItems: items.length,
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    url: item.url,
  })),
});

export const buildJobPostingSchema = ({
  title,
  description,
  url,
  datePosted,
  employmentType,
  locations,
}) => ({
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  title,
  description,
  url,
  ...(datePosted && { datePosted }),
  ...(employmentType && { employmentType }),
  hiringOrganization: {
    '@type': 'Organization',
    '@id': `${CURRENT_DOMAIN}/#organization`,
    name: SITE_TITLE,
    sameAs: SOCIAL_LINKS,
  },
  ...(locations?.length > 0 && {
    jobLocation: locations.map((loc) => ({
      '@type': 'Place',
      name: loc.name,
      ...(loc.url && { url: loc.url }),
    })),
  }),
});

export const buildWebPageSchema = ({
  url,
  name,
  description,
  pageType = 'WebPage',
  mainEntity,
  potentialAction,
  id,
}) => ({
  '@context': 'https://schema.org',
  '@type': pageType,
  '@id': id || url,
  url,
  name,
  ...(description && { description }),
  isPartOf: {
    '@id': `${CURRENT_DOMAIN}/#website`,
  },
  publisher: {
    '@id': `${CURRENT_DOMAIN}/#organization`,
  },
  ...(mainEntity && { mainEntity }),
  ...(potentialAction && { potentialAction }),
  inLanguage: 'en-US',
});

export const buildServiceSchema = (name, description, url) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${url}#service`,
  name,
  description,
  url,
  serviceType: 'Legal Services',
  provider: {
    '@type': 'LegalService',
    '@id': `${CURRENT_DOMAIN}/#organization`,
  },
  areaServed: FIRM_AREA_SERVED,
});
