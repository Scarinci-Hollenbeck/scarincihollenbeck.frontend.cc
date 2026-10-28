import empty from 'is-empty';
// Relative on purpose: a bare `redux/...` path resolves to the npm package.
import { useGetGraphQLQueryQuery } from '../redux/services/wp-graphql';

/**
 * One page of a paginated WPGraphQL query, fetched in the browser.
 * `loading` is true while the requested page has no data yet (also on the
 * server and the first client render, so hydration matches); a page fetched
 * earlier in the session comes from the RTK Query cache without a request.
 */
export const usePaginationData = (query, params) => {
  const {
    id,
    authorId,
    categoryId,
    currentPage: tempCurrentPage,
    itemsPerPage,
    slug,
    authorName,
    attorneyId,
    categories,
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
    categories: !empty(categories) ? categories : null,
    offsetPosts,
    postsPerPage: itemsPerPage,
    slug: !empty(slug) ? slug : null,
  };

  const skip = empty(query);
  const {
    currentData,
    error: lastError,
    isFetching,
  } = useGetGraphQLQueryQuery({ query, variables }, { skip });
  // RTK Query keeps the old error while it refetches; Apollo showed the loader.
  const error = isFetching ? undefined : lastError;

  if (skip) return {};

  return {
    loading: currentData === undefined && !error,
    error,
    page: currentPage || 1,
    limit: itemsPerPage,
    ...currentData,
  };
};
