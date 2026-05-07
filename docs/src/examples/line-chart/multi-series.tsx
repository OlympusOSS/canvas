import {
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

import { axisProps } from "./_shared";

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
				<LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
					<XAxis dataKey="month" {...axisProps} />
					<YAxis {...axisProps} width={40} />
					<ChartTooltip content={<ChartTooltipContent />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Line dataKey="desktop" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={{ r: 3 }} />
					<Line dataKey="mobile" stroke="hsl(var(--chart-4))" strokeWidth={2} dot={{ r: 3 }} />
					<Line dataKey="tablet" stroke="hsl(var(--chart-5))" strokeWidth={2} dot={{ r: 3 }} />
				</LineChart>
			</ChartContainer>
		</div>
	);
}
