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
	{ month: "Jan", users: 120 },
	{ month: "Feb", users: 180 },
	{ month: "Mar", users: 240 },
	{ month: "Apr", users: 310 },
	{ month: "May", users: 420 },
	{ month: "Jun", users: 540 },
];

export default function App() {
	return (
		<div className="w-full max-w-2xl p-4">
			<ChartContainer config={{}} className="h-[280px]">
				<AreaChart data={data}>
					<defs>
						<linearGradient id="usersFill" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.6} />
							<stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.05} />
						</linearGradient>
					</defs>
					<CartesianGrid />
					<XAxis dataKey="month" />
					<YAxis />
					<ChartTooltip content={<ChartTooltipContent />} />
					<Area
						dataKey="users"
						stroke="hsl(var(--chart-1))"
						fill="url(#usersFill)"
						type="monotone"
					/>
				</AreaChart>
			</ChartContainer>
		</div>
	);
}
