import { PRODUCTION_URL } from 'utils/constants';
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

  return {
    props: {
      seo,
      title,
      description: pagesFields?.description,
      filters,
      subHeaderSlides,
    },
    revalidate: 3600,
  };
}

const Library = ({
  seo, title, description, filters, subHeaderSlides,
}) => {
  const canonicalUrl = `${PRODUCTION_URL}/podcasts`;

  const podcastsProps = {
    seo,
    title,
    description,
    canonicalUrl,
    filters,
    subHeaderSlides,
  };
  return <PodcastsPage {...podcastsProps} />;
};

export default Library;
