import {
	Area,
	AreaChart,
	CartesianGrid,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	XAxis,
	YAxis,
} from "@olympusoss/canvas";

const data = [
	{ month: "Jan", users: 1200 },
	{ month: "Feb", users: 1400 },
	{ month: "Mar", users: 1850 },
	{ month: "Apr", users: 2100 },
	{ month: "May", users: 2480 },
	{ month: "Jun", users: 2950 },
];

export default function App() {
	return (
		<div className="w-full max-w-2xl p-4">
			<ChartContainer config={{}} className="h-[260px]">
				<AreaChart data={data}>
					<CartesianGrid />
					<XAxis dataKey="month" />
					<YAxis />
					<ChartTooltip content={<ChartTooltipContent />} />
					<Area dataKey="users" />
				</AreaChart>
			</ChartContainer>
		</div>
	);
}
