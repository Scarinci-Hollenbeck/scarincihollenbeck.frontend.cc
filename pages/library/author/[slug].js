import { PRODUCTION_URL } from 'utils/constants';
import { fetchAPI } from 'requests/api';
import LibraryAuthorPage from 'components/pages/LibraryAuthorPage';
import { authorContentQuery, categoriesQuery } from 'requests/graphql-queries';
import { sanitizeCategories } from 'utils/helpers';
import empty from 'is-empty';

export const getServerSideProps = async ({ params, res }) => {
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
    },
  };
};

const LibraryAuthor = ({
  title,
  description,
  authorId,
  seo,
  subHeaderSlides,
}) => {
  const authorProps = {
    title,
    description,
    authorId,
    seo,
    subHeaderSlides,
  };

  return <LibraryAuthorPage {...authorProps} />;
};

export default LibraryAuthor;
