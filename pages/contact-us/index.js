import { PRODUCTION_URL, CURRENT_DOMAIN, SITE_EMAIL } from 'utils/constants';
import { fetchAPI } from 'requests/api';
import {
  contactPageQuery,
  officeLocationsQuery,
} from 'requests/graphql-queries';
import ContactPage from 'components/pages/ContactPage';
import { sanitizeOffices } from 'pages';

const sanitizeLocations = (locations) => locations.map((office) => ({
  databaseId: office.databaseId,
  ...office.officeMainInformation,
}));

export async function getStaticProps() {
  const {
    pageBy: {
      title, seo, pagesFields, featuredImage,
    },
  } = await fetchAPI(contactPageQuery);
  const { officeLocations } = await fetchAPI(officeLocationsQuery, {});

  const hqOffice = officeLocations.nodes?.find(
    (o) => o.officeMainInformation?.addressLocality === 'Little Falls',
  );
  const hqGeo = hqOffice?.officeMainInformation?.latitude
    ? {
      latitude: hqOffice.officeMainInformation.latitude,
      longitude: hqOffice.officeMainInformation.longitude,
    }
    : null;

  const canonicalUrl = `${PRODUCTION_URL}/contact-us`;

  const breadcrumbs = [
    { name: 'Home', url: `${CURRENT_DOMAIN}/` },
    { name: 'Contact Us' },
  ];

  const webPageData = {
    url: canonicalUrl,
    name: seo.title,
    description: seo.metaDesc,
    pageType: 'ContactPage',
    mainEntity: { '@id': `${CURRENT_DOMAIN}/#organization` },
  };

  const formatMapUrl = (mapAddress) => {
    if (!mapAddress) return null;
    if (mapAddress.startsWith('http')) return mapAddress;
    return `https://www.google.com/maps/search/?api=1&query=${mapAddress}`;
  };

  const stateAreaServed = {
    NJ: [
      { '@type': 'State', name: 'New Jersey' },
      { '@type': 'State', name: 'New York' },
    ],
    NY: [
      { '@type': 'State', name: 'New York' },
      { '@type': 'State', name: 'New Jersey' },
    ],
    DC: [{ '@type': 'AdministrativeArea', name: 'Washington, D.C.' }],
  };

  const officeLocationsData = sanitizeOffices(officeLocations.nodes).map(
    (office) => ({
      url: `${PRODUCTION_URL}/location/${office.slug}`,
      telephone: office.phone,
      ...(office.fax && { faxNumber: office.fax }),
      email: SITE_EMAIL,
      streetAddress: (office.floor
        ? `${office.streetAddress}, ${office.floor}`
        : office.streetAddress
      )?.trim(),
      addressLocality: office.addressLocality,
      addressRegion: office.addressRegion,
      postalCode: office.postCode,
      addressCountry: 'US',
      mapAddress: formatMapUrl(office.mapAddress),
      areaServed: stateAreaServed[office.addressRegion] || null,
      ...(office.latitude
        && office.longitude && {
        latitude: office.latitude.trim(),
        longitude: office.longitude.trim(),
      }),
    }),
  );

  return {
    props: {
      seo,
      title,
      description: pagesFields?.description,
      officeLocations: sanitizeLocations(officeLocations.nodes),
      mapLocations: sanitizeOffices(officeLocations.nodes),
      featuredImage: featuredImage.node.sourceUrl,
      breadcrumbs,
      webPageData,
      officeLocationsData,
      hqGeo,
      canonicalUrl,
    },
    revalidate: 600,
  };
}

const ContactUs = ({
  seo,
  title,
  description,
  officeLocations,
  mapLocations,
  featuredImage,
  breadcrumbs,
  webPageData,
  officeLocationsData,
  hqGeo,
  canonicalUrl,
}) => {
  const contactProps = {
    seo,
    title,
    description,
    officeLocations,
    mapLocations,
    featuredImage,
    canonicalUrl,
    breadcrumbs,
    webPageData,
    officeLocationsData,
    hqGeo,
  };
  return <ContactPage {...contactProps} />;
};

export default ContactUs;
