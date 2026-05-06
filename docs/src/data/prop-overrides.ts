/**
 * Per-component prop description overrides.
 *
 * Canvas's source code rarely has JSDoc on individual props (most descend
 * from Radix or use `cva` `VariantProps<>` so docgen can't extract a
 * meaningful comment). This file fills the gap with hand-authored
 * descriptions so every prop in every prop table is documented.
 *
 * Lookup chain inside `PropsTable`:
 *   1. `propsOverride` passed in via `<PropsTable overrides={…}/>` (richest, page-local)
 *   2. This file's `PROP_OVERRIDES[sourceId]?.[displayName]?.[propName]`
 *   3. Extracted JSDoc from `generated.json`
 *   4. `SHARED_PROP_DESCRIPTIONS` (asChild / className / inset only)
 *   5. "—"
 *
 * Keep entries terse and behaviour-focused — what does the prop do, and
 * what does it default to? Avoid restating the type.
 */

import type { PropsOverrideMap } from "../components/PropsTable";

/**
 * Synthetic prop entries appended to the auto-extracted props in the prop
 * table. Use this for canvas atoms that just spread `React.ComponentProps<>`
 * over a native HTML element or a Radix primitive — `react-docgen` can't
 * enumerate those inherited attributes, so we describe the most relevant
 * ones by hand here.
 *
 * Keyed: `sourceId` → component displayName → list of synthetic prop rows.
 */
export interface ExtraPropEntry {
	name: string;
	required: boolean;
	type: string;
	defaultValue: string | null;
	description: string;
}

