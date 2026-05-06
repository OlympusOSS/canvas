---
"@olympusoss/canvas": patch
---

Docs: Full prop references for `RadialBarChart` (21 props) and `RadarChart` (20 props). Both are passthroughs of Recharts categorical-chart primitives and returned empty prop lists from react-docgen.

- `RadialBarChart`: data composition (`data`, `children`), polar layout (`innerRadius`, `outerRadius`, `startAngle`, `endAngle`, `cx`, `cy` — `startAngle={90} endAngle={-270}` 12-o'clock-clockwise pattern called out), ring sizing (`barSize`, `barCategoryGap`, `barGap`), `margin`/`syncId`/`syncMethod`, pointer events, and `width`/`height`/`className`/`style`.
- `RadarChart`: same shape minus the bar-only props — adds `onMouseMove` and `throttleDelay`, default `startAngle={90}` / `endAngle={-270}` documented with the typical "first spoke at 12 o'clock" convention.
