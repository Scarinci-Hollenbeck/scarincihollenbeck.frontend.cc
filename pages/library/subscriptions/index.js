import { PRODUCTION_URL } from 'utils/constants';
import { fetchAPI } from 'requests/api';
import {
  librarySubscriptionsPageContentQuery,
  mainCategoriesQuery,
} from 'requests/graphql-queries';
import { getLibraryPageData } from 'requests/getLibraryPageData';
import LibrarySubscriptionsPage from 'components/pages/LibrarySubscriptionsPage';
import { getSubscriptions } from 'requests/getSubscriptions';

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

  return {
    props: {
      seo,
      title,
      description: pagesFields?.description,
      filters,
      subHeaderSlides,
      subscriptions,
    },
    revalidate: 3600,
  };
}

const LibrarySubscriptions = ({
  seo,
  title,
  description,
  filters,
  subHeaderSlides,
  subscriptions,
}) => {
  const canonicalUrl = `${PRODUCTION_URL}/library/subscriptions`;

  const librarySubscriptionsProps = {
    seo,
    title,
    description,
    canonicalUrl,
    filters,
    subHeaderSlides,
    subscriptions,
  };
  return <LibrarySubscriptionsPage {...librarySubscriptionsProps} />;
};

export default LibrarySubscriptions;
