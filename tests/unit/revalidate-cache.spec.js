import { test, expect } from '@playwright/test';
import {
  CACHE_KEY_BY_POST_TYPE,
  resetCacheForPostType,
} from '../../utils/revalidate-cache';

// The post types the WordPress ISR webhook sends, and the global.cache keys the
// /api/revalidate-* routes create (pages/api/revalidate-*.js).
const WEBHOOK_TO_ROUTE_CACHE = {
  attorneys: 'attorneys',
  practices: 'practices',
  location: 'offices',
};

const freshCache = () => ({
  attorneys: { data: [1], lastFetchTime: 1000 },
  practices: { data: [1], lastFetchTime: 1000 },
  offices: { data: [1], lastFetchTime: 1000 },
});

test('every webhook post type with a route cache maps to that cache key', () => {
  expect(CACHE_KEY_BY_POST_TYPE).toEqual(WEBHOOK_TO_ROUTE_CACHE);
});

Object.entries(WEBHOOK_TO_ROUTE_CACHE).forEach(([postType, key]) => {
  test(`post_type "${postType}" marks cache "${key}" stale and nothing else`, () => {
    const cache = freshCache();
    expect(resetCacheForPostType(cache, postType)).toBe(key);
    expect(cache[key].lastFetchTime).toBe(0);
    Object.keys(cache)
      .filter((other) => other !== key)
      .forEach((other) => expect(cache[other].lastFetchTime).toBe(1000));
  });
});

test('industries, unknown post types and a missing cache are left alone', () => {
  const cache = freshCache();
  expect(resetCacheForPostType(cache, 'industries')).toBeNull();
  expect(resetCacheForPostType(cache, 'post')).toBeNull();
  expect(resetCacheForPostType(undefined, 'attorneys')).toBeNull();
  expect(resetCacheForPostType({}, 'attorneys')).toBeNull();
  Object.values(cache).forEach((entry) => expect(entry.lastFetchTime).toBe(1000));
});
