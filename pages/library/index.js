import { PRODUCTION_URL, CURRENT_DOMAIN } from 'utils/constants';
import { stripHtml } from 'utils/helpers';
import { fetchAPI } from 'requests/api';
import {
  libraryPageContentQuery,
  mainCategoriesQuery,
  postsForRandomComponentQuery,
} from 'requests/graphql-queries';
import LibraryPage from 'components/pages/LibraryPage';
import useNotFoundNotification from 'hooks/useNotFoundNotification';
import { getLibraryPageData } from 'requests/getLibraryPageData';

export async function getStaticProps() {
  const [
    {
      pageBy: { title, seo, pagesFields },
    },
    { posts },
    { filters, subHeaderSlides },
  ] = await Promise.all([
    fetchAPI(libraryPageContentQuery),
    fetchAPI(postsForRandomComponentQuery),
    getLibraryPageData(mainCategoriesQuery),
  ]);

  const canonicalUrl = `${PRODUCTION_URL}/library`;

  const breadcrumbs = [
    { name: 'Home', url: `${CURRENT_DOMAIN}/` },
    { name: 'Library' },
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
      posts: posts?.nodes || [],
      filters,
      subHeaderSlides,
      canonicalUrl,
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
  posts,
  filters,
  subHeaderSlides,
  canonicalUrl,
  breadcrumbs,
  webPageData,
}) => {
  useNotFoundNotification("Category doesn't exist!");

  const libraryProps = {
    seo,
    title,
    description,
    canonicalUrl,
    posts,
    filters,
    subHeaderSlides,
    breadcrumbs,
    webPageData,
  };
  return <LibraryPage {...libraryProps} />;
};

export default Library;
