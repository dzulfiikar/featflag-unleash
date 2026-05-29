# Repository Guidelines

## Project Overview

This is a small React + Vite feature-flag demo named `featureflags-unleash`. The app uses Unleash frontend SDKs and the Unleash toolbar to evaluate login-related feature flags in the browser and show Google/Microsoft SSO options.

## Architecture & Data Flow

- `index.html` provides the `#root` mount point; `src/main.jsx` creates the React root.
- `src/main.jsx` wraps the app with `StrictMode` and `UnleashToolbarProvider`, then renders `App` directly.
- Unleash configuration flows from runtime/build env handling in `src/configs/appEnv.js` into `src/configs/unleash.js`, then into `<UnleashToolbarProvider config={unleashConfig}>`.
- In development, `vite.config.js` proxies `VITE_UNLEASH_PROXY_URL` to `VITE_UNLEASH_URL` and attaches `VITE_UNLEASH_API_KEY` as the `Authorization` header.
- Components read flags through `useFlag` from `@unleash/proxy-client-react`; `src/App.jsx` checks `GoogleSSO` and `MicrosoftSSO` to conditionally render SSO buttons.

## Key Directories

- `src/`: React application source, global styles, feature-flag usage, and app bootstrap.
- `src/configs/`: Browser runtime configuration helpers, especially Unleash client setup.
- `src/assets/`: Static assets imported by React components.
- `public/`: Static files served as-is, including `favicon.svg` and `icons.svg`.
- Root Docker/nginx files: `Dockerfile`, `docker-compose.yaml`, and `nginx.conf` build and serve the production SPA.

## Development Commands

Use npm; `package-lock.json` is present and should stay in sync.

```sh
npm install
npm run dev      # start Vite dev server
npm run build    # production build to dist/
npm run lint     # ESLint over the repo
npm run preview  # preview the production build
```

There is currently no `npm test` script.

Docker/local runtime helpers:

```sh
docker compose up --build  # build and serve on host port 5003
```

## Code Conventions & Common Patterns

- Source files use ES modules and JSX (`"type": "module"` in `package.json`).
- Components are simple function components; `App` is the default export and small local helper components such as `GoogleLogin`/`MicrosoftLogin` live in the same file when tightly scoped.
- Feature flags should be read inside React components with `useFlag('FlagName')`; current flag names are `GoogleSSO` and `MicrosoftSSO`.
- Browser-exposed build variables must use the `VITE_` prefix. Runtime browser overrides can come from `window.__APP_ENV__` when the deployed shell provides it.
- ESLint uses the flat config in `eslint.config.js`, with browser globals, JSX parsing, React Hooks rules, and React Refresh rules.
- Styling is plain CSS imported from JSX. `src/index.css` defines global CSS variables and base styles; `src/App.css` contains the login-card and SSO button styles and uses nested CSS syntax supported by the Vite toolchain.
- Keep async/network concerns inside SDK providers, Vite proxy config, or focused hooks/components; do not call Unleash APIs directly from render logic.

## Important Files

- `package.json`: npm scripts, dependencies, module type.
- `vite.config.js`: Vite React plugin configuration.
- `eslint.config.js`: lint rules and ignored build output.
- `index.html`: HTML shell and React mount element.
- `src/main.jsx`: app bootstrap and Unleash toolbar provider setup.
- `src/App.jsx`: primary login demo route and `useFlag('GoogleSSO')`/`useFlag('MicrosoftSSO')` examples.
- `src/configs/appEnv.js`: reads Vite/runtime environment variables and computes the default `/unleash` proxy URL.
- `src/configs/unleash.js`: Unleash frontend client configuration.
- `Dockerfile`: multi-stage Node build plus nginx runtime image.
- `docker-compose.yaml`: local container wiring, `.env` loading, and port `5003:80`.
- `nginx.conf`: SPA nginx config used as a Docker template.
- `.env` / `.env.example`: local environment values; do not commit secrets or expand secret usage without care.

## Runtime/Tooling Preferences

- Runtime/toolchain: Node.js with npm, Vite 8, React 19, and nginx for the container runtime.
- Package manager: npm; use `package-lock.json` rather than introducing another lockfile.
- Build output: `dist/`, ignored by git and ESLint.
- Required local env for dev proxying: `VITE_UNLEASH_PROXY_URL`, `VITE_UNLEASH_URL`, and `VITE_UNLEASH_API_KEY`.
- Browser Unleash client defaults to `clientKey: 'frontend'`, `appName: 'unleash-onboarding-react'`, and a same-origin `/unleash` proxy URL unless runtime env overrides it.
- Prefer Vite-native patterns: `import.meta.env`, static imports for assets, and browser-safe configuration only.

## Testing & QA

- No test framework or test files are currently configured.
- Minimum verification before handing off changes: run `npm run lint` and, when behavior/build config changes, `npm run build`.
- If adding tests, first add an npm script and choose a Vite/React-friendly setup such as Vitest with React Testing Library.
- For feature-flag changes, manually verify both enabled and disabled states for `GoogleSSO` and `MicrosoftSSO`, plus Docker/nginx serving if deployment files change.
