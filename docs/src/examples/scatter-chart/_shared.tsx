// Shared axis-prop boilerplate — `<ChartContainer>` themes axis + tick lines
// via CSS, so the helper now only sets the tick font + colour.

export const AXIS_TICK = { fill: "hsl(var(--muted-foreground))", fontSize: 12 } as const;

export const axisProps = {
	tick: AXIS_TICK,
} as const;
