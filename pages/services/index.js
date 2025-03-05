import useNotFoundNotification from 'hooks/useNotFoundNotification';
import React from 'react';
import { fetchAPI } from 'requests/api';
import { getServicesQuery } from 'requests/graphql-queries';
import empty from 'is-empty';
import ServicesPage from 'components/pages/ServicesPage';
import { getIndustries } from 'requests/getIndustries';
import { sortByKey } from 'utils/helpers';
import { getPractices } from 'requests/getPractices';
import { PRODUCTION_URL } from 'utils/constants';

const sanitizeIndustries = (industries) => industries.map((industry) => ({
  databaseId: industry?.databaseId,
  title: industry?.title,
  description: industry?.industryContent?.description || '',
  uri: industry?.uri,
  selectedIcon: industry?.industryContent?.industryIcon?.selectedIcon,
  uploadedIcon: industry?.industryContent?.industryIcon?.uploadedIcon,
  image: industry?.industryContent?.industryImage?.sourceUrl,
}));

const getServicesContent = async () => {
  const data = await fetchAPI(getServicesQuery);
  return data?.page;
};

export const getStaticProps = async () => {
  const data = await getServicesContent();
  const industries = await getIndustries();
  const practices = await getPractices();

  const practicesSorted = practices.map((practice) => {
    if (!empty(practice.childPractice)) {
      practice.childPractice = sortByKey(practice.childPractice, 'title');
    }
    return practice;
  });

  if (empty(data)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      title: data?.title,
      content: data?.pagesFields,
      industries: sanitizeIndustries(sortByKey(industries, 'title')),
      practices: practicesSorted,
      seo: data?.seo,
    },
    revalidate: 86400,
  };
};

const ServicesPageDirectory = ({
  title,
  content,
  industries,
  practices,
  seo,
}) => {
  useNotFoundNotification('The practice or industry no longer exists.');
  const canonicalUrl = `${PRODUCTION_URL}/services`;
  const propsPage = {
    title,
    content,
    industries,
    practices,
    seo,
    canonicalUrl,
  };

  return <ServicesPage {...propsPage} />;
};

export default ServicesPageDirectory;
