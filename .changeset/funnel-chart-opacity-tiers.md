---
"@olympusoss/canvas": patch
---

Docs: `FunnelChart` example redesigned (Phase 13 of the 14-chart redesign).

- `default.tsx`: replaces the per-stage `chart-1..5` rainbow rotation with a single-hue opacity ramp on `chart-3` (`1.0` → `0.85` → `0.7` → `0.55` → `0.4`). The funnel decay now reads as a continuous tunnel, mirroring the SunburstChart depth-via-opacity pattern instead of competing hues per stage.
