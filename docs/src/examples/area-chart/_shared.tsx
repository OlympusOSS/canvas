// Shared axis-prop boilerplate for AreaChart examples — keeps every chart's
// XAxis / YAxis treatment identical (muted tick text, no axis line, no tick
// line) without copy-pasting the prop bag into every example file.

export const AXIS_TICK = { fill: "hsl(var(--muted-foreground))", fontSize: 12 } as const;

export const axisProps = {
	tickLine: false,
	axisLine: false,
	tick: AXIS_TICK,
} as const;
