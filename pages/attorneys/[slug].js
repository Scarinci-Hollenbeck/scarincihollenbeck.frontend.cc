import React from 'react';
import { fetchAPI } from 'requests/api';
import {
  attorneyBySlugQuery,
  checkAttorneyPostsQuery,
} from 'requests/graphql-queries';
import {
  concatNameUser,
  fetchExternalPosts,
  formatSrcToCloudinaryUrl,
  formateAwards,
  sanitizeExternalArticles,
} from 'utils/helpers';
import { GOV_LAW_URL } from 'utils/constants';
import ApolloWrapper from 'layouts/ApolloWrapper';
import AttorneyProfilePage from 'components/pages/AttorneyProfilePage';
import empty from 'is-empty';

const mapDesignation = (title) => {
  const map = {
    'Red Bank, NJ Managing Partner': 'Red Bank, NJ Office Managing Partner',
    'Managing Partner': 'Firm Managing Partner',
    'Washington, D.C. Managing Partner':
      'Washington, D.C. Office Managing Partner',
  };

  return map[title] ?? title;
};

const removeDuplicates = (chairs, coChairs, services) => {
  if (empty(services)) return [];
  if (empty(chairs) && empty(coChairs)) return services;

  const urisToRemove = new Set(
    [...coChairs, ...chairs].map((item) => item.link),
  );

  return services.filter((service) => !urisToRemove.has(service?.uri));
};

/** Get the attorneys bio database on their slug */
async function attorneyBySlug(slug) {
  const data = await fetchAPI(attorneyBySlugQuery, {
    variables: { slug },
  });

  if (data?.attorneyProfileBy?.status !== 'publish') {
    return null;
  }

  return data?.attorneyProfileBy;
}

async function checkAttorneyBlogsExist(authorId, attorneyId, categories) {
  const blogs = await fetchAPI(checkAttorneyPostsQuery, {
    variables: { authorId, attorneyId, categories },
  });

  if (blogs.posts.pageInfo.startCursor) {
    return true;
  }

  return false;
}

const attorneysSlugsQuery = `
query attorneysSlugs {
  attorneyProfiles(first: 100, where: {status: PUBLISH}) {
    nodes {
      slug
    }
  }
}`;

const excludedSlugs = ['scarinci-hollenbeck'];

export async function getStaticPaths() {
  const listId = await fetchAPI(attorneysSlugsQuery);

  const paths = [];

  listId.attorneyProfiles.nodes.forEach((node) => {
    if (excludedSlugs.includes(node?.slug)) {
      return;
    }
    paths.push(`/attorneys/${node?.slug}`);
  });

  return {
    paths,
    fallback: 'blocking',
  };
}

