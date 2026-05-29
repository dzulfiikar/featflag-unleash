# Repository Guidelines

## Project Overview

This is a small React + Vite feature-flag demo named `featureflags-unleash`. The app uses Unleash frontend SDKs to evaluate feature flags in the browser and shows different UI text based on the `Onboarding` flag.

## Architecture & Data Flow

- `index.html` provides the `#root` mount point; `src/main.jsx` creates the React root.
- `src/main.jsx` wraps the app with `StrictMode`, `FlagProvider`, and `BrowserRouter`, then defines routes for `/` and `/admin`.
- Unleash configuration flows from `src/configs/appEnv.js` (`import.meta.env.VITE_UNLEASH_API_KEY`) into `src/configs/unleash.js`, then into `<FlagProvider config={unleashConfig}>`.
- Components read flags through `useFlag` from `@unleash/proxy-client-react`; `src/App.jsx` checks `useFlag('Onboarding')` and renders enabled/disabled text.
- Routing is client-side via `react-router`; add new pages by importing components in `src/main.jsx` and adding `<Route>` entries.

## Key Directories

- `src/`: React application source, global styles, feature-flag usage, and route setup.
- `src/configs/`: Browser runtime configuration helpers, especially Unleash client setup.
- `src/admin/`: Admin route component and related styles.
- `src/assets/`: Static assets imported by React components.
- `public/`: Static files served as-is, including `favicon.svg` and `icons.svg`.

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

## Code Conventions & Common Patterns

- Source files use ES modules and JSX (`"type": "module"` in `package.json`).
- Components are simple function components; exports are mixed (`App` default export, `Admin` named export). Follow the local file's existing style.
- Feature flags should be read inside React components with `useFlag('FlagName')`; keep flag names exact and centralized when usage grows.
- Environment variables exposed to the browser must use the `VITE_` prefix, e.g. `VITE_UNLEASH_API_KEY`.
- ESLint uses the flat config in `eslint.config.js`, with browser globals, JSX parsing, React Hooks rules, and React Refresh rules.
- Styling is plain CSS imported from JSX. `src/index.css` defines global CSS variables; `src/App.css` contains component/demo styles and uses nested CSS syntax supported by the Vite toolchain.
- Keep async/network concerns inside SDK providers or focused hooks/components; do not call Unleash APIs directly from render logic.

## Important Files

- `package.json`: npm scripts, dependencies, module type.
- `vite.config.js`: Vite React plugin configuration.
- `eslint.config.js`: lint rules and ignored build output.
- `index.html`: HTML shell and React mount element.
- `src/main.jsx`: app bootstrap, providers, and route table.
- `src/App.jsx`: primary demo route and `useFlag('Onboarding')` example.
- `src/admin/Admin.jsx`: `/admin` route component.
- `src/configs/appEnv.js`: reads Vite environment variables.
- `src/configs/unleash.js`: Unleash frontend client configuration.
- `.env`: local environment values; do not commit secrets or expand secret usage without care.

## Runtime/Tooling Preferences

- Runtime/toolchain: Node.js with npm, Vite, and React 19.
- Package manager: npm; use `package-lock.json` rather than introducing another lockfile.
- Build output: `dist/`, ignored by git and ESLint.
- Required local env: `VITE_UNLEASH_API_KEY` for the Unleash frontend client.
- Prefer Vite-native patterns: `import.meta.env`, static imports for assets, and browser-safe configuration only.

## Testing & QA

- No test framework or test files are currently configured.
- Minimum verification before handing off changes: run `npm run lint` and, when behavior/build config changes, `npm run build`.
- If adding tests, first add an npm script and choose a Vite/React-friendly setup such as Vitest with React Testing Library.
- For feature-flag changes, manually verify both enabled and disabled states when possible, plus routing for `/` and `/admin`.
