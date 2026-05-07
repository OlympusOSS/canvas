---
"@olympusoss/canvas": patch
---

Docs: `RadarChart` examples redesigned (Phase 11 of the 14-chart redesign).

- Adds `radar-chart/_shared.tsx` exporting `polarAxisProps` (axis line off, muted tick text) and `POLAR_GRID_PROPS` (`stroke=--border`, `gridType="polygon"` — quieter, polygonal spider web).
- `default.tsx` → single radar in `chart-4` (purple) with `0.35` fill opacity. Distinct from LineChart's `chart-5` and ScatterChart's `chart-1`.
- `multi-series.tsx` → `you` in `chart-1` (blue), `peer` in `chart-3` (red-pink). Each at `0.25` fill opacity so overlap reads cleanly.
