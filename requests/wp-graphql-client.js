// WPGraphQL client for server-side requests (server-only).
// No bare imports here, so tests/unit can load it with a stubbed fetch.
//
// Requests go without a token unless the caller passes `auth: true`.
// WordPress skips WPGraphQL Smart Cache (and its Redis object cache) for
// any request with an Authorization header, so a token on public queries
// makes every render run the full query. With the token, ACF relationship
// fields also return trashed and draft posts (e.g. a trashed attorney's
// email and phone on a practice page); anonymous answers carry published
// posts only. Checked 2026-11-05: every server query of the site returns
// the same data without the token apart from those unpublished entries.
// `auth: true` logs in with the service account; nothing needs it today
// (the site has no preview mode), it stays for a future preview/draft query.

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
  // Set once WordPress has sent X-JWT-Refresh on an answer to our token,
  // i.e. once its missing header can mean "token rejected".
  let wpSendsRefreshHeader = false;

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

  function parseData(json) {
    if (json?.errors) {
      logError('GraphQL errors:', json.errors);
      throw new Error(firstErrorMessage(json.errors, 'GraphQL error'));
    }

    if (!json || !('data' in json)) {
      throw new Error('GraphQL response has no data');
    }

    return json.data;
  }

  async function anonymousRequest(query, variables) {
    const res = await fetchImpl(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
    });

    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

    let json;
    try {
      json = await res.json();
    } catch (e) {
      throw new Error('GraphQL response is not JSON');
    }

    return parseData(json);
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

    // WPGraphQL JWT Authentication 0.7 answers a token signed with an old
    // secret (JWT_AUTH_SECRET_KEY rotated) with 200 and, without
    // GRAPHQL_DEBUG, a masked "Internal server error" on every field: the
    // same text an overloaded or failing WordPress gives. What tells them
    // apart: over HTTPS the plugin adds X-JWT-Refresh only when the Bearer
    // token validated. Its other rejections (wrong iss, revoked user secret)
    // come as 401/403. So a cached token gets one retry with a fresh login
    // only on 401/403, or on a 200 with errors and no X-JWT-Refresh from a
    // WordPress that sends the header otherwise. Anything else (5xx, a
    // masked error with a valid token) fails without a retry: retrying
    // there would double the load during bot waves. A forced login also
    // happens at most once per interval per instance, in case WordPress ever
    // starts dropping the header.
    const hasRefreshHeader = Boolean(res.headers?.get('x-jwt-refresh'));
    if (hasRefreshHeader) wpSendsRefreshHeader = true;
    const authRejected = rejected
      || (res.ok && json?.errors && wpSendsRefreshHeader && !hasRefreshHeader);
    if (
      authRejected
      && fromCache
      && retry
      && now() - lastForcedLoginAt >= forcedLoginIntervalMs
    ) {
      lastForcedLoginAt = now();
      if (cached.token === token) cached = { token: null, expiresAt: 0 };
      return request(query, variables, false);
    }

    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

    return parseData(json);
  }

  async function fetchAPI(query, { variables, auth = false } = {}) {
    try {
      return auth
        ? await request(query, variables, true)
        : await anonymousRequest(query, variables);
    } catch (error) {
      logError(error);
      throw error;
    }
  }

  return { fetchAPI };
}
