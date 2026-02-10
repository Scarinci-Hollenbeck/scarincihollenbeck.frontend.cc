import { PRODUCTION_URL } from 'utils/constants';
import LibraryCategoryPage from 'components/pages/LibraryCategoryPage';
import empty from 'is-empty';
import { getFilteredLibraryData } from 'requests/getFilteredLibraryData';
import { getBaseUrl } from 'utils/helpers';

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

  return {
    props: {
      title: pageContent?.name,
      description: pageContent?.description,
      seo: {
        ...pageContent?.seo,
        canonicalUrl: `${PRODUCTION_URL}/library/category/${params.slug}`,
      },
      categoryId: pageContent?.databaseId,
      filters,
      subHeaderSlides,
      postsData,
      tags,
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
  };

  return <LibraryCategoryPage {...libraryProps} />;
};

export default LibraryCategory;
