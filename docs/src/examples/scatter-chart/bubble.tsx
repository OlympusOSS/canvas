import {
	CartesianGrid,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	Scatter,
	ScatterChart,
	XAxis,
	YAxis,
	ZAxis,
} from "@olympusoss/canvas";

const data = [
	{ revenue: 12, retention: 62, customers: 80 },
	{ revenue: 18, retention: 71, customers: 140 },
	{ revenue: 24, retention: 78, customers: 220 },
	{ revenue: 32, retention: 81, customers: 360 },
	{ revenue: 41, retention: 86, customers: 520 },
	{ revenue: 48, retention: 90, customers: 760 },
];

export default function App() {
	return (
		<div className="w-full max-w-2xl p-4">
			<ChartContainer config={{}} className="h-[300px]">
				<ScatterChart>
					<CartesianGrid />
					<XAxis type="number" dataKey="revenue" name="Revenue" unit="K" />
					<YAxis type="number" dataKey="retention" name="Retention" unit="%" domain={[40, 100]} />
					<ZAxis type="number" dataKey="customers" range={[60, 600]} name="Customers" />
					<ChartTooltip content={<ChartTooltipContent />} cursor={{ strokeDasharray: "3 3" }} />
					<Scatter data={data} />
				</ScatterChart>
			</ChartContainer>
		</div>
	);
}
