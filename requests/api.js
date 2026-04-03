import {
  BASE_API_URL,
  GRAPHQL_API_URL,
  NEXT_PUBLIC_WP_REST_KEY,
  headers as restApiHeaders,
} from 'utils/constants';
import decodeResponse from 'utils/decodeResponse';

export const headers = {
  'Content-Type': 'application/json',
  'User-Agent':
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
  Accept: 'application/json; charset=UTF-8',
};

let tokenCache = { token: null, expiresAt: 0 };
let inflightTokenRequest = null;

async function getServiceToken() {
  if (Date.now() < tokenCache.expiresAt && tokenCache.token) return tokenCache.token;
  if (inflightTokenRequest) return inflightTokenRequest;

  inflightTokenRequest = (async () => {
    try {
      const res = await fetch(GRAPHQL_API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: `mutation { login(input: { clientMutationId: "svc", username: "${process.env.WP_LOGIN}", password: "${process.env.WP_PASSWORD}" }) { authToken } }`,
        }),
      });
      const { data } = await res.json();
      const token = data?.login?.authToken;
      if (!token) throw new Error('WP login failed');

      tokenCache = { token, expiresAt: Date.now() + 270000 }; // 4.5 mins
      return token;
    } finally {
      inflightTokenRequest = null;
    }
  })();

  return inflightTokenRequest;
}

export async function fetchAPI(query, { variables } = {}, retry = true) {
  try {
    const token = await getServiceToken();

    const requestHeaders = {
      ...headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const res = await fetch(GRAPHQL_API_URL, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (res.status === 401 && retry) {
      tokenCache = { token: null, expiresAt: 0 };
      return fetchAPI(query, { variables }, false);
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch API');
  }
}

export async function fetchRestAPI(query, params = {}) {
  try {
    const searchParams = new URLSearchParams({
      secret_key: NEXT_PUBLIC_WP_REST_KEY,
      ...params,
    });

    const url = `${BASE_API_URL}/wp-json/wcra/v1/${query}/?${searchParams}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: restApiHeaders,
    });

    if (!res.ok) {
      console.error(`Error: Failed to fetch. Status code: ${res.status}`);
      throw new Error(`Failed to fetch from ${query} rest API`);
    }

    const decodedRes = await decodeResponse(res);
    return decodedRes?.data;
  } catch (error) {
    throw new Error(`Failed to fetch from ${query} rest API`);
  }
}
