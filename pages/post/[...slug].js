import {
  CURRENT_DOMAIN,
  PRODUCTION_URL,
  ScarinciHollenbeckAuthor,
} from 'utils/constants';
import { fetchAPI } from 'requests/api';
import {
  postMainCategoryContentQuery,
  postQuery,
} from 'requests/graphql-queries';
import empty from 'is-empty';
import ArticlePage from 'components/pages/ArticlePage';
import { changePostLink, attorneysSanitize } from '../../utils/helpers';

const authorsSanitize = (attorneysArr) => attorneysArr.map((attorney) => {
  attorney.profileImage = attorney.attorneyMainInformation.profileImage?.sourceUrl
      || '/images/no-image-found-diamond-750x350.png';
  return {
    uri: attorney.uri,
    display_name: attorney.title,
    databaseId: attorney.databaseId,
    description: attorney.attorneyBiography.miniBio,
    profileImage: attorney.profileImage,
    email: attorney.attorneyMainInformation.email,
    phoneNumber: attorney.attorneyMainInformation.phoneNumber,
    designation: attorney.attorneyMainInformation.designation,
    author: {
      ...(attorney?.attorneyAuthorId?.authorId ?? {}),
      uri: attorney?.attorneyAuthorId?.authorId?.uri
        ? `/library${attorney?.attorneyAuthorId?.authorId?.uri}`
        : '/firm-overview',
    },
  };
});

const getPostContentData = async (slug, categorySlug) => {
  const [{ post }, postMainCategoryContent] = await Promise.all([
    fetchAPI(postQuery, {
      variables: { id: slug },
    }),
    fetchAPI(postMainCategoryContentQuery, {
      variables: { id: categorySlug },
    }),
  ]);

  if (
    empty(post)
    || post?.status?.toLowerCase() !== 'publish'
    || empty(post?.content)
  ) {
    return undefined;
  }

  const filteredAuthors = post?.selectAuthors?.authorDisplayOrder?.filter(
    (item) => item?.uri && !item.uri.includes('post_type'),
  );

  const selectedAuthors = !empty(filteredAuthors)
    ? authorsSanitize(filteredAuthors)
    : ScarinciHollenbeckAuthor;

  const selectedHeroes = !empty(post?.selectHeroes?.selectAttorneys)
    ? attorneysSanitize(post.selectHeroes.selectAttorneys)
    : [];

  const seo = {
    metaTitle: post?.seo?.title,
    metaDescription: post?.seo?.opengraphDescription,
    opengraphImage: !empty(post?.seo?.opengraphImage?.sourceUrl)
      ? post.seo.opengraphImage.sourceUrl
      : `${CURRENT_DOMAIN}/images/no-image-found-diamond.png`,
    canonicalUrl: `${PRODUCTION_URL}${changePostLink(post?.link)}`,
  };

  return {
    authors: selectedAuthors,
    selectedHeroes,
    seo,
    content: post?.content,
    title: post?.title,
    date: post?.date,
    mainCategory: postMainCategoryContent?.category,
    tags: post?.tags?.nodes,
    postTypeConnections: post?.linksToOtherPostTypes,
  };
};

export const getServerSideProps = async ({ params, res, query }) => {
  res.setHeader(
    'Cache-Control',
    'max-age=0, s-maxage=600, stale-while-revalidate=120',
  );
  const postSlug = params.slug[params.slug.length - 1];
  const { category } = query;

  const postData = await getPostContentData(postSlug, category);

  if (!postData) {
    res.statusCode = 404;
    return {
      notFound: true,
    };
  }

  const {
    content,
    title,
    date,
    mainCategory,
    authors,
    selectedHeroes,
    seo,
    tags,
    postTypeConnections,
  } = postData;

  const post = {
    content,
    title,
    date,
    tags,
    postTypeConnections,
  };

  return {
    props: {
      post,
      seo,
      authors,
      keyContacts: authors,
      relatedPosts: mainCategory?.posts?.nodes || null,
      mainCategory: mainCategory || null,
      selectedHeroes,
    },
  };
};

/* The blog post component */
const SinglePost = ({
  post,
  seo,
  authors,
  relatedPosts,
  mainCategory,
  keyContacts,
  selectedHeroes,
}) => {
  const postProps = {
    post,
    seo,
    authors,
    relatedPosts,
    mainCategory,
    keyContacts,
    selectedHeroes,
  };
  return <ArticlePage {...postProps} />;
};

export default SinglePost;
