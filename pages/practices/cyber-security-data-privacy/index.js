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
    aboutUsContent: {
      title: 'Who We Are',
      infoItems: [
        {
          id: 1,
          title: 'Comprehensive Legal Guidance',
          description: 'As a full-service law firm, Scarinci Hollenbeck is positioned to address the myriad of issues that can arise from cybersecurity and data privacy concerns. Our lawyers have extensiv',
        },
        {
          id: 2,
          title: 'Proactive Legal Strategies',
          description: 'The cliché — a good offense is the best defense —rings true when it comes to cyber and data security. Our team is committed to offering solutions to identify threats, reduce',
        },
        {
          id: 3,
          title: 'Unparalleled Commitment',
          description: 'The firm’s cybersecurity and data privacy attorneys work closely with our clients to develop tailored solutions that reflect the unique risks to their business, as determined by',
        },
      ],
      image: {
        sourceUrl: '/images/whoWeAreImage.png',
        altText: 'whoWeAreImage',
        width: 1920,
        height: 1080,
      },
      title2: 'What We Do',
      listInfo: 'We understand how critical it is to safeguard your data and avoid regulatory missteps. Our lawyers have hands-on business experience that enables us to provide strategic business consulting on all aspects of information policy, including privacy, information security, and records management. Our legal services include:',
      listItems: [
        'Developing and implementing incident response protocols and policies;',
        'Conducting privacy and cybersecurity audits;',
        'Drafting and negotiating data privacy agreements;',
        'Implementing data collection, retention, and destruction policies;',
        'Coordinating criminal and civil responses following a data breach;',
        'Assisting clients in understanding and complying with the legal standards spanning from protection of data to breach responses;',
        'Handling any privacy-related claims and disputes;',
        'Providing advice regarding cyber insurance matters;',
        'Providing advice regarding cyber insurance matters;',
        'Defending actions brought against businesses as a result of breaches, including actions filed under federal laws such as Gramm–Leach–Bliley Act, Computer Fraud and Abuse Act, Electronic Communications Privacy Act, Health Insurance Portability and Accountability Act of 1996 (HIPAA), General Data Protection Regulation (GDPR), and California Consumer Privacy Act (CCPA); and New York Cybersecurity Requirements for Financial Services Companies.',
        'Assisting with dispute resolution, management of consumer concerns, response to allegations of misuse of data, and state and federal investigations (including actions and requests for information from state attorneys general, the Department of Justice, and the Federal Trade Commission);',
        'Drafting and implementing employee policies, handbooks, and training',
        'Addressing issues concerning consumer privacy, online advertising, behavioral marketing, social media, and data sharing.',
      ],
    },
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
