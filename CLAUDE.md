# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev        # Start dev server on port 7700
yarn build      # Production build, then scripts/check-client-bundle.js (fails on server code/secrets in client chunks)
yarn start      # Start production server on port 7300
yarn lint       # ESLint with auto-fix (airbnb config)
yarn format     # Prettier formatting
yarn test:unit  # Playwright unit tests (tests/unit), no server needed
node scripts/smoke-compare.js <target> [<reference>]  # Release HTTP sweep, one URL at a time (see "Releasing staging to production")
yarn test:e2e   # Playwright e2e tests (tests/e2e) against E2E_BASE_URL, default http://localhost:7300 (run `yarn build && yarn start` first; browser tests need `npx playwright install chromium` once)
```

## Architecture Overview

This is a **Next.js 16** frontend (Pages Router, React 19) for the Scarinci Hollenbeck law firm website. It is deployed on Vercel (Node 22.x, pinned via `engines` in `package.json`). The backend is a headless WordPress instance, consumed via both GraphQL and a custom REST API.

### Next 16 specifics

- Version-matched Next docs ship in `node_modules/next/dist/docs/` (`02-pages/` for this router); read them before relying on memory of older Next APIs. `AGENTS.md` holds the same pointer and is rewritten by `next dev` (disable with `agentRules: false`).

- `dev` and `build` run with `--webpack`: `@ducanh2912/next-pwa` adds a webpack config, and Next 16 refuses a Turbopack build when one exists. Dropping the flag means moving PWA to Serwist first.
- `experimental.staticGenerationMaxConcurrency: 1` keeps Next 14's one page per build worker. The default (8) overloads WordPress and pages hit the 60s prerender timeout.
- `images.qualities` must list every `quality` prop used in components; Next 16 silently snaps other values to the nearest listed one (direct `/_next/image` URLs with them get 400).
- `<Html data-scroll-behavior="smooth">` in `_document.js` keeps instant scroll-to-top on navigation, since the global CSS sets `scroll-behavior: smooth`.
- Use `preload`, not the deprecated `priority`, on `next/image`.
- ESLint stays on v7 + `.eslintrc.js` with `@next/eslint-plugin-next` 12; `eslint-config-next` 16 needs ESLint 9 flat config, which is a separate migration.

### Data Fetching Strategy

Pages use one of two approaches:

1. **Static Generation (ISR)** — most pages use `getStaticProps` with `revalidate` for ISR. Revalidation times vary: home/attorneys/locations/etc. use 1 day (86400s), library content uses shorter intervals.

2. **Internal API routes** (`/pages/api/`) — caching middleware layer that proxies WordPress REST API calls with a 600-second in-memory global cache (`global.cache`). These are consumed by RTK Query in the Redux store for client-side data like attorneys list, locations, practices, and industries.

### Two API Clients (`requests/api.js`)

- `fetchAPI(query, { variables })` — posts GraphQL queries to `NEXT_PUBLIC_BASE_GRAPHQL_API_URL` (WPGraphQL endpoint). All `getStaticProps` data fetching goes through here.
- `fetchRestAPI(query, params)` — GETs from the custom WP REST API at `BASE_API_URL/wp-json/wcra/v1/{query}/` using a secret key. Used by the `/api/` route handlers.

`requests/api.js` is server-only: `fetchAPI` logs in to WordPress with the service account (`WP_LOGIN` / `WP_PASSWORD`). Next strips only `getStaticProps`/`getStaticPaths` (and code used only by them) from a page's client bundle, so a page must not export any other helper that reaches `fetchAPI`; keep such helpers unexported or in `requests/`, and shared pure helpers in `utils/`. `scripts/check-client-bundle.js` enforces this after every build. Never put server secrets in the `env` block of `next.config.js`.

### Security headers and CSP

`utils/security-headers.js` (applied to every route by `headers()` in `next.config.js`) sends the same headers as the WordPress backend (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS) plus a CSP in `Content-Security-Policy-Report-Only`. Violations go to `pages/api/csp-report.js`, which logs `[csp-report]` lines via `console.warn` (Vercel logs). The source lists cover GTM `GTM-PZ2XWLW4` (GA4, Google Ads, CallRail via a custom HTML tag), reCAPTCHA, Kwes, Algolia, YouTube embeds and WordPress; a new third party (or a new GTM tag) needs its hosts added there. Switch to the enforcing `Content-Security-Policy` only when the reports contain no unexpected sources. `tests/e2e/security-headers.spec.js` pins the header values.

### Redux Store (`redux/`)

RTK Query powers two API services:

- `redux/services/wp-graphql.js` — GraphQL client for client-side queries: mutations, plus the cached `getGraphQLQuery` endpoint behind `hooks/usePaginationData.js` (paginated attorney articles and industry clients; results stay cached for the whole session)
- `redux/services/project-api.js` — queries internal `/api/` routes for attorneys, practices, locations, industries

Slices: `attorneys`, `sizes`, `modals`, `library`

### URL Routing

The site uses Next.js **rewrites** (not redirects) to map public-facing URLs to internal page routes. Key mappings in `utils/rewrites.js`:

- `/practices/:slug` → `/services` page (practices and industries are under `/services`)
- `/law-firm-insights/:slug`, `/client-alert/:slug`, etc. → `/post/:slug`
- `/diversity`, `/community-involvement`, `/pro-bono` → `/firm-page/:slug`
- `/awards`, `/privacy-policy`, etc. → `/basic-page/:slug`

Permanent redirects are in `utils/permanent-redirects.js`.

### Component Structure

Follows atomic design under `components/`:

- `atoms/` — smallest UI units (buttons, cards, icons)
- `molecules/` — composed from atoms
- `organisms/` — complex sections (Navbar, forms)
- `pages/` — full page-level components (imported by pages/)
- `shared/` — site-wide: `Header`, `Footer`, `CommonModals`, global search

### Styling

- **Styled Components** (with Next.js compiler integration) — most component styles live alongside components as `*.style.js` files in `styles/`
- **Bootstrap 5** + **React Bootstrap** — used for grid/layout
- **Animate.css** — imported globally in `_app.js`
- Global styles: `styles/global_styles/Global.styles.js` and `styles/global_styles/InitFonts.js`
- Breakpoints defined in `styles/mediaBreakpoints.style.js`

### Animations (framer-motion 12)

Do not set a style only in `transitionEnd` (e.g. `transitionEnd: { overflow: 'visible' }`) when that key is not animated: framer-motion 12 creates the value at the end without scheduling a render, so the DOM keeps the `initial` value until some other value of the element changes. A per-value `delay` does not help either: string values such as `overflow` are applied instantly. Toggle a class from `onAnimationComplete` (and `useIsPresent` for exit) instead, as `NavbarContentWrapper.js` does; `tests/e2e/navbar-menu.spec.js` covers the header panel. `NavbarLocations.js` and `SubHeaderLocations.js` still use the old pattern; checked on production 2026-10-14: the Locations menu keeps `overflow: hidden` but nothing in it overflows, and the location sub-header does switch to `visible`, so neither needs a fix now.

### Path Aliases

`jsconfig.json` sets `baseUrl: "."` — all imports resolve from the project root. Use bare module paths like `import Foo from 'components/atoms/Foo'` rather than relative paths.

### Key Constants (`utils/constants.js`)

All environment variable references, site-wide nav arrays, office locations, practice lists, FAQ content, and form field definitions live here. Import constants from this file rather than hardcoding values.

### Environment Variables Required

```
NEXT_PUBLIC_BASE_API_URL          # WordPress REST API base URL
NEXT_PUBLIC_BASE_GRAPHQL_API_URL  # WPGraphQL endpoint
NEXT_PUBLIC_ALGOLIA_PUBLIC_API    # Algolia search API key
NEXT_PUBLIC_ALGOLIA_APP_ID
NEXT_PUBLIC_ALGOLIA_SEARCH_INDEX
WP_REST_KEY                       # WordPress REST API secret key (server-only; was NEXT_PUBLIC_WP_REST_KEY)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY
NEXT_PUBLIC_PROJECT_MODE          # Set to "development" to disable PWA
NEXT_PUBLIC_FIREBASE_*            # Firebase config vars
```

### Deployment Branches

- Feature branches → PR into `staging`; every branch and PR gets a Vercel preview deployment
- `staging` → PR into `production`
- `production` branch → Vercel Production, the live site at scarincihollenbeck.com (merging here deploys to live)

### Releasing `staging` to production

WordPress renders every uncached page and its login starts returning 504 (and ISR tasks time out on the live site) at about 8 parallel renders. Never sweep the live site in parallel; the tools below go one URL at a time.

The `vercel` commands below need a directory linked once with `vercel link --project scarincihollenbeck-frontend-cc --scope scarinci-hollenbeck`. The `VAR=value command` prefixes are Git Bash syntax. Browser specs must call `blockAnalytics(page)` from `tests/e2e/support/block-analytics.js` before opening a page, so runs against previews or production never send analytics or ad hits.

1. Before the merge, against the staging alias (`https://scarincihollenbeck-frontend-cc-git-staging-scarinci-hollenbeck.vercel.app`, public): `node scripts/smoke-compare.js <staging> https://scarincihollenbeck.com` (every sitemap URL, 40 posts, every redirect and rewrite; diffs status, Location, title, canonical, robots, h1, JSON-LD; pre-existing issues print as warnings) and `E2E_BASE_URL=<staging> yarn test:e2e --workers=1`.
2. Merge in a quiet hour (evening or weekend, US Eastern). Note the URL of the outgoing production deployment first (`vercel ls --prod`): it is the rollback target and the reference for step 3. Check it answers 200 without a login; if Deployment Protection ever covers deployment URLs, use the staging alias as the reference instead.
3. Right after the deploy: `node scripts/smoke-compare.js https://scarincihollenbeck.com <previous production deployment URL>`, `E2E_BASE_URL=https://scarincihollenbeck.com npx playwright test --project=e2e --workers=1 tests/e2e/release-smoke.spec.js` (only this spec on the live site, the others are not meant for production; the Maps test runs only on the real domain, the Maps key rejects `*.vercel.app`), and `vercel logs --environment production --level error --since 30m --no-follow --no-branch` (without `--no-branch`, run inside this repo the CLI filters by the current git branch and finds nothing for `production` deploys). The new deployment's ISR cache is cold, so timeouts show up first.
4. Rollback is Vercel instant rollback; afterwards Vercel stops auto-assigning the domain to new production deployments until that is undone in the dashboard.

Expected noise on previews: `X-Robots-Tag: noindex` (Lighthouse SEO drops) and CSP reports from the `vercel.live` toolbar. `/library/category/*` is SSR and returns 504 or a false 404 when WordPress is overloaded, on any deployment.

### ESLint

Airbnb config with many rules disabled (see `.eslintrc.js`). `no-console` is an error except for `console.warn` and `console.error`.
