import { PRODUCTION_URL, CURRENT_DOMAIN } from 'utils/constants';
import LibraryAuthorPage from 'components/pages/LibraryAuthorPage';
import { sanitizeCategories, stripHtml } from 'utils/helpers';
import { fetchOwnApi } from 'requests/fetchOwnApi';
import empty from 'is-empty';
import { getFilteredLibraryData } from 'requests/getFilteredLibraryData';

export const getServerSideProps = async ({
  params, query, req, res,
}) => {
  // The literal route path (/library/author/[slug]) comes without params.
  const slug = params?.slug;
  if (!slug) return { notFound: true };

  // A WordPress failure throws (500, not cached by the CDN); only an author
  // WordPress does not have is a 404.
  const { authorContent, mainCategories } = await fetchOwnApi(
    req,
    `/api/library/author-static?slug=${encodeURIComponent(slug)}`,
  );

  if (empty(authorContent) || empty(authorContent?.user)) {
    res.setHeader(
      'Cache-Control',
      'max-age=0, s-maxage=60, stale-while-revalidate=120',
    );
    return {
      notFound: true,
    };
  }
  const { user } = authorContent;

  const { postsData, tags } = await getFilteredLibraryData(query, {
    author: user?.databaseId,
  });

  res.setHeader(
    'Cache-Control',
    'max-age=0, s-maxage=60, stale-while-revalidate=120',
  );

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
