import React from 'react';
import { fetchAPI } from 'requests/api';
import {
  attorneyBySlugQuery,
  checkAttorneyPostsQueryByIdAndSlug,
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

/** Get the attorneys bio database on their slug */
export async function attorneyBySlug(slug) {
  const data = await fetchAPI(attorneyBySlugQuery, {
    variables: { slug },
  });

  if (data?.attorneyProfileBy?.status !== 'publish') {
    return null;
  }

  return data?.attorneyProfileBy;
}

const attorneysSlugsQuery = `
query attorneysSlugs {
  attorneyProfiles(first: 100, where: {status: PUBLISH}) {
    nodes {
      slug
    }
  }
}`;

async function checkAttorneyBlogsExist(authorId, attorneyId) {
  const blogs = await fetchAPI(checkAttorneyPostsQueryByIdAndSlug, {
    variables: { authorId, attorneyId },
  });

  if (blogs.posts.pageInfo.startCursor) {
    return true;
  }

  return false;
}

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
        permanent: true,
      },
    };
  }

  const authorId = attorneyBio?.attorneyAuthorId?.authorId?.databaseId;

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
    image: formatSrcToCloudinaryUrl(
      attorneyBio.attorneyMainInformation.profileImage?.sourceUrl,
    ),
    designation: attorneyBio.attorneyMainInformation?.designation,
    socialMediaLinks: attorneyBio.attorneyMainInformation?.socialMediaLinks,
  };

  /** Profile header data */
  const profileHeader = {
    name: concatNameUser(
      attorneyBio?.title,
      attorneyBio?.attorneyMainInformation?.abbreviation,
    ),
    profileImage: formatSrcToCloudinaryUrl(
      attorneyBio.attorneyMainInformation.profileImage?.sourceUrl,
    ),
    representativeVideo:
      attorneyBio?.attorneyMainInformation?.videoPresentation?.videoLink
      || attorneyBio?.attorneyMainInformation?.videoPresentation?.uploadVideo,
    title: attorneyBio.attorneyMainInformation?.designation,
    contact: {
      phoneNumber: attorneyBio.attorneyMainInformation?.phoneNumber,
      email: attorneyBio.attorneyMainInformation?.email,
      fax: attorneyBio.attorneyMainInformation?.faxNumber,
      vizibility: attorneyBio.attorneyMainInformation?.vizibility,
      socialMediaLinks: attorneyBio.attorneyMainInformation?.socialMediaLinks,
    },
    practices: attorneyBio.attorneyPrimaryRelatedPracticesLocationsGroups
      ?.relatedPractices
      ? attorneyBio.attorneyPrimaryRelatedPracticesLocationsGroups?.relatedPractices.map(
        ({ uri, title }) => ({
          uri,
          title,
        }),
      )
      : [],
    offices:
      attorneyBio.attorneyPrimaryRelatedPracticesLocationsGroups.officeLocation?.map(
        ({ uri, id, officeMainInformation }) => ({
          link: uri,
          name: officeMainInformation.addressLocality,
          ID: id,
        }),
      ),
    chair: attorneyBio.attorneyChairCoChair.chair
      ? attorneyBio.attorneyChairCoChair.chair.map(({ uri, title }) => ({
        title,
        link: uri,
      }))
      : [],
    coChair: attorneyBio.attorneyChairCoChair.coChair
      ? attorneyBio.attorneyChairCoChair.coChair.map(({ uri, title }) => ({
        title,
        link: uri,
      }))
      : [],
    attorneyBiography: attorneyBio?.attorneyBiography,
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
  };

  /** Accordion data */
  const isBlogsAttorney = await checkAttorneyBlogsExist(
    authorId,
    attorneyBio?.databaseId,
  );

  const additionalTabs = [1, 2, 3, 4, 5]
    .map((i) => ({
      id: i,
      title: attorneyBio.attorneyAdditionalTabs[`tabHeader${i}`],
      content: attorneyBio.attorneyAdditionalTabs[`tabContent${i}`],
    }))
    .filter((a) => a.title !== null);

  const accordionData = {
    clients: attorneyBio.attorneyAwardsClientsBlogsVideos?.clients,
    awards: formateAwards(attorneyBio.attorneyAwardsClientsBlogsVideos?.awards),
    attorneyBiography: attorneyBio?.attorneyBiography,
    representativeMatters: attorneyBio.attorneyRepresentativeMatters.repMatters
      ? attorneyBio.attorneyRepresentativeMatters.repMatters[0].content
      : [],
    additionalTabs,
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
    isBlogsAttorney: isBlogsAttorney || false,
    authorId,
    attorneyId: attorneyBio?.databaseId || null,
  };

  return {
    props: {
      seo,
      profileHeader,
      accordionData,
      qrCodeBioPage: attorneyBio.attorneyMainInformation.qrCodeBioPage,
      qrCodeLinkedin: attorneyBio.attorneyMainInformation.qrCodeLinkedin,
    },
    revalidate: 3600,
  };
};

/** Attorney profile page component */
const AttorneyProfile = ({
  seo,
  profileHeader,
  accordionData,
  qrCodeBioPage,
  qrCodeLinkedin,
}) => {
  const attorneyPageProps = {
    seo,
    profileHeader,
    accordionData,
    qrCodeBioPage,
    qrCodeLinkedin,
  };

  return (
    <ApolloWrapper>
      <AttorneyProfilePage {...attorneyPageProps} />
    </ApolloWrapper>
  );
};

export default AttorneyProfile;
