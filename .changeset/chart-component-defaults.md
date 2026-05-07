---
"@olympusoss/canvas": minor
---

Charts: visual affordances now ship as component-level defaults rather than example-level boilerplate, so every consumer gets the polished look without copying snippets.

- `ChartContainer` themes the cartesian axis line (`hsl(var(--border))`) and hides the tick lines via CSS — Line / Bar / Area / Composed / Scatter charts now all render visible, themed X/Y axes by default.
- `ChartContainer`'s palette walker now (a) cycles palette colours across `<Pie>`'s `<Cell>` children when no fill is set, (b) defaults `<Pie label>` to `true` so each slice renders its value, and (c) distributes palette colours across `<Funnel>` data rows when none of them carry a `fill`. Consumers no longer need to write per-slice or per-stage fills to get a multi-hue chart.
- `ActivityHeatmap` now defaults `rowLabels` to `["Mon", … , "Sun"]` whenever the data has exactly 7 rows, covering the GitHub-style yearly-contribution layout out of the box.
- The `_shared.tsx` axis-prop helpers in the docs examples are simplified to just the tick font/colour, since the rest is handled by `ChartContainer`.
