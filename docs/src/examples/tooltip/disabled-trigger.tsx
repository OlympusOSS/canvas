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
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<span role="button" tabIndex={0}>
							<Button disabled className="pointer-events-none">
								Disabled action
							</Button>
						</span>
					</TooltipTrigger>
					<TooltipContent>You don't have permission to perform this action.</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
}