export const EXTRA_PROPS: Record<string, Record<string, ExtraPropEntry[]>> = {
	"charts/service-health-list": {
		ServiceHealthList: [
			{
				name: "className",
				required: false,
				type: "string",
				defaultValue: null,
				description: "Tailwind / CSS class names merged onto the outer wrapper via `cn()`.",
			},
			{
				name: "id",
				required: false,
				type: "string",
				defaultValue: null,
				description:
					"DOM `id` for the wrapper — useful when an `aria-labelledby` references the list.",
			},
			{
				name: "role",
				required: false,
				type: "string",
				defaultValue: null,
				description:
					'Override the wrapper\'s ARIA role. Set when the list participates in a more specific landmark (e.g. `role="status"` for a live-updating health panel).',
			},
			{
				name: "aria-label",
				required: false,
				type: "string",
				defaultValue: null,
				description:
					'Accessible label for the whole list — e.g. `"Production service health"`. Pair with `role="status"` for screen-reader announcements when items change.',
			},
		],
	},
	"charts/stacked-bar": {
		StackedBar: [
			{
				name: "className",
				required: false,
				type: "string",
				defaultValue: null,
				description: "Tailwind / CSS class names merged onto the outer wrapper via `cn()`.",
			},
			{
				name: "id",
				required: false,
				type: "string",
				defaultValue: null,
				description:
					"DOM `id` for the wrapper — useful when an `aria-labelledby` references the bar.",
			},
			{
				name: "role",
				required: false,
				type: "string",
				defaultValue: null,
				description:
					'Override the wrapper\'s ARIA role. The inner bar already carries `role="presentation"`; set this on the outer when the whole component participates in a more specific landmark (e.g. `role="img"` with `aria-label`).',
			},
			{
				name: "aria-label",
				required: false,
				type: "string",
				defaultValue: null,
				description:
					"Accessible label for the whole bar — important when the visual order of segments carries meaning.",
			},
		],
	},
	"charts/chart-types": {
		LineChart: [
			{
				name: "data",
				required: true,
				type: "Array<Record<string, any>>",
				defaultValue: null,
				description:
					"Row data — one entry per X-axis tick. Each `<Line dataKey>` child reads its own field on every row to plot a series.",
			},
			{
				name: "children",
				required: true,
				type: "ReactNode",
				defaultValue: null,
				description:
					"Recharts subcomponents that compose the chart. Typical children: `<CartesianGrid>`, `<XAxis dataKey=…>`, `<YAxis>`, one or more `<Line dataKey=…>` for each series, `<ChartTooltip>`, optionally `<ChartLegend>`, `<Brush>`, `<ReferenceLine>`.",
			},
			{
				name: "margin",
				required: false,
				type: "{ top?: number; right?: number; bottom?: number; left?: number }",
				defaultValue: "{ top: 5, right: 5, bottom: 5, left: 5 }",
				description:
					"Padding inside the chart between the axes and the container edges. Bump `left`/`bottom` when axis labels need more room.",
			},
			{
				name: "layout",
				required: false,
				type: '"horizontal" | "vertical"',
				defaultValue: '"horizontal"',
				description:
					"Axis orientation. `horizontal` = X is the category axis (default time-series). `vertical` swaps the axes — useful for ranked rows.",
			},
			{
				name: "stackOffset",
				required: false,
				type: '"expand" | "none" | "wiggle" | "silhouette" | "sign"',
				defaultValue: '"none"',
				description:
					"Stack-mode for stacked lines. `expand` normalises to 0–1 (percentage stack); `silhouette`/`wiggle` are the streamgraph variants. Most line charts leave this at `none`.",
			},
			{
				name: "syncId",
				required: false,
				type: "string | number",
				defaultValue: null,
				description:
					"Cross-chart hover sync identifier. All charts that share the same `syncId` highlight matching ticks together — useful for stacking a line and a bar chart on the same dashboard.",
			},
			{
				name: "syncMethod",
				required: false,
				type: '"index" | "value" | (ticks, data) => number',
				defaultValue: '"index"',
				description:
					"How `syncId` matches points across charts. `index` syncs by row position; `value` matches by axis value.",
			},
			{
				name: "throttleDelay",
				required: false,
				type: "number",
				defaultValue: "0",
				description:
					"Throttle (ms) for `onMouseMove` events. Bump to 16+ on dense lines with thousands of points to smooth pointer tracking.",
			},
			{
				name: "defaultShowTooltip",
				required: false,
				type: "boolean",
				defaultValue: "false",
				description: "Show the tooltip on initial render before any pointer event.",
			},
			{
				name: "onClick",
				required: false,
				type: "(state, event) => void",
				defaultValue: null,
				description:
					"Fires when the chart area is clicked. Receives the chart state (active payload, coords, etc.) and the original event.",
			},
			{
				name: "onMouseEnter",
				required: false,
				type: "(state, event) => void",
				defaultValue: null,
				description: "Fires when the pointer enters the chart area.",
			},
			{
				name: "onMouseLeave",
				required: false,
				type: "(state, event) => void",
				defaultValue: null,
				description: "Fires when the pointer leaves the chart area.",
			},
			{
				name: "onMouseMove",
				required: false,
				type: "(state, event) => void",
				defaultValue: null,
				description:
					"Fires on every pointer move over the chart. Pair with `throttleDelay` on dense lines.",
			},
			{
				name: "onMouseDown",
				required: false,
				type: "(state, event) => void",
				defaultValue: null,
				description: "Fires on pointer-down inside the chart.",
			},
			{
				name: "onMouseUp",
				required: false,
				type: "(state, event) => void",
				defaultValue: null,
				description: "Fires on pointer-up inside the chart.",
			},
			{
				name: "onDoubleClick",
				required: false,
				type: "(state, event) => void",
				defaultValue: null,
				description: "Fires when the chart area is double-clicked.",
			},
			{
				name: "onContextMenu",
				required: false,
				type: "(state, event) => void",
				defaultValue: null,
				description: "Fires on right-click inside the chart.",
			},
			{
				name: "width",
				required: false,
				type: "number",
				defaultValue: null,
				description:
					"Pixel width — usually omitted when wrapped in `<ChartContainer>` so the chart fills its parent.",
			},
			{
				name: "height",
				required: false,
				type: "number",
				defaultValue: null,
				description:
					"Pixel height — usually omitted when wrapped in `<ChartContainer>` so the chart fills its parent.",
			},
			{
				name: "className",
				required: false,
				type: "string",
				defaultValue: null,
				description: "Tailwind / CSS class names merged onto the root `<svg>` wrapper.",
			},
			{
				name: "style",
				required: false,
				type: "CSSProperties",
				defaultValue: null,
				description: "Inline style applied to the root `<svg>` wrapper.",
			},
		],
		PieChart: [
			{
				name: "children",
				required: true,
				type: "ReactNode",
				defaultValue: null,
				description:
					"Recharts subcomponents that compose the chart. At minimum a `<Pie data dataKey>` for each ring; commonly `<ChartTooltip>` and `<ChartLegend>`. Stack multiple `<Pie>` children with different `innerRadius`/`outerRadius` for nested rings.",
			},
			{
				name: "data",
				required: false,
				type: "Array<Record<string, any>>",
				defaultValue: null,
				description:
					"Optional chart-level data. Usually omitted for pie — data lives on each `<Pie data=…>` so multiple rings can have different shapes.",
			},
			{
				name: "margin",
				required: false,
				type: "{ top?: number; right?: number; bottom?: number; left?: number }",
				defaultValue: "{ top: 5, right: 5, bottom: 5, left: 5 }",
				description: "Padding inside the chart between the slices and the container edges.",
			},
			{
				name: "syncId",
				required: false,
				type: "string | number",
				defaultValue: null,
				description:
					"Cross-chart hover sync identifier. All charts that share the same `syncId` highlight matching slices together.",
			},
			{
				name: "syncMethod",
				required: false,
				type: '"index" | "value" | (ticks, data) => number',
				defaultValue: '"index"',
				description: "How `syncId` matches points across charts.",
			},
			{
				name: "onClick",
				required: false,
				type: "(state, event) => void",
				defaultValue: null,
				description: "Fires when the chart area is clicked. Receives the chart state and event.",
			},
			{
				name: "onMouseEnter",
				required: false,
				type: "(state, event) => void",
				defaultValue: null,
				description: "Fires when the pointer enters the chart area.",
			},
			{
				name: "onMouseLeave",
				required: false,
				type: "(state, event) => void",
				defaultValue: null,
				description: "Fires when the pointer leaves the chart area.",
			},
			{
				name: "onMouseMove",
				required: false,
				type: "(state, event) => void",
				defaultValue: null,
				description:
					"Fires on every pointer move inside the chart. Pair with `throttleDelay` on dense pies.",
			},
			{
				name: "throttleDelay",
				required: false,
				type: "number",
				defaultValue: "0",
				description: "Throttle (ms) for `onMouseMove` events. Bump to 16+ on multi-ring pies.",
			},
			{
				name: "defaultShowTooltip",
				required: false,
				type: "boolean",
				defaultValue: "false",
				description: "Show the tooltip on initial render before any pointer event.",
			},
			{
				name: "width",
				required: false,
				type: "number",
				defaultValue: null,
				description:
					"Pixel width — usually omitted when wrapped in `<ChartContainer>` so the chart fills its parent.",
			},
			{
				name: "height",
				required: false,
				type: "number",
				defaultValue: null,
				description:
					"Pixel height — usually omitted when wrapped in `<ChartContainer>` so the chart fills its parent.",
			},
			{
				name: "className",
				required: false,
				type: "string",
				defaultValue: null,
				description: "Tailwind / CSS class names merged onto the root `<svg>` wrapper.",
			},
			{
				name: "style",
				required: false,
				type: "CSSProperties",
				defaultValue: null,
				description: "Inline style applied to the root `<svg>` wrapper.",
			},
		],
		RadarChart: [
			{
				name: "data",
				required: true,
				type: "Array<Record<string, any>>",
				defaultValue: null,
				description:
					"Row data — one entry per axis spoke. The field referenced by `<PolarAngleAxis dataKey>` becomes the spoke label, and each `<Radar dataKey>` reads its own field on every row to plot the polygon.",
			},
			{
				name: "children",
				required: true,
				type: "ReactNode",
				defaultValue: null,
				description:
					"Recharts subcomponents that compose the chart. Typical children: `<PolarGrid>`, `<PolarAngleAxis dataKey=…>`, optionally `<PolarRadiusAxis>`, one or more `<Radar dataKey=…>` for each series, `<ChartTooltip>`, `<ChartLegend>`.",
			},
			{
				name: "innerRadius",
				required: false,
				type: "number | string",
				defaultValue: "0",
				description:
					"Radius of the centre hole. Numbers are pixels; strings are percentages of the chart's smaller dimension. Bump for radar layouts that mask the centre (e.g. score sweet-spots).",
			},
			{
				name: "outerRadius",
				required: false,
				type: "number | string",
				defaultValue: '"80%"',
				description:
					"Outermost ring radius. Numbers are pixels; strings are percentages of the chart's smaller dimension.",
			},
			{
				name: "startAngle",
				required: false,
				type: "number",
				defaultValue: "90",
				description:
					"Angle (degrees) where the first spoke sits. Default puts the first spoke at 12 o'clock; tune to rotate the chart.",
			},
			{
				name: "endAngle",
				required: false,
				type: "number",
				defaultValue: "-270",
				description:
					"Angle (degrees) where the last spoke ends. Default sweeps a full 360° clockwise from `startAngle`.",
			},
			{
				name: "cx",
				required: false,
				type: "number | string",
				defaultValue: '"50%"',
				description:
					"X coordinate of the chart's centre. Numbers are pixels; strings are percentages.",
			},
			{
				name: "cy",
				required: false,
				type: "number | string",
				defaultValue: '"50%"',
				description:
					"Y coordinate of the chart's centre. Numbers are pixels; strings are percentages.",
			},
			{
				name: "margin",
				required: false,
				type: "{ top?: number; right?: number; bottom?: number; left?: number }",
				defaultValue: "{ top: 5, right: 5, bottom: 5, left: 5 }",
				description:
					"Padding inside the chart between the polygon and the container edges. Bump when long spoke labels overflow.",
			},
			{
				name: "syncId",
				required: false,
				type: "string | number",
				defaultValue: null,
				description:
					"Cross-chart hover sync identifier. All charts that share the same `syncId` highlight matching spokes together.",
			},
			{
				name: "syncMethod",
				required: false,
				type: '"index" | "value" | (ticks, data) => number',
				defaultValue: '"index"',
				description: "How `syncId` matches points across charts.",
			},
			{
				name: "onClick",
				required: false,
				type: "(state, event) => void",
				defaultValue: null,
				description: "Fires when the chart area is clicked. Receives the chart state and event.",
			},
			{
				name: "onMouseEnter",
				required: false,
				type: "(state, event) => void",
				defaultValue: null,
				description: "Fires when the pointer enters the chart area.",
			},
			{
				name: "onMouseLeave",
				required: false,
				type: "(state, event) => void",
				defaultValue: null,
				description: "Fires when the pointer leaves the chart area.",
			},
			{
				name: "onMouseMove",
				required: false,
				type: "(state, event) => void",
				defaultValue: null,
				description:
					"Fires on every pointer move inside the chart. Pair with `throttleDelay` on dense radars.",
			},
			{
				name: "throttleDelay",
				required: false,
				type: "number",
				defaultValue: "0",
				description:
					"Throttle (ms) for `onMouseMove` events. Bump to 16+ on radars with many series for smoother pointer tracking.",
			},
			{
				name: "width",
				required: false,
				type: "number",
				defaultValue: null,
				description:
					"Pixel width — usually omitted when wrapped in `<ChartContainer>` so the chart fills its parent.",
			},
			{
				name: "height",
				required: false,
				type: "number",
				defaultValue: null,
				description:
					"Pixel height — usually omitted when wrapped in `<ChartContainer>` so the chart fills its parent.",
			},
			{
				name: "className",
				required: false,
				type: "string",
				defaultValue: null,
				description: "Tailwind / CSS class names merged onto the root `<svg>` wrapper.",
			},
			{
				name: "style",
				required: false,
				type: "CSSProperties",
				defaultValue: null,
				description: "Inline style applied to the root `<svg>` wrapper.",
			},
		],
		RadialBarChart: [
			{
				name: "data",
				required: true,
				type: "Array<Record<string, any>>",
				defaultValue: null,
				description:
					"Row data — one entry per concentric ring. Each row's `dataKey` field (defined on the inner `<RadialBar>`) drives that ring's arc length. Pass `fill` per row for per-ring colours.",
			},
			{
				name: "children",
				required: true,
				type: "ReactNode",
				defaultValue: null,
				description:
					"Recharts subcomponents that compose the chart. At minimum a `<RadialBar dataKey=…>` for the rings; commonly `<ChartTooltip>`, `<ChartLegend>`, and `<PolarAngleAxis>` for circular tick marks.",
			},
			{
				name: "innerRadius",
				required: false,
				type: "number | string",
				defaultValue: '"30%"',
				description:
					"Radius of the centre hole. Numbers are pixels; strings are percentages of the chart's smaller dimension. Bump to ~40–50% for thicker doughnut layouts.",
			},
			{
				name: "outerRadius",
				required: false,
				type: "number | string",
				defaultValue: '"80%"',
				description:
					"Outermost ring radius. Numbers are pixels; strings are percentages of the chart's smaller dimension.",
			},
			{
				name: "startAngle",
				required: false,
				type: "number",
				defaultValue: "0",
				description:
					"Angle (degrees) where the rings begin sweeping. Pair with `endAngle` for partial layouts — e.g. `startAngle={90} endAngle={-270}` starts at 12 o'clock and sweeps clockwise.",
			},
			{
				name: "endAngle",
				required: false,
				type: "number",
				defaultValue: "360",
				description: "Angle (degrees) where the rings end. See `startAngle`.",
			},
			{
				name: "cx",
				required: false,
				type: "number | string",
				defaultValue: '"50%"',
				description:
					"X coordinate of the chart's centre. Numbers are pixels; strings are percentages.",
			},
			{
				name: "cy",
				required: false,
				type: "number | string",
				defaultValue: '"50%"',
				description:
					"Y coordinate of the chart's centre. Numbers are pixels; strings are percentages.",
			},
			{
				name: "barSize",
				required: false,
				type: "number",
				defaultValue: null,
				description:
					"Pixel thickness of each ring. When omitted, rings auto-size to fill the available radial space; set explicitly for consistent ring widths regardless of data length.",
			},
			{
				name: "barCategoryGap",
				required: false,
				type: "number | string",
				defaultValue: '"10%"',
				description:
					"Gap between rings. Numbers are pixels; strings are percentages of the available band.",
			},
			{
				name: "barGap",
				required: false,
				type: "number | string",
				defaultValue: "4",
				description:
					"Gap between bars when multiple `<RadialBar>` series share the same ring. Pixels (number) or percentages (string).",
			},
			{
				name: "margin",
				required: false,
				type: "{ top?: number; right?: number; bottom?: number; left?: number }",
				defaultValue: "{ top: 5, right: 5, bottom: 5, left: 5 }",
				description: "Padding inside the chart between the rings and the container edges.",
			},
			{
				name: "syncId",
				required: false,
				type: "string | number",
				defaultValue: null,
				description:
					"Cross-chart hover sync identifier. All charts that share the same `syncId` highlight matching rows together.",
			},
			{
				name: "syncMethod",
				required: false,
				type: '"index" | "value" | (ticks, data) => number',
				defaultValue: '"index"',
				description: "How `syncId` matches points across charts.",
			},
			{
				name: "onClick",
				required: false,
				type: "(state, event) => void",
				defaultValue: null,
				description: "Fires when the chart area is clicked. Receives the chart state and event.",
			},
			{
				name: "onMouseEnter",
				required: false,
				type: "(state, event) => void",
				defaultValue: null,
				description: "Fires when the pointer enters the chart area.",
			},
			{
				name: "onMouseLeave",
				required: false,
				type: "(state, event) => void",
				defaultValue: null,
				description: "Fires when the pointer leaves the chart area.",
			},
			{
				name: "width",
				required: false,
				type: "number",
				defaultValue: null,
				description:
					"Pixel width — usually omitted when wrapped in `<ChartContainer>` so the chart fills its parent.",
			},
			{
				name: "height",
				required: false,
				type: "number",
				defaultValue: null,
				description:
					"Pixel height — usually omitted when wrapped in `<ChartContainer>` so the chart fills its parent.",
			},
			{
				name: "className",
				required: false,
				type: "string",
				defaultValue: null,
				description: "Tailwind / CSS class names merged onto the root `<svg>` wrapper.",
			},
			{
				name: "style",
				required: false,
				type: "CSSProperties",
				defaultValue: null,
				description: "Inline style applied to the root `<svg>` wrapper.",
			},
		],
		Sankey: [
			{
				name: "data",
				required: true,
				type: "{ nodes: Array<{ name: string }>; links: Array<{ source: number; target: number; value: number }> }",
				defaultValue: null,
				description:
					"Flow definition. `nodes` are the points; `links` connect node indices and carry a `value` that drives flow thickness. `source`/`target` are positional indices into `nodes`.",
			},
			{
				name: "nameKey",
				required: false,
				type: "string | (datum) => string",
				defaultValue: '"name"',
				description: "Field on each node used as the display name in tooltips and labels.",
			},
			{
				name: "dataKey",
				required: false,
				type: "string | (datum) => number",
				defaultValue: '"value"',
				description: "Field on each link that drives the flow's thickness.",
			},
			{
				name: "nodePadding",
				required: false,
				type: "number",
				defaultValue: "8",
				description:
					"Vertical pixel gap between sibling nodes in the same column. Bump for breathing room when columns are crowded.",
			},
			{
				name: "nodeWidth",
				required: false,
				type: "number",
				defaultValue: "10",
				description:
					"Pixel width of the node rectangles. Wider nodes read better on dense diagrams.",
			},
			{
				name: "linkCurvature",
				required: false,
				type: "number",
				defaultValue: "0.5",
				description:
					"Curvature factor for the connecting paths. `0` is straight lines, `1` is fully bowed; `0.5`–`0.7` reads as a smooth flow.",
			},
			{
				name: "iterations",
				required: false,
				type: "number",
				defaultValue: "32",
				description:
					"Layout iterations the algorithm runs to minimise crossings. Bump (e.g. 64) for cleaner layouts on dense graphs at the cost of a longer initial render.",
			},
			{
				name: "node",
				required: false,
				type: "RectangleProps | ReactElement | ((props) => ReactElement)",
				defaultValue: null,
				description:
					"Node styling or custom renderer. Pass an object (`{ fill, stroke, fillOpacity }`) for simple per-node theming, or a function for full control over the SVG node element.",
			},
			{
				name: "link",
				required: false,
				type: "SVGPathProps | ReactElement | ((props) => ReactElement)",
				defaultValue: null,
				description:
					"Link styling or custom renderer. Pass `{ stroke, strokeOpacity }` for simple flows; supply a function for gradient links or per-link colour mapping.",
			},
			{
				name: "sort",
				required: false,
				type: "boolean",
				defaultValue: "true",
				description:
					"Whether to reorder nodes within each column to minimise link crossings. Disable to preserve input order.",
			},
			{
				name: "margin",
				required: false,
				type: "{ top?: number; right?: number; bottom?: number; left?: number }",
				defaultValue: "{ top: 5, right: 5, bottom: 5, left: 5 }",
				description:
					"Padding inside the chart between the diagram and the container edges. Bump if node labels overflow the SVG box.",
			},
			{
				name: "onClick",
				required: false,
				type: "(element, type, event) => void",
				defaultValue: null,
				description:
					'Fires when a node or link is clicked. `type` is `"node"` or `"link"` so a single handler can branch on the element kind.',
			},
			{
				name: "onMouseEnter",
				required: false,
				type: "(element, type, event) => void",
				defaultValue: null,
				description: "Fires when the pointer enters a node or link. Same shape as `onClick`.",
			},
			{
				name: "onMouseLeave",
				required: false,
				type: "(element, type, event) => void",
				defaultValue: null,
				description: "Fires when the pointer leaves a node or link. Same shape as `onClick`.",
			},
			{
				name: "width",
				required: false,
				type: "number",
				defaultValue: null,
				description:
					"Pixel width — usually omitted when wrapped in `<ChartContainer>` so the chart fills its parent.",
			},
			{
				name: "height",
				required: false,
				type: "number",
				defaultValue: null,
				description:
					"Pixel height — usually omitted when wrapped in `<ChartContainer>` so the chart fills its parent.",
			},
			{
				name: "children",
				required: false,
				type: "ReactNode",
				defaultValue: null,
				description:
					"Recharts subcomponents — typically `<ChartTooltip>` (paired with `<ChartTooltipContent>`) for hover tooltips.",
			},
		],
		ScatterChart: [
			{
				name: "children",
				required: true,
				type: "ReactNode",
				defaultValue: null,
				description:
					'Recharts subcomponents that compose the chart. Typical children: `<CartesianGrid>`, `<XAxis type="number">`, `<YAxis type="number">`, one or more `<Scatter data=…>` for each series, `<ChartTooltip>`, optionally `<ZAxis>` for bubble sizing.',
			},
			{
				name: "data",
				required: false,
				type: "Array<Record<string, any>>",
				defaultValue: null,
				description:
					"Optional chart-level data. Usually omitted for scatter — provide per-series `data` on each `<Scatter>` child instead so multiple series can co-exist.",
			},
			{
				name: "margin",
				required: false,
				type: "{ top?: number; right?: number; bottom?: number; left?: number }",
				defaultValue: "{ top: 5, right: 5, bottom: 5, left: 5 }",
				description:
					"Padding inside the chart between the axes and the container edges. Bump `left`/`bottom` when axis labels need more room.",
			},
			{
				name: "layout",
				required: false,
				type: '"horizontal" | "vertical" | "centric" | "radial"',
				defaultValue: '"horizontal"',
				description:
					"Axis orientation. `horizontal` = numeric Y vs numeric X (default scatter). `vertical` swaps the axes for time-on-Y layouts.",
			},
			{
				name: "syncId",
				required: false,
				type: "string | number",
				defaultValue: null,
				description:
					"Cross-chart hover sync identifier. All charts that share the same `syncId` highlight matching points together — useful for stacking a scatter and a line chart on the same dashboard.",
			},
			{
				name: "syncMethod",
				required: false,
				type: '"index" | "value" | (ticks, data) => number',
				defaultValue: '"index"',
				description:
					"How `syncId` matches points across charts. `index` syncs by row position; `value` matches by axis value; pass a function for custom logic.",
			},
			{
				name: "throttleDelay",
				required: false,
				type: "number",
				defaultValue: "0",
				description:
					"Throttle (ms) for `onMouseMove` events. Bump to 16+ on dense scatters with thousands of points to smooth pointer tracking.",
			},
			{
				name: "defaultShowTooltip",
				required: false,
				type: "boolean",
				defaultValue: "false",
				description: "Show the tooltip on initial render before any pointer event.",
			},
			{
				name: "onClick",
				required: false,
				type: "(state, event) => void",
				defaultValue: null,
				description:
					"Fires when the chart area is clicked. Receives the chart state (active payload, coords, etc.) and the original event.",
			},
			{
				name: "onMouseEnter",
				required: false,
				type: "(state, event) => void",
				defaultValue: null,
				description: "Fires when the pointer enters the chart area.",
			},
			{
				name: "onMouseLeave",
				required: false,
				type: "(state, event) => void",
				defaultValue: null,
				description: "Fires when the pointer leaves the chart area.",
			},
			{
				name: "onMouseMove",
				required: false,
				type: "(state, event) => void",
				defaultValue: null,
				description:
					"Fires on every pointer move over the chart. Pair with `throttleDelay` on dense scatters.",
			},
			{
				name: "onMouseDown",
				required: false,
				type: "(state, event) => void",
				defaultValue: null,
				description: "Fires on pointer-down inside the chart.",
			},
			{
				name: "onMouseUp",
				required: false,
				type: "(state, event) => void",
				defaultValue: null,
				description: "Fires on pointer-up inside the chart.",
			},
			{
				name: "onDoubleClick",
				required: false,
				type: "(state, event) => void",
				defaultValue: null,
				description: "Fires when the chart area is double-clicked.",
			},
			{
				name: "onContextMenu",
				required: false,
				type: "(state, event) => void",
				defaultValue: null,
				description: "Fires on right-click inside the chart.",
			},
			{
				name: "width",
				required: false,
				type: "number",
				defaultValue: null,
				description:
					"Pixel width — usually omitted when wrapped in `<ChartContainer>` so the chart fills its parent.",
			},
			{
				name: "height",
				required: false,
				type: "number",
				defaultValue: null,
				description:
					"Pixel height — usually omitted when wrapped in `<ChartContainer>` so the chart fills its parent.",
			},
			{
				name: "style",
				required: false,
				type: "CSSProperties",
				defaultValue: null,
				description: "Inline style applied to the root `<svg>` wrapper.",
			},
		],
		SunburstChart: [
			{
				name: "data",
				required: true,
				type: "{ name: string; value?: number; fill?: string; children?: SunburstData[] }",
				defaultValue: null,
				description:
					"Root node of the hierarchy. Recharts does NOT auto-aggregate, so every node — including parents — needs an explicit `value`. Per-node `fill` controls the sector colour; pass canvas chart tokens (`hsl(var(--chart-N))`) plus `/ 0.55` opacity for outer rings to keep depth readable without colour noise.",
			},
			{
				name: "dataKey",
				required: false,
				type: "string",
				defaultValue: '"value"',
				description: "Field on each node that drives the sector's angular sweep.",
			},
			{
				name: "padding",
				required: false,
				type: "number",
				defaultValue: "0",
				description: "Angular gap (degrees) between sibling sectors. `0` for solid rings.",
			},
			{
				name: "ringPadding",
				required: false,
				type: "number",
				defaultValue: "0",
				description: "Pixel gap between concentric rings (between depth levels).",
			},
			{
				name: "innerRadius",
				required: false,
				type: "number",
				defaultValue: null,
				description:
					"Radius of the centre hole (px). `0` for a solid pie-style sunburst; non-zero for a doughnut-style centre.",
			},
			{
				name: "outerRadius",
				required: false,
				type: "number",
				defaultValue: null,
				description:
					"Outermost ring radius (px). When omitted, fills the available space inside the container.",
			},
			{
				name: "cx",
				required: false,
				type: "number",
				defaultValue: null,
				description: "X coordinate of the chart's centre (px). Defaults to the container midpoint.",
			},
			{
				name: "cy",
				required: false,
				type: "number",
				defaultValue: null,
				description: "Y coordinate of the chart's centre (px). Defaults to the container midpoint.",
			},
			{
				name: "startAngle",
				required: false,
				type: "number",
				defaultValue: "0",
				description:
					"Angle (degrees) where the chart begins. Combine with `endAngle` for half-circle / quarter-circle layouts (e.g. `startAngle={180}` + `endAngle={0}`).",
			},
			{
				name: "endAngle",
				required: false,
				type: "number",
				defaultValue: "360",
				description:
					"Angle (degrees) where the chart ends. See `startAngle` for partial sunbursts.",
			},
			{
				name: "fill",
				required: false,
				type: "string",
				defaultValue: '"#333"',
				description:
					"Fallback sector fill when a node has no `fill` field. Pass `hsl(var(--chart-N))` for theme-aware colours.",
			},
			{
				name: "stroke",
				required: false,
				type: "string",
				defaultValue: '"#fff"',
				description:
					'Sector-border colour. Pass `""` (empty string) or `transparent` for borderless rings — Recharts default is white which reads as gaps in dark mode.',
			},
			{
				name: "textOptions",
				required: false,
				type: "{ fontFamily?: string; fontWeight?: string; paintOrder?: string; stroke?: string; fill?: string; fontSize?: string; pointerEvents?: string }",
				defaultValue: null,
				description:
					"Styling for the sector value labels rendered on each ring. Set `fill` and `stroke` to canvas tokens for theme-aware text. The underlying `<text>` element also honours `letterSpacing` via TS `as any` cast.",
			},
			{
				name: "onClick",
				required: false,
				type: "(node) => void",
				defaultValue: null,
				description: "Fires when a sector is clicked. Receives the underlying datum.",
			},
			{
				name: "onMouseEnter",
				required: false,
				type: "(node, event) => void",
				defaultValue: null,
				description: "Fires when the pointer enters a sector.",
			},
			{
				name: "onMouseLeave",
				required: false,
				type: "(node, event) => void",
				defaultValue: null,
				description: "Fires when the pointer leaves a sector.",
			},
			{
				name: "width",
				required: false,
				type: "number",
				defaultValue: null,
				description:
					"Pixel width — usually omitted when wrapped in `<ChartContainer>` so the chart fills its parent.",
			},
			{
				name: "height",
				required: false,
				type: "number",
				defaultValue: null,
				description:
					"Pixel height — usually omitted when wrapped in `<ChartContainer>` so the chart fills its parent.",
			},
			{
				name: "children",
				required: false,
				type: "ReactNode",
				defaultValue: null,
				description:
					"Recharts subcomponents — typically `<ChartTooltip>` (paired with `<ChartTooltipContent>`) for hover tooltips.",
			},
		],
		Treemap: [
			{
				name: "data",
				required: true,
				type: "Array<{ name?: string; size?: number; fill?: string; children?: ... }>",
				defaultValue: null,
				description:
					"Tree of data nodes. Each leaf becomes a cell; nested `children` create hierarchy levels. Recharts does NOT auto-aggregate — every node needs an explicit `size` (or whatever `dataKey` resolves to).",
			},
			{
				name: "dataKey",
				required: true,
				type: "string",
				defaultValue: null,
				description: "Field on each datum that determines the cell's area (proportional to value).",
			},
			{
				name: "nameKey",
				required: false,
				type: "string",
				defaultValue: '"name"',
				description: "Field used for the cell's display name and tooltip label.",
			},
			{
				name: "type",
				required: false,
				type: '"flat" | "nest"',
				defaultValue: '"flat"',
				description:
					"`flat` lays every leaf in one layer; `nest` recursively stacks parent rectangles around their children for hierarchical data.",
			},
			{
				name: "aspectRatio",
				required: false,
				type: "number",
				defaultValue: "0.5 * (1 + Math.sqrt(5))",
				description:
					"Target width-to-height ratio for each cell. Tune up for wider tiles, down for taller ones.",
			},
			{
				name: "fill",
				required: false,
				type: "string",
				defaultValue: '"#fff"',
				description:
					"Fallback cell fill when a datum has no `fill` field. Pass a canvas chart token (e.g. `hsl(var(--chart-1))`) for theme-aware colours.",
			},
			{
				name: "stroke",
				required: false,
				type: "string",
				defaultValue: '"#000"',
				description:
					"Cell-border colour. Use `transparent` for borderless cells, or `hsl(var(--background))` to render thin gaps that match the page surface.",
			},
			{
				name: "content",
				required: false,
				type: "ReactElement | ((props) => ReactElement)",
				defaultValue: null,
				description:
					"Custom cell renderer. Receives `{ x, y, width, height, name, depth, index, payload, ... }`. Use this to draw bespoke labels, gradients, or icons inside each cell.",
			},
			{
				name: "isAnimationActive",
				required: false,
				type: "boolean",
				defaultValue: "true",
				description: "Whether to animate cell sizing on initial render and data changes.",
			},
			{
				name: "animationBegin",
				required: false,
				type: "number",
				defaultValue: "0",
				description: "Delay before the entry animation starts (ms).",
			},
			{
				name: "animationDuration",
				required: false,
				type: "number",
				defaultValue: "1500",
				description: "Length of the entry animation (ms).",
			},
			{
				name: "animationEasing",
				required: false,
				type: '"ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear"',
				defaultValue: '"ease"',
				description: "Easing function for the entry animation.",
			},
			{
				name: "onAnimationStart",
				required: false,
				type: "() => void",
				defaultValue: null,
				description: "Fires when the entry animation begins.",
			},
			{
				name: "onAnimationEnd",
				required: false,
				type: "() => void",
				defaultValue: null,
				description: "Fires when the entry animation finishes.",
			},
			{
				name: "onClick",
				required: false,
				type: "(node, index, event) => void",
				defaultValue: null,
				description:
					"Fires when a cell is clicked. Receives the underlying datum, index, and event.",
			},
			{
				name: "onMouseEnter",
				required: false,
				type: "(node, index, event) => void",
				defaultValue: null,
				description: "Fires when the pointer enters a cell.",
			},
			{
				name: "onMouseLeave",
				required: false,
				type: "(node, index, event) => void",
				defaultValue: null,
				description: "Fires when the pointer leaves a cell.",
			},
			{
				name: "children",
				required: false,
				type: "ReactNode",
				defaultValue: null,
				description:
					"Recharts subcomponents — typically `<ChartTooltip>` (paired with `<ChartTooltipContent>`) for hover tooltips.",
			},
		],
	},
};

