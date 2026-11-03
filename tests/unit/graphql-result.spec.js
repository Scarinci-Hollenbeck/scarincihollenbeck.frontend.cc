import { test, expect } from '@playwright/test';
import { toGraphQLResult } from '../../utils/graphql-result';

test.describe('toGraphQLResult', () => {
  test('returns the data of a successful response', () => {
    const body = { data: { posts: { edges: [] } }, extensions: { debug: [] } };
    expect(toGraphQLResult(body)).toEqual({ data: { posts: { edges: [] } } });
  });

  test('turns GraphQL errors into an error and drops partial data', () => {
    const errors = [
      { message: 'Internal server error' },
      { message: 'Second' },
    ];
    const result = toGraphQLResult({ data: { posts: null }, errors });
    expect(result.data).toBeUndefined();
    expect(result.error.message).toBe('Internal server error; Second');
    expect(result.error.graphQLErrors).toEqual(errors);
  });

  test('treats a response without data as an error', () => {
    expect(toGraphQLResult({}).error.message).toBe(
      'GraphQL response has no data',
    );
    expect(toGraphQLResult(null).error.message).toBe(
      'GraphQL response has no data',
    );
  });

  test('ignores an empty errors array', () => {
    expect(toGraphQLResult({ data: { a: 1 }, errors: [] })).toEqual({
      data: { a: 1 },
    });
  });
});
