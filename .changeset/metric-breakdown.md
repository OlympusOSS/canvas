---
"@olympusoss/canvas": minor
---

Add `MetricBreakdown` chart component. Hand-rolled composite card for
throughput-style dashboards: a headline value with optional tone-aware
secondary rate, an inline SVG trend sparkline with unit suffix, a
per-category breakdown with delta arrows and proportional bars, and a
chip footer for recent error or notable codes.

Identity-agnostic. Works for OAuth token issuance, API request volume,
job throughput, sign-up sources, and any other metric that needs
decomposition by category plus trend and notable issues in one card.

Exports: `MetricBreakdown`, `MetricBreakdownProps`, `MetricBreakdownRow`,
`MetricBreakdownChip`, `MetricBreakdownTone`.
