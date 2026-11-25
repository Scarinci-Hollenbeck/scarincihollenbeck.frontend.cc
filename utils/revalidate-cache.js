// In-memory caches of the /api/revalidate-* routes, keyed by the `post_type`
// the WordPress ISR webhook sends (mu-plugins/sh-rest-api ISRRevalidation).
// Industries have no entry: /api/revalidate-industries keeps no in-memory
// cache, the CDN alone caches it for INDUSTRIES_CACHE_SECONDS.
export const CACHE_KEY_BY_POST_TYPE = {
  attorneys: 'attorneys',
  practices: 'practices',
  location: 'offices',
};

// Marks the cache of `postType` stale. Works only when the webhook lands on the
// same function instance as the cached route; otherwise the cache expires on
// its own timer.
export const resetCacheForPostType = (cache, postType) => {
  const key = CACHE_KEY_BY_POST_TYPE[postType];
  if (!cache || !key || !cache[key]) return null;
  cache[key].lastFetchTime = 0;
  return key;
};

// The industries menu is fetched in the browser from /api/revalidate-industries.
// A short CDN lifetime lets a change saved in WordPress reach the menu in about
// a minute, close to /services, which the webhook revalidates at once.
export const INDUSTRIES_CACHE_SECONDS = 60;
