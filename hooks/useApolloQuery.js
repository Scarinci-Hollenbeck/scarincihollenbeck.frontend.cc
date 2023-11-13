import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { useEffect, useState } from 'react';
import empty from 'is-empty';

// Function to update the query with the new results
const updateQuery = (fieldName) => (previousResult, { fetchMoreResult }) => (fetchMoreResult[fieldName].edges.length ? fetchMoreResult : previousResult);
const fetchMoreGrouped = (
  numberOfArticles,
  reqData,
  variablesObj,
  fetchMoreCallBack,
  fieldNameForPagination,
  nextMode,
) => {
  const queryVariables = {
    first: nextMode ? numberOfArticles || 8 : null,
    last: !nextMode ? numberOfArticles || 8 : null,
    after: nextMode ? reqData[fieldNameForPagination].pageInfo.endCursor : null,
    before: !nextMode
      ? reqData[fieldNameForPagination].pageInfo.startCursor
      : null,
  };

  Object.keys(variablesObj).forEach((prop) => {
    if (!queryVariables.hasOwnProperty(prop)) {
      queryVariables[prop] = variablesObj[prop];
    }
  });
  const updateQueryCallback = updateQuery(fieldNameForPagination);

  return fetchMoreCallBack({
    variables: queryVariables,
    updateQuery: updateQueryCallback, // We pass the updated updateQuery function with the fieldName parameter.
  });
};

const stateInterfaceObj = {
  loading: true,
  data: [],
  error: undefined,
};
const useApolloQuery = (query, variables, skip) => {
  const [clients, setClients] = useState(stateInterfaceObj);
  const [posts, setPosts] = useState(stateInterfaceObj);

  const FEED_QUERY = gql`
    ${query}
  `;
  const {
    data, error, loading, fetchMore,
  } = useQuery(FEED_QUERY, {
    variables,
    skip,
    refresh: false,
  });

  const useQueryDataControle = {
    data,
    error,
    loading,
  };

  useEffect(() => {
    if (query.includes('clients') && !empty(data)) {
      setClients(useQueryDataControle);
    }

    if (query.includes('posts') && !empty(data)) {
      setPosts(useQueryDataControle);
    }
  }, [data, loading]);

  const handlePrevPagination = (numbersArticles) => fetchMoreGrouped(
    numbersArticles,
    data,
    variables,
    fetchMore,
    'posts',
    false,
  );

  const handleNextPagination = (numbersArticles) => fetchMoreGrouped(
    numbersArticles,
    data,
    variables,
    fetchMore,
    'posts',
    true,
  );
  const handleClientsPrevPagination = (numbersClients) => {
    fetchMoreGrouped(
      numbersClients,
      data,
      variables,
      fetchMore,
      'clients',
      false,
    );
    setClients(useQueryDataControle);
  };
  const handleClientsNextPagination = (numbersClients) => {
    fetchMoreGrouped(
      numbersClients,
      data,
      variables,
      fetchMore,
      'clients',
      true,
    );
    setClients(useQueryDataControle);
  };
  return {
    handleNextPagination,
    handlePrevPagination,
    handleClientsPrevPagination,
    handleClientsNextPagination,
    data,
    error,
    loading,
    loadingClients: clients.loading,
    loadingPosts: posts.loading,
    clients: clients.data,
    posts: posts.data,
  };
};

export default useApolloQuery;
