"use client";

/**
 * Detail-level Recharts primitives. Pure pass-throughs — no theming
 * opportunity, but re-exported here so consumers can import the entire
 * Recharts surface from canvas.
 *
 * `Cell` and `Customized` are aliased to `ChartCell` / `ChartCustomized` to
 * avoid likely future collisions with canvas-domain primitives.
 *
 * Re-exported via `export { … }` (not `export const = …`) so TypeScript
 * doesn't have to name internal Recharts prop types in the d.ts emit.
 */
export {
	Cell as ChartCell,
	Cross,
	Curve,
	Customized as ChartCustomized,
	Dot,
	ErrorBar,
	Polygon,
	Rectangle,
	Sector,
	Trapezoid,
} from "recharts";
