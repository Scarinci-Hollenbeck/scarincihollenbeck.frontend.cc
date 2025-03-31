import { getIndustryLink } from 'utils/helpers';
import { fetchRestAPI } from './api';

const sanitizeIndustries = (data) => {
  if (!data) return [];

  return data?.map((item, index) => ({
    ...item,
    uri: getIndustryLink(item?.uri),
  }));
};

export const getIndustries = async () => {
  const { industries } = await fetchRestAPI('industries');
  return sanitizeIndustries(industries);
};
