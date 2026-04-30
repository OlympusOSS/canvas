"use client";

/**
 * Data-primitive re-exports. These are direct pass-throughs of the Recharts
 * primitives — wrapping them in our own function components breaks Recharts'
 * `findAllByType` introspection (it looks for `child.type === Bar` etc., and
 * a wrapper's `type` is our function, not Bar). The earlier wrapped version
 * crashed Recharts with "Cannot read properties of undefined (reading
 * 'yAxisId')" because the chart-type couldn't find our axes / data.
 *
 * Auto-palette cycling happens inside `<ChartContainer>` via a deep
 * `React.cloneElement` walk that injects `fill`/`stroke` defaults when the
 * consumer didn't supply one. The wrapped types remain the real Recharts
 * classes, so axis detection / chart-type child resolution keep working.
 */
export { Area, Bar, Funnel, Line, Pie, Radar, RadialBar, Scatter } from "recharts";
