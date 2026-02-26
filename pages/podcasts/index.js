import { PRODUCTION_URL, CURRENT_DOMAIN } from 'utils/constants';
import { stripHtml } from 'utils/helpers';
import { fetchAPI } from 'requests/api';
import {
  categoriesQuery,
  podcastsPageContentQuery,
} from 'requests/graphql-queries';
import { getLibraryPageData } from 'requests/getLibraryPageData';
import PodcastsPage from 'components/pages/PodcastsPage';

export async function getStaticProps() {
  const [
    {
      pageBy: { title, seo, pagesFields },
    },
    { filters, subHeaderSlides },
  ] = await Promise.all([
    fetchAPI(podcastsPageContentQuery),
    getLibraryPageData(categoriesQuery),
  ]);

  const canonicalUrl = `${PRODUCTION_URL}/podcasts`;

  const breadcrumbs = [
    { name: 'Home', url: `${CURRENT_DOMAIN}/` },
    { name: 'Podcasts' },
  ];

  const webPageData = {
    url: canonicalUrl,
    name: seo?.title,
    description: stripHtml(pagesFields?.description),
    pageType: 'CollectionPage',
  };

  return {
    props: {
      seo,
      title,
      description: pagesFields?.description,
      canonicalUrl,
      filters,
      subHeaderSlides,
      breadcrumbs,
      webPageData,
    },
    revalidate: 600,
  };
}

const Library = ({
  seo,
  title,
  description,
  canonicalUrl,
  filters,
  subHeaderSlides,
  breadcrumbs,
  webPageData,
}) => {
  const podcastsProps = {
    seo,
    title,
    description,
    canonicalUrl,
    filters,
    subHeaderSlides,
    breadcrumbs,
    webPageData,
  };
  return <PodcastsPage {...podcastsProps} />;
};

export default Library;
