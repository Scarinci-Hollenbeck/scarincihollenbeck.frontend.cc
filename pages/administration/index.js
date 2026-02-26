import AdministrationPage from 'components/pages/AdminDirectory';
import {
  CURRENT_DOMAIN,
  desiredOrder,
  PRODUCTION_URL,
  SITE_PHONE,
} from 'utils/constants';
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

  const itemListData = admins.map((admin) => ({
    name: admin.title,
    url: `${CURRENT_DOMAIN}${admin?.uri}`,
  }));

  const itemListMeta = {
    name: 'Administration at Scarinci Hollenbeck',
    url: `${PRODUCTION_URL}/administration`,
  };

  const canonicalUrl = `${PRODUCTION_URL}/administration`;

  const breadcrumbs = [
    { name: 'Home', url: `${CURRENT_DOMAIN}/` },
    { name: 'Administration' },
  ];

  const webPageData = {
    url: canonicalUrl,
    name: seo?.title,
    description: seo?.metaDesc,
    pageType: 'CollectionPage',
    mainEntity: { '@id': `${canonicalUrl}#itemlist` },
  };

  return {
    props: {
      seo,
      site: {
        title,
        description: pagesFields.description,
        image: featuredImage.node.sourceUrl,
      },
      canonicalUrl,
      admins: sortedAdmins,
      itemListData,
      itemListMeta,
      breadcrumbs,
      webPageData,
    },
    revalidate: 600,
  };
}

/** Administration directory page component */
const Administration = ({
  admins,
  seo,
  site,
  canonicalUrl,
  itemListData,
  itemListMeta,
  breadcrumbs,
  webPageData,
}) => {
  const adminProps = {
    admins,
    seo,
    canonicalUrl,
    site,
    itemListData,
    itemListMeta,
    breadcrumbs,
    webPageData,
  };
  return <AdministrationPage {...adminProps} />;
};

export default Administration;
