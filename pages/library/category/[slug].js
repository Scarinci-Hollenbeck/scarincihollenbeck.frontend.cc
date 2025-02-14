import { PRODUCTION_URL } from 'utils/constants';
import { fetchAPI } from 'requests/api';
import {
  categoriesQuery,
  categoryPageContentQuery,
} from 'requests/graphql-queries';
import LibraryCategoryPage from 'components/pages/LibraryCategoryPage';
import empty from 'is-empty';
import { getLibraryPageData } from 'requests/getLibraryPageData';
import { getFilteredLibraryData } from 'requests/getFilteredLibraryData';

export const getServerSideProps = async ({ params, query, res }) => {
  res.setHeader(
    'Cache-Control',
    'max-age=0, s-maxage=60, stale-while-revalidate',
  );
  const [data, { filters, subHeaderSlides }] = await Promise.all([
    fetchAPI(categoryPageContentQuery, {
      variables: {
        slug: params.slug,
      },
    }),
    getLibraryPageData(categoriesQuery),
  ]);

  const pageContent = data?.category;

  if (empty(pageContent)) {
    return {
      redirect: {
        destination: '/library?notFound=true',
        permanent: true,
      },
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
