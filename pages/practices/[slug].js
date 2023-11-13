import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { PRODUCTION_URL } from 'utils/constants';
import PracticePage from 'components/pages/PracticePage';
import ApolloWrapper from 'layouts/ApolloWrapper';
import empty from 'is-empty';
import { getJustClientAlertOnePost } from '../../requests/graphql-queries';
import { fetchAPI } from '../../requests/api';
import { getPracticeAttorneys } from '../../requests/practices/practice-default';

const SiteLoader = dynamic(() => import('components/shared/SiteLoader'));

export const postsSanitize = (posts) => posts.map((post) => {
  post.featuredImage = post.featuredImage?.node.sourceUrl
      || '/images/no-image-found-diamond-750x350.png';
  return post;
});

const getClientAlertPost = async () => {
  const data = await fetchAPI(getJustClientAlertOnePost);

  if (!data) {
    return [];
  }

  return postsSanitize(data.posts.nodes);
};

/** Set single practice data to page props */
export const getServerSideProps = async ({ params, res, resolvedUrl }) => {
  res.setHeader(
    'Cache-Control',
    'max-age=0, s-maxage=60, stale-while-revalidate',
  );
  const {
    practice,
    includeAttorney,
    practiceChief,
    keyContactsList,
    corePractices,
    posts,
  } = await getPracticeAttorneys(resolvedUrl);
  const clientAlertPost = await getClientAlertPost();

  const latestFromTheFirm = [...posts, ...clientAlertPost];

  if (empty(practice)) {
    return {
      notFound: true,
    };
  }

  const attorneysSchemaChair = practiceChief?.length > 0
    ? practiceChief?.map((attorney) => ({
      '@type': 'Person',
      name: attorney.title,
      image: attorney.profileImage,
      url: attorney.link,
      telephone: attorney.phoneNumber,
      jobTitle: 'Attorney',
    }))
    : [];

  const attorneysSchemaAttorneyList = includeAttorney?.length > 0
    ? includeAttorney?.map((attorney) => ({
      '@type': 'Person',
      name: attorney.title,
      image: attorney.profileImage,
      url: attorney.link,
      telephone: attorney.phoneNumber,
      jobTitle: 'Attorney',
    }))
    : [];

  const attorneysSchemaAttorney = [
    ...attorneysSchemaChair,
    ...attorneysSchemaAttorneyList,
  ];

  return {
    props: {
      practice,
      chairPractice: practiceChief || [],
      attorneyListPractice: includeAttorney || [],
      keyContactsList,
      attorneysSchemaData: attorneysSchemaAttorney,
      corePractices,
      practiceChildren: practice?.practicesIncluded?.childPractice,
      latestFromTheFirm,
      slug: params.slug,
    },
  };
};

/** Single practice page component */
const SinglePractice = ({
  practice,
  corePractices,
  practiceChildren,
  slug,
  attorneysSchemaData,
  chairPractice,
  attorneyListPractice,
  keyContactsList,
  latestFromTheFirm,
}) => {
  const router = useRouter();
  const practiceUrl = router.asPath
    .replace('/practices/', '')
    .replace('/practice/', '');
  const canonicalUrl = `${PRODUCTION_URL}/practices/${practice.slug}`;

  if (router.isFallback) {
    return <SiteLoader />;
  }

  const siteTabs = practice.practicesIncluded.contentSection.map(
    (tab, index) => ({
      ...tab,
      id: index,
    }),
  );

  const fullTabs = [
    ...siteTabs,
    {
      id: 99,
      title: 'Related Articles',
      content: '<h4>Related Articles</h4>',
    },
  ];

  const practiceProps = {
    corePractices,
    practice,
    practiceChildren,
    attorneysSchemaData,
    practiceUrl,
    canonicalUrl,
    tabs: fullTabs,
    slug,
    chairPractice,
    attorneyListPractice,
    keyContactsList,
    latestFromTheFirm,
  };
  return (
    <ApolloWrapper>
      <PracticePage {...practiceProps} />
    </ApolloWrapper>
  );
};

export default SinglePractice;
