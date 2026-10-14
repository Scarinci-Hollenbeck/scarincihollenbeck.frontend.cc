// Security headers for every route, wired in next.config.js `headers()`.
// The fixed ones match what the WordPress backend sends, so both hosts behave
// the same. CSP is report-only for now: violations go to /api/csp-report and
// show up in the Vercel logs; switch to the enforcing header only once the
// reports from preview/production are down to known sources.

const CSP_REPORT_PATH = '/api/csp-report';
const CSP_REPORT_GROUP = 'csp-endpoint';

const originOf = (url) => {
  try {
    return new URL(url).origin;
  } catch (e) {
    return null;
  }
};

// The browser talks to WordPress directly (RTK Query GraphQL, Apollo pagination).
const WORDPRESS_ORIGINS = [
  originOf(process.env.NEXT_PUBLIC_BASE_GRAPHQL_API_URL),
  originOf(process.env.NEXT_PUBLIC_BASE_API_URL),
].filter(Boolean);

const GOOGLE_TAGS = [
  // GTM-PZ2XWLW4: GA4, Google Ads conversion + linker, CallRail swap.js (custom HTML).
  'https://www.googletagmanager.com',
  'https://*.googletagmanager.com',
  'https://*.google-analytics.com',
  'https://analytics.google.com',
  'https://*.analytics.google.com',
  'https://www.googleadservices.com',
  'https://googleads.g.doubleclick.net',
  'https://*.doubleclick.net',
  'https://pagead2.googlesyndication.com',
];

const CALLRAIL = ['https://cdn.callrail.com', 'https://*.callrail.com'];

const RECAPTCHA = ['https://www.google.com', 'https://www.gstatic.com'];

const KWES = ['https://kwes.io', 'https://*.kwes.io'];

const ALGOLIA = [
  'https://*.algolia.net',
  'https://*.algolianet.com',
  'https://*.algolia.io',
];

// lite-youtube-embed from @next/third-parties YouTubeEmbed.
const YOUTUBE_EMBED_ASSETS = ['https://cdn.jsdelivr.net'];

const YOUTUBE_FRAMES = [
  'https://www.youtube.com',
  'https://www.youtube-nocookie.com',
];

const CSP_DIRECTIVES = {
  'default-src': ["'self'"],
  // Pages are static (ISR), so there is no per-request nonce; GTM's bootstrap
  // and its custom HTML tags are inline.
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    ...GOOGLE_TAGS,
    ...CALLRAIL,
    ...RECAPTCHA,
    ...KWES,
    ...YOUTUBE_EMBED_ASSETS,
  ],
  'style-src': ["'self'", "'unsafe-inline'", ...YOUTUBE_EMBED_ASSETS],
  'img-src': ["'self'", 'data:', 'blob:', 'https:'],
  'font-src': ["'self'", 'data:'],
  'media-src': ["'self'", 'https:'],
  'connect-src': [
    "'self'",
    ...WORDPRESS_ORIGINS,
    ...GOOGLE_TAGS,
    ...CALLRAIL,
    ...RECAPTCHA,
    ...KWES,
    ...ALGOLIA,
  ],
  'frame-src': [
    "'self'",
    ...RECAPTCHA,
    ...YOUTUBE_FRAMES,
    'https://www.googletagmanager.com',
    'https://*.doubleclick.net',
  ],
  'worker-src': ["'self'", 'blob:'],
  'manifest-src': ["'self'"],
  'form-action': ["'self'", ...KWES],
  'frame-ancestors': ["'self'"],
  'base-uri': ["'self'"],
  'object-src': ["'none'"],
  // report-uri for Firefox/Safari, report-to for Chromium.
  'report-uri': [CSP_REPORT_PATH],
  'report-to': [CSP_REPORT_GROUP],
};

const CONTENT_SECURITY_POLICY = Object.entries(CSP_DIRECTIVES)
  .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
  .join('; ');

const SECURITY_HEADERS = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  // Vercel already sends max-age=63072000 (two years); setting the same value
  // keeps it at that and makes `next start` behave like Vercel.
  { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
  {
    key: 'Reporting-Endpoints',
    value: `${CSP_REPORT_GROUP}="${CSP_REPORT_PATH}"`,
  },
  {
    key: 'Content-Security-Policy-Report-Only',
    value: CONTENT_SECURITY_POLICY,
  },
];

module.exports = {
  SECURITY_HEADERS,
  CSP_REPORT_PATH,
};
