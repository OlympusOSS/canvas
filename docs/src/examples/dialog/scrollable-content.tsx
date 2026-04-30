import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	ScrollArea,
} from "@olympusoss/canvas";

const PARAGRAPHS = Array.from({ length: 12 }, (_, i) => i + 1);

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="outline">View terms</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Terms of service</DialogTitle>
						<DialogDescription>Long content with a scroll area.</DialogDescription>
					</DialogHeader>
					<ScrollArea className="h-64 rounded-md border border-border p-3">
						<div className="space-y-3 text-sm text-muted-foreground">
							{PARAGRAPHS.map((n) => (
								<p key={n}>
									§{n}. This is paragraph number {n} of the terms of service. Scroll to read more.
								</p>
							))}
						</div>
					</ScrollArea>
				</DialogContent>
			</Dialog>
		</div>
	);
}
