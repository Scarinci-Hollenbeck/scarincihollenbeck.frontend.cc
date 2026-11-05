import { test, expect } from '@playwright/test';
import { createWpGraphQLClient } from '../../requests/wp-graphql-client';

const URL = 'https://wp.test/graphql';
const QUERY = '{ posts { nodes { id } } }';
const DATA = { posts: { nodes: [] } };

const jsonResponse = (status, body) => ({
  ok: status >= 200 && status < 300,
  status,
  json: async () => body,
});

// A WordPress stand-in: `secret` is the JWT secret, rotated by the test.
// Tokens minted under an old secret get `rejectAs`: either the HTTP status
// WPGraphQL JWT sends, or the bare "Internal server error" it shows without
// GRAPHQL_DEBUG.
const fakeWordPress = ({ rejectAs = 'internal-error' } = {}) => {
  const wp = {
    secret: 1,
    logins: 0,
    queries: 0,
    lastLoginBody: null,
    fetch: async (url, { headers, body }) => {
      const parsed = JSON.parse(body);
      if (parsed.query.includes('login(')) {
        wp.logins += 1;
        wp.lastLoginBody = parsed;
        await new Promise((r) => {
          setTimeout(r, 5);
        });
        return jsonResponse(200, {
          data: { login: { authToken: `token-${wp.secret}-${wp.logins}` } },
        });
      }
      wp.queries += 1;
      const token = (headers.Authorization || '').replace('Bearer ', '');
      if (!token.startsWith(`token-${wp.secret}-`)) {
        // Rejections arrive spread out, some after a new login has finished.
        const delay = wp.queries * 10;
        await new Promise((r) => {
          setTimeout(r, delay);
        });
        if (rejectAs === 'forbidden' || rejectAs === 'unauthorized') {
          return jsonResponse(rejectAs === 'forbidden' ? 403 : 401, {
            errors: [{ message: 'Internal server error' }],
          });
        }
        return jsonResponse(200, {
          errors: [{ message: 'Internal server error' }],
        });
      }
      return jsonResponse(200, { data: DATA });
    },
  };
  return wp;
};

const clientFor = (wp, extra = {}) => createWpGraphQLClient({
  url: URL,
  headers: { 'Content-Type': 'application/json' },
  credentials: () => ({ username: 'svc', password: 'pa"ss\\word' }),
  fetchImpl: wp.fetch,
  logError: () => {},
  ...extra,
});

