---
"@olympusoss/canvas": patch
---

Docs: `StackedBar` props page expanded.

- `segments` description now spells out the per-segment shape `{ label, value, colorVar? }` instead of just showing the bare `StackedBarSegment[]` type.
- Other prop descriptions tightened with concrete default-formatting examples (e.g. `valueFormatter` shows the `toLocaleString()` alternate for raw counts) and usage hints.
- Added inherited HTML attributes that come from `extends React.HTMLAttributes<HTMLDivElement>` and react-docgen can't surface: `className`, `id`, `role`, `aria-label`.
