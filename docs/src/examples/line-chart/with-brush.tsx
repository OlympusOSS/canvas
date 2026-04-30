import {
	Brush,
	CartesianGrid,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	Line,
	LineChart,
	XAxis,
	YAxis,
} from "@olympusoss/canvas";

const data = Array.from({ length: 60 }, (_, i) => ({
	day: i + 1,
	value: 50 + Math.round(Math.sin(i / 5) * 18 + Math.random() * 12),
}));

export default function App() {
	return (
		<div className="w-full max-w-2xl p-4">
			<ChartContainer config={{}} className="h-[320px]">
				<LineChart data={data}>
					<CartesianGrid />
					<XAxis dataKey="day" />
					<YAxis />
					<ChartTooltip content={<ChartTooltipContent />} />
					<Line dataKey="value" />
					<Brush dataKey="day" height={28} stroke="hsl(var(--brand))" travellerWidth={8} />
				</LineChart>
			</ChartContainer>
		</div>
	);
}
