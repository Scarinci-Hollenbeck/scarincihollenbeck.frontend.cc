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
node scripts/smoke-compare.js <target> [<reference URL>|<snapshot.json>] [--save <file>]  # Paced release HTTP sweep, takes hours (see "Releasing staging to production")
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

1. **Static Generation (ISR)** — most pages use `getStaticProps` with `revalidate` for ISR. Pages use `revalidate: 600`; the "not found" answers of attorney profiles and `/practices/:slug` use 60, so a profile or practice that gets published shows up quickly.

2. **Internal API routes** (`/pages/api/`) — caching middleware layer that proxies WordPress REST API calls with a 600-second in-memory global cache (`global.cache`). These are consumed by RTK Query in the Redux store for client-side data like attorneys list, locations, practices, and industries.

### Two API Clients (`requests/api.js`)

- `fetchAPI(query, { variables })` — posts GraphQL queries to `NEXT_PUBLIC_BASE_GRAPHQL_API_URL` (WPGraphQL endpoint). All `getStaticProps` data fetching goes through here.
- `fetchRestAPI(query, params)` — GETs from the custom WP REST API at `BASE_API_URL/wp-json/wcra/v1/{query}/` using a secret key. Used by the `/api/` route handlers.

`requests/api.js` is server-only: `fetchAPI` logs in to WordPress with the service account (`WP_LOGIN` / `WP_PASSWORD`). Next strips only `getStaticProps`/`getStaticPaths` (and code used only by them) from a page's client bundle, so a page must not export any other helper that reaches `fetchAPI`; keep such helpers unexported or in `requests/`, and shared pure helpers in `utils/`. `scripts/check-client-bundle.js` enforces this after every build. Never put server secrets in the `env` block of `next.config.js`.

### Security headers and CSP

`utils/security-headers.js` (applied to every route by `headers()` in `next.config.js`) sends the same headers as the WordPress backend (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS) plus a CSP in `Content-Security-Policy-Report-Only`. Violations go to `pages/api/csp-report.js`, which logs `[csp-report]` lines via `console.warn` (Vercel logs). The source lists cover GTM `GTM-PZ2XWLW4` (GA4, Google Ads, CallRail via a custom HTML tag), reCAPTCHA, Kwes, Algolia, YouTube embeds and WordPress; a new third party (or a new GTM tag) needs its hosts added there. CSP stays report-only: ticket #3 asked only for reports from expected sources; switching to the enforcing header is a separate decision for the client. Expected reports: `www.google.<ccTLD>/ads/ga-audiences` (Google Ads picks the visitor's country domain; CSP cannot wildcard a TLD) and `vercel.live` (Vercel toolbar for team members; do not allow it). `tests/e2e/security-headers.spec.js` pins the header values.

### Vercel Firewall (dashboard, not in the repo)

Crawler waves overload WordPress (about 10 PHP workers, every uncached render hits it), so the project has Firewall rules set in the Vercel dashboard: `Deny Baiduspider` (user agent), `Rate limit pages per IP` (60 pages a minute per IP, skips `/_next/`, `/api/` and files with an extension, answers 429) and Bot Protection (flags non-browser clients, verified bots excluded; log-only since 2026-11-05, to switch to challenge once the log shows no wanted traffic). Anything that requests the site from one machine (sweeps, e2e, load checks) must stay well under 60 pages a minute and must not look like a burst; a non-browser client may be challenged by Bot Protection.

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

The header search (`components/shared/GlobalSearch/`) runs on `react-instantsearch` 7 hooks with `insights={false}`. `SearchHits.js` and `SearchPagination.js` reproduce the markup of the old `react-instantsearch-dom` 6 widgets because `styles/GlobalSearch.style.js` targets those `ais-*` classes; the post type filter is single-select. `tests/e2e/global-search.spec.js` pins the behaviour against the live index. `instantsearch.js` lists `react` as a dependency (it never imports it); the `**/instantsearch.js/react` entry in `resolutions` keeps a second React copy out of `node_modules`, so bump it together with `react`.

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

WordPress renders every uncached page and its login starts returning 504 (and ISR tasks time out on the live site) at about 8 parallel renders. Every request to a stale ISR page starts a background render: Vercel answers `x-vercel-cache: STALE` (or `PRERENDER` on a deployment that has not served the page since its build) at once and renders after answering, and a request to a page whose render is still running starts one more (2026-11-03: a 3 s poll loop timed out `/practices/education-law` every 3 s). Pages revalidate every 600 s, so almost every page of a deployment is stale. A sequential sweep therefore still stacks renders (2026-11-02 and 2026-11-03, 60 s timeouts on production and staging).

