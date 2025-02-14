import {
  generateYearOptions,
  sanitizeCategories,
  sortByKey,
} from 'utils/helpers';
import { fetchAPI, fetchRestAPI } from './api';
import { getIndustries } from './getIndustries';
import { getPractices } from './getPractices';
import { firstCreatedPostQuery } from './graphql-queries';

export const getLibraryPageData = async (categoriesQuery) => {
  const [
    practices,
    industries,
    { locations },
    { authors },
    firstPost,
    mainCategories,
  ] = await Promise.all([
    getPractices(),
    getIndustries(),
    fetchRestAPI('locations'),
    fetchRestAPI('authors'),
    fetchAPI(firstCreatedPostQuery),
    fetchAPI(categoriesQuery),
  ]);
  const sortedAuthors = sortByKey(authors, 'title');

  const dateFirstPost = new Date(firstPost?.posts?.nodes[0]?.date).getFullYear() || 2013;

  const categories = sanitizeCategories(mainCategories?.categories?.nodes);

  const filters = {
    practices,
    locations,
    authors: sortedAuthors,
    industries,
    years: generateYearOptions(dateFirstPost),
  };

  return {
    filters: {
      ...filters,
      categories,
    },
    subHeaderSlides: [
      ...categories,
      ...sanitizeCategories([mainCategories?.pageBy]),
    ],
  };
};
