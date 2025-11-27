import { PRODUCTION_URL } from 'utils/constants';
import { fetchAPI } from 'requests/api';
import {
  libraryPageContentQuery,
  mainCategoriesQuery,
  postsForRandomComponentQuery,
} from 'requests/graphql-queries';
import LibraryPage from 'components/pages/LibraryPage';
import useNotFoundNotification from 'hooks/useNotFoundNotification';
import { getLibraryPageData } from 'requests/getLibraryPageData';

const CATEGORY_MAP = {
  20098: 'clientAlert',
  99: 'firmEvents',
  599: 'firmInsights',
  98: 'firmNews',
  30518: 'attorneySpotlight',
};

const ORDER_OF_CATEGORIES = [
  'clientAlert',
  'firmEvents',
  'firmInsights',
  'firmNews',
  'attorneySpotlight',
];

function extractCategories(
  categories,
  idMap = CATEGORY_MAP,
  orderedKeys = ORDER_OF_CATEGORIES,
) {
  const map = categories.reduce((acc, category) => {
    const key = idMap[category.databaseId];
    if (key) acc[key] = category;
    return acc;
  }, {});

  const ordered = orderedKeys.map((key) => map[key]).filter(Boolean);

  return { map, ordered };
}

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

  return {
    props: {
      seo,
      title,
      description: pagesFields?.description,
      posts: posts?.nodes || [],
      filters,
      categoriesData: extractCategories(filters?.categories),
      subHeaderSlides,
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
  categoriesData,
  subHeaderSlides,
}) => {
  const canonicalUrl = `${PRODUCTION_URL}/library`;

  useNotFoundNotification("Category doesn't exist!");

  const libraryProps = {
    seo,
    title,
    description,
    canonicalUrl,
    posts,
    filters,
    categoriesData,
    subHeaderSlides,
  };
  return <LibraryPage {...libraryProps} />;
};

export default Library;
