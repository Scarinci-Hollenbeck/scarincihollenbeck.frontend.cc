import { PRODUCTION_URL } from 'utils/constants';
import empty from 'is-empty';
import PracticePageNew from 'components/pages/PracticePageNew';
import { formateAwards } from 'utils/helpers';
import { getFilteredLibraryData } from 'requests/getFilteredLibraryData';
import { fetchAPI } from '../../requests/api';
import { getPracticeData } from '../../requests/practices/practice-default';

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

  if (empty(practice) || practice?.status !== 'publish') {
    return {
      redirect: {
        destination: '/services?notFound=true',
        permanent: true,
      },
    };
  }

  const { postsData } = await getFilteredLibraryData({
    practices: practice?.databaseId,
    limit: '8',
  });

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
      sidebarContent: practice?.practicesIncluded?.sidebarContent || null,
      posts: postsData?.posts || [],
    },
    revalidate: 600,
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
  awards,
  sidebarContent,
  posts,
}) => {
  const canonicalUrl = `${PRODUCTION_URL}/practices/${practice.slug}`;

  const siteTabs = practice.practicesIncluded.contentSection.map(
    (tab, index) => ({
      ...tab,
      id: index,
    }),
  );

  const practiceProps = {
    practice,
    canonicalUrl,
    attorneysSchemaData,
    keyContactsList,
    tabs: siteTabs,
    chairPractice,
    attorneyListPractice,
    faq,
    whyChooseUsData,
    practices,
    awards,
    sidebarContent,
    posts,
  };

  return <PracticePageNew {...practiceProps} />;
};

export default SinglePractice;
