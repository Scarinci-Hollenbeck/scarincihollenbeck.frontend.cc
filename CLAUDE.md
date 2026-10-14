# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev        # Start dev server on port 7700
yarn build      # Production build
yarn start      # Start production server on port 7300
yarn lint       # ESLint with auto-fix (airbnb config)
yarn format     # Prettier formatting
yarn test:unit  # Playwright unit tests (tests/unit), no server needed
yarn test:e2e   # Playwright e2e tests (tests/e2e) against E2E_BASE_URL, default http://localhost:7300 (run `yarn build && yarn start` first)
```

## Architecture Overview

This is a **Next.js 16** frontend (Pages Router, React 18) for the Scarinci Hollenbeck law firm website. It is deployed on Vercel (Node 22.x, pinned via `engines` in `package.json`). The backend is a headless WordPress instance, consumed via both GraphQL and a custom REST API.

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

### Redux Store (`redux/`)

RTK Query powers two API services:

- `redux/services/wp-graphql.js` — mutation-based GraphQL client for client-side queries
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
NEXT_PUBLIC_WP_REST_KEY           # WordPress REST API secret key
NEXT_PUBLIC_RECAPTCHA_SITE_KEY
NEXT_PUBLIC_PROJECT_MODE          # Set to "development" to disable PWA
NEXT_PUBLIC_FIREBASE_*            # Firebase config vars
```

### Deployment Branches

- Feature branches → PR into `staging`; every branch and PR gets a Vercel preview deployment
- `staging` → PR into `production`
- `production` branch → Vercel Production, the live site at scarincihollenbeck.com (merging here deploys to live)

### ESLint

Airbnb config with many rules disabled (see `.eslintrc.js`). `no-console` is an error except for `console.warn` and `console.error`.
