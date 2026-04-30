"use client";

/**
 * Reference primitives — pure pass-throughs. Theming via CSS in
 * `<ChartContainer>` (`[&_.recharts-reference-line_[stroke='#ccc']]:stroke-border`).
 * Wrapping breaks Recharts' child-by-type detection.
 */
export { ReferenceArea, ReferenceDot, ReferenceLine } from "recharts";
