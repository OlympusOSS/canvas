import {
	Button,
	Icon,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="outline" size="icon" aria-label="Help">
							<Icon name="CircleQuestionMark" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>How does this work?</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
}
