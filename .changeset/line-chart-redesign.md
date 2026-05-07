---
"@olympusoss/canvas": patch
---

Docs: `LineChart` examples redesigned to match SunburstChart visual quality (Phase 9 of the 14-chart redesign).

Adds `docs/src/examples/line-chart/_shared.tsx` with the canonical `axisProps` helper. All six examples drop `<CartesianGrid>` and use `axisProps`. Per-page palette diversification:

- `default.tsx` → `chart-5` (warm orange — deliberately not blue, distinct from AreaChart Default).
- `curve-types.tsx` → linear `chart-1`, monotone `chart-2`, step `chart-3` (lets consumers map curve type to colour).
- `multi-series.tsx` → desktop `chart-3`, mobile `chart-4`, tablet `chart-5`.
- `time-series.tsx` → `chart-3`, `dot={false}` for the dense 30-day series.
- `with-brush.tsx` → `chart-1`. Brush keeps `--brand`.
- `with-reference.tsx` → line `chart-2`, ReferenceLine restyled with `--stat-destructive` + `strokeDasharray="4 4"` so the SLO threshold reads as an alert line.

All series get `strokeWidth={2}` and `dot={{ r: 3 }}` (or `false` on dense data) for consistent visual treatment.
