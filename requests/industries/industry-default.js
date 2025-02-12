import { attorneysSanitize, checkOnPublish } from 'utils/helpers';
import { fetchAPI } from 'requests/api';
import { ScarinciHollenbeckKeyContact } from 'utils/constants';
import { industryQuery } from 'requests/graphql-queries';

const validateData = (data) => {
  const includeAttorney = data.industry?.industryContent.industryAttorneys
    ? attorneysSanitize(data.industry.industryContent.industryAttorneys)
    : [];

  let publishedIndustryAttorneys = checkOnPublish(includeAttorney);

  const industryChief = data.industry?.industryContent.industryChief
    ? attorneysSanitize(data.industry.industryContent.industryChief)
    : [];

  const publishedIndustryChief = checkOnPublish(industryChief);

  if (publishedIndustryAttorneys && publishedIndustryChief) {
    publishedIndustryAttorneys = publishedIndustryAttorneys.filter(
      (attorney) => {
        const isDuplicate = publishedIndustryChief.some(
          (sectionAttorney) => attorney.databaseId === sectionAttorney.databaseId,
        );
        return !isDuplicate;
      },
    );
  }

  const keyContacts = publishedIndustryChief.length > 0
    ? publishedIndustryChief
    : [ScarinciHollenbeckKeyContact];

  const corePractices = data.industry?.industryContent?.practices
    ? data.industry.industryContent.practices
    : [];

  return {
    industry: data.industry,
    includeAttorney: publishedIndustryAttorneys,
    industryChief: publishedIndustryChief,
    keyContactsList: keyContacts,
    corePractices,
  };
};

export const getIndustryContent = async (slug) => {
  const data = await fetchAPI(industryQuery, {
    variables: { id: slug },
  });

  if (!data) {
    return {
      industry: undefined,
    };
  }

  return validateData(data);
};
