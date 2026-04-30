import {
	Bar,
	BarChart,
	CartesianGrid,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	XAxis,
	YAxis,
} from "@olympusoss/canvas";

const data = [
	{ team: "Phoenix", points: 24 },
	{ team: "Hydra", points: 31 },
	{ team: "Atlas", points: 18 },
	{ team: "Argo", points: 27 },
	{ team: "Olympus", points: 35 },
];

export default function App() {
	return (
		<div className="w-full max-w-2xl p-4">
			<ChartContainer config={{}} className="h-[260px]">
				<BarChart data={data}>
					<CartesianGrid />
					<XAxis dataKey="team" />
					<YAxis />
					<ChartTooltip content={<ChartTooltipContent />} />
					<Bar dataKey="points" />
				</BarChart>
			</ChartContainer>
		</div>
	);
}
