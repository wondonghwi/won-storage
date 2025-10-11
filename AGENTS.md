# Repository Guidelines

## Project Structure & Module Organization
- `src/` holds the React + TypeScript source; `main.tsx` mounts `App` into `#root`, and `App.tsx` is the primary view scaffold.
- `src/assets/` stores static imports bundled via Vite; colocate component-specific assets next to their components when they grow.
- `public/` exposes files served unchanged by Vite; reserve it for favicons, manifest files, or static configuration.
- `index.html` bootstraps the app; build tooling is in `vite.config.ts`, TypeScript options in `tsconfig*.json`, and lint rules in `eslint.config.js`.

## Build, Test, and Development Commands
- `pnpm install`: install dependencies tracked in `pnpm-lock.yaml`; always use pnpm to keep the lock consistent.
- `pnpm dev`: launch Vite with hot reload on `http://localhost:5173` for local development.
- `pnpm build`: run the TypeScript project references (`tsc -b`) and emit production assets to `dist/` via Vite.
- `pnpm preview`: serve the latest build locally to validate production behaviour before deploying.
- `pnpm lint`: execute ESLint across the workspace; resolve warnings or suppressions before committing.

## Coding Style & Naming Conventions
- Use two-space indentation, omit semicolons, and prefer single quotes for imports to match existing files.
- Name React components in PascalCase (`App.tsx`), hooks/utilities in camelCase, and CSS classes in kebab-case.
- Keep component styles in `App.css` or co-located `.css` files; shared styles belong in `index.css`.
- Type public props and state explicitly; add return types for reusable functions and hooks.

## Testing Guidelines
- Automated testing is not yet configured; adopt Vitest with Testing Library when introducing suites to stay aligned with Vite.
- Store new specs under `src/__tests__/` or beside components as `*.test.tsx` for discoverability.
- Include manual verification notes in pull requests until a `pnpm test` script exists.
- Aim for coverage of critical flows—component rendering, state updates, and regression scenarios.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (`feat:`, `fix:`, `chore:`), as demonstrated by `feat: create-app`; keep summaries under 72 characters.
- Limit each commit to a focused change set and stage relevant files only.
- Provide pull request descriptions with change summaries, testing evidence, and UI screenshots or recordings when visuals shift.
- Reference related issues (Jira or GitHub) and obtain review approval before merging.
