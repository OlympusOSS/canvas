import {
	CartesianGrid,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	Line,
	LineChart,
	XAxis,
	YAxis,
} from "@olympusoss/canvas";

const data = Array.from({ length: 30 }, (_, i) => {
	const d = new Date(2026, 3, i + 1);
	return {
		date: d.toISOString().slice(0, 10),
		latency: 80 + Math.round(Math.sin(i / 3) * 20 + Math.random() * 12),
	};
});

const formatDay = (iso: string) => iso.slice(5).replace("-", "/");

export default function App() {
	return (
		<div className="w-full max-w-2xl p-4">
			<ChartContainer config={{}} className="h-[280px]">
				<LineChart data={data}>
					<CartesianGrid />
					<XAxis dataKey="date" tickFormatter={formatDay} interval={4} />
					<YAxis unit="ms" />
					<ChartTooltip content={<ChartTooltipContent />} />
					<Line dataKey="latency" />
				</LineChart>
			</ChartContainer>
		</div>
	);
}
