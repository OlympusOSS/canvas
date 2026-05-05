# Canvas docs

Live component gallery for `@olympusoss/canvas`. The site imports Canvas via the package alias resolved at `../src` — always in sync with the latest local source. No bundler indirection, no rebuild step.

Live: https://olympusoss.github.io/canvas/

## Running locally

```sh
cd docs
bun install
bun run dev      # http://localhost:5173
```

## Building

```sh
bun run build    # static output in dist/
bun run preview  # serve the build locally
```

## Production deploy

The `release.yml` workflow at the repo root deploys docs after every successful publish to npmjs.org — `docs.yml` is `workflow_dispatch`-only for manual rebuilds. The workflow passes `VITE_BASE_PATH=/canvas/` so all asset URLs are rewritten for the repo-scoped GitHub Pages URL.

**One-time setup**: Settings → Pages → Source: "GitHub Actions".

## Structure

Top-level routes (in `docs/src/routes/`):

- `Home.tsx` — landing page with brand hero + per-tier samples.
- `Install.tsx` — install instructions, Tailwind v4 wiring, ThemeProvider setup.
- `Principles.tsx` — atomic-design rules, voice, motion, accessibility promises.
- `Tokens.tsx` — color tokens, elevation, typography, motion tokens.
- `Migration.tsx` / `Changelog.tsx` — render `MIGRATION.md` / `CHANGELOG.md` raw via the `Markdown` component.
- `NotFound.tsx` — 404 page.
- `components/ComponentPage.tsx` — the per-component page renderer. Routes are dynamic: `/components/{tier}/{component}` resolves through the manifest at `docs/src/data/components.ts`.
- `components/TierIndex.tsx` — tier index pages (`/components/atoms`, etc).

Examples live at `docs/src/examples/{component}/{variant}.tsx`. Each `.tsx` is one rendered preview; each component can have multiple. The `Example` wrapper iframes them with a viewport picker and code toggle.

The component manifest at `docs/src/data/components.ts` decides what shows in the sidebar and which examples each component page renders.

## Adding a new component example

1. Append the component's metadata to `docs/src/data/components.ts` (tier, label, id, list of example file names).
2. Create `docs/src/examples/{component-id}/{example-id}.tsx`. Default-export a React component.
3. Save. Vite hot-reloads. Visit `/components/{tier}/{component-id}`.

If the component is brand-new in Canvas, also export it from `src/index.ts` first.

## Why not Storybook?

For a design system with a small set of internal consumers, the addon ecosystem doesn't pay its weight. This site stays in sync with source automatically, has zero config drift, and reuses Canvas's Tailwind tokens directly. Revisit Storybook / Ladle / Nextra if Canvas ever ships to external consumers at scale.
