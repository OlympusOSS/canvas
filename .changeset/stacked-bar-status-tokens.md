---
"@olympusoss/canvas": patch
---

Docs: `StackedBar` examples switched to canvas semantic status tokens where the data carries status meaning (Phase 6 of the 14-chart redesign).

- `no-legend.tsx`: Healthy / Degraded / Down → `--stat-success` / `--stat-amber` / `--stat-destructive`. Reads as a real ops bar.
- `raw-counts.tsx`: 200 OK / 4xx / 5xx → semantic stat tokens; 3xx redirects keep `chart-1` since they're not an alert state.
- `default.tsx` left unchanged — its sign-in-method palette is intentionally diverse.
