import { PRODUCTION_URL } from 'utils/constants';
import LibrarySearchResultsPage from 'components/pages/LibrarySearchResultsPage';
import { getFilteredLibraryData } from 'requests/getFilteredLibraryData';
import { getBaseUrl } from 'utils/helpers';

export async function getServerSideProps({ query, req, res }) {
  res.setHeader(
    'Cache-Control',
    'max-age=0, s-maxage=60, stale-while-revalidate=120',
  );
  const [{ postsData, tags }, response] = await Promise.all([
    getFilteredLibraryData(query),
    fetch(`${getBaseUrl(req.headers.host)}/api/library/search-static`),
  ]);

  const { pageBy, filters, subHeaderSlides } = await response.json();

  const { title, seo, pagesFields } = pageBy;

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
