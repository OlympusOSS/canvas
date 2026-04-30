import { Separator } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="space-y-6">
				<div>
					<p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
						Horizontal
					</p>
					<div className="space-y-2">
						<div className="text-sm">Section A</div>
						<Separator />
						<div className="text-sm">Section B</div>
					</div>
				</div>
				<div>
					<p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
						Vertical
					</p>
					<div className="flex h-10 items-center gap-4 text-sm">
						<span>Item 1</span>
						<Separator orientation="vertical" />
						<span>Item 2</span>
						<Separator orientation="vertical" />
						<span>Item 3</span>
					</div>
				</div>
			</div>
		</div>
	);
}
