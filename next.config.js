const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NEXT_PUBLIC_PROJECT_MODE === 'development',
  workboxOptions: {
    disableDevLogs: true,
  },
});
const {
  SITE_PAGES_REWRITES,
  POST_TYPE_REWRITES,
  POST_CATEGORY_REWRITES,
} = require('./utils/rewrites');
const { PERMANENT_REDIRECTS } = require('./utils/permanent-redirects');
const { SECURITY_HEADERS } = require('./utils/security-headers');

const nextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shhcsgmvsndmxmpq.nyc3.digitaloceanspaces.com',
      },
      {
        protocol: 'https',
        hostname: 'musicesq.com',
      },
      {
        protocol: 'https',
        hostname: 'scarincilawyer.com',
      },
      {
        protocol: 'https',
        hostname: 'conqqqshlskopvv.nyc3.digitaloceanspaces.com',
      },
      {
        protocol: 'https',
        hostname: 'wp.scarincihollenbeck.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'scarincihollenbeck.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'scarinci.test',
      },
    ],
    minimumCacheTTL: 60,
    deviceSizes: [576, 768, 992, 1200, 1456, 1920],
    // Next 16 only serves qualities listed here (default [75]); keep every `quality` prop used in components.
    qualities: [60, 70, 75, 80, 85, 90, 100],
  },
  experimental: {
    scrollRestoration: true,
    // Next 15+ prerenders up to 8 pages per build worker at once; the WordPress
    // backend times out under that load, so keep Next 14's one page per worker.
    staticGenerationMaxConcurrency: 1,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // Never list server-only secrets in `env`: Next inlines them into client
  // chunks as soon as browser code references them. Read them via process.env
  // in server code only.
  env: {
    NEXT_PUBLIC_GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
    NEXT_PUBLIC_BASE_API_URL: process.env.NEXT_PUBLIC_BASE_API_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_ALGOLIA_PUBLIC_API: process.env.NEXT_PUBLIC_ALGOLIA_PUBLIC_API,
    NEXT_PUBLIC_ALGOLIA_APP_ID: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    NEXT_PUBLIC_ALGOLIA_SEARCH_INDEX:
      process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_INDEX,
    NEXT_PUBLIC_BASE_GRAPHQL_API_URL:
      process.env.NEXT_PUBLIC_BASE_GRAPHQL_API_URL,
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID:
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID:
      process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    NEXT_PUBLIC_FIREBASE_VAPID_KEY: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
  },
  compiler: {
    styledComponents: true,
  },

  async headers() {
    return [{ source: '/:path*', headers: SECURITY_HEADERS }];
  },
  async redirects() {
    return [...PERMANENT_REDIRECTS];
  },
  async rewrites() {
    return [
      ...POST_TYPE_REWRITES,
      ...POST_CATEGORY_REWRITES,
      ...SITE_PAGES_REWRITES,
    ];
  },
};
// @ts-ignore
module.exports = withBundleAnalyzer(withPWA(nextConfig));
