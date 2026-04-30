"use client";

import type * as React from "react";
import * as RechartsPrimitive from "recharts";

/**
 * Chart-type wrappers. Each wraps a Recharts top-level chart component with
 * sensible default `margin` so axis labels don't clip. Children pass through
 * UNWRAPPED — Recharts uses `findAllByType` on its direct children to detect
 * `<Line>` / `<XAxis>` / `<CartesianGrid>` etc., so any extra wrapper element
 * (Context.Provider, fragment-only-on-render, etc.) breaks chart rendering.
 *
 * The auto-palette context is established by `<ChartContainer>` instead, so
 * data primitives still cycle through `--chart-N` colours when no fill /
 * stroke is supplied.
 *
 * Margin defaults are merged with any user-supplied margin (user wins on
 * conflict). Everything else is straight pass-through.
 */

const DEFAULT_MARGIN = { top: 12, right: 12, bottom: 4, left: 0 } as const;

function withDefaults<P extends { children?: React.ReactNode; margin?: object }>(
	Comp: React.ComponentType<P>,
): React.FC<P> {
	const Wrapped = ({ children, margin, ...rest }: P) => {
		const merged = { ...DEFAULT_MARGIN, ...(margin ?? {}) };
		const props = { ...rest, margin: merged } as any;
		return <Comp {...props}>{children}</Comp>;
	};
	/* c8 ignore next -- defensive: every recharts top-level chart component ships with a `displayName`; the `?? Comp.name ?? "Anonymous"` fallback chain only fires for hand-rolled non-recharts wrappers */
	Wrapped.displayName = `Chart(${(Comp as { displayName?: string }).displayName ?? Comp.name ?? "Anonymous"})`;
	return Wrapped;
}

export const LineChart = withDefaults(RechartsPrimitive.LineChart);
export const BarChart = withDefaults(RechartsPrimitive.BarChart);
export const AreaChart = withDefaults(RechartsPrimitive.AreaChart);
export const ComposedChart = withDefaults(RechartsPrimitive.ComposedChart);
export const PieChart = withDefaults(RechartsPrimitive.PieChart);
export const ScatterChart = withDefaults(RechartsPrimitive.ScatterChart);
export const RadarChart = withDefaults(RechartsPrimitive.RadarChart);
export const RadialBarChart = withDefaults(RechartsPrimitive.RadialBarChart);
export const FunnelChart = withDefaults(RechartsPrimitive.FunnelChart);
export const SunburstChart = withDefaults(RechartsPrimitive.SunburstChart);

// Treemap and Sankey have a different children shape — pure pass-throughs.
export const Treemap = RechartsPrimitive.Treemap;
export const Sankey = RechartsPrimitive.Sankey;
