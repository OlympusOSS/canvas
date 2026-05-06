---
"@olympusoss/canvas": patch
---

Docs: Full prop reference for `FunnelChart` (15 props). Like the other Recharts chart-types passthroughs, react-docgen returned an empty list. Hand-authored entries cover required `children` (typical: `<Funnel>` + `<ChartTooltip>`, optional `<LabelList>` for stage labels), optional `data`, layout (`margin`, `syncId`, `syncMethod`), pointer events + `throttleDelay`, `defaultShowTooltip`, and root wrapper props. Notes that data lives on each `<Funnel data=…>` child rather than on the chart wrapper.
