---
"@olympusoss/canvas": patch
---

Docs: `ServiceHealthList` props reference expanded.

- `items` description spells out the per-row shape `{ name: string; status: "healthy" | "degraded" | "down"; meta?: ReactNode[] }` instead of leaving consumers to chase the `ServiceHealthItem` type. Calls out that the pulse-+-glow halo only fires on `"healthy"`.
- `caption` description gains concrete examples (`Last 5 minutes`, `Updated 24s ago`).
- Adds the inherited HTML attributes (`className`, `id`, `role`, `aria-label`) that come from `extends React.HTMLAttributes<HTMLDivElement>` and react-docgen can't surface. The `aria-label`/`role="status"` pairing is documented for live-updating health panels.
