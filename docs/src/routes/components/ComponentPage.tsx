import { useParams } from "react-router-dom";

export function ComponentPage() {
	const { tier, name } = useParams<{ tier: string; name: string }>();

	return (
		<div className="space-y-6">
			<header>
				<p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{tier}</p>
				<h1 className="text-3xl font-bold tracking-tight text-foreground">{name}</h1>
			</header>
			<section className="rounded-lg border border-border bg-card/50 p-6">
				<p className="text-sm text-muted-foreground">
					Per-component pages with overview, examples, props tables, anatomy, accessibility, tokens
					used, interactive playground, and StackBlitz links ship in Phase 2.
				</p>
			</section>
		</div>
	);
}
