import React from 'react';
import { fetchAPI } from 'utils/api';
import {
  attorneyBySlugQuery,
  attorneyNewsEventsQuery,
  attorneyFirmBlogQuery,
  miniOfficeLocationQuery,
} from 'utils/graphql-queries';
import {
  concatNameUser,
  fetchExternalPosts,
  formatSrcToCloudinaryUrl,
  formatSrcToCloudinaryUrlPdf,
  sanitizeArticles,
  sanitizeExternalArticles,
} from 'utils/helpers';
import { CON_LAW_URL, GOV_LAW_URL } from 'utils/constants';
import AttorneyPage from 'components/pages/AttorneyProfile';
import ApolloWrapper from 'layouts/ApolloWrapper';
import { sanitizeOffices } from 'pages';

/** Get the attorneys bio data base on their slug */
export async function attorneyBySlug(slug) {
  const data = await fetchAPI(attorneyBySlugQuery, {
    variables: { slug },
  });
  return data.attorneyProfileBy;
}

export async function getLocationOffices() {
  const data = await fetchAPI(miniOfficeLocationQuery, {});
  return sanitizeOffices(data.officeLocations.nodes);
}

/** Get all the news/events based on the attorneys name */
export async function attorneyNewsEvents(name) {
  const data = await fetchAPI(attorneyNewsEventsQuery, {
    variables: { name },
  });
  return data.posts;
}

/** Get all the attorneys blog posts */
export async function attorneyFirmBlog(id) {
  const data = await fetchAPI(attorneyFirmBlogQuery, {
    variables: { id },
  });
  return data.posts;
}

