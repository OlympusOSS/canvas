// Pie examples don't render Recharts axes, but we keep a parallel _shared.tsx
// so consumers reading examples never see a cross-folder import. The constants
// match the canonical helper at docs/src/examples/area-chart/_shared.tsx.

export const AXIS_TICK = { fill: "hsl(var(--muted-foreground))", fontSize: 12 } as const;

export const axisProps = {
	tickLine: false,
	axisLine: false,
	tick: AXIS_TICK,
} as const;
