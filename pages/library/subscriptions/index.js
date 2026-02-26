import { PRODUCTION_URL, CURRENT_DOMAIN } from 'utils/constants';
import { fetchAPI } from 'requests/api';
import {
  librarySubscriptionsPageContentQuery,
  mainCategoriesQuery,
} from 'requests/graphql-queries';
import { getLibraryPageData } from 'requests/getLibraryPageData';
import LibrarySubscriptionsPage from 'components/pages/LibrarySubscriptionsPage';
import { getSubscriptions } from 'requests/getSubscriptions';
import { stripHtml } from 'utils/helpers';

export async function getStaticProps() {
  const [
    {
      pageBy: { title, seo, pagesFields },
    },
    { filters, subHeaderSlides },
    subscriptions,
  ] = await Promise.all([
    fetchAPI(librarySubscriptionsPageContentQuery),
    getLibraryPageData(mainCategoriesQuery),
    getSubscriptions(),
  ]);

  const canonicalUrl = `${PRODUCTION_URL}/library/subscriptions`;

  const breadcrumbs = [
    { name: 'Home', url: `${CURRENT_DOMAIN}/` },
    { name: 'Library', url: `${CURRENT_DOMAIN}/library` },
    { name: title },
  ];

  const webPageData = {
    url: canonicalUrl,
    name: title,
    description: stripHtml(pagesFields?.description),
    pageType: 'WebPage',
  };

  return {
    props: {
      seo,
      title,
      description: pagesFields?.description,
      canonicalUrl,
      filters,
      subHeaderSlides,
      subscriptions,
      breadcrumbs,
      webPageData,
    },
    revalidate: 600,
  };
}

const LibrarySubscriptions = ({
  seo,
  title,
  description,
  canonicalUrl,
  filters,
  subHeaderSlides,
  subscriptions,
  breadcrumbs,
  webPageData,
}) => {
  const librarySubscriptionsProps = {
    seo,
    title,
    description,
    canonicalUrl,
    filters,
    subHeaderSlides,
    subscriptions,
    breadcrumbs,
    webPageData,
  };
  return <LibrarySubscriptionsPage {...librarySubscriptionsProps} />;
};

export default LibrarySubscriptions;
