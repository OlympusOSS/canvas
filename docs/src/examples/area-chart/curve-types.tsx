import {
	Area,
	AreaChart,
	CartesianGrid,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	XAxis,
	YAxis,
} from "@olympusoss/canvas";

const data = [
	{ x: 1, linear: 12, monotone: 12, step: 12 },
	{ x: 2, linear: 28, monotone: 28, step: 28 },
	{ x: 3, linear: 22, monotone: 22, step: 22 },
	{ x: 4, linear: 41, monotone: 41, step: 41 },
	{ x: 5, linear: 33, monotone: 33, step: 33 },
	{ x: 6, linear: 49, monotone: 49, step: 49 },
];

export default function App() {
	return (
		<div className="w-full max-w-2xl p-4">
			<ChartContainer config={{}} className="h-[280px]">
				<AreaChart data={data}>
					<CartesianGrid />
					<XAxis dataKey="x" />
					<YAxis />
					<ChartTooltip content={<ChartTooltipContent />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Area type="linear" dataKey="linear" stackId="a" />
					<Area type="monotone" dataKey="monotone" stackId="b" />
					<Area type="step" dataKey="step" stackId="c" />
				</AreaChart>
			</ChartContainer>
		</div>
	);
}
