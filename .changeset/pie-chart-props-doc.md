---
"@olympusoss/canvas": patch
---

Docs: Full prop reference for `PieChart` (15 props). Like the other Recharts passthroughs in `chart-types`, react-docgen returned an empty list. Hand-authored entries cover `children` (typical: `<Pie>`, `<ChartTooltip>`, `<ChartLegend>`; nested rings via stacked `<Pie>` siblings), optional `data`, layout (`margin`, `syncId`, `syncMethod`), pointer events (`onClick`, `onMouseEnter`/`Leave`/`Move`, `throttleDelay`), `defaultShowTooltip`, and `width`/`height`/`className`/`style`. Notes that data lives on each `<Pie data=…>` child, not on the chart wrapper.
