---
"@olympusoss/canvas": minor
---

feat(surface): add opt-in "glass" surface mode

Ports the design handoff's frosted-pane surface variant (Athena's
`app.css` glass block). When the consumer sets `data-surface="glass"`
on the `<html>` root, all load-bearing Canvas surfaces (Card,
SectionCard, StatCard, Sidebar, DataTable, EmptyState, Input,
CodeBlock, Popover, Sheet, Drawer) pick up a translucent tint with
`backdrop-filter: blur(...) saturate(...)`, an alpha-blended border
that drops to white/black against the backdrop, and a 1-px inner
highlight on the top edge to suggest a refractive lip. The body
gains a three-radial aurora gradient (pastel washes in light, deep
indigo/violet/teal in dark) so the page palette bleeds through every
pane and the layout reads as layered glass instead of rectangles on
flat paint.

New stylesheet shipped at `@olympusoss/canvas/styles/glass.css`.
Import it alongside `tokens.css`:

```css
@import "@olympusoss/canvas/styles/tokens.css";
@import "@olympusoss/canvas/styles/glass.css";
```

Then toggle the mode at runtime:

```ts
document.documentElement.dataset.surface = "glass";
// or unset to return to the default solid palette
delete document.documentElement.dataset.surface;
```

New tokens (scoped under `html[data-surface="glass"]`):
`--glass-tint`, `--glass-tint-alpha`, `--glass-border`,
`--glass-border-alpha`, `--glass-highlight`,
`--glass-highlight-alpha`, `--glass-shadow`, `--glass-blur`,
`--glass-saturate`. Light and dark modes have separate values.

Components now carry `data-slot` attributes used by the glass cascade:
`card`, `card-divider`, `sidebar`, `data-table`, `input`,
`popover-content`, `sheet-content`, `drawer-content`, `empty-state`,
`code-block`. They are HTML attributes; no API surface change.
