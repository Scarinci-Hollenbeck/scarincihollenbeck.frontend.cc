import useNotFoundNotification from 'hooks/useNotFoundNotification';
import React from 'react';
import { fetchAPI } from 'requests/api';
import { getServicesQuery } from 'requests/graphql-queries';
import empty from 'is-empty';
import ServicesPage from 'components/pages/ServicesPage';
import { getIndustries } from 'requests/getIndustries';
import { sortByKey } from 'utils/helpers';
import { getPractices } from 'requests/getPractices';
import {
  PRODUCTION_URL,
  CURRENT_DOMAIN,
  readyIndustriesUrls,
} from 'utils/constants';

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

  const canonicalUrl = `${PRODUCTION_URL}/services`;

  const breadcrumbs = [
    { name: 'Home', url: `${CURRENT_DOMAIN}/` },
    { name: 'Practices & Industries' },
  ];

  const sanitizedIndustries = sanitizeIndustries(
    sortByKey(industries, 'title'),
  );

  const practiceItems = practicesSorted.flatMap((practice) => {
    const parent = {
      name: practice.title,
      url: `${PRODUCTION_URL}${practice.uri}`,
    };
    const children = (practice.childPractice || []).map((child) => ({
      name: child.title,
      url: `${PRODUCTION_URL}${child.uri}`,
    }));
    return [parent, ...children];
  });

  const industryItems = sanitizedIndustries
    .filter((industry) => readyIndustriesUrls.includes(industry.uri))
    .map((industry) => ({
      name: industry.title,
      url: `${PRODUCTION_URL}${industry.uri}`,
    }));

  const itemListData = [...practiceItems, ...industryItems];

  const webPageData = {
    url: canonicalUrl,
    name: data?.seo?.title,
    description: data?.seo?.metaDesc,
    pageType: 'CollectionPage',
    mainEntity: { '@id': `${canonicalUrl}#itemlist` },
  };

  return {
    props: {
      title: data?.title,
      content: data?.pagesFields,
      industries: sanitizedIndustries,
      practices: practicesSorted,
      seo: data?.seo,
      breadcrumbs,
      webPageData,
      itemListData,
      canonicalUrl,
    },
    revalidate: 600,
  };
};

const ServicesPageDirectory = ({
  title,
  content,
  industries,
  practices,
  seo,
  breadcrumbs,
  webPageData,
  itemListData,
  canonicalUrl,
}) => {
  useNotFoundNotification('The practice or industry no longer exists.');

  const propsPage = {
    title,
    content,
    industries,
    practices,
    seo,
    canonicalUrl,
    breadcrumbs,
    webPageData,
    itemListData,
  };

  return <ServicesPage {...propsPage} />;
};

export default ServicesPageDirectory;
