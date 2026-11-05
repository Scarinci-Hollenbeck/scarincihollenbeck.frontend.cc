// WPGraphQL client that logs in with the service account (server-only).
// No bare imports here, so tests/unit can load it with a stubbed fetch.

const LOGIN_MUTATION = `mutation ServiceLogin($username: String!, $password: String!) {
  login(input: { clientMutationId: "svc", username: $username, password: $password }) { authToken }
}`;

const DEFAULT_TOKEN_TTL_MS = 4 * 60 * 1000;
const DEFAULT_FORCED_LOGIN_INTERVAL_MS = 60 * 1000;

const firstErrorMessage = (errors, fallback) => errors[0]?.message || fallback;

export function createWpGraphQLClient({
  url,
  headers,
  credentials,
  fetchImpl = (...args) => fetch(...args),
  now = Date.now,
  tokenTtlMs = DEFAULT_TOKEN_TTL_MS,
  forcedLoginIntervalMs = DEFAULT_FORCED_LOGIN_INTERVAL_MS,
  logError = console.error,
}) {
  let cached = { token: null, expiresAt: 0 };
  let inflightLogin = null;
  let lastForcedLoginAt = -Infinity;

  async function login() {
    const res = await fetchImpl(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query: LOGIN_MUTATION, variables: credentials() }),
    });

    if (!res.ok) throw new Error(`Login HTTP error: ${res.status}`);

    const json = await res.json();
    if (json.errors) {
      logError('Login error:', json.errors);
      throw new Error(firstErrorMessage(json.errors, 'WP login failed'));
    }

    const token = json?.data?.login?.authToken;
    if (!token) throw new Error('WP login failed');

    cached = { token, expiresAt: now() + tokenTtlMs };
    return token;
  }

  // `fromCache` is false when the token was minted for this call (or by a
  // login it joined): an error with such a token is not a stale-token error.
  async function getToken() {
    if (cached.token && now() < cached.expiresAt) {
      return { token: cached.token, fromCache: true };
    }
    if (!inflightLogin) {
      inflightLogin = login().finally(() => {
        inflightLogin = null;
      });
    }
    return { token: await inflightLogin, fromCache: false };
  }

  async function request(query, variables, retry) {
    const { token, fromCache } = await getToken();

    const res = await fetchImpl(url, {
      method: 'POST',
      headers: { ...headers, Authorization: `Bearer ${token}` },
      body: JSON.stringify({ query, variables }),
    });

    const rejected = res.status === 401 || res.status === 403;
    if (!res.ok && !rejected) throw new Error(`HTTP error: ${res.status}`);

    let json = null;
    try {
      json = await res.json();
    } catch (e) {
      if (res.ok) throw new Error('GraphQL response is not JSON');
    }

    // A token WordPress no longer accepts (JWT secret rotated, tokens
    // revoked) comes back as 401/403, or, without GRAPHQL_DEBUG, as a bare
    // "Internal server error" with no data that hides the `invalid-jwt`
    // reason. Such an answer to a cached token gets one retry with a fresh
    // login. An overloaded WordPress can answer the same way, so a forced
    // login happens at most once per interval per instance; other requests
    // just fail (ISR keeps the old page). 5xx is never retried.
    const tokenRejected = rejected || (json?.errors && !json.data);
    if (
      tokenRejected
      && fromCache
      && retry
      && now() - lastForcedLoginAt >= forcedLoginIntervalMs
    ) {
      lastForcedLoginAt = now();
      if (cached.token === token) cached = { token: null, expiresAt: 0 };
      return request(query, variables, false);
    }

    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

    if (json?.errors) {
      logError('GraphQL errors:', json.errors);
      throw new Error(firstErrorMessage(json.errors, 'GraphQL error'));
    }

    if (!json || !('data' in json)) {
      throw new Error('GraphQL response has no data');
    }

    return json.data;
  }

  async function fetchAPI(query, { variables } = {}) {
    try {
      return await request(query, variables, true);
    } catch (error) {
      logError(error);
      throw error;
    }
  }

  return { fetchAPI };
}
