import { ScrollArea } from "@olympusoss/canvas";

const TAGS = Array.from({ length: 30 }, (_, i) => `Tag ${i + 1}`);

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<ScrollArea className="h-48 w-64 rounded-md border border-border p-3">
				<div className="space-y-2">
					{TAGS.map((tag) => (
						<div key={tag} className="text-sm text-foreground">
							{tag}
						</div>
					))}
				</div>
			</ScrollArea>
		</div>
	);
}
