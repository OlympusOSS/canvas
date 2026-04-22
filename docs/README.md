# Canvas docs

Live component gallery. Imports directly from `../src` — always in sync with
the latest local Canvas source. No addon system, no plugin configuration, no
boot-time tax.

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

## Deploy to GitHub Pages

Automatic via `.github/workflows/docs.yml` — pushes to `main` that touch
`src/`, `docs/`, `styles/`, or the workflow file rebuild and republish to
GitHub Pages.

**One-time setup**: Settings → Pages → Source: "GitHub Actions".

The workflow passes `VITE_BASE_PATH=/canvas/` so all asset URLs are rewritten
for the repo-scoped URL (`olympusoss.github.io/canvas/`). If the repo is
renamed, update the env var in `.github/workflows/docs.yml`.

## Structure

- `src/App.tsx` — gallery shell with tier-based sidebar navigation.
- `src/Showcase.tsx` — reusable "titled card" wrapper for each example.
- `src/pages/AtomsPage.tsx` — showcases for every exported atom.
- `src/pages/MoleculesPage.tsx` — showcases for every exported molecule.
- `src/pages/OrganismsPage.tsx` — showcases for key organisms (DataTable,
  Dialog, ThemeProvider, ErrorBoundary, Tabs, Accordion, DropdownMenu).
- `src/pages/TemplatesPage.tsx` — AuthShell, AdminShell, WizardShell in
  iframe-sized preview frames.

## Adding a new showcase

1. Open the page file for the component's tier.
2. Add a new `<Showcase title="…">…</Showcase>` block.
3. Import the component from `@olympusoss/canvas` (which is aliased to
   `../src/index.ts` — no need to rebuild or publish).
4. Save. The dev server hot-reloads instantly.

## Why not Storybook?

For a design system with 3 internal consumers, the addon ecosystem doesn't
pay off. This gallery stays in sync with source automatically, has zero
config drift, and re-uses Canvas's Tailwind tokens directly. If Canvas ever
becomes an external product, revisit Storybook / Ladle / Nextra.
