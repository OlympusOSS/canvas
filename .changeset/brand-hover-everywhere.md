---
"@olympusoss/canvas": patch
---

Tweak: Extend the brand-color hover convention to every text-link-style surface in the design system.

- `AccordionTrigger` — hover now shifts to `text-brand` (was `text-foreground/70`).
- `BreadcrumbLink` — hover now shifts to `text-brand` (was `text-foreground`).
- `PageHeader` breadcrumbs (LinkComp + plain `<a>` paths) — hover now `text-brand` (was `text-foreground`).
- `NavBar` desktop links — hover now `text-brand` (was `text-foreground`).
- `NavBar` mobile links — hover now `text-brand` while keeping the existing `bg-accent` row-hover.

Variant-specific hovers on solid buttons (default/destructive/secondary/outline/ghost), tab triggers, sidebar/dropdown row items, etc. are unchanged — those still use their `bg-accent` / variant-specific shifts to keep destructive/primary cues distinct.
