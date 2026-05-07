// Shared axis-prop boilerplate for LineChart examples — `axisLine` and tick
// line styling are handled by `<ChartContainer>` itself, so the helper now
// only sets the tick font + colour.

export const AXIS_TICK = { fill: "hsl(var(--muted-foreground))", fontSize: 12 } as const;

export const axisProps = {
	tick: AXIS_TICK,
} as const;
