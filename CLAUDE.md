# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev        # Start dev server on port 7700
yarn build      # Production build
yarn start      # Start production server on port 7300
yarn lint       # ESLint with auto-fix (airbnb config)
yarn format     # Prettier formatting
```

No test suite is configured in this project.

## Architecture Overview

This is a **Next.js 14** frontend (Pages Router) for the Scarinci Hollenbeck law firm website. It is deployed on Vercel. The backend is a headless WordPress instance, consumed via both GraphQL and a custom REST API.

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

- `production` branch → Vercel preview deployment
- `client-prod` branch → live site at scarincihollenbeck.com

### ESLint

Airbnb config with many rules disabled (see `.eslintrc.js`). `no-console` is an error except for `console.warn` and `console.error`.
