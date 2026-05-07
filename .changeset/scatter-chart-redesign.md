---
"@olympusoss/canvas": patch
---

Docs: `ScatterChart` examples redesigned to match SunburstChart visual quality (Phase 3 of the 14-chart redesign).

- Adds `docs/src/examples/scatter-chart/_shared.tsx` with the canonical `axisProps` helper.
- All three examples (`default`, `bubble`, `multi-series`) drop `<CartesianGrid>` and use `axisProps` for hidden axis lines + muted tick text.
- Diversified palette across the page: default → `chart-1` (blue), bubble → `chart-3` (purple), multi-series → `chart-2` + `chart-4` (green + orange-pink). Avoids the "all blue" rotation Recharts defaults to.
