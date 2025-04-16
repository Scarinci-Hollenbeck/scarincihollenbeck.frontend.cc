import { attorneysSanitize, checkOnPublish } from 'utils/helpers';
import empty from 'is-empty';
import { getPractices } from 'requests/getPractices';
import { fetchAPI } from '../api';
import { ScarinciHollenbeckKeyContact } from '../../utils/constants';
import {
  keyContactsByParentPracticeQuery,
  practicesQuery,
} from './practicesQueryGenerator';

export const getPracticeData = async (uri) => {
  const data = await fetchAPI(practicesQuery, {
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

  if (includeAttorney && practiceChief) {
    includeAttorney = includeAttorney.filter((attorney) => {
      const isDuplicate = practiceChief.some(
        (sectionAttorney) => attorney.databaseId === sectionAttorney.databaseId,
      );
      return !isDuplicate;
    });
  }

  const practices = await getPractices();

  const parentPracticeId = practices?.find((practice) => practice?.childPractice?.some((child) => child?.uri === uri))?.databaseId;

  let keyContactsByParentPractice = [];

  if (!empty(parentPracticeId)) {
    const parentDataById = await fetchAPI(keyContactsByParentPracticeQuery, {
      variables: {
        id: parentPracticeId,
      },
    });

    const parentPracticeChief = parentDataById?.practice?.practicesIncluded
      .sectionChief
      ? attorneysSanitize(
        parentDataById.practice.practicesIncluded.sectionChief,
      )
      : [];

    const parentKeyContactsArr = parentDataById?.practice?.practicesIncluded
      .keyContactByPractice
      ? attorneysSanitize(
        parentDataById.practice.practicesIncluded.keyContactByPractice,
      )
      : [];
    keyContactsByParentPractice = [
      ...parentKeyContactsArr,
      ...parentPracticeChief,
    ];
  }

  const concatAttorneys = [
    ...practiceChief,
    ...keyContactsArr,
    ...keyContactsByParentPractice,
  ];

  const uniqueAttorneys = Array.from(
    new Map(concatAttorneys.map((item) => [item.databaseId, item])).values(),
  );

  const publishedAttorneys = checkOnPublish(uniqueAttorneys);

  const keyContacts = !empty(publishedAttorneys)
    ? publishedAttorneys
    : [ScarinciHollenbeckKeyContact];

  return {
    practice: data.practice,
    includeAttorney: checkOnPublish(includeAttorney),
    practiceChief: checkOnPublish(practiceChief),
    keyContactsList: keyContacts,
    faq: data.practice?.practicesIncluded?.faq,
    practices,
  };
};
