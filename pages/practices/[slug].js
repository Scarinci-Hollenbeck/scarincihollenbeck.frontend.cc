import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { PRODUCTION_URL } from 'utils/constants';
import ApolloWrapper from 'layouts/ApolloWrapper';
import empty from 'is-empty';
import PracticePageNew from 'components/pages/PracticePageNew';
import { formateAwards } from 'utils/helpers';
import { fetchAPI } from '../../requests/api';
import { getPracticeData } from '../../requests/practices/practice-default';

const SiteLoader = dynamic(() => import('components/shared/SiteLoader'));

const practicesSlugsQuery = `
query practicesSlugs {
  practices(first: 100, where: {status: PUBLISH}) {
    nodes {
      slug
    }
  }
}`;

/** Set single practice data to page props */
export const getStaticPaths = async () => {
  const listId = await fetchAPI(practicesSlugsQuery);
  const paths = [];

  listId?.practices?.nodes?.forEach((node) => {
    paths.push(`/practices/${node?.slug}`);
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }) => {
  const {
    practice,
    includeAttorney,
    practiceChief,
    keyContactsList,
    faq,
    practices,
  } = await getPracticeData(`/practices/${params.slug}`);

  // 04.04.2024 Google reviews temporarily disabled
  // const googleReviews = await getGoogleReviewsForPalaces(
  //   Object.values(googleLocationIds),
  // );

  if (empty(practice)) {
    return {
      redirect: {
        destination: '/services?notFound=true',
        permanent: true,
      },
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
      attorneysSchemaData: attorneysSchemaAttorney,
      chairPractice: practiceChief || [],
      attorneyListPractice: includeAttorney || [],
      keyContactsList,
      faq,
      whyChooseUsData: practice?.practicesIncluded?.whyChooseUs,
      practices,
      awards: formateAwards(practice?.practicesIncluded?.awards),
      // googleReviews: deleteReviewsWithoutComment(googleReviews.flat()),
    },
    revalidate: 8600,
  };
};

/** Single practice page component */
const SinglePractice = ({
  practice,
  attorneysSchemaData,
  chairPractice,
  attorneyListPractice,
  keyContactsList,
  faq,
  whyChooseUsData,
  practices,
  googleReviews,
  awards,
}) => {
  const router = useRouter();
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
    // related articles not used on new pages practices 02.01.2024
    // {
    //   id: 99,
    //   title: 'Related Articles',
    //   content: '<h4>Related Articles</h4>',
    // },
  ];

  const practiceProps = {
    practice,
    canonicalUrl,
    attorneysSchemaData,
    keyContactsList,
    tabs: fullTabs,
    chairPractice,
    attorneyListPractice,
    faq,
    whyChooseUsData,
    practices,
    googleReviews,
    awards,
  };

  return (
    <ApolloWrapper>
      <PracticePageNew {...practiceProps} />
    </ApolloWrapper>
  );
};

export default SinglePractice;
