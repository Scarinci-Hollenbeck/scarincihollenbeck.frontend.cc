import { test, expect } from '@playwright/test';
import { createWpGraphQLClient } from '../../requests/wp-graphql-client';

const URL = 'https://wp.test/graphql';
const QUERY = '{ posts { nodes { id } } }';
const DATA = { posts: { nodes: [] } };
const AUTH = { auth: true };
const MASKED = [{ message: 'Internal server error', path: ['posts'] }];

const sleep = (ms) => new Promise((r) => {
  setTimeout(r, ms);
});

const response = (status, body, headers = {}) => ({
  ok: status >= 200 && status < 300,
  status,
  headers: {
    get: (name) => headers[name.toLowerCase()] ?? null,
  },
  json: async () => body,
});

const isLogin = (init) => JSON.parse(init.body).query.includes('login(');

// A stand-in for WPGraphQL + WPGraphQL JWT Authentication 0.7 without
// GRAPHQL_DEBUG. `secret` is the JWT secret; the test rotates it.
// - a token signed with the current secret: data, plus `X-JWT-Refresh`
//   (the plugin sends it over HTTPS only for a token that validated)
// - a token signed with an old secret (`rejectAs: 'signature'`): JWT::decode
//   fails, the status stays 200 and every field throws a plain Exception that
//   WPGraphQL masks as "Internal server error"; no `X-JWT-Refresh`
// - `rejectAs: 401 | 403`: the plugin's explicit statuses (wrong iss, revoked
//   user secret)
// `sendsRefreshHeader: false` is a WordPress that never sends the header
// (e.g. is_ssl() false behind a proxy).
const fakeWordPress = ({
  rejectAs = 'signature',
  sendsRefreshHeader = true,
} = {}) => {
  const wp = {
    secret: 1,
    logins: 0,
    queries: 0,
    lastLoginBody: null,
    // Replaced by tests that make WordPress fail while the token is valid.
    answerValid: () => response(200, { data: DATA }),
    answerAnonymous: () => response(200, { data: DATA }),
    fetch: async (url, init) => {
      const parsed = JSON.parse(init.body);
      if (isLogin(init)) {
        wp.logins += 1;
        wp.lastLoginBody = parsed;
        await sleep(5);
        return response(200, {
          data: { login: { authToken: `token-${wp.secret}-${wp.logins}` } },
        });
      }
      wp.queries += 1;
      if (!init.headers.Authorization) return wp.answerAnonymous();
      const token = init.headers.Authorization.replace('Bearer ', '');
      if (token.startsWith(`token-${wp.secret}-`)) {
        const res = wp.answerValid();
        if (sendsRefreshHeader) {
          const { get } = res.headers;
          res.headers = {
            get: (name) => (name.toLowerCase() === 'x-jwt-refresh' ? 'refresh' : get(name)),
          };
        }
        return res;
      }
      // Rejections arrive spread out, some after a new login has finished.
      await sleep(wp.queries * 10);
      if (rejectAs === 401 || rejectAs === 403) {
        return response(rejectAs, { errors: MASKED });
      }
      return response(200, { data: { posts: null }, errors: MASKED });
    },
  };
  return wp;
};

const clientFor = (wp, extra = {}) => createWpGraphQLClient({
  url: URL,
  headers: { 'Content-Type': 'application/json' },
  credentials: () => ({ username: 'svc', password: 'pa"ss\\word' }),
  fetchImpl: (url, init) => wp.fetch(url, init),
  logError: () => {},
  ...extra,
});

