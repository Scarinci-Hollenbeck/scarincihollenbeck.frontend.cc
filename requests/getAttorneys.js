import { sortByKey } from 'utils/helpers';
import { FIRM_DESIGNATION, SITE_PHONE } from 'utils/constants';
import { fetchAPI, fetchRestAPI } from './api';
import { attorneysPageQuery, attorneysQuery } from './graphql-queries';

export const getAttorneys = async () => {
  const { attorneyProfiles } = await fetchAPI(attorneysQuery, {});

  attorneyProfiles.nodes.forEach((attorneyItem, idx) => {
    if (attorneyItem.attorneyMainInformation.designation === FIRM_DESIGNATION) {
      attorneyProfiles.nodes.splice(idx, 1);
    }
  });

  const sanitaizedAttorneys = attorneyProfiles?.nodes.map(
    ({
      title,
      uri,
      databaseId,
      attorneyMainInformation,
      attorneyPrimaryRelatedPracticesLocationsGroups,
      attorneyBiography,
    }) => {
      attorneyPrimaryRelatedPracticesLocationsGroups.officeLocation = attorneyPrimaryRelatedPracticesLocationsGroups.officeLocation.map(
        ({
          id, uri, title, officeMainInformation,
        }) => ({
          id,
          uri,
          title,
          officeMainInformation: officeMainInformation.addressLocality,
        }),
      );

      attorneyPrimaryRelatedPracticesLocationsGroups.relatedPractices = attorneyPrimaryRelatedPracticesLocationsGroups.relatedPractices?.map(
        ({ title }) => title,
      );
      return {
        id: databaseId,
        lastName: attorneyMainInformation.lastName,
        title,
        designation: attorneyMainInformation.designation,
        email: attorneyMainInformation.email,
        phone: attorneyMainInformation.phoneNumber,
        practices_array:
          attorneyPrimaryRelatedPracticesLocationsGroups.relatedPractices || [],
        location_array:
          attorneyPrimaryRelatedPracticesLocationsGroups.officeLocation,
        link: uri,
        better_featured_image: attorneyMainInformation.profileImage.sourceUrl,
        profileImage: attorneyMainInformation.profileImage.sourceUrl,
        miniBio: attorneyBiography?.miniBio || '',
      };
    },
  );

  return sortByKey(sanitaizedAttorneys, 'lastName');
};

export const attorneysPageContent = async () => {
  const data = await fetchAPI(attorneysPageQuery, {});
  return data?.pageBy;
};

export const getAttorneysFromRestApi = async () => {
  const { attorneys } = await fetchRestAPI('attorneys');

  const katerinData = attorneys.find((item) => item?.id === 20875);

  if (katerinData) {
    katerinData.phone = `${SITE_PHONE} ${katerinData.phone}`;
  }

  return attorneys;
};
