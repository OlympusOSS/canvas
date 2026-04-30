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
			<Collapsible className="w-72 space-y-2">
				<div className="flex items-center justify-between">
					<h4 className="text-sm font-semibold text-foreground">Advanced settings</h4>
					<CollapsibleTrigger asChild>
						<Button variant="ghost" size="icon" aria-label="Toggle">
							<Icon name="ChevronsUpDown" />
						</Button>
					</CollapsibleTrigger>
				</div>
				<CollapsibleContent className="space-y-2 rounded-md border border-border p-3 text-sm text-muted-foreground">
					<p>· Custom domain</p>
					<p>· SSO provider</p>
					<p>· Audit log retention</p>
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
}