`smoke-compare.js` never polls: after each STALE/PRERENDER answer (or a request that got no answer) it counts a render as running for 70 s, sends nothing while one is counted (`--max-renders`, default 1, at most 4 against real hosts), never requests a URL while its own render is counted, starts any two requests at least `--min-gap` apart (default and minimum against real hosts 1.5 s, i.e. at most 40 a minute; the Vercel Firewall answers 429 above 60 pages a minute from one IP and a fast burst gets the whole IP a 403 challenge from Vercel's DDoS mitigation), retries only URLs that got a 5xx or no answer, stops at the first 429 or 403 (a Firewall answer) and after 3 gateway errors (502-504) or unanswered requests in a row, still printing what it checked. A full sweep of a stale deployment takes 4-6 hours (about 250 renders at 70 s). It reads the sitemaps from the target only; `tests/unit/smoke-compare.spec.js` checks the pacing on local stubs. Any new sweep tool must pace the same way, and the e2e suite is not paced, so run it alone with `--workers=1`. Before running a sweep or the full e2e suite against production or staging: announce it to the backend on the tasks repo, run it in a quiet hour, watch the Vercel logs, and never run it within an hour after a deploy (the cold ISR cache already loads WordPress). Do not sweep the old production deployment live: compare against a snapshot saved with `--save` (keep it outside the repo). The snapshot is written only at the end; a stopped sweep writes one marked `"complete": false`, which the next run flags when it is used as the reference.

The `vercel` commands below need a directory linked once with `vercel link --project scarincihollenbeck-frontend-cc --scope scarinci-hollenbeck`. The `VAR=value command` prefixes are Git Bash syntax. Browser specs must call `blockAnalytics(page)` from `tests/e2e/support/block-analytics.js` before opening a page, so runs against previews or production never send analytics or ad hits.

1. Before the merge (quiet hours before the release day, given the run time), against the staging alias (`https://scarincihollenbeck-frontend-cc-git-staging-scarinci-hollenbeck.vercel.app`, public): first `node scripts/smoke-compare.js https://scarincihollenbeck.com --save "$TEMP/prod-before.json"`, then `node scripts/smoke-compare.js <staging> "$TEMP/prod-before.json"` (every sitemap URL, 40 posts, every redirect and rewrite; diffs status, Location, title, canonical, robots, h1, JSON-LD; pre-existing issues print as warnings; content edited in WordPress between the two runs shows up as diffs), and on another day `E2E_BASE_URL=<staging> yarn test:e2e --workers=1`.
2. Merge in a quiet hour (early morning US Eastern, before the firm's working day; announce the time to the backend on the tasks repo beforehand). Note the URL of the outgoing production deployment first (`vercel ls --prod`): it is the rollback target. A deployment built before a `WP_PASSWORD` rotation can no longer log in to WordPress, so it is no rollback target. Check it answers 200 without a login.
3. Right after the deploy: `E2E_BASE_URL=https://scarincihollenbeck.com npx playwright test --project=e2e --workers=1 tests/e2e/release-smoke.spec.js` (only this spec on the live site, the others are not meant for production; the Maps test runs only on the real domain, the Maps key rejects `*.vercel.app`), and `vercel logs --environment production --level error --since 30m --no-follow --no-branch` (without `--no-branch`, run inside this repo the CLI filters by the current git branch and finds nothing for `production` deploys). The new deployment's ISR cache is cold, so timeouts show up first. No full sweep of production when it is the commit already swept on staging; if something looks wrong, sweep it later in a quiet hour against `$TEMP/prod-before.json`.
4. Rollback is Vercel instant rollback; afterwards Vercel stops auto-assigning the domain to new production deployments until that is undone in the dashboard.

Expected noise on previews: `X-Robots-Tag: noindex` (Lighthouse SEO drops) and CSP reports from the `vercel.live` toolbar. `/library/category/*` is SSR and returns 504 or a false 404 when WordPress is overloaded, on any deployment.

### ESLint

Airbnb config with many rules disabled (see `.eslintrc.js`). `no-console` is an error except for `console.warn` and `console.error`.
