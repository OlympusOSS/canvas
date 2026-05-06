---
"@olympusoss/canvas": patch
---

Docs: Expanded prop references for `LabeledBarList` (9 props) and `Gauge` (10 props).

- `LabeledBarList` — `items` description spells out the per-row shape `{ label: ReactNode; value: number; leading?: ReactNode }` (with the `leading` slot for flags/avatars/icons). Other prop descriptions tightened with concrete defaults (`valueFormatter` shows the `(v) => `${v}%`` percentage alternate; `colorVar` lists `chart-N` / `stat-success` examples). Adds inherited HTML attrs (`className`, `id`, `role`, `aria-label`).
- `Gauge` — every documented prop tightened with usage hints (`value` clamping behaviour; `colorVar` lists semantic options like `stat-success`/`stat-destructive`; `aria-label` notes that `role="meter"` + `aria-valuenow`/`min`/`max` are already wired). Adds inherited `className`, `id`, `style`.
