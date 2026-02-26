import { PRODUCTION_URL, CURRENT_DOMAIN } from 'utils/constants';
import LibrarySearchResultsPage from 'components/pages/LibrarySearchResultsPage';
import { getFilteredLibraryData } from 'requests/getFilteredLibraryData';
import { getBaseUrl, stripHtml } from 'utils/helpers';

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

  const canonicalUrl = `${PRODUCTION_URL}/library/search`;

  const breadcrumbs = [
    { name: 'Home', url: `${CURRENT_DOMAIN}/` },
    { name: 'Library', url: `${CURRENT_DOMAIN}/library` },
    { name: 'Search Results' },
  ];

  const webPageData = {
    url: canonicalUrl,
    name: title,
    description: stripHtml(pagesFields?.description),
    pageType: 'CollectionPage',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${PRODUCTION_URL}/library/search?keyword={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return {
    props: {
      postsData,
      seo: {
        ...seo,
        canonicalUrl,
      },
      title,
      description: pagesFields?.description,
      filters,
      subHeaderSlides,
      tags,
      breadcrumbs,
      webPageData,
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
  breadcrumbs,
  webPageData,
}) => {
  const libraryProps = {
    seo,
    title,
    description,
    filters,
    subHeaderSlides,
    postsData,
    tags,
    breadcrumbs,
    webPageData,
  };
  return <LibrarySearchResultsPage {...libraryProps} />;
};

export default LibrarySearch;
