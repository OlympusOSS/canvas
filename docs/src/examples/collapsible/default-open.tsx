import {
	Button,
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	Icon,
} from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Collapsible defaultOpen className="w-72 space-y-2">
				<div className="flex items-center justify-between">
					<h4 className="text-sm font-semibold text-foreground">Read me first</h4>
					<CollapsibleTrigger asChild>
						<Button variant="ghost" size="icon">
							<Icon name="ChevronsUpDown" />
						</Button>
					</CollapsibleTrigger>
				</div>
				<CollapsibleContent className="rounded-md border border-border p-3 text-sm text-muted-foreground">
					This collapsible opens by default via the `defaultOpen` prop.
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
}
