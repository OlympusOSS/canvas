---
"@olympusoss/canvas": patch
---

Docs: `Weekly view with row labels` and `Yearly contribution graph` `ActivityHeatmap` examples now use the new `rowLabels` / `colLabels` / `legend` props instead of hand-rolled layout glue:

- Weekly: drops the bespoke flexbox day-of-week column; passes `rowLabels={["Mon"…"Sun"]}` plus sparse hour-tick `colLabels` (`0h`/`6h`/`12h`/`18h`/`23h`) plus `legend`.
- Yearly contribution graph: GitHub-style sparse `Mon`/`Wed`/`Fri` row labels + month-name column labels positioned at each month's first week (Jan ≈ 0, Feb ≈ 4, …, Dec ≈ 48) + `legend`.
