---
"@olympusoss/canvas": patch
---

Docs: `AreaChart` → `Stacked areas` example redesigned to match the SunburstChart visual quality bar (Phase 1 of the AreaChart redesign).

- Drops `<CartesianGrid>`. Hides axis + tick lines on `<XAxis>` / `<YAxis>` via the new shared `axisProps` helper (`docs/src/examples/area-chart/_shared.tsx`); tick text now renders in `--muted-foreground`.
- Three stacked layers paint in **one hue** (`--chart-2`) at progressively lighter opacity (`0.7` / `0.45` / `0.2`) instead of three different default Recharts colours. Mirrors the "Deep hierarchy" SunburstChart pattern — depth via opacity, not new hues.
- All three layers use `type="monotone"` for consistency with `Default`.

Curve types and Gradient examples will follow in subsequent phases.
