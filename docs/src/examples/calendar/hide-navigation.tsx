import { Calendar } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="space-y-2">
				<Calendar mode="single" hideNavigation className="rounded-xl border bg-card shadow-sm" />
				<p className="text-xs text-muted-foreground">
					`hideNavigation` removes the prev/next chevrons — useful for read-only embeds. Pair with
					`disableNavigation` to also block keyboard month-stepping.
				</p>
			</div>
		</div>
	);
}
