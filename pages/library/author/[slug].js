import { PRODUCTION_URL } from 'utils/constants';
import { fetchAPI, fetchRestAPI } from 'requests/api';
import LibraryAuthorPage from 'components/pages/LibraryAuthorPage';
import { authorContentQuery, categoriesQuery } from 'requests/graphql-queries';
import { sanitizeCategories, sanitizeLibraryQueryParams } from 'utils/helpers';
import empty from 'is-empty';

export const getServerSideProps = async ({ params, query, res }) => {
  res.setHeader(
    'Cache-Control',
    'max-age=0, s-maxage=60, stale-while-revalidate',
  );
  const { slug } = params;

  const [authorContent, mainCategories] = await Promise.all([
    fetchAPI(authorContentQuery, {
      variables: { id: slug },
    }),
    fetchAPI(categoriesQuery),
  ]);

  if (empty(authorContent) || empty(authorContent?.user)) {
    return {
      notFound: true,
    };
  }
  const { user } = authorContent;
  const filtersParams = sanitizeLibraryQueryParams(query);
  const {
    posts, found_posts, paged, posts_per_page, tags,
  } = await fetchRestAPI('library_filters', {
    ...filtersParams,
    author: user?.databaseId,
  });

  const postsData = {
    posts: posts || [],
    total: found_posts || 0,
    currentPage: paged || 1,
    postsPerPage: posts_per_page || 10,
  };

  return {
    props: {
      title: `Writings by ${user?.name}`,
      description: user?.description,
      authorId: user?.databaseId,
      seo: {
        ...user?.seo,
        canonicalUrl: `${PRODUCTION_URL}/library/author/${slug}`,
      },
      subHeaderSlides: sanitizeCategories([
        ...mainCategories?.categories?.nodes,
        mainCategories?.pageBy,
      ]),
      postsData,
      tags,
    },
  };
};

const LibraryAuthor = ({
  title,
  description,
  authorId,
  seo,
  subHeaderSlides,
  postsData,
  tags,
}) => {
  const authorProps = {
    title,
    description,
    authorId,
    seo,
    subHeaderSlides,
    postsData,
    tags,
  };

  return <LibraryAuthorPage {...authorProps} />;
};

export default LibraryAuthor;
