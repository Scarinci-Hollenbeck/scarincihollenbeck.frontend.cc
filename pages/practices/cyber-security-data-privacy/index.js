import { useRouter } from 'next/router';
import { fetchAPI } from 'requests/api';
import { getPracticesQuery } from 'requests/graphql-queries';
import CyberSecurityPage from 'components/practices-special/cyber-security/CyberSecurityPage';
import { PRODUCTION_URL } from '../../../utils/constants';
import SiteLoader from '../../../components/shared/SiteLoader';
import {
  getPracticeAttorneys,
  headMetaData,
} from '../../../requests/practices/practice-default';
import { getSlugFromUrl, sortByKey } from '../../../utils/helpers';
import ApolloWrapper from '../../../layouts/ApolloWrapper';

const getPractices = async () => {
  const data = await fetchAPI(getPracticesQuery, {});
  return data.practices.nodes
    .filter(({ practicePortalPageContent }) => practicePortalPageContent?.practicePortalCategories?.includes(
      'Core Practices',
    ))
    .map(({ databaseId, title, uri }) => ({
      databaseId,
      title,
      uri,
    }));
};

/** Set single practice data to page props */
export const getServerSideProps = async ({ res, resolvedUrl }) => {
  res.setHeader(
    'Cache-Control',
    'max-age=0, s-maxage=60, stale-while-revalidate',
  );
  const slug = getSlugFromUrl(resolvedUrl);

  const {
    practice,
    includeAttorney,
    practiceChief,
    keyContactsList,
    corePractices,
  } = await getPracticeAttorneys(resolvedUrl);

  const practices = await getPractices();

  practice.practiceContentByCategory.cyberSecurity = {
    backgroundGif: '/images/SubHeaderCyberSecurity.gif',
    subTitle: [
      'Rapid technological advances and the explosion of e-commerce have turned cybersecurity and data privacy from an afterthought to a key business concern.',
      'Scarinci Hollenbeck’s Cybersecurity & Data Privacy Practice Group is dedicated to providing cutting-edge legal guidance that helps clients safeguard and manage their critical information.',
    ],
    subHeaderBgLogo: '/images/subHeaderBgLogo.svg',
    practicesFooterImage: {
      sourceUrl: '/images/practicesFooterImage.jpg',
      altText: 'Hollywood',
      width: 4096,
      height: 1530,
    },
  };

  if (typeof practice === 'undefined') {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      practice,
      cyberSecurityData: practice.practiceContentByCategory.cyberSecurity,
      chairPractice: practiceChief || [],
      attorneyListPractice: includeAttorney || [],
      keyContactsList,
      attorneysSchemaData: headMetaData(practiceChief, includeAttorney),
      corePractices,
      practiceChildren: practice?.practicesIncluded?.childPractice,
      slug,
      practices: sortByKey(practices, 'title'),
    },
  };
};

const CyberSecurity = ({
  practice,
  corePractices,
  practiceChildren,
  slug,
  attorneysSchemaData,
  chairPractice,
  attorneyListPractice,
  keyContactsList,
  cyberSecurityData,
  practices,
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

  const propsPage = {
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
    cyberSecurityData,
    practices,
  };
  return (
    <ApolloWrapper>
      <CyberSecurityPage {...propsPage} />
    </ApolloWrapper>
  );
};

export default CyberSecurity;
