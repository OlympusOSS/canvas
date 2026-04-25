export function Install() {
	return (
		<div className="space-y-6">
			<header>
				<h1 className="text-3xl font-bold tracking-tight text-foreground">Installation</h1>
				<p className="mt-2 text-muted-foreground">
					Wire Canvas into a Next.js / React + Tailwind v4 app.
				</p>
			</header>
			<section className="rounded-lg border border-border bg-card/50 p-6">
				<p className="text-sm text-muted-foreground">
					Full install guide ships in Phase 1, including a tabbed package-manager picker (bun / npm
					/ pnpm / yarn), Tailwind v4 token wiring, and ThemeProvider walkthrough.
				</p>
			</section>
		</div>
	);
}
