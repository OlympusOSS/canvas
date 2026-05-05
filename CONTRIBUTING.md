# Contributing to Canvas

Canvas is the Olympus design system. This document captures the rules that keep
it healthy — what goes where, what imports what, and how to decide when to add
a new primitive.

## Atomic-design taxonomy

Every component lives in one of four tiers.

| Tier | Folder | What belongs | Examples |
|---|---|---|---|
| **Atom** | `src/components/atoms/` | Single interactive or display primitive. Zero composition. Imports only tokens + utils + React. | `Button`, `Input`, `Label`, `Icon`, `Badge`, `Avatar`, `FlexBox`, `Section` |
| **Molecule** | `src/components/molecules/` | Composes atoms into a meaningful UI unit. No app-state model. | `SearchBar`, `StatusBadge`, `EmptyState`, `LoadingState`, `Card` family, `PageHeader`, `ActionBar`, `SectionCard`, `SecretField`, `Stepper`, `StatCard`, `AnimatedBackground` |
| **Organism** | `src/components/organisms/` | Owns interactive state (open/close, selection, form), or composes multiple molecules into a reusable surface. | `DataTable`, `DashboardGrid`, `Dialog`, `Sidebar`, `Command`, `Form`, `ThemeProvider`, `ErrorBoundary`, `Toaster` |
| **Chart** | `src/components/charts/` | Theme-aware chart components and small data-visualisation primitives. Composes Recharts plus Canvas tokens. | `Sparkline`, `Gauge`, `ActivityHeatmap`, `LabeledBarList`, `ServiceHealthList`, `StackedBar`, `WorldHeatMap` |

> Page-level layout templates (`AuthShell`, `AdminShell`, `WizardShell`) were tried and removed. They over-prescribed how consumers wired their app shells (sidebar widths, header structure, drawer behavior) and consistently caused friction. Compose `Sidebar` + `SidebarInset` + your own flexbox shell directly instead — see [`MIGRATION.md`](./MIGRATION.md) for the upgrade snippet.

### Classification decision tree

1. **Does it have zero composition (just wraps one element)?** → Atom.
2. **Does it compose atoms but hold no significant state?** → Molecule.
3. **Does it own interactive state OR compose molecules into a surface?** → Organism.
4. **Is it a chart / data-viz primitive?** → Chart.

When in doubt, **demote one tier**. It's cheaper to promote later than to demote.

### Import rules (enforced)

Each tier can only import from tiers strictly below it, plus `tokens/` and `lib/utils`:

```
atoms/*     ← tokens/, lib/utils, React
molecules/* ← atoms/, tokens/, lib/utils, React
organisms/* ← molecules/, atoms/, tokens/, lib/utils, React
charts/*    ← atoms/, tokens/, lib/utils, React (charts may also import Recharts directly)
```

An atom importing from `../molecules/` is a smell. If you find yourself wanting
to do this, you have the wrong tier — either the atom should be promoted (it's
not really an atom) or the molecule should be factored (it contains atom-level
logic that belongs with the atom).

### Compound-component families

A family (`Dialog` + `DialogTrigger` + `DialogContent` + …, `Card` + `CardHeader` + …, `Sidebar` + 20 sub-parts) lives at the tier of its **root interactive surface**. Sub-parts travel with the root — they are not separately classified.

- `Dialog` family → organism (interactive overlay). `DialogTitle` stays with `Dialog`.
- `Card` family → molecule (semantic container). `CardHeader` stays with `Card`.
- `Sidebar` family → organism (stateful layout). `SidebarMenu` stays with `Sidebar`.

If someone wants `CardContent` as a "bare padded div", the answer is a plain
`<div className="p-6">` or a new `atoms/surface.tsx` — **never split the family**.

## File conventions

Each component file starts with a tier-direction comment so imports are easy to
audit at a glance:

```tsx
// atoms:     can import tokens/, lib/utils; nothing else in canvas/.
// molecules: can import tokens/, lib/utils, atoms/.
// organisms: can import tokens/, lib/utils, atoms/, molecules/.
// charts:    can import tokens/, lib/utils, atoms/, plus Recharts directly.
```

- One component family per file. `card.tsx` exports `Card`, `CardHeader`, …
- Named exports only. No default exports.
- `displayName` set on every component (React DevTools).
- Use `forwardRef` when the underlying element is a ref target.
- `"use client"` only when the component uses browser-only APIs or hooks
  (state, effects, refs).

## Adding a new component

1. Classify it (atoms/molecules/organisms/charts).
2. Create `src/components/{tier}/{kebab-case-name}.tsx` (charts use a barrel: re-export from `src/components/charts/index.ts`).
3. Write the component. Respect the import rules above.
4. Export it from `src/index.ts` in the tier's section (alphabetical within the tier).
5. If it has a type that's safe for React Native (no DOM), also re-export the
   type from `src/native.ts`.
6. Write tests in `test/` (Canvas enforces 100% coverage per file in CI).
7. Add a docs example: append an entry to `docs/src/data/components.ts` and drop
   a `.tsx` in `docs/src/examples/{component}/` for each example variant.

## When to add vs. leave in the app

**Add to Canvas** when:
- The same pattern exists in 2+ Olympus apps, OR
- It's a clearly generic UI primitive with no app-specific business logic, OR
- It wraps an external library (Radix, lucide, sonner) so apps don't import that library directly.

**Leave in the app** when:
- It encodes app-specific business logic (domain models, auth, data flows).
- It depends on app-specific infrastructure (Tauri APIs, Next.js server actions).
- It's a composition that only makes sense inside one app's structure.

Examples of app-specific components that do **not** belong in Canvas:
- `IdentityEditModal` (athena) — business logic around Kratos identities.
- `TurnstileWidget` (hera) — Cloudflare-specific integration with CSP nonces.
- `Terminal` (daedalus) — xterm.js wrapper with Tauri PTY coupling.

## Releasing

Canvas is versioned with semver. Consumers pin with `^2.x.x`.

- **Patch** (`2.1.x → 2.1.y`): bug fixes, non-breaking additions.
- **Minor** (`2.x.0 → 2.y.0`): new components/props, no signature changes.
- **Major** (`2.0.0 → 3.0.0`): breaking API changes, deprecation removals.

Deprecated components stay in the public API for one full major before removal.
Use JSDoc `@deprecated` to flag them and link to the replacement.
