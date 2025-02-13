import { PRODUCTION_URL } from 'utils/constants';
import { fetchAPI, fetchRestAPI } from 'requests/api';
import {
  libraryPageContentQuery,
  mainCategoriesQuery,
} from 'requests/graphql-queries';
import { getLibraryFiltersData } from 'requests/getLibraryFiltersData';
import LibrarySearchResultsPage from 'components/pages/LibrarySearchResultsPage';
import empty from 'is-empty';
import { sanitizeLibraryQueryParams } from 'utils/helpers';

export async function getServerSideProps({ query }) {
  const filtersParams = sanitizeLibraryQueryParams(query);

  if (empty(filtersParams)) {
    return {
      redirect: {
        destination: '/library',
        permanent: true,
      },
    };
  }
  const [
    data,
    {
      pageBy: { title, seo, pagesFields },
    },
    { filters, subHeaderSlides },
  ] = await Promise.all([
    fetchRestAPI('library_filters', filtersParams),
    fetchAPI(libraryPageContentQuery),
    getLibraryFiltersData(mainCategoriesQuery),
  ]);

  const postsData = {
    posts: data?.posts || [],
    total: data?.found_posts || 0,
    currentPage: data?.paged || 1,
    postsPerPage: data?.posts_per_page || 10,
  };

  return {
    props: {
      postsData,
      seo: {
        ...seo,
        canonicalUrl: `${PRODUCTION_URL}/library`,
      },
      title,
      description: pagesFields?.description,
      filters,
      subHeaderSlides,
      filtersParams,
      tags: data?.tags || [],
    },
  };
}

const LibrarySearch = ({
  seo,
  title,
  description,
  filters,
  subHeaderSlides,
  filtersParams,
  postsData,
  tags,
}) => {
  const libraryProps = {
    seo,
    title,
    description,
    filters,
    subHeaderSlides,
    filtersParams,
    postsData,
    tags,
  };
  return <LibrarySearchResultsPage {...libraryProps} />;
};

export default LibrarySearch;
