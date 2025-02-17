import { PRODUCTION_URL } from 'utils/constants';
import LibraryAuthorPage from 'components/pages/LibraryAuthorPage';
import { getBaseUrl, sanitizeCategories } from 'utils/helpers';
import empty from 'is-empty';
import { getFilteredLibraryData } from 'requests/getFilteredLibraryData';

export const getServerSideProps = async ({ params, query, req }) => {
  const { slug } = params;

  const response = await fetch(
    `${getBaseUrl(req.headers.host)}/api/library/author-static?slug=${
      query.slug
    }`,
  );

  const { authorContent, mainCategories } = await response.json();

  if (empty(authorContent) || empty(authorContent?.user)) {
    return {
      notFound: true,
    };
  }
  const { user } = authorContent;

  const { postsData, tags } = await getFilteredLibraryData(query, {
    author: user?.databaseId,
  });

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
