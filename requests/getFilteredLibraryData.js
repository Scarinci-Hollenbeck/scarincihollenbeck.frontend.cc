import { fetchRestAPI } from './api';

const sanitizeLibraryQueryParams = (params) => {
  const {
    keyword,
    categories,
    offices,
    authors,
    practices,
    industries,
    years,
    limit,
    page,
    tag,
  } = params;

  const filtersParams = {
    keyword: keyword || '',
    category: categories || '',
    location: offices || '',
    author: authors || '',
    practices: practices || '',
    industries: industries || '',
    year: years || '',
    posts_per_page: limit || '',
    paged: page || '',
    tag: tag || '',
  };

  Object.keys(filtersParams).forEach((key) => {
    if (!filtersParams[key]) {
      delete filtersParams[key];
    }
  });

  return filtersParams;
};

export const getFilteredLibraryData = async (query, variables = {}) => {
  const filtersParams = sanitizeLibraryQueryParams(query);
  const {
    posts, found_posts, paged, posts_per_page, tags,
  } = await fetchRestAPI('library_filters', {
    ...filtersParams,
    ...variables,
  });

  const postsData = {
    posts: posts || [],
    total: found_posts || 0,
    currentPage: paged || 1,
    postsPerPage: posts_per_page || 10,
  };

  return { postsData, tags };
};
