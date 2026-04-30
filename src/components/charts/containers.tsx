"use client";

/**
 * Container-level Recharts primitives. Pure pass-throughs.
 * `ResponsiveContainer` is also re-rendered internally by `<ChartContainer>`,
 * but consumers might want to use it directly for non-canvas-themed charts.
 *
 * NOTE: re-exported via `export { … }` (not `export const = …`) so TypeScript
 * doesn't have to name internal Recharts prop types in the d.ts emit.
 */
export { Brush, Layer, ResponsiveContainer, Surface } from "recharts";