/** Set data from API response to page props WARNING: This is a large function */
export const getServerSideProps = async ({ params, res }) => {
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=60, stale-while-revalidate');

  /** Get Attorney Bio  */
  const slug = params?.slug;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  const attorneyBio = await attorneyBySlug(slug);
  const officeLocations = await getLocationOffices();

  if (!attorneyBio) {
    return {
      notFound: true,
    };
  }

  /** Create new tabs for Government and Law & Con Law  & Drop Music esq */
  /** Get Attorney/Author Internal Posts */
  const authorId = attorneyBio.attorneyMainInformation.profileImage.authorDatabaseId;
  const attorneyFirmPosts = await attorneyFirmBlog(authorId);

  /** Get Firm News/Events About Attorney */
  const attorneyFirmNewsEvents = await attorneyNewsEvents(slug);

  /** Get Attorney External Blog Posts */
  const govLawPosts = {};
  const conLawPosts = {};
  if (attorneyBio.attorneyAwardsClientsBlogsVideos.blogId) {
    const availBlogs = attorneyBio.attorneyAwardsClientsBlogsVideos.blogId.map((bl) => Object.entries(bl).filter(([, value]) => value !== null))[0];

    for (let i = 0; i < availBlogs.length; i++) {
      const site = availBlogs[i][0];
      const authorId = availBlogs[i][1];

      if (site.includes('constitutionalLawReporter')) {
        const posts = await fetchExternalPosts(CON_LAW_URL, authorId, 14);
        conLawPosts.id = authorId;
        conLawPosts.posts = sanitizeExternalArticles(posts);
      }

      if (site.includes('governmentLaw')) {
        const posts = await fetchExternalPosts(GOV_LAW_URL, authorId, 14);
        govLawPosts.id = authorId;

        if (posts.length > 0) {
          govLawPosts.posts = sanitizeExternalArticles(posts);
        } else {
          govLawPosts.posts = [];
        }
      }
    }
  }

  const blogPosts = sanitizeArticles(attorneyFirmPosts.edges);
  const newsPosts = sanitizeArticles(attorneyFirmNewsEvents.edges);

  /** SEO meta data */
  const seo = {
    title: attorneyBio.seo?.title,
    canonicalLink: `attorneys/${params.slug}`,
    metaDescription: attorneyBio.seo?.metaDesc,
    image: formatSrcToCloudinaryUrl(attorneyBio.attorneyMainInformation.profileImage?.sourceUrl),
    designation: attorneyBio.attorneyMainInformation?.designation,
    socialMediaLinks: attorneyBio.attorneyMainInformation?.socialMediaLinks,
  };

  /** Profile header data */
  const profileHeader = {
    name: concatNameUser(attorneyBio?.title, attorneyBio?.attorneyMainInformation.abbreviation),
    firstName: attorneyBio.attorneyMainInformation?.firstName,
    profileImage: formatSrcToCloudinaryUrl(
      attorneyBio.attorneyMainInformation.profileImage?.sourceUrl,
    ),
    title: attorneyBio.attorneyMainInformation?.designation,
    contact: {
      phoneNumber: attorneyBio.attorneyMainInformation?.phoneNumber,
      email: attorneyBio.attorneyMainInformation?.email,
      fax: attorneyBio.attorneyMainInformation?.faxNumber,
      vizibility: attorneyBio.attorneyMainInformation?.vizibility,
      pdf:
        formatSrcToCloudinaryUrlPdf(attorneyBio.attorneyMainInformation?.pdfBio?.mediaItemUrl)
        || null,
      socialMediaLinks: attorneyBio.attorneyMainInformation?.socialMediaLinks,
    },
    primaryPractice: attorneyBio.attorneyPrimaryRelatedPracticesLocationsGroups.primaryPractice,
    practices: attorneyBio.attorneyPrimaryRelatedPracticesLocationsGroups.relatedPractices
      ? attorneyBio.attorneyPrimaryRelatedPracticesLocationsGroups.relatedPractices.map(
        ({ uri, title }) => ({
          uri,
          title,
        }),
      )
      : [attorneyBio.attorneyPrimaryRelatedPracticesLocationsGroups.primaryPractice],
    offices: attorneyBio.attorneyPrimaryRelatedPracticesLocationsGroups.officeLocation.map(
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
    emailForwarding: attorneyBio.attorneyMainInformation.forwardingEmailsForContactForm.map(
      ({ email }) => email,
    ),
  };

  /** Tab list */
  const mainTabs = attorneyBio.attorneyTabNavigation.mainMenu;
  const moreTabs = attorneyBio.attorneyTabNavigation.moreMenu;
  /** Tab content  -- Biography, Media, Presentations, Publications, Representative Matters, Representative Clients, Videos, Additional Tabs */
  const additionalTabs = [1, 2, 3, 4, 5]
    .map((i) => ({
      id: i,
      title: attorneyBio.attorneyAdditionalTabs[`tabHeader${i}`],
      content: attorneyBio.attorneyAdditionalTabs[`tabContent${i}`],
    }))
    .filter((a) => a.title !== null);

  const externalBlogTabs = [];

  if (Object.keys(govLawPosts).includes('posts')) {
    externalBlogTabs.push({
      id: 15,
      title: 'Government & Law',
      content: govLawPosts,
    });
  }

  if (Object.keys(conLawPosts).includes('posts')) {
    externalBlogTabs.push({
      id: 16,
      title: 'Constitutional Law Reporter',
      content: conLawPosts,
    });
  }

  const tabs = [
    ...additionalTabs,
    {
      id: 6,
      title: 'Biography',
      content: attorneyBio.attorneyBiography.biographyContent,
    },
    {
      id: 7,
      title: 'Representative Matters',
      content: attorneyBio.attorneyRepresentativeMatters.repMatters
        ? attorneyBio.attorneyRepresentativeMatters.repMatters[0].content
        : [],
    },
    {
      id: 8,
      title: 'Representative Clients',
      content: attorneyBio.attorneyRepresentativeClients.repClients
        ? attorneyBio.attorneyRepresentativeClients.repClients[0].content
        : [],
    },
    {
      id: 9,
      title: 'Media',
      content: {
        header: attorneyBio.attorneyMedia.attorneyMedia.header,
        body: attorneyBio.attorneyMedia.attorneyMedia.body,
      },
    },
    {
      id: 10,
      title: 'Presentations',
      content: {
        header: attorneyBio.attorneyPresentations.attorneyPresentations.header,
        body: attorneyBio.attorneyPresentations.attorneyPresentations.body,
      },
    },
    {
      id: 11,
      title: 'Publications',
      content: {
        header: attorneyBio.attorneyPublications.attorneyPublications.header,
        body: attorneyBio.attorneyPublications.attorneyPublications.body,
      },
    },

    {
      id: 12,
      title: 'Videos',
      content: attorneyBio.attorneyAwardsClientsBlogsVideos
        ? attorneyBio.attorneyAwardsClientsBlogsVideos.attorneyVideos
        : [],
    },
    {
      id: 13,
      title: 'Blogs',
      content: {
        id: authorId,
      },
    },
    {
      id: 14,
      title: 'News Press Releases',
      content: {
        id: slug,
      },
    },
    {
      id: 15,
      title: 'Education',
      content: attorneyBio?.attorneyAdditionalInformationEducationAdmissionsAffiliations?.education,
    },
    {
      id: 16,
      title: 'Admissions',
      content:
        attorneyBio?.attorneyAdditionalInformationEducationAdmissionsAffiliations?.barAdmissions,
    },
    ...externalBlogTabs,
  ];

  /** Sanitize main tab section */
  const mainTabsMatched = mainTabs
    .map((tabMapItem) => tabs.filter((tabFilterItem) => tabFilterItem.title === tabMapItem)[0])
    .filter((item) => item !== undefined);
  let moreTabsMatched = [];

  /** Set up more tab section */
  if (moreTabs) {
    const matchTabs = moreTabs
      .map((tab) => tabs.filter((t) => t.title.includes(tab))[0])
      .filter((a) => a !== undefined);

    moreTabsMatched = [...matchTabs];
  }

  /** Credentials --- Education, Bar Admissions, Affiliations, Additional Information */
  const attorneyCredentials = attorneyBio.attorneyAdditionalInformationEducationAdmissionsAffiliations;

  /** Awards */
  const attorneyAwards = attorneyBio.attorneyAwardsClientsBlogsVideos?.awards;

  /** Clients */
  const attorneyClients = attorneyBio.attorneyAwardsClientsBlogsVideos?.clients;

  return {
    props: {
      seo,
      profileHeader,
      attorneyFooterBlogArticles: blogPosts.filter((_, i) => i <= 2),
      attorneyFooterNewsArticles: newsPosts.filter((_, i) => i <= 2),
      mainTabs: mainTabsMatched,
      moreTabs: moreTabsMatched,
      additionalTabs,
      attorneyCredentials,
      attorneyAwards,
      attorneyClients,
      authorId,
    },
  };
};

/** Attorney profile page component */
const AttorneyProfile = ({
  seo,
  profileHeader,
  attorneyFooterBlogArticles,
  attorneyFooterNewsArticles,
  mainTabs,
  moreTabs,
  attorneyCredentials,
  attorneyAwards,
  attorneyClients,
  authorId,
  additionalTabs,
}) => {
  const attorneyPageProps = {
    seo,
    profileHeader,
    attorneyFooterBlogArticles,
    attorneyFooterNewsArticles,
    mainTabs,
    moreTabs,
    attorneyCredentials,
    attorneyAwards,
    attorneyClients,
    authorId,
    additionalTabs,
  };
  return (
    <ApolloWrapper>
      <AttorneyPage {...attorneyPageProps} />
    </ApolloWrapper>
  );
};

export default AttorneyProfile;
