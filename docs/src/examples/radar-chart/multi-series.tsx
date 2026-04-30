import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	PolarAngleAxis,
	PolarGrid,
	Radar,
	RadarChart,
} from "@olympusoss/canvas";

const data = [
	{ skill: "Speed", you: 78, peer: 64 },
	{ skill: "Power", you: 84, peer: 72 },
	{ skill: "Stamina", you: 62, peer: 80 },
	{ skill: "Accuracy", you: 91, peer: 70 },
	{ skill: "Defense", you: 73, peer: 68 },
	{ skill: "Recovery", you: 68, peer: 62 },
];

export default function App() {
	return (
		<div className="w-full max-w-md p-4">
			<ChartContainer config={{}} className="h-[300px]">
				<RadarChart data={data}>
					<PolarGrid />
					<PolarAngleAxis dataKey="skill" />
					<ChartTooltip content={<ChartTooltipContent />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Radar dataKey="you" />
					<Radar dataKey="peer" />
				</RadarChart>
			</ChartContainer>
		</div>
	);
}
