import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	Pie,
	PieChart,
} from "@olympusoss/canvas";

const data = [
	{ name: "Free", users: 540 },
	{ name: "Pro", users: 280 },
	{ name: "Team", users: 110 },
	{ name: "Enterprise", users: 38 },
];

export default function App() {
	return (
		<div className="w-full max-w-md p-4">
			<ChartContainer config={{}} className="h-[280px]">
				<PieChart>
					<ChartTooltip content={<ChartTooltipContent hideLabel />} />
					<Pie data={data} dataKey="users" nameKey="name" outerRadius={100} />
				</PieChart>
			</ChartContainer>
		</div>
	);
}