/**
 * Component-level descriptions. Used by `<PropsTable>` when a component has
 * no explicit JSDoc but accepts only standard HTML attributes — instead of
 * the bland "takes no documented props" fallback, we explain *what the
 * component is for*.
 *
 * Keyed: `sourceId` (e.g. `organisms/sidebar`) → component displayName.
 */
export const COMPONENT_DESCRIPTIONS: Record<string, Record<string, string>> = {};

/** sourceId (e.g. `atoms/button`) → component displayName → prop name → override. */
export const PROP_OVERRIDES: Record<string, Record<string, PropsOverrideMap>> = {
	"charts/service-health-list": {
		ServiceHealthList: {
			items: {
				description:
					'Array of `{ name: string; status: "healthy" | "degraded" | "down"; meta?: ReactNode[] }`. `name` is the row label and React key, `status` drives the dot colour (and the pulse-+-glow halo on `"healthy"`), and `meta` is an optional list of right-aligned monospace cells (latency, uptime, region, etc.).',
			},
			caption: {
				description:
					"Optional caption rendered below the list — typically a short timestamp or context line (e.g. `Last 5 minutes`, `Updated 24s ago`).",
			},
		},
	},
	"charts/world-heat-map": {
		WorldHeatMap: {
			points: {
				description:
					"Array of `{ lat: number; lng: number; label: string; count: number }`. `lat`/`lng` place the marker, `label` shows in the tooltip (e.g. `Munich, DE`), and `count` drives the marker radius (log-scaled into `markerRadiusRange`). Pass `[]` to render the empty-state overlay.",
			},
			height: {
				description:
					'Container height. Numbers are interpreted as pixels; strings pass through (e.g. `"320px"`, `"50vh"`).',
				defaultValue: '"100%"',
			},
			center: {
				description:
					"Initial map centre as `[lat, lng]`. Defaults to a roughly equator-centred view.",
				defaultValue: "[20, 0]",
			},
			zoom: {
				description:
					"Initial Leaflet zoom level. `0` shows the whole world; `3` shows a continent; bump to ~5–7 for country-level views.",
				defaultValue: "3",
			},
			tileTheme: {
				description:
					'Basemap tile theme. `"auto"` follows canvas\'s `useTheme()`; force `"dark"` or `"light"` to lock the map regardless of app theme.',
				defaultValue: '"auto"',
			},
			showControls: {
				description:
					"Show Leaflet's built-in zoom + attribution controls. Off by default for a cleaner dashboard look.",
				defaultValue: "false",
			},
			markerColor: {
				description:
					"Marker fill — any CSS colour. Pass a canvas chart token like `hsl(var(--chart-1))` for theme-aware markers.",
				defaultValue: '"hsl(var(--chart-1))"',
			},
			markerRadiusRange: {
				description:
					"`[min, max]` marker radius in pixels. Marker sizes are log-scaled across this range based on each point's `count`, so wide value distributions still read well.",
				defaultValue: "[4, 20]",
			},
			onMarkerClick: {
				description:
					"Fires when a marker is clicked, with the underlying point datum. Use to drive a side panel or detail dialog.",
			},
			showLegend: {
				description: 'Show the "Fewer / More" gradient legend overlay in the bottom-left corner.',
				defaultValue: "true",
			},
			title: {
				description:
					"Optional title rendered as a small chip in the top-left corner. Useful when several maps stack on a dashboard.",
			},
			emptyState: {
				description:
					'Override the default empty-state node ("No geographic data available" card) shown when `points` is empty.',
			},
			className: {
				description: "Tailwind / CSS class names merged onto the outer `.world-heat-map` wrapper.",
			},
		},
	},
	"charts/stacked-bar": {
		StackedBar: {
			segments: {
				description:
					"Array of `{ label: string; value: number; colorVar?: string }`. `label` is shown in the legend and as a key, `value` is sized proportionally to its share of the total (raw counts or pre-computed percentages both work), and the optional `colorVar` overrides the segment fill (CSS variable name without the leading `--`, e.g. `chart-2`).",
			},
			defaultColorVar: {
				description:
					"Fallback CSS variable name for segments that omit `colorVar`. Pass without the leading `--` (e.g. `chart-1`, `stat-success`).",
				defaultValue: '"chart-1"',
			},
			height: {
				description: "Pixel height of the bar pill.",
				defaultValue: "10",
			},
			showLegend: {
				description:
					"Render the swatch legend below the bar. Disable for compact embedded layouts.",
				defaultValue: "true",
			},
			valueFormatter: {
				description:
					"Format each segment's value in the legend. Default appends `%` — use `(v) => v.toLocaleString()` for raw counts.",
				defaultValue: "(v) => `${v}%`",
			},
			caption: {
				description:
					"Optional caption rendered below the legend. Typically a short timestamp or context line (e.g. `Last 1 hour`).",
			},
		},
	},
	"molecules/action-bar": {
		ActionBar: {
			primaryAction: {
				description:
					"Required action button shown on the trailing side. Use for the most prominent confirm/save action.",
			},
			secondaryActions: {
				description:
					"Optional list of secondary actions (cancel, dismiss, etc.) shown alongside the primary action.",
			},
			align: {
				description: "Horizontal alignment of the action group. `start`, `center`, or `end`.",
				defaultValue: '"end"',
			},
		},
	},
	"molecules/alert": {
		Alert: {
			variant: {
				description:
					"`default` (informational), `destructive` (error/warning). Variant changes border, background, and text colour.",
				defaultValue: '"default"',
			},
		},
	},
	"molecules/breadcrumb": {
		Breadcrumb: {
			separator: {
				description:
					"Custom separator node rendered between items. Defaults to a chevron icon. Pass any ReactNode (icon, text, etc.).",
			},
		},
	},
	"molecules/code-block": {
		CodeBlock: {
			code: { description: "The code string to render inside the block." },
			language: {
				description:
					"Language hint for the syntax highlighter (e.g. `tsx`, `ts`, `bash`, `json`, `css`). Optional — falls back to plain text.",
			},
			showCopy: {
				description: "Show the trailing copy-to-clipboard button. Pass `false` to hide.",
				defaultValue: "true",
			},
		},
	},
	"molecules/empty-state": {
		EmptyState: {
			icon: {
				description:
					"Icon shown above the message. Typically a Lucide icon at 32–40px (e.g. `<Inbox size={36} />`).",
			},
			message: {
				description: "Headline string explaining why the surface is empty (e.g. `No results yet`).",
			},
			description: {
				description:
					"Optional supporting copy below the message — usually one short sentence on what to do next.",
			},
			action: {
				description:
					"Optional CTA button rendered under the description (e.g. `Create your first…`).",
			},
		},
	},
	"molecules/error-state": {
		ErrorState: {
			message: {
				description: "Headline error string shown to the user.",
			},
			onRetry: {
				description:
					"Click handler for the retry button. When omitted, the retry button is hidden.",
			},
			retryLabel: {
				description: "Custom label for the retry button.",
				defaultValue: '"Retry"',
			},
		},
	},
	"molecules/field-display": {
		FieldDisplay: {
			label: { description: "Label text shown above the value." },
			value: {
				description: "The value to display. ReactNode — strings, badges, links, anything.",
			},
			mono: {
				description:
					"Render the value in the monospace font (useful for IDs, hashes, JSON snippets).",
				defaultValue: "false",
			},
		},
	},
	"molecules/input-otp": {
		InputOTP: {
			maxLength: {
				description: "Total number of OTP slots / characters to accept.",
			},
			value: { description: "Controlled string of entered characters." },
			onChange: {
				description: "Fires on every keystroke with the current value as a string.",
			},
			textAlign: {
				description: "`left` or `center` (default) — caret alignment within each slot.",
				defaultValue: '"center"',
			},
			onComplete: {
				description: "Fires once the user has filled every slot. Receives the final string value.",
			},
			pushPasswordManagerStrategy: {
				description:
					"Hint for how aggressively to surface password-manager autofill. See `input-otp` docs for the full strategy options.",
			},
			pasteTransformer: {
				description:
					"Function that pre-processes pasted text before it is split into slots — e.g. to strip non-digits.",
			},
			containerClassName: {
				description:
					"Class name applied to the outer wrapper (the slot row). The standard `className` applies to the underlying input.",
			},
			noScriptCSSFallback: {
				description:
					"CSS string injected when JavaScript is disabled, so the input still renders something. Pass `null` to opt out.",
			},
		},
		InputOTPSlot: {
			index: {
				description:
					"Zero-based slot position. Required so the slot can pick up the right character from the parent value.",
			},
		},
	},
	"molecules/loading-state": {
		LoadingState: {
			message: {
				description: "Optional caption shown beneath the spinner.",
				defaultValue: '"Loading…"',
			},
			size: {
				description: "`sm`, `md`, or `lg` — controls spinner diameter and overall padding.",
				defaultValue: '"md"',
			},
		},
	},
	"molecules/page-header": {
		PageHeader: {
			title: { description: "Page title — rendered as an `<h1>`." },
			subtitle: { description: "Optional one-line subtitle below the title." },
			icon: {
				description: "Icon rendered to the left of the title (typically a Lucide icon at 24–28px).",
			},
			actions: {
				description:
					"Action buttons rendered on the trailing side of the header (e.g. `New`, `Filter`).",
			},
			breadcrumbs: {
				description: "Optional `<Breadcrumb>` rendered above the title.",
			},
		},
	},
	"molecules/page-tabs": {
		PageTabs: {
			tabs: {
				description:
					"Array of tab descriptors. Each item has at minimum `{ value, label }` and optionally an `icon` and `disabled`.",
			},
			value: { description: "Currently active tab's `value` (controlled)." },
			onChange: { description: "Fires with the new active tab's `value`." },
			variant: {
				description:
					"`default` is the standard underlined tab row; alternate variants change emphasis. See examples for the full set.",
				defaultValue: '"default"',
			},
		},
	},
	"molecules/pagination": {
		PaginationLink: {
			isActive: {
				description:
					'Mark this link as the current page (highlighted styling, `aria-current="page"`).',
				defaultValue: "false",
			},
			size: {
				description:
					"Height/padding preset, mirrors `Button`'s sizes (`sm`, `default`, `lg`, `icon`).",
				defaultValue: '"icon"',
			},
		},
		PaginationNext: {
			isActive: {
				description: "Mark as current page (rare for next, but supported).",
				defaultValue: "false",
			},
			size: {
				description: "Height/padding preset, mirrors `Button`'s sizes.",
				defaultValue: '"default"',
			},
		},
		PaginationPrevious: {
			isActive: {
				description: "Mark as current page (rare for previous, but supported).",
				defaultValue: "false",
			},
			size: {
				description: "Height/padding preset, mirrors `Button`'s sizes.",
				defaultValue: '"default"',
			},
		},
	},
	"molecules/phone-input": {
		PhoneInput: {
			id: {
				description:
					"DOM id forwarded to the underlying `<input>`. Required for a11y label binding.",
			},
			value: { description: "Controlled E.164-formatted phone string (e.g. `+15551234567`)." },
			onChange: {
				description:
					"Fires with the next E.164 string. Receives `undefined` while the input is partial.",
			},
			label: { description: "Visible label rendered above the input." },
			placeholder: { description: "Placeholder text inside the input when empty." },
			disabled: {
				description: "Disable the input + country selector.",
				defaultValue: "false",
			},
			readonly: {
				description: "Render as read-only — focusable but not editable.",
				defaultValue: "false",
			},
			required: {
				description: "Mark as required for native form validation + screen-reader hints.",
				defaultValue: "false",
			},
		},
	},
	"molecules/search-bar": {
		SearchBar: {
			value: { description: "Controlled query string." },
			onChange: { description: "Fires on every keystroke with the new query string." },
			onClear: {
				description:
					"Fires when the user clicks the trailing clear (×) button. When omitted, the clear button is hidden.",
			},
		},
	},
	"molecules/secret-field": {
		SecretField: {
			id: {
				description:
					"DOM id forwarded to the underlying `<input>`. Required for a11y label binding.",
			},
			value: { description: "Controlled secret string (e.g. API token, password)." },
			onChange: {
				description: "Fires with the next value as a string.",
			},
			placeholder: { description: "Placeholder text inside the input when empty." },
			label: { description: "Visible label rendered above the input." },
			disabled: {
				description: "Disable the input + reveal toggle.",
				defaultValue: "false",
			},
		},
	},
	"molecules/section-card": {
		SectionCard: {
			title: { description: "Card title rendered in the header." },
			subtitle: { description: "Optional one-line subtitle below the title." },
			headerActions: {
				description:
					"Trailing action node in the header — typically a `<Button>` group or icon-only action.",
			},
			loading: {
				description: "When true, swap the body for a `<LoadingState>`.",
				defaultValue: "false",
			},
			error: {
				description: "When set, swap the body for an `<ErrorState>` with this message.",
			},
			emptyMessage: {
				description:
					"When set and there are no children, swap the body for an `<EmptyState>` with this message.",
			},
			padding: {
				description: "Inner padding around the body. `none`, `sm`, `md` (default), `lg`.",
				defaultValue: '"md"',
			},
		},
	},
	"molecules/stat-card": {
		StatCard: {
			title: { description: "Stat label (e.g. `Active users`)." },
			value: {
				description:
					"The headline value — usually a number or short string. Rendered in display-size type.",
			},
			icon: { description: "Optional Lucide icon rendered in the header corner." },
			colorVariant: {
				description:
					"Colour treatment for the icon + value emphasis. `default`, `success`, `warning`, `destructive`, `info`.",
				defaultValue: '"default"',
			},
		},
	},
	"molecules/status-badge": {
		StatusBadge: {
			dot: {
				description: "Render a leading status dot. When false, the badge is text-only.",
				defaultValue: "true",
			},
			status: {
				description:
					"Semantic status driving colour + dot. `success`, `warning`, `error`, `info`, `neutral`, `pending`.",
				defaultValue: '"neutral"',
			},
		},
	},
	"molecules/stepper": {
		Stepper: {
			steps: {
				description:
					"Ordered array of step descriptors. Each item has `{ id, label, status }` where status is `complete`, `current`, or `upcoming`.",
			},
			orientation: {
				description: "`horizontal` (default) for top-of-page steppers, `vertical` for sidebars.",
				defaultValue: '"horizontal"',
			},
			onStepClick: {
				description: "Fires with the clicked step's `id`. Omit to make steps non-interactive.",
			},
		},
	},
	"molecules/toggle-group": {
		ToggleGroup: {
			variant: {
				description: "`default` (filled when on) or `outline` (bordered).",
				defaultValue: '"default"',
			},
			size: {
				description: "`sm`, `default`, or `lg` — applies to every child item.",
				defaultValue: '"default"',
			},
		},
		ToggleGroupItem: {
			variant: {
				description: "Override the parent group's variant for this single item.",
			},
			size: {
				description: "Override the parent group's size for this single item.",
			},
		},
	},
	"organisms/carousel": {
		Carousel: {
			opts: {
				description:
					"Embla Carousel options object — `align`, `loop`, `dragFree`, etc. See Embla docs for the full surface.",
			},
			plugins: {
				description: "Array of Embla plugin instances (autoplay, wheel-gestures, etc.).",
			},
			orientation: {
				description: "`horizontal` (default) or `vertical` scroll axis.",
				defaultValue: '"horizontal"',
			},
			setApi: {
				description:
					"Receives the Embla API instance once it mounts — use it for programmatic control.",
			},
		},
		CarouselNext: {
			variant: {
				description: "Mirrors `Button` variants. Defaults to outline.",
				defaultValue: '"outline"',
			},
			size: {
				description: "Mirrors `Button` sizes. Defaults to icon.",
				defaultValue: '"icon"',
			},
		},
		CarouselPrevious: {
			variant: {
				description: "Mirrors `Button` variants. Defaults to outline.",
				defaultValue: '"outline"',
			},
			size: {
				description: "Mirrors `Button` sizes. Defaults to icon.",
				defaultValue: '"icon"',
			},
		},
	},
	"organisms/chart": {
		Chart: {
			config: {
				description:
					"Map of series-key → `{ label, color | theme, icon? }`. Drives the legend, tooltip, and CSS variables that colour each series.",
			},
		},
		ChartLegend: {
			hideIcon: {
				description: "Hide the colour swatches in front of each series label.",
				defaultValue: "false",
			},
			nameKey: {
				description:
					"Key on each datum that holds the series identifier. Use when the legend should label by a property other than the default series key.",
			},
		},
		ChartStyle: {
			id: {
				description: "Stable id used to scope the generated CSS variables to this chart instance.",
			},
			config: {
				description: "The same `ChartConfig` passed to `<Chart>`.",
			},
		},
		ChartTooltip: {
			nameKey: {
				description: "Key on each datum that holds the series identifier (defaults to `name`).",
			},
			hideLabel: {
				description: "Hide the heading label of the tooltip.",
				defaultValue: "false",
			},
			hideIndicator: {
				description: "Hide the colour indicator next to each series row.",
				defaultValue: "false",
			},
			indicator: {
				description: "Indicator shape. `line`, `dot`, or `dashed`.",
				defaultValue: '"dot"',
			},
			labelKey: {
				description: "Key on each datum to use for the tooltip's heading label.",
			},
		},
	},
	"organisms/editors/code-editor": {
		CodeEditor: {
			value: { description: "Source code as a string. Controlled." },
			onChange: { description: "Fires with the next source string on every doc change." },
			language: {
				description:
					"Highlighter to apply. One of `javascript` / `typescript` / `json` / `markdown` / `html` / `css`.",
			},
			placeholder: { description: "Placeholder text shown when the document is empty." },
			disabled: {
				description: "Block input + apply 50% opacity. Editor still selectable.",
				defaultValue: "false",
			},
			readonly: {
				description: "Block edits but keep selection / copy enabled.",
				defaultValue: "false",
			},
			ariaLabel: {
				description: "Accessibility label describing what the editor edits. Required.",
			},
			lineNumbers: {
				description: "Render the gutter with line numbers.",
				defaultValue: "true",
			},
			height: {
				description: "Pixel height (number) or any CSS length string for the editing surface.",
				defaultValue: "240",
			},
			extensions: {
				description: "Extra CodeMirror extensions appended after the canvas defaults.",
			},
		},
	},
	"organisms/editors/markdown-editor": {
		MarkdownEditor: {
			value: { description: "Markdown source string. Controlled." },
			onChange: { description: "Fires with the next markdown string on every doc change." },
			placeholder: { description: "Placeholder text shown when empty." },
			disabled: {
				description: "Block input + apply 50% opacity.",
				defaultValue: "false",
			},
			readonly: {
				description: "Block edits but keep selection enabled.",
				defaultValue: "false",
			},
			ariaLabel: { description: "Accessibility label for the editor. Required." },
			toolbar: {
				description: "Show the formatting toolbar above the editor.",
				defaultValue: "true",
			},
			preview: {
				description:
					"Render a side-by-side preview pane with sanitized markdown (via marked + DOMPurify).",
				defaultValue: "false",
			},
			height: {
				description: "Pixel height (number) or any CSS length string.",
				defaultValue: "240",
			},
		},
	},
	"organisms/editors/rich-text-editor": {
		RichTextEditor: {
			value: {
				description:
					'Editor content as an HTML string by default, or as a JSON string when `outputFormat="json"`. Controlled.',
			},
			onChange: { description: "Fires on every doc update with the next serialized value." },
			placeholder: { description: "Placeholder text shown when the document is empty." },
			disabled: {
				description: "Block input + apply 50% opacity.",
				defaultValue: "false",
			},
			readonly: {
				description: "Block edits but keep text selectable.",
				defaultValue: "false",
			},
			ariaLabel: { description: "Accessibility label for the editor. Required." },
			toolbar: {
				description: "Show the formatting toolbar.",
				defaultValue: "true",
			},
			toolbarItems: {
				description:
					"Whitelist of toolbar item ids to render. Defaults to every item in `TOOLBAR_ITEM_IDS`.",
			},
			outputFormat: {
				description:
					'Format `value` / `onChange` use. `"html"` (default) returns serialized HTML; `"json"` returns ProseMirror JSON serialized to a string.',
				defaultValue: '"html"',
			},
			height: {
				description: "Pixel height (number) or any CSS length string.",
				defaultValue: "240",
			},
			extensions: {
				description: "Extra Tiptap extensions appended after StarterKit + Link + Placeholder.",
			},
		},
	},
	"organisms/data-table": {
		DataTable: {
			columns: {
				description:
					"Column descriptors. Each one is `{ key, header, accessor?, render?, className? }`. `accessor` is a string path; `render` is a custom cell renderer.",
			},
			data: { description: "Array of row records. Required." },
			emptyMessage: {
				description: "Message shown when `data` is empty.",
				defaultValue: '"No results."',
			},
			pageSize: {
				description:
					"Rows per page when `pagination` is true. Use `pageSizeOptions` to surface a picker.",
				defaultValue: "10",
			},
			loading: {
				description: "Show a loading state instead of rows.",
				defaultValue: "false",
			},
			searchable: {
				description: "Show a search input above the table.",
				defaultValue: "false",
			},
			searchKey: {
				description:
					"When uncontrolled, the field on each row that the built-in search filter matches against.",
			},
			searchValue: {
				description: "Controlled search query.",
			},
			onSearchChange: {
				description: "Fires on every keystroke when search is controlled.",
			},
			searchPlaceholder: {
				description: "Placeholder shown inside the search input.",
				defaultValue: '"Search…"',
			},
			onRowClick: {
				description: "Fires with the row record when the user clicks a row.",
			},
			onRefresh: {
				description: "Fires when the refresh button is clicked. Omit to hide the button.",
			},
			onAdd: {
				description: "Fires when the `+ Add` button is clicked. Omit to hide the button.",
			},
			addButtonText: {
				description: "Label for the add button.",
				defaultValue: '"Add"',
			},
			selectable: {
				description: "Render row checkboxes for multi-select.",
				defaultValue: "false",
			},
			selectedKeys: {
				description: "Controlled set of selected row ids (must be unique per row).",
			},
			onSelectionChange: {
				description: "Fires with the next set of selected ids whenever selection changes.",
			},
			pagination: {
				description: "Show the bottom pagination bar.",
				defaultValue: "false",
			},
			pageSizeOptions: {
				description: "Page-size options shown in the dropdown picker.",
				defaultValue: "[10, 25, 50, 100]",
			},
		},
	},
	"organisms/drawer": {
		Drawer: {
			activeSnapPoint: {
				description: "Currently-active snap point identifier (controlled).",
			},
			setActiveSnapPoint: {
				description: "Setter for the controlled `activeSnapPoint`.",
			},
			open: { description: "Controlled open/closed state." },
			onOpenChange: {
				description: "Fires with the next open state when the user opens or dismisses.",
			},
			shouldScaleBackground: {
				description: "Apply the iOS-style background scale-down while the drawer is open.",
				defaultValue: "true",
			},
			onDrag: { description: "Fires while the user is dragging the drawer." },
			onRelease: { description: "Fires when the drag gesture ends." },
			nested: {
				description:
					"Mark this drawer as nested inside another drawer to coordinate stacking and dismiss order.",
				defaultValue: "false",
			},
			onClose: { description: "Fires after the drawer finishes closing." },
			container: { description: "Optional DOM node to portal the drawer into." },
			preventScrollRestoration: {
				description: "Skip the auto scroll-restoration when the drawer closes.",
				defaultValue: "false",
			},
			autoFocus: {
				description: "Auto-focus the first focusable element inside the drawer when it opens.",
				defaultValue: "true",
			},
		},
	},
	"organisms/form": {
		FormField: {
			name: {
				description:
					"Form field path (`react-hook-form` style — supports dotted paths for nested values).",
			},
			rules: {
				description: "Validation rules object passed straight to `react-hook-form`.",
			},
			shouldUnregister: {
				description: "Unregister the field when it unmounts.",
				defaultValue: "false",
			},
			defaultValue: {
				description: "Initial value if the field is not in `defaultValues`.",
			},
			control: {
				description:
					"Form `control` instance from `useForm()`. When omitted, picked up from context.",
			},
			disabled: {
				description: "Disable the field and exempt it from validation.",
				defaultValue: "false",
			},
			exact: {
				description: "Subscribe to this exact field path only — skip parent/child watch updates.",
				defaultValue: "false",
			},
		},
	},
	"organisms/menubar": {
		MenubarMenu: {
			__scopeMenubar: {
				description: "Internal Radix scoping prop — leave unset.",
			},
		},
	},
	"organisms/navbar": {
		NavBar: {
			logo: {
				description:
					"Brand-mark node rendered on the leading edge — typically `<OlympusLogo>` or a `<Link>`.",
			},
			links: {
				description:
					"Array of `{ href, label }` (and optional `active`) items rendered as the central nav.",
			},
			actions: {
				description: "Trailing action nodes — sign-in buttons, theme toggles, profile menu.",
			},
			sticky: {
				description: "Pin the bar to the top of the viewport while scrolling.",
				defaultValue: "false",
			},
		},
	},
	"organisms/resizable": {
		ResizableHandle: {
			withHandle: {
				description:
					"Render a visible grip indicator on the handle (off by default for a clean look).",
				defaultValue: "false",
			},
		},
	},
	"organisms/select": {
		Select: {
			value: { description: "Controlled selected option value." },
			defaultValue: { description: "Initial selected value when uncontrolled." },
			onValueChange: {
				description: "Fires with the new selected value when the user picks an option.",
			},
		},
	},
	"organisms/sheet": {
		SheetContent: {
			side: {
				description:
					"Which edge the sheet slides in from. `top`, `right` (default), `bottom`, or `left`.",
				defaultValue: '"right"',
			},
		},
	},
	"organisms/theme-provider": {
		ThemeProvider: {
			defaultTheme: {
				description:
					"Initial theme when none is persisted in localStorage. `light`, `dark`, or `system`.",
				defaultValue: '"system"',
			},
		},
	},
};
