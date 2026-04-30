import {
	Bar,
	BarChart,
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
	{ quarter: "Q1", web: 32, mobile: 24, api: 18 },
	{ quarter: "Q2", web: 41, mobile: 31, api: 26 },
	{ quarter: "Q3", web: 38, mobile: 36, api: 22 },
	{ quarter: "Q4", web: 49, mobile: 44, api: 31 },
];

export default function App() {
	return (
		<div className="w-full max-w-2xl p-4">
			<ChartContainer config={{}} className="h-[280px]">
				<BarChart data={data}>
					<CartesianGrid />
					<XAxis dataKey="quarter" />
					<YAxis />
					<ChartTooltip content={<ChartTooltipContent />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Bar dataKey="web" />
					<Bar dataKey="mobile" />
					<Bar dataKey="api" />
				</BarChart>
			</ChartContainer>
		</div>
	);
}
