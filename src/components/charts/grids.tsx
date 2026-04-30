"use client";

/**
 * Grid re-exports — pure pass-throughs. Theming via CSS in `<ChartContainer>`
 * (`[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50` etc.).
 * Wrapping breaks Recharts' child-by-type detection.
 */
export { CartesianGrid, PolarGrid } from "recharts";
