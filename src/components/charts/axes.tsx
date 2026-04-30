"use client";

/**
 * Axis re-exports — pure pass-throughs of the Recharts primitives. Wrapping
 * them in function components breaks Recharts' `findAllByType` introspection
 * (chart types like LineChart look for `child.type === XAxis` to detect axes;
 * our wrapper would have a different type, so the chart can't find them and
 * crashes with "xAxisId requires a corresponding xAxisId on the targeted
 * graphical component" errors).
 *
 * Theming is applied via CSS selectors on the `<ChartContainer>` wrapping div
 * (`[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground`, etc.).
 */
export {
	CartesianAxis,
	PolarAngleAxis,
	PolarRadiusAxis,
	XAxis,
	YAxis,
	ZAxis,
} from "recharts";
