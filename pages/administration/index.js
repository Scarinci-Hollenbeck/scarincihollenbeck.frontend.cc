import AdministrationPage from 'components/pages/AdminDirectory';
import { desiredOrder, PRODUCTION_URL, SITE_PHONE } from 'utils/constants';
import { fetchAPI } from 'requests/api';
import { administrationPageQuery, adminsQuery } from 'requests/graphql-queries';

/** Fetch page data from WP GRAPHQL API */
const archivesPageContent = async () => {
  const data = await fetchAPI(administrationPageQuery, {});
  return data?.pageBy;
};

/** Fetch administration data from WP REST API */
const getAdministration = async () => {
  const data = await fetchAPI(adminsQuery);
  return data?.administrations.nodes.map((admin) => {
    admin.administration.featuredImage = admin.administration.featuredImage.sourceUrl;
    admin.administration.phone = `${SITE_PHONE} ${admin.administration.phoneExtension}`;
    admin.administration.location_array = admin.administration.location;
    return {
      uri: admin.uri,
      title: admin.title,
      id: admin.databaseId,
      ...admin.administration,
    };
  });
};

/** Set data from API response to page props */
export async function getStaticProps() {
  const admins = await getAdministration();
  const page = await archivesPageContent();
  const {
    title, seo, pagesFields, featuredImage,
  } = page;

  const sortedAdmins = [...admins].sort((a, b) => {
    const indexA = desiredOrder.indexOf(a.title);
    const indexB = desiredOrder.indexOf(b.title);
    return (
      (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB)
    );
  });

  return {
    props: {
      seo,
      site: {
        title,
        description: pagesFields.description,
        image: featuredImage.node.sourceUrl,
      },
      admins: sortedAdmins,
    },
    revalidate: 600,
  };
}

/** Administration directory page component */
const Administration = ({ admins, seo, site }) => {
  const canonicalUrl = `${PRODUCTION_URL}/administration`;

  const adminProps = {
    admins,
    seo,
    canonicalUrl,
    site,
  };
  return <AdministrationPage {...adminProps} />;
};

export default Administration;
