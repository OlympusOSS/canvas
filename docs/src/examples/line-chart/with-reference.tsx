import {
	CartesianGrid,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	Line,
	LineChart,
	ReferenceLine,
	XAxis,
	YAxis,
} from "@olympusoss/canvas";

const data = [
	{ day: "Mon", load: 42 },
	{ day: "Tue", load: 58 },
	{ day: "Wed", load: 71 },
	{ day: "Thu", load: 86 },
	{ day: "Fri", load: 95 },
	{ day: "Sat", load: 64 },
	{ day: "Sun", load: 39 },
];

export default function App() {
	return (
		<div className="w-full max-w-2xl p-4">
			<ChartContainer config={{}} className="h-[280px]">
				<LineChart data={data}>
					<CartesianGrid />
					<XAxis dataKey="day" />
					<YAxis />
					<ReferenceLine y={80} label="SLO threshold" />
					<ChartTooltip content={<ChartTooltipContent />} />
					<Line dataKey="load" />
				</LineChart>
			</ChartContainer>
		</div>
	);
}
