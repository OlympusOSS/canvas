---
"@olympusoss/canvas": patch
---

Docs: `AreaChart` default example cleaned up. Previously the chart rendered axes + a `<CartesianGrid>` but no actual area fill (Recharts' default `<Area>` colour wasn't visible against the canvas dark background), so the example looked broken. Dropped the axes and grid (the "borders" the chart was carrying), replaced with an explicit gradient fill from `--chart-1` (`70%` opacity at top → `5%` at bottom) and a 2px stroke — matches the visual style of the Sunburst / Treemap / Pie examples. The grid + axis pattern is still demonstrated by `Stacked areas`, `Curve types`, and `Gradient` so consumers see both options.
