// Container + style emitter (canvas-specific)

// Chrome — canvas-token defaults
export {
	CartesianAxis,
	PolarAngleAxis,
	PolarRadiusAxis,
	XAxis,
	YAxis,
	ZAxis,
} from "./axes";
export {
	type ChartConfig,
	ChartContainer,
	ChartStyle,
	useChart,
} from "./chart-container";
export { ChartLegend, ChartLegendContent } from "./chart-legend";
export { ChartTooltip, ChartTooltipContent } from "./chart-tooltip";
// Chart-type wrappers (`margin` defaults; auto-palette runs in ChartContainer)
export {
	AreaChart,
	BarChart,
	ComposedChart,
	FunnelChart,
	LineChart,
	PieChart,
	RadarChart,
	RadialBarChart,
	Sankey,
	ScatterChart,
	SunburstChart,
	Treemap,
} from "./chart-types";
// Container-level — pure pass-through
export { Brush, Layer, ResponsiveContainer, Surface } from "./containers";
// Data primitives (auto-cycle palette)
export { Area, Bar, Funnel, Line, Pie, Radar, RadialBar, Scatter } from "./data";
// Detail primitives — pure pass-through
export {
	ChartCell,
	ChartCustomized,
	Cross,
	Curve,
	Dot,
	ErrorBar,
	Polygon,
	Rectangle,
	Sector,
	Trapezoid,
} from "./details";
export { CartesianGrid, PolarGrid } from "./grids";
export { ReferenceArea, ReferenceDot, ReferenceLine } from "./references";
// Text + labels (Label aliased to avoid collision with canvas form Label)
export { ChartLabel, LabelList, Text } from "./text";

// Geographic — Leaflet-based heat-map (peer-optional `leaflet` + `react-leaflet`)
export {
	WorldHeatMap,
	type WorldHeatMapPoint,
	type WorldHeatMapProps,
} from "./world-heat-map";
