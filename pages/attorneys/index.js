import { PRODUCTION_URL, CURRENT_DOMAIN } from 'utils/constants';
import AttorneysPage from 'components/pages/AttorneysDirectory';
import useNotFoundNotification from 'hooks/useNotFoundNotification';
import {
  attorneysPageContent,
  getAttorneysFromRestApi,
} from 'requests/getAttorneys';
import { sortAttorneysByCategory, sortByKey } from 'utils/helpers';
import { getPractices } from 'requests/getPractices';

/** Map all the page data to component props */
export async function getStaticProps() {
  const page = await attorneysPageContent();
  const {
    title, seo, attorneyArchives, pagesFields,
  } = page;
  const attorneys = await getAttorneysFromRestApi();

  const sortedTitlesByOrder = sortByKey(
    attorneyArchives?.designationSectionTitles,
    'order',
  );

  const sortedAttorneysByCategory = sortAttorneysByCategory(
    attorneys,
    sortedTitlesByOrder,
  );

  const practices = await getPractices();

  // it was done by request from the client as a temporary solution. 9 May 2024.
  // If you want to delete it and revert the old solution,
  // just replace the justFirmManagementPartners variable with sortedAttorneysByCategory.
  // const justFirmManagementPartners = {
  //   'Firm Managing Partner': {
  //     attorneys: sortedAttorneysByCategory['Firm Managing Partner']?.attorneys || [],
  //   },
  // };
  // const isFirmOverviewPage = pathname.includes('/firm-overview') || pathname.includes('/administration');
  // const differentAttorneysKit = isFirmOverviewPage
  //   ? sortedAttorneys
  //   : justFirmManagementPartners;

  if (!page) {
    return {
      notFound: true,
    };
  }

  const canonicalUrl = `${PRODUCTION_URL}/attorneys`;

  const breadcrumbs = [
    { name: 'Home', url: `${CURRENT_DOMAIN}/` },
    { name: 'Attorneys' },
  ];

  const webPageData = {
    url: canonicalUrl,
    name: seo?.title,
    description: seo?.metaDesc,
    pageType: 'CollectionPage',
    mainEntity: { '@id': `${canonicalUrl}#itemlist` },
  };

  const itemListData = attorneys.map((attorney) => ({
    name: attorney.title,
    url: `${CURRENT_DOMAIN}${attorney?.link || attorney?.uri}`,
  }));

  const itemListMeta = {
    name: 'Attorneys at Scarinci Hollenbeck',
    url: `${PRODUCTION_URL}/attorneys`,
  };

  return {
    props: {
      seo,
      site: {
        title,
        description: pagesFields?.description,
      },
      canonicalUrl,
      attorneyArchives,
      seoAttorneys: sortedAttorneysByCategory,
      practices,
      breadcrumbs,
      webPageData,
      itemListData,
      itemListMeta,
    },
    revalidate: 600,
  };
}

/* Attorneys page component */
const Attorneys = ({
  seo,
  site,
  canonicalUrl,
  attorneyArchives,
  seoAttorneys,
  practices,
  breadcrumbs,
  webPageData,
  itemListData,
  itemListMeta,
}) => {
  useNotFoundNotification('The selected profile no longer exists.');

  const attorneysPageProps = {
    seo,
    site,
    canonicalUrl,
    attorneyArchives,
    seoAttorneys,
    practices,
    breadcrumbs,
    webPageData,
    itemListData,
    itemListMeta,
  };

  return <AttorneysPage {...attorneysPageProps} />;
};

export default Attorneys;
