import { PRODUCTION_URL, CURRENT_DOMAIN } from 'utils/constants';
import LibraryCategoryPage from 'components/pages/LibraryCategoryPage';
import empty from 'is-empty';
import { getFilteredLibraryData } from 'requests/getFilteredLibraryData';
import { getBaseUrl, stripHtml } from 'utils/helpers';

export const getServerSideProps = async ({
  params, query, req, res,
}) => {
  res.setHeader(
    'Cache-Control',
    'max-age=0, s-maxage=60, stale-while-revalidate=120',
  );
  const response = await fetch(
    `${getBaseUrl(req.headers.host)}/api/library/category-static?slug=${
      query.slug
    }`,
  );
  const { data, filters, subHeaderSlides } = await response.json();

  const pageContent = data?.category;

  if (empty(pageContent)) {
    return {
      notFound: true,
    };
  }

  const { postsData, tags } = await getFilteredLibraryData(query, {
    category: pageContent?.databaseId,
  });

  const canonicalUrl = `${PRODUCTION_URL}/library/category/${params.slug}`;

  const breadcrumbs = [
    { name: 'Home', url: `${CURRENT_DOMAIN}/` },
    { name: 'Library', url: `${CURRENT_DOMAIN}/library` },
    { name: pageContent?.name },
  ];

  const webPageData = {
    url: canonicalUrl,
    name: pageContent?.seo?.title || pageContent?.name,
    description: stripHtml(pageContent?.description),
    pageType: 'CollectionPage',
  };

  return {
    props: {
      title: pageContent?.name,
      description: pageContent?.description,
      seo: {
        ...pageContent?.seo,
        canonicalUrl,
      },
      categoryId: pageContent?.databaseId,
      filters,
      subHeaderSlides,
      postsData,
      tags,
      breadcrumbs,
      webPageData,
    },
  };
};

/** Library category page component -- /library/category/law-firm-insights etc. */
const LibraryCategory = ({
  title,
  description,
  seo,
  categoryId,
  filters,
  subHeaderSlides,
  postsData,
  tags,
  breadcrumbs,
  webPageData,
}) => {
  const libraryProps = {
    title,
    description,
    seo,
    categoryId,
    filters,
    subHeaderSlides,
    postsData,
    tags,
    breadcrumbs,
    webPageData,
  };

  return <LibraryCategoryPage {...libraryProps} />;
};

export default LibraryCategory;