test.describe('createWpGraphQLClient', () => {
  test('logs in once and reuses the token', async () => {
    const wp = fakeWordPress();
    const client = clientFor(wp);
    expect(await client.fetchAPI(QUERY)).toEqual(DATA);
    expect(await client.fetchAPI(QUERY)).toEqual(DATA);
    expect(wp.logins).toBe(1);
  });

  test('sends the credentials as variables, not inside the query', async () => {
    const wp = fakeWordPress();
    await clientFor(wp).fetchAPI(QUERY);
    expect(wp.lastLoginBody.variables).toEqual({
      username: 'svc',
      password: 'pa"ss\\word',
    });
    expect(wp.lastLoginBody.query).not.toContain('pa"ss');
  });

  ['internal-error', 'forbidden', 'unauthorized'].forEach((rejectAs) => {
    test(`logs in again after a secret rotation (${rejectAs})`, async () => {
      const wp = fakeWordPress({ rejectAs });
      const client = clientFor(wp);
      await client.fetchAPI(QUERY);
      wp.secret = 2;
      expect(await client.fetchAPI(QUERY)).toEqual(DATA);
      expect(wp.logins).toBe(2);
    });
  });

  test('parallel requests with a stale token cause one new login', async () => {
    const wp = fakeWordPress();
    const client = clientFor(wp);
    await client.fetchAPI(QUERY);
    wp.secret = 2;
    const results = await Promise.allSettled(
      Array.from({ length: 5 }, () => client.fetchAPI(QUERY)),
    );
    expect(results.filter((r) => r.status === 'fulfilled')).toHaveLength(1);
    expect(wp.logins).toBe(2);
    expect(await client.fetchAPI(QUERY)).toEqual(DATA);
    expect(wp.logins).toBe(2);
  });

  test('a failing WordPress gets at most one forced login a minute', async () => {
    const wp = fakeWordPress();
    let clock = 0;
    let failing = false;
    const client = clientFor(wp, {
      now: () => clock,
      tokenTtlMs: 10 * 60 * 1000,
      fetchImpl: async (url, init) => {
        if (failing && !JSON.parse(init.body).query.includes('login(')) {
          wp.queries += 1;
          return jsonResponse(200, {
            errors: [{ message: 'Internal server error' }],
          });
        }
        return wp.fetch(url, init);
      },
    });
    await client.fetchAPI(QUERY);
    failing = true;
    clock = 1000;
    await expect(client.fetchAPI(QUERY)).rejects.toThrow(
      'Internal server error',
    );
    expect(wp.logins).toBe(2); // first failure: one forced login
    expect(wp.queries).toBe(3);
    clock = 30 * 1000;
    await expect(client.fetchAPI(QUERY)).rejects.toThrow(
      'Internal server error',
    );
    expect(wp.logins).toBe(2); // within the minute: no login, no retry
    expect(wp.queries).toBe(4);
    clock = 62 * 1000;
    await expect(client.fetchAPI(QUERY)).rejects.toThrow(
      'Internal server error',
    );
    expect(wp.logins).toBe(3);
  });

  test('does not retry an error that comes with partial data', async () => {
    const wp = fakeWordPress();
    let partial = false;
    const client = clientFor(wp, {
      fetchImpl: async (url, init) => {
        if (partial && !JSON.parse(init.body).query.includes('login(')) {
          wp.queries += 1;
          return jsonResponse(200, {
            data: { posts: null },
            errors: [{ message: 'Field error' }],
          });
        }
        return wp.fetch(url, init);
      },
    });
    await client.fetchAPI(QUERY);
    partial = true;
    await expect(client.fetchAPI(QUERY)).rejects.toThrow('Field error');
    expect(wp.logins).toBe(1);
  });

  test('a 200 answer that is not JSON is an error, not empty data', async () => {
    const wp = fakeWordPress();
    let html = false;
    const client = clientFor(wp, {
      fetchImpl: async (url, init) => {
        if (html && !JSON.parse(init.body).query.includes('login(')) {
          return {
            ok: true,
            status: 200,
            json: async () => {
              throw new SyntaxError('Unexpected token <');
            },
          };
        }
        return wp.fetch(url, init);
      },
    });
    await client.fetchAPI(QUERY);
    html = true;
    await expect(client.fetchAPI(QUERY)).rejects.toThrow();
    expect(wp.logins).toBe(1);
  });

  test('does not retry an error that comes with a fresh token', async () => {
    const wp = fakeWordPress();
    const client = clientFor(wp, {
      fetchImpl: async (url, init) => {
        if (JSON.parse(init.body).query.includes('login(')) return wp.fetch(url, init);
        wp.queries += 1;
        return jsonResponse(200, { errors: [{ message: 'Syntax Error' }] });
      },
    });
    await expect(client.fetchAPI(QUERY)).rejects.toThrow('Syntax Error');
    expect(wp.logins).toBe(1);
    expect(wp.queries).toBe(1);
  });

  test('retries a stale token only once', async () => {
    const wp = fakeWordPress();
    const realFetch = wp.fetch;
    // Every login hands out a token that is already stale.
    const client = clientFor(wp, {
      fetchImpl: async (url, init) => {
        const res = await realFetch(url, init);
        if (JSON.parse(init.body).query.includes('login(')) wp.secret += 1;
        return res;
      },
    });
    await expect(client.fetchAPI(QUERY)).rejects.toThrow(
      'Internal server error',
    );
    expect(wp.queries).toBe(1); // fresh token: no retry
    await expect(client.fetchAPI(QUERY)).rejects.toThrow(
      'Internal server error',
    );
    expect(wp.queries).toBe(3); // cached token: one retry, no more
    expect(wp.logins).toBe(2);
  });

  test('does not retry a gateway error', async () => {
    const wp = fakeWordPress();
    let gatewayDown = false;
    const client = clientFor(wp, {
      fetchImpl: async (url, init) => (gatewayDown ? jsonResponse(504, {}) : wp.fetch(url, init)),
    });
    await client.fetchAPI(QUERY);
    gatewayDown = true;
    await expect(client.fetchAPI(QUERY)).rejects.toThrow('504');
    expect(wp.logins).toBe(1);
  });

  test('a token expires after the TTL', async () => {
    const wp = fakeWordPress();
    let clock = 0;
    const client = clientFor(wp, { now: () => clock, tokenTtlMs: 1000 });
    await client.fetchAPI(QUERY);
    clock = 1001;
    await client.fetchAPI(QUERY);
    expect(wp.logins).toBe(2);
  });
});
