// Shared axis-prop boilerplate for LineChart examples — mirrors the
// matching helper at docs/src/examples/area-chart/_shared.tsx.

export const AXIS_TICK = { fill: "hsl(var(--muted-foreground))", fontSize: 12 } as const;

export const axisProps = {
	tickLine: false,
	axisLine: false,
	tick: AXIS_TICK,
} as const;