test.describe('createWpGraphQLClient without auth (default)', () => {
  test('sends no token and never logs in', async () => {
    const wp = fakeWordPress();
    const seen = [];
    const client = clientFor(wp, {
      fetchImpl: (url, init) => {
        seen.push(init.headers);
        return wp.fetch(url, init);
      },
    });
    wp.answerAnonymous = () => response(200, { data: DATA });
    expect(await client.fetchAPI(QUERY)).toEqual(DATA);
    expect(await client.fetchAPI(QUERY, { variables: { id: 1 } })).toEqual(
      DATA,
    );
    expect(wp.logins).toBe(0);
    expect(seen.every((h) => !('Authorization' in h))).toBe(true);
  });

  test('a GraphQL error is thrown and not retried', async () => {
    const wp = fakeWordPress();
    const client = clientFor(wp);
    wp.answerAnonymous = () => response(200, { data: { posts: null }, errors: MASKED });
    await expect(client.fetchAPI(QUERY)).rejects.toThrow(
      'Internal server error',
    );
    expect(wp.queries).toBe(1);
    expect(wp.logins).toBe(0);
  });

  test('an HTTP error is thrown and not retried', async () => {
    const wp = fakeWordPress();
    const client = clientFor(wp);
    wp.answerAnonymous = () => response(504, null);
    await expect(client.fetchAPI(QUERY)).rejects.toThrow('504');
    expect(wp.queries).toBe(1);
  });

  test('a 200 answer that is not JSON or has no data is an error', async () => {
    const wp = fakeWordPress();
    const client = clientFor(wp);
    wp.answerAnonymous = () => ({
      ...response(200, null),
      json: async () => {
        throw new SyntaxError('Unexpected token <');
      },
    });
    await expect(client.fetchAPI(QUERY)).rejects.toThrow('not JSON');
    wp.answerAnonymous = () => response(200, {});
    await expect(client.fetchAPI(QUERY)).rejects.toThrow('no data');
  });
});

