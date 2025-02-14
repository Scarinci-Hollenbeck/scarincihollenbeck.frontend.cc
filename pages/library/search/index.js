import { PRODUCTION_URL } from 'utils/constants';
import { fetchAPI } from 'requests/api';
import {
  categoriesQuery,
  libraryPageContentQuery,
} from 'requests/graphql-queries';
import { getLibraryPageData } from 'requests/getLibraryPageData';
import LibrarySearchResultsPage from 'components/pages/LibrarySearchResultsPage';
import { getFilteredLibraryData } from 'requests/getFilteredLibraryData';

export async function getServerSideProps({ query, res }) {
  res.setHeader(
    'Cache-Control',
    'max-age=0, s-maxage=60, stale-while-revalidate',
  );

  const [
    { postsData, tags },
    {
      pageBy: { title, seo, pagesFields },
    },
    { filters, subHeaderSlides },
  ] = await Promise.all([
    getFilteredLibraryData(query),
    fetchAPI(libraryPageContentQuery),
    getLibraryPageData(categoriesQuery),
  ]);

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
      tags,
    },
  };
}

const LibrarySearch = ({
  seo,
  title,
  description,
  filters,
  subHeaderSlides,
  postsData,
  tags,
}) => {
  const libraryProps = {
    seo,
    title,
    description,
    filters,
    subHeaderSlides,
    postsData,
    tags,
  };
  return <LibrarySearchResultsPage {...libraryProps} />;
};

export default LibrarySearch;
