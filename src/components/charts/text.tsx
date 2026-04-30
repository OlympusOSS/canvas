"use client";

/**
 * Text-rendering primitives. `Label` is aliased to `ChartLabel` to avoid
 * collision with canvas's form `Label` atom.
 *
 * Re-exported via `export { … }` so TypeScript doesn't have to name internal
 * Recharts prop types in the d.ts emit.
 */
export { Label as ChartLabel, LabelList, Text } from "recharts";
