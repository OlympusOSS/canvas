---
"@olympusoss/canvas": minor
---

`ActivityHeatmap` now ships axes + legend as opt-in props, so consumers don't have to glue them on by hand:

- `rowLabels?: ReactNode[]` — Y-axis labels rendered to the left of the grid, perfectly aligned to each row's pitch (cellHeight + gap).
- `colLabels?: ReactNode[]` — X-axis labels rendered below the grid. Pass empty / nullish entries for sparse ticks (e.g. label only `0`, `6`, `12`, `18`, `23` in a 24-column matrix).
- `legend?: boolean | { fromLabel?, toLabel? }` — `Fewer ↔ More` gradient legend below the grid. `true` uses the defaults; an object overrides one or both ends.

Default example simplified to use the new props instead of hand-rolling layout.

Backwards-compatible: existing consumers that omit the new props get the same render they did before (no labels, no legend).
