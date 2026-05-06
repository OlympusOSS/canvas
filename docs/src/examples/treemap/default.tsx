import { ChartContainer, ChartTooltip, ChartTooltipContent, Treemap } from "@olympusoss/canvas";

const data = [
	{ name: "Frontend", size: 1640, fill: "hsl(var(--chart-1))" },
	{ name: "Backend", size: 1320, fill: "hsl(var(--chart-2))" },
	{ name: "Data", size: 980, fill: "hsl(var(--chart-3))" },
	{ name: "Mobile", size: 720, fill: "hsl(var(--chart-4))" },
	{ name: "DevOps", size: 540, fill: "hsl(var(--chart-5))" },
	{ name: "QA", size: 380, fill: "hsl(var(--chart-1))" },
	{ name: "Design", size: 280, fill: "hsl(var(--chart-2))" },
];

interface CellProps {
	x?: number;
	y?: number;
	width?: number;
	height?: number;
	name?: string;
	fill?: string;
	size?: number;
}

function TreemapCell(props: CellProps) {
	const { x = 0, y = 0, width = 0, height = 0, name, fill, size } = props;
	const showLabel = width > 60 && height > 32;
	const showValue = width > 90 && height > 56;
	return (
		<g>
			<rect x={x} y={y} width={width} height={height} fill={fill} stroke="transparent" />
			{showLabel && (
				<text
					x={x + 12}
					y={y + 22}
					fill="hsl(0 0% 100% / 0.96)"
					fontSize={13}
					fontWeight={600}
					style={{
						filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.35))",
						pointerEvents: "none",
					}}
				>
					{name}
				</text>
			)}
			{showValue && (
				<text
					x={x + 12}
					y={y + 40}
					fill="hsl(0 0% 100% / 0.7)"
					fontSize={11}
					fontWeight={500}
					style={{
						filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.35))",
						pointerEvents: "none",
					}}
				>
					{size?.toLocaleString()}
				</text>
			)}
		</g>
	);
}

export default function App() {
	return (
		<div className="w-full max-w-2xl p-4">
			<ChartContainer config={{}} className="h-[300px]">
				<Treemap
					data={data}
					dataKey="size"
					nameKey="name"
					stroke="transparent"
					content={<TreemapCell />}
				>
					<ChartTooltip content={<ChartTooltipContent hideLabel />} />
				</Treemap>
			</ChartContainer>
		</div>
	);
}
