import { OlympusLogo } from "@olympusoss/canvas";

export function TokensBrand() {
	return (
		<div className="space-y-6">
			<section className="grid gap-4 sm:grid-cols-2">
				<div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card/50 p-8">
					<OlympusLogo variant="icon" size={56} />
					<p className="font-mono text-xs text-muted-foreground">variant="icon"</p>
				</div>
				<div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card/50 p-8">
					<OlympusLogo variant="ring" size={88} />
					<p className="font-mono text-xs text-muted-foreground">variant="ring"</p>
				</div>
			</section>
			<section className="rounded-lg border border-border bg-card/50 p-6">
				<p className="text-sm text-muted-foreground">
					Phase 1 will add the wordmark lockup, gradient documentation, and small-size guidance.
				</p>
			</section>
		</div>
	);
}
