import { getBaseUrl } from 'utils/helpers';

/**
 * JSON from one of our own /api routes, for getServerSideProps. The pages go
 * through HTTP on purpose: the CDN caches those API answers for 600 s, so
 * WordPress sees one request per 10 minutes instead of one per page view.
 *
 * Throws when the route fails (WordPress down or slow), so the page answers
 * 500 instead of reading the error body as "nothing found" and returning a
 * 404 that the CDN would cache.
 */
export const fetchOwnApi = async (req, path) => {
  const response = await fetch(`${getBaseUrl(req.headers.host)}${path}`);
  if (!response.ok) {
    throw new Error(`${path.split('?')[0]} answered ${response.status}`);
  }
  return response.json();
};
