# Repository Guidelines

## Project Structure & Module Organization
- **Source:** React + TypeScript code lives in `src/`; `main.tsx` mounts `App` into `#root` and `App.tsx` defines the primary view.  
- **Assets:** Store shared styles in `src/index.css`, component-specific assets beside their components, and global assets in `src/assets/`.  
- **Static files:** Use `public/` only for files served unchanged (favicons, manifests).  
- **Tests:** Co-locate specs as `*.test.tsx` or place them under `src/__tests__/` when the test suite is introduced.

## Build, Test, and Development Commands
- `pnpm install`: Install dependencies tracked in `pnpm-lock.yaml` (always use pnpm).  
- `pnpm dev`: Run Vite dev server at `http://localhost:5173` with hot reload.  
- `pnpm build`: Execute `tsc -b` and emit production assets to `dist/`.  
- `pnpm preview`: Serve the latest build locally to verify production behavior.  
- `pnpm lint`: Run ESLint; clear warnings or suppressions before merging.

## Coding Style & Naming Conventions
- **Formatting:** Two-space indentation, omit semicolons, prefer single quotes in imports.  
- **Components:** PascalCase for components (`App.tsx`), camelCase for hooks/utilities, kebab-case for CSS classes.  
- **Styles:** Keep component styles in `App.css` or co-located `.css`; share common rules via `index.css`.  
- **Types:** Declare prop and state types explicitly; add return types for reusable functions.

## Testing Guidelines
- **Framework:** Adopt Vitest with Testing Library once automated tests are added.  
- **Placement:** Store specs in `src/__tests__/` or alongside components.  
- **Execution:** Document manual verification steps in PRs until `pnpm test` exists; add coverage for rendering, state updates, and regressions when frameworks are in place.

## Commit & Pull Request Guidelines
- **Commits:** Follow Conventional Commits (e.g., `feat:`, `fix:`); keep summaries under 72 characters and scope each commit to a focused change set.  
- **Pull Requests:** Provide a summary, testing notes, and UI screenshots or recordings when visuals change. Reference related issues and confirm lint/build status before requesting review.

## Security & Configuration Tips
- **Secrets:** Never commit credentials or API keys; rely on environment variables outside the repo.  
- **Environment:** Keep Vite config changes minimal and document any required `.env` keys in PR descriptions.
