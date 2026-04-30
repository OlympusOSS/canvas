import {
	Button,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@olympusoss/canvas";

const sides = ["top", "right", "bottom", "left"] as const;

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<TooltipProvider>
				<div className="grid grid-cols-2 gap-6 p-12">
					{sides.map((side) => (
						<Tooltip key={side} open>
							<TooltipTrigger asChild>
								<Button variant="outline">{side}</Button>
							</TooltipTrigger>
							<TooltipContent side={side}>Tooltip on {side}</TooltipContent>
						</Tooltip>
					))}
				</div>
			</TooltipProvider>
		</div>
	);
}
