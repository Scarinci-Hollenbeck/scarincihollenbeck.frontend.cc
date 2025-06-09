import empty from 'is-empty';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';

export const getPaginationData = (query, params) => {
  const {
    id,
    authorId,
    categoryId,
    currentPage: tempCurrentPage,
    itemsPerPage,
    slug,
    authorName,
    attorneyId,
  } = params;

  const currentPage = Number(tempCurrentPage);

  const offsetPosts = !empty(currentPage) && currentPage > 0
    ? Math.floor(currentPage - 1) * itemsPerPage
    : 0;
  const variables = {
    id: !empty(id) ? id : null,
    authorName: authorName || null,
    authorId: !empty(authorId) ? authorId : null,
    categoryId: !empty(categoryId) ? categoryId : null,
    attorneyId: !empty(attorneyId) ? attorneyId : null,
    offsetPosts,
    postsPerPage: itemsPerPage,
    slug: !empty(slug) ? slug : null,
  };

  const FEED_QUERY = gql`
    ${query}
  `;

  const { data, loading, error } = useQuery(FEED_QUERY, {
    variables,
    refresh: false,
  });

  const result = {
    loading,
    error,
    page: currentPage || 1,
    limit: itemsPerPage,
    ...data,
  };

  return result;
};
