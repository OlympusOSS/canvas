---
"@olympusoss/canvas": patch
---

Docs: `PieChart` examples redesigned with explicit `<ChartCell>` per slice (Phase 10 of the 14-chart redesign).

- `default.tsx` (4 plan tiers) → `chart-1` → `chart-4` walk.
- `donut.tsx` (4 traffic sources) → `chart-2` → `chart-5` walk (different starting hue from `default.tsx` so the two pie examples read distinct).
- `half-pie.tsx` (3-status mix) → `--stat-success` / `--stat-amber` / `--stat-destructive`. Status data carries meaning that chart-N rotation throws away.
- `with-labels.tsx` (5 browsers) → full `chart-1` → `chart-5` walk; LabelList stays.

Adds the parallel `_shared.tsx` for symmetry with the other chart families.
