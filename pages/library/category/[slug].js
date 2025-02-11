import { PRODUCTION_URL } from 'utils/constants';
import { fetchAPI } from 'requests/api';
import {
  categoriesQuery,
  categoryPageContentQuery,
} from 'requests/graphql-queries';
import LibraryCategoryPage from 'components/pages/LibraryCategoryPage';
import empty from 'is-empty';
import { getLibraryFiltersData } from 'requests/getLibraryFiltersData';

/** get the current category's latest post WP GRAPHQL API */
async function getCategoryContent(variables) {
  const data = await fetchAPI(categoryPageContentQuery, variables);
  return data?.category;
}

const categoriesSlugsQuery = `
query categoriesSlugs {
  categories(first: 100) {
    nodes {
      slug
    }
  }
}`;

export const getStaticPaths = async () => {
  const listId = await fetchAPI(categoriesSlugsQuery);

  const paths = [];

  listId.categories.nodes.forEach((node) => {
    paths.push(`/library/category/${node?.slug}`);
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }) => {
  const [pageContent, { filters, subHeaderSlides }] = await Promise.all([
    getCategoryContent({
      variables: {
        slug: params.slug,
      },
    }),
    getLibraryFiltersData(categoriesQuery),
  ]);

  if (empty(pageContent)) {
    return {
      redirect: {
        destination: '/library?notFound=true',
        permanent: true,
      },
    };
  }

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
    },
    revalidate: 3600,
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
}) => {
  const libraryProps = {
    title,
    description,
    seo,
    categoryId,
    filters,
    subHeaderSlides,
  };

  return <LibraryCategoryPage {...libraryProps} />;
};

export default LibraryCategory;
