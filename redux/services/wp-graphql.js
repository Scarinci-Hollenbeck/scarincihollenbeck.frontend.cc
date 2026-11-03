// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GRAPHQL_API_URL } from '../../utils/constants';
import { toGraphQLResult } from '../../utils/graphql-result';

// Define a service using a base URL and expected endpoints
export const wpGraphQl = createApi({
  reducerPath: 'graphqlApi',
  baseQuery: fetchBaseQuery({ baseUrl: GRAPHQL_API_URL }),
  endpoints: (builder) => ({
    getDataFromWPGraphQL: builder.mutation({
      query: (graphQLData) => ({
        url: '/',
        method: 'POST',
        body: graphQLData,
      }),
    }),
    // Read-only query, cached per { query, variables } for the whole session
    // like the Apollo client it replaced: a page of results fetched once is
    // shown again without a request.
    getGraphQLQuery: builder.query({
      queryFn: async ({ query, variables }, api, extraOptions, baseQuery) => {
        const response = await baseQuery({
          url: '',
          method: 'POST',
          body: { query, variables },
        });
        if (response.error) return { error: response.error };
        return toGraphQLResult(response.data);
      },
      keepUnusedDataFor: Infinity,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDataFromWPGraphQLQuery, useGetGraphQLQueryQuery } = wpGraphQl;
