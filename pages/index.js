import HomePage from 'components/pages/HomePage';
import { fetchAPI } from 'requests/api';
import { getPractices } from 'requests/getPractices';
import {
  homePageQuery,
  latestAllPosts,
  latestClientAlertsArticles,
  latestFirmInsightsArticles,
  latestFirmNewsArticles,
  officeLocationsQuery,
} from 'requests/graphql-queries';
import { chunkArray, formateAwards } from 'utils/helpers';
import { PRODUCTION_URL, CURRENT_DOMAIN } from 'utils/constants';

/** Get homepage content WP GRAPHQL API */
export async function homePageContent() {
  const data = await fetchAPI(homePageQuery, {});

  return data?.pageBy;
}

const getMapDataFrmLocations = async () => {
  const { officeLocations } = await fetchAPI(officeLocationsQuery, {});
  return officeLocations?.nodes;
};

const getLatestArticlesTabsData = async () => {
  const { posts } = await fetchAPI(latestAllPosts, {});
  const { posts: clientAlertsPosts } = await fetchAPI(
    latestClientAlertsArticles,
    {},
  );
  const { posts: firmNewsPosts } = await fetchAPI(latestFirmNewsArticles, {});
  const { posts: firmInsightsPosts } = await fetchAPI(
    latestFirmInsightsArticles,
    {},
  );

  return {
    allPosts: {
      categoryLink: '/library',
      articles: [...chunkArray(posts.nodes, 4)],
    },
    clientAlertsPosts: {
      categoryLink: '/library/category/client-alert',
      articles: [...chunkArray(clientAlertsPosts.nodes, 4)],
    },
    firmNewsPosts: {
      categoryLink: '/library/category/firm-news',
      articles: [...chunkArray(firmNewsPosts.nodes, 4)],
    },
    firmInsightsPosts: {
      categoryLink: '/library/category/law-firm-insights',
      articles: [...chunkArray(firmInsightsPosts.nodes, 4)],
    },
  };
};

export const sanitizeOffices = (offices) => offices.map(({
  databaseId, slug, title, officeMainInformation,
}) => {
  if (officeMainInformation?.autoMap?.mediaItemUrl?.length > 0) {
    officeMainInformation.autoMap = officeMainInformation.autoMap.mediaItemUrl;
  }
  if (officeMainInformation?.trainStationsMap?.mediaItemUrl?.length > 0) {
    officeMainInformation.trainStationsMap = officeMainInformation.trainStationsMap.mediaItemUrl;
  }
  return {
    databaseId,
    slug,
    title,
    ...officeMainInformation,
  };
});

/** Map the home page query data to page props */
export const getStaticProps = async () => {
  /** get page content */
  const latestArticlesTabsData = await getLatestArticlesTabsData();

  const offices = await getMapDataFrmLocations();
  const hqOffice = offices?.find(
    (o) => o.officeMainInformation?.addressLocality === 'Little Falls',
  );
  const hqGeo = hqOffice?.officeMainInformation?.latitude
    ? {
      latitude: hqOffice.officeMainInformation.latitude,
      longitude: hqOffice.officeMainInformation.longitude,
    }
    : null;
  const request = await homePageContent();
  const practices = await getPractices();

  const { seo, homePage } = request;
  const {
    awards,
    isHoliday,
    firstSection,
    whoWeAre,
    industryWeWorkWith,
    whyChooseUs,
  } = homePage;

  /** get firm locations */
  // const offices = await homePageLocations();

  const webPageData = {
    url: PRODUCTION_URL,
    name: seo.title,
    description: seo.metaDesc,
    pageType: 'WebPage',
    mainEntity: { '@id': `${CURRENT_DOMAIN}/#organization` },
  };

  return {
    props: {
      seo,
      awards: formateAwards(awards),
      offices: sanitizeOffices(offices),
      isHoliday,
      firstSection,
      whoWeAre,
      industryWeWorkWith,
      latestArticlesTabsData,
      whyChooseUs,
      practices,
      webPageData,
      hqGeo,
    },
    revalidate: 600,
  };
};

/** The home page component */
const Home = ({
  seo,
  awards,
  offices,
  isHoliday,
  firstSection,
  whoWeAre,
  industryWeWorkWith,
  latestArticlesTabsData,
  whyChooseUs,
  practices,
  webPageData,
  hqGeo,
}) => {
  const homePageProps = {
    seo,
    awards,
    offices,
    isHoliday,
    firstSection,
    whoWeAre,
    industryWeWorkWith,
    latestArticlesTabsData,
    whyChooseUs,
    practices,
    webPageData,
    hqGeo,
  };
  return <HomePage {...homePageProps} />;
};

export default Home;
