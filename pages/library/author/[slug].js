import { PRODUCTION_URL, CURRENT_DOMAIN } from 'utils/constants';
import LibraryAuthorPage from 'components/pages/LibraryAuthorPage';
import { getBaseUrl, sanitizeCategories, stripHtml } from 'utils/helpers';
import empty from 'is-empty';
import { getFilteredLibraryData } from 'requests/getFilteredLibraryData';

export const getServerSideProps = async ({
  params, query, req, res,
}) => {
  res.setHeader(
    'Cache-Control',
    'max-age=0, s-maxage=60, stale-while-revalidate=120',
  );
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

  const canonicalUrl = `${PRODUCTION_URL}/library/author/${slug}`;

  const breadcrumbs = [
    { name: 'Home', url: `${CURRENT_DOMAIN}/` },
    { name: 'Library', url: `${CURRENT_DOMAIN}/library` },
    { name: `Writings by ${user?.name}` },
  ];

  const authorPersonData = [
    {
      '@type': 'Person',
      '@id': `${canonicalUrl}#person`,
      name: user.name,
      url: user.url || canonicalUrl,
      ...(user.avatar?.url && {
        image: { '@type': 'ImageObject', url: user.avatar.url },
      }),
      ...(user.description && { description: stripHtml(user.description) }),
      worksFor: {
        '@type': 'LegalService',
        '@id': `${CURRENT_DOMAIN}/#organization`,
      },
    },
  ];

  const webPageData = {
    url: canonicalUrl,
    name: `Writings by ${user?.name}`,
    description: stripHtml(user?.description),
    pageType: 'CollectionPage',
    mainEntity: { '@id': `${canonicalUrl}#person` },
  };

  return {
    props: {
      title: `Writings by ${user?.name}`,
      description: user?.description,
      authorId: user?.databaseId,
      seo: {
        ...user?.seo,
        canonicalUrl,
      },
      subHeaderSlides: sanitizeCategories([
        ...mainCategories?.categories?.nodes,
        mainCategories?.pageBy,
      ]),
      postsData,
      tags,
      breadcrumbs,
      webPageData,
      authorPersonData,
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
  breadcrumbs,
  webPageData,
  authorPersonData,
}) => {
  const authorProps = {
    title,
    description,
    authorId,
    seo,
    subHeaderSlides,
    postsData,
    tags,
    breadcrumbs,
    webPageData,
    authorPersonData,
  };

  return <LibraryAuthorPage {...authorProps} />;
};

export default LibraryAuthor;