test.describe('createWpGraphQLClient with auth: true', () => {
  test('logs in once and reuses the token', async () => {
    const wp = fakeWordPress();
    const client = clientFor(wp);
    expect(await client.fetchAPI(QUERY, AUTH)).toEqual(DATA);
    expect(await client.fetchAPI(QUERY, AUTH)).toEqual(DATA);
    expect(wp.logins).toBe(1);
  });

  test('sends the credentials as variables, not inside the query', async () => {
    const wp = fakeWordPress();
    await clientFor(wp).fetchAPI(QUERY, AUTH);
    expect(wp.lastLoginBody.variables).toEqual({
      username: 'svc',
      password: 'pa"ss\\word',
    });
    expect(wp.lastLoginBody.query).not.toContain('pa"ss');
  });

  ['signature', 401, 403].forEach((rejectAs) => {
    test(`logs in again after a secret rotation (${rejectAs})`, async () => {
      const wp = fakeWordPress({ rejectAs });
      const client = clientFor(wp);
      await client.fetchAPI(QUERY, AUTH);
      wp.secret = 2;
      expect(await client.fetchAPI(QUERY, AUTH)).toEqual(DATA);
      expect(wp.logins).toBe(2);
      expect(wp.queries).toBe(3);
    });
  });

  test('a 500 with no sign of an auth error is not retried', async () => {
    const wp = fakeWordPress();
    const client = clientFor(wp);
    await client.fetchAPI(QUERY, AUTH);
    wp.answerValid = () => response(500, { errors: MASKED });
    await expect(client.fetchAPI(QUERY, AUTH)).rejects.toThrow('500');
    expect(wp.logins).toBe(1);
    expect(wp.queries).toBe(2);
  });

  test('a masked error with a valid token (WP overloaded) is not retried', async () => {
    const wp = fakeWordPress();
    const client = clientFor(wp);
    await client.fetchAPI(QUERY, AUTH);
    wp.answerValid = () => response(200, { data: { posts: null }, errors: MASKED });
    await expect(client.fetchAPI(QUERY, AUTH)).rejects.toThrow(
      'Internal server error',
    );
    expect(wp.logins).toBe(1);
    expect(wp.queries).toBe(2);
  });

  test('without X-JWT-Refresh from this WordPress a 200 error is never retried', async () => {
    const wp = fakeWordPress({ sendsRefreshHeader: false });
    const client = clientFor(wp);
    await client.fetchAPI(QUERY, AUTH);
    wp.secret = 2;
    await expect(client.fetchAPI(QUERY, AUTH)).rejects.toThrow(
      'Internal server error',
    );
    expect(wp.logins).toBe(1);
    expect(wp.queries).toBe(2);
  });

  test('parallel requests with a stale token cause one new login', async () => {
    const wp = fakeWordPress();
    const client = clientFor(wp);
    await client.fetchAPI(QUERY, AUTH);
    wp.secret = 2;
    const results = await Promise.allSettled(
      Array.from({ length: 5 }, () => client.fetchAPI(QUERY, AUTH)),
    );
    expect(results.filter((r) => r.status === 'fulfilled')).toHaveLength(1);
    expect(wp.logins).toBe(2);
    expect(await client.fetchAPI(QUERY, AUTH)).toEqual(DATA);
    expect(wp.logins).toBe(2);
  });

  test('forced logins happen at most once a minute', async () => {
    const wp = fakeWordPress();
    let clock = 0;
    const client = clientFor(wp, {
      now: () => clock,
      tokenTtlMs: 10 * 60 * 1000,
    });
    await client.fetchAPI(QUERY, AUTH);
    wp.secret = 2;
    clock = 1000;
    await client.fetchAPI(QUERY, AUTH);
    expect(wp.logins).toBe(2);
    wp.secret = 3;
    clock = 30 * 1000;
    await expect(client.fetchAPI(QUERY, AUTH)).rejects.toThrow(
      'Internal server error',
    );
    expect(wp.logins).toBe(2); // within the minute: no login, no retry
    clock = 62 * 1000;
    expect(await client.fetchAPI(QUERY, AUTH)).toEqual(DATA);
    expect(wp.logins).toBe(3);
  });

  test('a stale token is retried only once', async () => {
    const wp = fakeWordPress();
    const client = clientFor(wp);
    await client.fetchAPI(QUERY, AUTH);
    wp.secret = 2;
    const realFetch = wp.fetch;
    // From now on every login hands out a token that is already stale.
    wp.fetch = async (url, init) => {
      const res = await realFetch(url, init);
      if (isLogin(init)) wp.secret += 1;
      return res;
    };
    await expect(client.fetchAPI(QUERY, AUTH)).rejects.toThrow(
      'Internal server error',
    );
    expect(wp.logins).toBe(2);
    expect(wp.queries).toBe(3); // first call, stale, one retry, no more
  });

  test('an error with a token minted for the same call is not retried', async () => {
    const wp = fakeWordPress();
    let clock = 0;
    const client = clientFor(wp, { now: () => clock, tokenTtlMs: 1000 });
    await client.fetchAPI(QUERY, AUTH); // WordPress has sent X-JWT-Refresh
    clock = 2000; // the cached token expired, the next call logs in
    wp.secret = 2;
    const realFetch = wp.fetch;
    wp.fetch = async (url, init) => {
      const res = await realFetch(url, init);
      if (isLogin(init)) wp.secret += 1;
      return res;
    };
    await expect(client.fetchAPI(QUERY, AUTH)).rejects.toThrow(
      'Internal server error',
    );
    expect(wp.logins).toBe(2);
    expect(wp.queries).toBe(2);
  });

  test('requests that failed with the same token share one new login', async () => {
    const wp = fakeWordPress();
    const client = clientFor(wp, { forcedLoginIntervalMs: 0 });
    await client.fetchAPI(QUERY, AUTH);
    wp.secret = 2;
    const results = await Promise.all(
      Array.from({ length: 5 }, () => client.fetchAPI(QUERY, AUTH)),
    );
    expect(results).toEqual(Array(5).fill(DATA));
    expect(wp.logins).toBe(2);
  });

  test('a gateway error is not retried', async () => {
    const wp = fakeWordPress();
    const client = clientFor(wp);
    await client.fetchAPI(QUERY, AUTH);
    wp.answerValid = () => response(504, {});
    await expect(client.fetchAPI(QUERY, AUTH)).rejects.toThrow('504');
    expect(wp.logins).toBe(1);
  });

  test('a 200 answer that is not JSON is an error, not empty data', async () => {
    const wp = fakeWordPress();
    const client = clientFor(wp);
    await client.fetchAPI(QUERY, AUTH);
    wp.answerValid = () => ({
      ...response(200, null),
      json: async () => {
        throw new SyntaxError('Unexpected token <');
      },
    });
    await expect(client.fetchAPI(QUERY, AUTH)).rejects.toThrow('not JSON');
    expect(wp.logins).toBe(1);
  });

  test('a token expires after the TTL', async () => {
    const wp = fakeWordPress();
    let clock = 0;
    const client = clientFor(wp, { now: () => clock, tokenTtlMs: 1000 });
    await client.fetchAPI(QUERY, AUTH);
    clock = 1001;
    await client.fetchAPI(QUERY, AUTH);
    expect(wp.logins).toBe(2);
  });
});
