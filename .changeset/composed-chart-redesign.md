---
"@olympusoss/canvas": patch
---

Docs: `ComposedChart` examples redesigned (Phase 12 of the 14-chart redesign).

- Adds `composed-chart/_shared.tsx` with the canonical `axisProps` helper.
- `default.tsx`: drops grid, uses `axisProps`. Each series gets its own hue — Area revenue → `chart-1` with gradient fill; Bar expenses → `chart-2` solid + `radius={[4,4,0,0]}`; Line margin → `chart-5` stroke `2` with `dot={r:3}`.
- `dual-axis.tsx`: drops grid, `axisProps` on left + right axes. Bar visitors → `chart-1`; Line conversion → `chart-5` (warm orange = secondary metric).
