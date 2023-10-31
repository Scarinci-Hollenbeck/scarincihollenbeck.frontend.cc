import { useRouter } from 'next/router';
import { fetchAPI } from 'requests/api';
import { getPracticesQuery } from 'requests/graphql-queries';
import EntertainmentAndMediaPage from '../../../components/practices-special/entertainment-and-media/EntertainmentAndMediaPage';
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

  practice.practiceContentByCategory.entAndMedia = {
    subHeaderBtns: [
      {
        btnText: 'See attorneys',
        btnLink: '/practices/12',
      },
      {
        btnText: 'Know more',
        btnLink: '/practices/1',
      },
    ],
    subTitle:
      'Scarinci Hollenbeck’s dedicated Gaming Group provides regulatory and transactional legal advice to clients throughout the gaming industry. Our attorneys routinely help clients navigate the maze of state, federal, and international regulations, avoid compliance mistakes, and negotiate complex deals.',
    slidesData: [
      {
        id: 1,
        title: 'Entertainment',
        image: '/images/entAndMediaIntro.png',
      },
      {
        id: 2,
        title: 'Media',
        image: '/images/entAndMediaIntro2.jpg',
      },
      {
        id: 3,
        title: 'Sport',
        image: '/images/entAndMediaIntr3.png',
      },
    ],
    sliderCfg: {
      isSlidesAutoPlay: true,
      autoPlaySpeed: 3000,
    },
    attorneysBlockTitle: 'Meet our team',
    enterntainmentClientsData: {
      title: 'Attorneys in Action',
      description:
        'Our clients are as diverse as our experience. We have represented artists, songwriters, composers, bands, producers, engineers, managers, on-screen talent, models, fiction and non-fiction writers, studios, media production companies, music, recording and publishing companies, television production companies, new media and internet companies in various emerging markets, and non-profit organizations, amongst others. Below is a list of representative clients:',
      itemsPerPage: 3,
      toggleItems: [
        {
          id: 1,
          category: 'Media Law',
          name: 'Blue Cheer',
          profession: 'Rock band',
          image: '/images/artist.png',
          color: '#EFD090',
        },
        {
          id: 2,
          category: 'Entertainment Law',
          name: 'Artie Fletcher',
          profession: 'Comedian',
          image: '/images/artist.png',
          color: '#DFA043',
        },
        {
          id: 3,
          category: 'Media Law',
          name: 'Dave Ellefson – Megadeth',
          profession: 'Musician',
          image: '/images/artist.png',
          color: '#D36F5A',
        },
        {
          id: 4,
          category: 'Sport Law',
          name: 'Ashley Massaro',
          profession: 'Wrestler',
          image: '/images/artist.png',
          color: '#DFA043',
        },
        {
          id: 5,
          category: 'Media Law',
          name: 'Shawn Patterson – “Lego Movie” / “Everything is Awesome”',
          profession: 'Composer and songwriter',
          image: '/images/artist.png',
          color: '#EFD090',
        },
        {
          id: 6,
          category: 'Media Law',
          name: 'John Ginty – Robert Randolph',
          profession: 'Organist, keyboardist and session musician',
          image: '/images/artist.png',
          color: '#DFA043',
        },
        {
          id: 7,
          category: 'Media Law',
          name: 'Chuck Burgi – Billy Joel Band',
          profession: 'Drummer',
          image: '/images/artist.png',
          color: '#D36F5A',
        },
        {
          id: 8,
          category: 'Media Law',
          name: 'Zebra',
          profession: 'Music band',
          image: '/images/artist.png',
          color: '#DFA043',
        },
        {
          id: 9,
          category: 'Media Law',
          name: 'Rod Morgenstein',
          profession: 'Drummer',
          image: '/images/artist.png',
          color: '#EFD090',
        },
        {
          id: 10,
          category: 'Media Law',
          name: 'Little Anthony & the Imperials',
          profession: 'Vocal group',
          image: '/images/artist.png',
          color: '#DFA043',
        },
      ],
    },
    practicesFooterImage: {
      sourceUrl: '/images/practicesFooterImage.jpg',
      altText: 'Hollywood',
      width: 4096,
      height: 1530,
    },
    infoBlock: {
      tabs: [
        {
          id: 11,
          variant: 'first',
          title: 'Entertainment',
          image: '/images/entAndMediaInfoBlock.jpg',
          imageWidth: 1920,
          imageHeight: 1080,
          description:
            'Our entertainment attorneys have expertise in areas including literature, fine art, music, television, motion picture, broadcast and cable television, radio, advertisement, and digital technologies. Our entertainment law services include drafting and negotiating agreements for the creation, development, production, distribution, licensing and dissemination of all manner of entertainment content, products and services, such as',
          listServices: [
            'Music recording and publishing agreements',
            'Producer agreements',
            'Music licenses for film and television',
            'Artist intra-band agreements',
            'Scripted and non-scripted television and film production agreements',
            'On-screen and crew talent agreements for a myriad of media',
            'Management agreements',
            'Work-for-hire agreements',
            'Personal appearance agreements',
            'Book publishing agreements',
            'Name and likeness & endorsement agreements',
            'Content option agreements',
          ],
          modalData: {
            id: 111,
            modalList: [
              {
                id: 1,
                title: 'Sponsorship and Endorsement Agreements',
              },
              {
                id: 2,
                title: 'Film and Television Production Agreements',
              },
              {
                id: 3,
                title: 'Book Distribution Agreements',
              },
              {
                id: 4,
                title: 'Sale and Acquisition of Professional Sports Teams',
              },
              {
                id: 5,
                title: 'Author-Agent Agreements',
              },
              {
                id: 6,
                title:
                  'Copyright/Trademark Ownership, Registration and Enforcement',
              },
              {
                id: 7,
                title: 'Talent/Management Disputes',
              },
              {
                id: 8,
                title: 'Co-Promotion and Strategic Alliances',
              },
              {
                id: 9,
                title: 'Composer/Music Publishing Agreements',
              },
              {
                id: 10,
                title: 'Restraining Orders and Other Types of Litigation',
              },
              {
                id: 11,
                title: 'Right to Privacy/Publicity',
              },
              {
                id: 12,
                title: 'Composer/Music Publishing Agreements',
              },
              {
                id: 13,
                title: 'Restraining Orders and Other Types of Litigation',
              },
              {
                id: 14,
                title: 'Right to Privacy/Publicity',
              },
              {
                id: 15,
                title: 'Tax and Labor Law',
              },
            ],
            modalDescription:
              'Our attorneys are pioneers and leaders in the field of entertainment law, who have handled virtually every type of transaction that an entertainment or media business may require, including music recording and publishing agreements, producer agreements, music licenses for film and television, artist intra-band agreements, scripted and non-scripted television and film production agreements, on-screen and crew talent agreements for a myriad of media, management agreements, work-for-hire agreements, personal appearance agreements, book publishing agreements, name and likeness, and endorsement agreements.',
          },
        },
        {
          id: 22,
          variant: 'middle',
          title: 'Media',
          image: '/images/entAndMediaInfoBlock2.jpg',
          imageWidth: 1920,
          imageHeight: 1080,
          description:
            'Due to the development of new technologies, media companies face new legal challenges. Our media law services include:',
          listServices: [
            'First Amendment and newsgathering advice and defense',
            'Negotiating media rights',
            'Unfair competition matters',
            'Antitrust issues',
            'Privacy issues, including misrepresentation of photographic images',
            'Cease and desist notices',
            'Regulatory compliance',
            'Mergers and acquisitions of media properties and businesses',
            'Trademark and copyright registration, licensing, and enforcement',
          ],
          modalData: {
            id: 222,
            modalList: [
              {
                id: 1,
                title: 'Sponsorship Sponsorship',
              },
              {
                id: 2,
                title: 'Film and Television Production Agreements',
              },
              {
                id: 3,
                title: 'Book Distribution Agreements',
              },
              {
                id: 4,
                title: 'Sale and Acquisition of Professional Sports Teams',
              },
              {
                id: 5,
                title: 'Author-Agent Agreements',
              },
              {
                id: 6,
                title:
                  'Copyright/Trademark Ownership, Registration and Enforcement',
              },
              {
                id: 7,
                title: 'Talent/Management Disputes',
              },
              {
                id: 8,
                title: 'Co-Promotion and Strategic Alliances',
              },
              {
                id: 9,
                title: 'Composer/Music Publishing Agreements',
              },
              {
                id: 10,
                title: 'Restraining Orders and Other Types of Litigation',
              },
              {
                id: 11,
                title: 'Right to Privacy/Publicity',
              },
              {
                id: 12,
                title: 'Composer/Music Publishing Agreements',
              },
              {
                id: 13,
                title: 'Restraining Orders and Other Types of Litigation',
              },
              {
                id: 14,
                title: 'Right to Privacy/Publicity',
              },
              {
                id: 15,
                title: 'Tax and Labor Law',
              },
            ],
            modalDescription:
              'Our attorneys are pioneers and leaders in the field of entertainment law, who have handled virtually every type of transaction that an entertainment or media business may require, including music recording and publishing agreements, producer agreements, music licenses for film and television, artist intra-band agreements, scripted and non-scripted television and film production agreements, on-screen and crew talent agreements for a myriad of media, management agreements, work-for-hire agreements, personal appearance agreements, book publishing agreements, name and likeness, and endorsement agreements.',
          },
        },
        {
          id: 33,
          variant: 'second',
          title: 'Sport',
          image: '/images/entAndMediaInfoBlock3.jpg',
          imageWidth: 1920,
          imageHeight: 1080,
          description:
            'The firm’s IP attorneys are well-versed in the unique issues and challenges of the sports industry. We serve athletes, coaches, sports agents, sports marketing companies, franchises, esports businesses, and other industry players. Our sports law services include:',
          listServices: [
            'Contract drafting and negotiation, including licensing, sponsorship, and merchandising agreements',
            'Brand protection strategies for professional, amateur, and collegiate athletes',
            'Corporate formation and business transaction guidance for various sports ventures',
            'Advising Esports companies and players',
          ],
          modalData: {
            id: 333,
            modalList: [
              {
                id: 1,
                title: 'Sponsorship Sponsorship Sponsorship',
              },
              {
                id: 2,
                title: 'Film and Television Production Agreements',
              },
              {
                id: 3,
                title: 'Book Distribution Agreements',
              },
              {
                id: 4,
                title: 'Sale and Acquisition of Professional Sports Teams',
              },
              {
                id: 5,
                title: 'Author-Agent Agreements',
              },
              {
                id: 6,
                title:
                  'Copyright/Trademark Ownership, Registration and Enforcement',
              },
              {
                id: 7,
                title: 'Talent/Management Disputes',
              },
              {
                id: 8,
                title: 'Co-Promotion and Strategic Alliances',
              },
              {
                id: 9,
                title: 'Composer/Music Publishing Agreements',
              },
              {
                id: 10,
                title: 'Restraining Orders and Other Types of Litigation',
              },
              {
                id: 11,
                title: 'Right to Privacy/Publicity',
              },
              {
                id: 12,
                title: 'Composer/Music Publishing Agreements',
              },
              {
                id: 13,
                title: 'Restraining Orders and Other Types of Litigation',
              },
              {
                id: 14,
                title: 'Right to Privacy/Publicity',
              },
              {
                id: 15,
                title: 'Tax and Labor Law',
              },
            ],
            modalDescription:
              'Our attorneys are pioneers and leaders in the field of entertainment law, who have handled virtually every type of transaction that an entertainment or media business may require, including music recording and publishing agreements, producer agreements, music licenses for film and television, artist intra-band agreements, scripted and non-scripted television and film production agreements, on-screen and crew talent agreements for a myriad of media, management agreements, work-for-hire agreements, personal appearance agreements, book publishing agreements, name and likeness, and endorsement agreements.',
          },
        },
      ],
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
      entAndMediaData: practice.practiceContentByCategory.entAndMedia,
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

const EnterteimentAndMedia = ({
  practice,
  corePractices,
  practiceChildren,
  slug,
  attorneysSchemaData,
  chairPractice,
  attorneyListPractice,
  keyContactsList,
  entAndMediaData,
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
    entAndMediaData,
    practices,
  };
  return (
    <ApolloWrapper>
      <EntertainmentAndMediaPage {...propsPage} />
    </ApolloWrapper>
  );
};

export default EnterteimentAndMedia;
