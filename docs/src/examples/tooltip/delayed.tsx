import {
	Button,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<TooltipProvider delayDuration={800}>
				<div className="flex gap-3">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="outline">Default delay</Button>
						</TooltipTrigger>
						<TooltipContent>Provider delay = 800ms</TooltipContent>
					</Tooltip>
					<Tooltip delayDuration={0}>
						<TooltipTrigger asChild>
							<Button variant="outline">Instant</Button>
						</TooltipTrigger>
						<TooltipContent>Override = 0ms</TooltipContent>
					</Tooltip>
				</div>
			</TooltipProvider>
		</div>
	);
}
