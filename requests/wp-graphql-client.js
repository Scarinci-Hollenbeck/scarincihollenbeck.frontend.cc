// WPGraphQL client that logs in with the service account (server-only).
// No bare imports here, so tests/unit can load it with a stubbed fetch.

const LOGIN_MUTATION = `mutation ServiceLogin($username: String!, $password: String!) {
  login(input: { clientMutationId: "svc", username: $username, password: $password }) { authToken }
}`;

const DEFAULT_TOKEN_TTL_MS = 4 * 60 * 1000;

const firstErrorMessage = (errors, fallback) => errors[0]?.message || fallback;

export function createWpGraphQLClient({
  url,
  headers,
  credentials,
  fetchImpl = (...args) => fetch(...args),
  now = Date.now,
  tokenTtlMs = DEFAULT_TOKEN_TTL_MS,
  logError = console.error,
}) {
  let cached = { token: null, expiresAt: 0 };
  let inflightLogin = null;

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

  // Drop the token only if it is still the one that failed, so parallel
  // requests that failed with it share a single new login.
  function invalidate(token) {
    if (cached.token === token) cached = { token: null, expiresAt: 0 };
  }

  async function request(query, variables, retry) {
    const { token, fromCache } = await getToken();

    const res = await fetchImpl(url, {
      method: 'POST',
      headers: { ...headers, Authorization: `Bearer ${token}` },
      body: JSON.stringify({ query, variables }),
    });

    // A token WordPress no longer accepts (JWT secret rotated, user's
    // tokens revoked) comes back as 401/403, or, without GRAPHQL_DEBUG, as a
    // bare "Internal server error" that hides the `invalid-jwt` reason. So any
    // such answer to a cached token gets one retry with a fresh login. 5xx
    // (WordPress overloaded) is never retried: that would add load.
    const rejected = res.status === 401 || res.status === 403;
    let json = null;
    if (res.ok || rejected) json = await res.json().catch(() => null);

    if ((rejected || json?.errors) && fromCache && retry) {
      invalidate(token);
      return request(query, variables, false);
    }

    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

    if (json?.errors) {
      logError('GraphQL errors:', json.errors);
      throw new Error(firstErrorMessage(json.errors, 'GraphQL error'));
    }

    return json?.data;
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
