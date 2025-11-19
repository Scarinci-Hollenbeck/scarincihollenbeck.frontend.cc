import { PRODUCTION_URL } from 'utils/constants';
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

  return {
    props: {
      seo,
      title,
      description: pagesFields?.description,
      officeLocations: sanitizeLocations(officeLocations.nodes),
      mapLocations: sanitizeOffices(officeLocations.nodes),
      featuredImage: featuredImage.node.sourceUrl,
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
}) => {
  const canonicalUrl = `${PRODUCTION_URL}/contact-us`;

  const contactProps = {
    seo,
    title,
    description,
    officeLocations,
    mapLocations,
    featuredImage,
    canonicalUrl,
  };
  return <ContactPage {...contactProps} />;
};

export default ContactUs;