export const getStaticProps = async ({ params }) => {
  const slug = params?.slug;

  const attorneyBio = await attorneyBySlug(slug);

  if (!attorneyBio) {
    return {
      redirect: {
        destination: '/attorneys?notFound=true',
        permanent: false,
      },
    };
  }

  /** Variables */
  const authorId = attorneyBio?.attorneyAuthorId?.authorId?.databaseId;
  const designation = mapDesignation(
    attorneyBio.attorneyMainInformation?.designation,
  );
  const profileImage = formatSrcToCloudinaryUrl(
    attorneyBio.attorneyMainInformation.profileImage?.sourceUrl,
  );
  const practices = attorneyBio.attorneyPrimaryRelatedPracticesLocationsGroups
    ?.relatedPractices
    ? attorneyBio.attorneyPrimaryRelatedPracticesLocationsGroups?.relatedPractices.map(
      ({ uri, title }) => ({
        uri,
        title,
      }),
    )
    : [];

  const offices = attorneyBio.attorneyPrimaryRelatedPracticesLocationsGroups.officeLocation?.map(
    ({ uri, id, title }) => ({
      link: uri,
      name: title,
      ID: id,
    }),
  );

  const chairs = attorneyBio.attorneyChairCoChair.chair
    ? attorneyBio.attorneyChairCoChair.chair.map(({ uri, title }) => ({
      title,
      link: uri,
    }))
    : [];

  const coChairs = attorneyBio.attorneyChairCoChair.coChair
    ? attorneyBio.attorneyChairCoChair.coChair.map(({ uri, title }) => ({
      title,
      link: uri,
    }))
    : [];

  const attorneyBiography = attorneyBio?.attorneyBiography?.biographyContent || null;
  const attorneyMiniBio = attorneyBio?.attorneyBiography?.miniBio || null;
  const attorneyBiographyChanged = attorneyBiography || attorneyMiniBio || null;

  /** Create new tabs for Government and Law & Con Law  & Drop Music esq */
  /** Get Attorney External Blog Posts */
  const govLawPosts = {};
  if (attorneyBio?.attorneyAwardsClientsBlogsVideos?.blogId) {
    const availBlogs = attorneyBio?.attorneyAwardsClientsBlogsVideos?.blogId?.map((bl) => Object.entries(bl).filter(([, value]) => value !== null))[0];

    for (let i = 0; i < availBlogs.length; i++) {
      const site = availBlogs[i][0];
      const authorId = availBlogs[i][1];

      if (site.includes('governmentLaw')) {
        const posts = await fetchExternalPosts(GOV_LAW_URL, authorId, 6);
        govLawPosts.id = authorId;

        if (posts?.length > 0) {
          govLawPosts.posts = sanitizeExternalArticles(posts);
        } else {
          govLawPosts.posts = [];
        }
      }
    }
  }

  /** SEO meta data */
  const seo = {
    title: attorneyBio?.seo?.title,
    canonicalLink: `attorneys/${params?.slug}`,
    metaDescription: attorneyBio?.seo?.metaDesc,
    image: profileImage,
    designation,
    socialMediaLinks: attorneyBio.attorneyMainInformation?.socialMediaLinks,
  };

  /** Profile header data */
  const profileHeader = {
    name: concatNameUser(
      attorneyBio?.title,
      attorneyBio?.attorneyMainInformation?.abbreviation,
    ),
    profileImage,
    representativeVideo:
      attorneyBio?.attorneyMainInformation?.videoPresentation?.videoLink
      || attorneyBio?.attorneyMainInformation?.videoPresentation?.uploadVideo,
    designation,
    contact: {
      phoneNumber: attorneyBio.attorneyMainInformation?.phoneNumber,
      email: attorneyBio.attorneyMainInformation?.email,
      fax: attorneyBio.attorneyMainInformation?.faxNumber,
      vizibility: attorneyBio.attorneyMainInformation?.vizibility,
      socialMediaLinks: attorneyBio.attorneyMainInformation?.socialMediaLinks,
      linkedIn: attorneyBio.attorneyMainInformation?.socialMediaLinks?.filter(
        (a) => a.channel === 'LinkedIn',
      )[0],
    },
    profilePractices: removeDuplicates(chairs, coChairs, practices),
    offices,
    chairs,
    coChairs,
    qrCodeBioPage: attorneyBio.attorneyMainInformation.qrCodeBioPage,
    qrCodeLinkedin: attorneyBio.attorneyMainInformation.qrCodeLinkedin,
  };

  /** Profile content data */
  const [isArticlesAttorney, isNewsAttorney, isLawyerSpotlight] = await Promise.all([
    checkAttorneyBlogsExist(authorId, attorneyBio?.databaseId, [599]),
    checkAttorneyBlogsExist(
      authorId,
      attorneyBio?.databaseId,
      [98, 99, 20098],
    ),
    checkAttorneyBlogsExist(authorId, attorneyBio?.databaseId, [30518]),
  ]);

  const additionalTabs = [1, 2, 3, 4, 5]
    .map((i) => ({
      id: i,
      title: attorneyBio.attorneyAdditionalTabs[`tabHeader${i}`],
      content: attorneyBio.attorneyAdditionalTabs[`tabContent${i}`],
    }))
    .filter((a) => a.title !== null);

  const profileContent = {
    attorneyBiography: attorneyBiographyChanged,
    awards: formateAwards(attorneyBio.attorneyAwardsClientsBlogsVideos?.awards),
    representativeMatters: attorneyBio.attorneyRepresentativeMatters.repMatters
      ? attorneyBio.attorneyRepresentativeMatters.repMatters.filter(
        ({ content }) => !empty(content),
      )
      : [],
    clientsImages: attorneyBio.attorneyAwardsClientsBlogsVideos?.clients
      ? attorneyBio.attorneyAwardsClientsBlogsVideos?.clients.filter(
        ({ clientImage }) => !empty(clientImage),
      )
      : [],
    clientsList: attorneyBio.attorneyAwardsClientsBlogsVideos?.clients
      ? attorneyBio.attorneyAwardsClientsBlogsVideos?.clients
      : [],
    additionalTabs,
  };

  /** Aside data */
  const asideItems = {
    education:
      attorneyBio?.attorneyAdditionalInformationEducationAdmissionsAffiliations
        ?.education,
    barAdmissions:
      attorneyBio?.attorneyAdditionalInformationEducationAdmissionsAffiliations
        ?.barAdmissions,
    affiliations:
      attorneyBio?.attorneyAdditionalInformationEducationAdmissionsAffiliations
        ?.affiliations,
    additionalInfo:
      attorneyBio?.attorneyAdditionalInformationEducationAdmissionsAffiliations
        ?.additionalInformation,
    awardsRecognitions:
      attorneyBio?.attorneyAwardsClientsBlogsVideos?.awardsRecognitions,
  };

  /** Profile media data */
  const profileMedia = {
    gallery: attorneyBio.attorneyAwardsClientsBlogsVideos
      ? attorneyBio.attorneyAwardsClientsBlogsVideos.images
      : [],
    mediaItems: attorneyBio?.attorneyMediaSecondType?.mediaItems,
    presentationsItems:
      attorneyBio?.attorneyPresentationsSecondType?.presentationsItems,
    publicationsItems:
      attorneyBio?.attorneyPublicationsSecondType?.publicationsItems,
    videos: attorneyBio.attorneyAwardsClientsBlogsVideos.attorneyVideos || [],
    govLawPosts,
    isArticlesAttorney: isArticlesAttorney || false,
    isNewsAttorney: isNewsAttorney || false,
    isLawyerSpotlight: isLawyerSpotlight || false,
    authorId,
    attorneyId: attorneyBio?.databaseId || null,
  };

  return {
    props: {
      seo,
      profileHeader,
      profileContent,
      asideItems,
      profileMedia,
    },
    revalidate: 600,
  };
};

/** Attorney profile page component */
const AttorneyProfile = ({
  seo,
  profileHeader,
  profileContent,
  asideItems,
  profileMedia,
}) => {
  const attorneyPageProps = {
    seo,
    profileHeader,
    profileContent,
    asideItems,
    profileMedia,
  };

  return (
    <ApolloWrapper>
      <AttorneyProfilePage {...attorneyPageProps} />
    </ApolloWrapper>
  );
};

export default AttorneyProfile;
