/**
 * Maps a WPGraphQL response body to the RTK Query result shape. Like Apollo's
 * default errorPolicy ("none"), any GraphQL error makes the whole result an
 * error and partial data is dropped.
 */
export const toGraphQLResult = (body) => {
  if (body?.errors?.length) {
    return {
      error: {
        message: body.errors.map((e) => e?.message).join('; '),
        graphQLErrors: body.errors,
      },
    };
  }
  if (!body?.data) {
    return { error: { message: 'GraphQL response has no data' } };
  }
  return { data: body.data };
};
