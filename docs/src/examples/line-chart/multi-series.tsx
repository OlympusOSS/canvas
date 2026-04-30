import {
	CartesianGrid,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	Line,
	LineChart,
	XAxis,
	YAxis,
} from "@olympusoss/canvas";

const data = [
	{ month: "Jan", desktop: 120, mobile: 80, tablet: 30 },
	{ month: "Feb", desktop: 150, mobile: 110, tablet: 40 },
	{ month: "Mar", desktop: 180, mobile: 140, tablet: 50 },
	{ month: "Apr", desktop: 210, mobile: 160, tablet: 55 },
	{ month: "May", desktop: 240, mobile: 200, tablet: 70 },
	{ month: "Jun", desktop: 280, mobile: 230, tablet: 85 },
];

export default function App() {
	return (
		<div className="w-full max-w-2xl p-4">
			<ChartContainer config={{}} className="h-[280px]">
				<LineChart data={data}>
					<CartesianGrid />
					<XAxis dataKey="month" />
					<YAxis />
					<ChartTooltip content={<ChartTooltipContent />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Line dataKey="desktop" />
					<Line dataKey="mobile" />
					<Line dataKey="tablet" />
				</LineChart>
			</ChartContainer>
		</div>
	);
}
