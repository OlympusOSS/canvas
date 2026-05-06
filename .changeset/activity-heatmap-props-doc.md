---
"@olympusoss/canvas": patch
---

Docs: `ActivityHeatmap` props reference expanded.

- `data` description spells out the row-major shape `data[row][col]`, the `[0, 1]` value range with clamping behaviour, and the jagged-array caveat.
- `colorVar` description pins the rendering formula (`hsl(var(--{colorVar}) / opacity)`) and the linear opacity ramp from `0.08` → `0.93`, plus suggests `stat-success`/`stat-destructive` for semantic heatmaps.
- `cellHeight` / `gap` / `cellRadius` / `cellTitle` get tighter behavioural hints.
- Adds inherited HTML attrs (`className`, `id`, `role`, `aria-label`) — calls out that cells are `aria-hidden`, so `role="img"` + `aria-label` is required when the heatmap conveys meaning.
