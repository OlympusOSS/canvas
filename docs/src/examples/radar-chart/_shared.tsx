// Shared axis-prop boilerplate for RadarChart examples — RadarChart uses
// <PolarAngleAxis> instead of <XAxis>, so the helper exposes
// `polarAxisProps` shaped for that primitive (axis line off, muted tick text).

export const POLAR_AXIS_TICK = {
	fill: "hsl(var(--muted-foreground))",
	fontSize: 12,
} as const;

export const polarAxisProps = {
	axisLine: false,
	tick: POLAR_AXIS_TICK,
} as const;

export const POLAR_GRID_PROPS = {
	stroke: "hsl(var(--border))",
	gridType: "polygon" as const,
};
