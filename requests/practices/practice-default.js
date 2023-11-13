import empty from 'is-empty';
import { fetchAPI } from '../api';
import { ScarinciHollenbeckKeyContact } from '../../utils/constants';
import { practicesQueryGenerator } from './practicesQueryGenerator';

export const postsSanitize = (posts) => posts.map((post) => {
  post.featuredImage = post.featuredImage?.node.sourceUrl
      || '/images/no-image-found-diamond-750x350.png';
  return post;
});

export const attorneysSanitize = (attorneysArr) => {
  const designationOrder = [
    'Firm Managing Partner',
    'Deputy Managing Partner',
    'Partner',
    'Counsel',
    'Of Counsel',
    'Senior Associate',
    'Associate',
  ];

  return attorneysArr
    .map((attorney) => {
      attorney.attorneyMainInformation.profileImage = attorney.attorneyMainInformation.profileImage.sourceUrl;
      return {
        databaseId: attorney.databaseId,
        link: attorney.uri,
        title: attorney.title,
        ...attorney.attorneyMainInformation,
      };
    })
    .sort((a, b) => {
      const indexA = designationOrder.indexOf(a.designation);
      const indexB = designationOrder.indexOf(b.designation);

      if (indexA !== indexB) {
        return indexA - indexB; // Sort by designation order first
      }
      return a.lastName.localeCompare(b.lastName); // If designations are the same, sort by last name
    });
};

export const getPracticeAttorneys = async (uri) => {
  const data = await fetchAPI(practicesQueryGenerator(uri), {
    variables: {
      id: uri,
    },
  });

  if (!data) {
    return {
      practice: undefined,
    };
  }

  if (data.practice) {
    if (!data.practice?.practicesIncluded?.childPractice) {
      data.practice.practicesIncluded.childPractice = [];
    }

    if (!data.practice?.practicesIncluded?.relatedBlogCategory) {
      data.practice.practicesIncluded.relatedBlogCategory = [];
    }

    if (!data.practice.practicesIncluded.keyContactByPractice) {
      data.practice.practicesIncluded.keyContactByPractice = [];
    }
  }

  let includeAttorney = data.practice?.practicesIncluded.includeAttorney
    ? attorneysSanitize(data.practice.practicesIncluded.includeAttorney)
    : [];

  const practiceChief = data.practice?.practicesIncluded.sectionChief
    ? attorneysSanitize(data.practice.practicesIncluded.sectionChief)
    : [];

  const keyContactsArr = data.practice?.practicesIncluded.keyContactByPractice
    ? attorneysSanitize(data.practice.practicesIncluded.keyContactByPractice)
    : [];

  const postsForSidebar = data.posts?.nodes
    ? postsSanitize(data.posts.nodes)
    : [];

  const corePractices = data.practices.nodes.filter(
    (practice) => !empty(practice.practicesIncluded.childPractice) && practice,
  );

  if (includeAttorney && practiceChief) {
    includeAttorney = includeAttorney.filter((attorney) => {
      const isDuplicate = practiceChief.some(
        (sectionAttorney) => attorney.databaseId === sectionAttorney.databaseId,
      );
      return !isDuplicate;
    });
  }

  const concatAttorneys = [...practiceChief, ...keyContactsArr];
  const keyContacts = concatAttorneys.length > 0
    ? concatAttorneys
    : [ScarinciHollenbeckKeyContact];

  return {
    practice: data.practice,
    includeAttorney,
    practiceChief,
    keyContactsList: keyContacts,
    corePractices,
    posts: postsForSidebar,
  };
};

export const headMetaData = (practiceChiefArg, includeAttorneyArg) => {
  const attorneysSchemaChair = practiceChiefArg?.length > 0
    ? practiceChiefArg?.map((attorney) => ({
      '@type': 'Person',
      name: attorney.title,
      image: attorney.profileImage,
      url: attorney.link,
      telephone: attorney.phoneNumber,
      jobTitle: 'Attorney',
    }))
    : [];

  const attorneysSchemaAttorneyList = includeAttorneyArg?.length > 0
    ? includeAttorneyArg?.map((attorney) => ({
      '@type': 'Person',
      name: attorney.title,
      image: attorney.profileImage,
      url: attorney.link,
      telephone: attorney.phoneNumber,
      jobTitle: 'Attorney',
    }))
    : [];

  return [...attorneysSchemaChair, ...attorneysSchemaAttorneyList];
};
