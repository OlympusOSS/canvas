import { Separator } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="space-y-3">
				<div>
					<h4 className="text-sm font-semibold text-foreground">Canvas</h4>
					<p className="text-xs text-muted-foreground">An open-source design system.</p>
				</div>
				<Separator />
				<div className="flex gap-3 text-xs text-muted-foreground">
					<span>Docs</span>
					<Separator orientation="vertical" className="h-4" />
					<span>Components</span>
					<Separator orientation="vertical" className="h-4" />
					<span>GitHub</span>
				</div>
			</div>
		</div>
	);
}
