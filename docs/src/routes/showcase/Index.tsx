import { Card, CardContent, Icon } from "@olympusoss/canvas";
import { Link } from "react-router-dom";

const SHOWCASES = [
	{
		id: "auth",
		title: "Auth UI",
		repo: "hera",
		description: "Login / consent / recovery / verification using AuthShell + AnimatedBackground.",
		icon: "Lock" as const,
		repoUrl: "https://github.com/OlympusOSS/hera",
	},
	{
		id: "admin",
		title: "Admin dashboard",
		repo: "athena",
		description: "Sidebar + DataTable + StatCard composing a Kratos / Hydra admin console.",
		icon: "LayoutDashboard" as const,
		repoUrl: "https://github.com/OlympusOSS/athena",
	},
	{
		id: "marketing",
		title: "Marketing + OAuth2 playground",
		repo: "site",
		description: "Single-page scroll with hero, features, and an interactive PKCE walkthrough.",
		icon: "Globe" as const,
		repoUrl: "https://github.com/OlympusOSS/site",
	},
];

export function ShowcaseIndex() {
	return (
		<div className="space-y-8">
			<header className="space-y-3">
				<h1 className="text-3xl font-bold tracking-tight text-foreground">Showcase</h1>
				<p className="max-w-2xl text-muted-foreground">
					Canvas isn't just primitives — it's a coherent product. Three real Olympus surfaces ship
					on top of it. Each demo here mirrors what consumers see in production, rendered live in
					the docs.
				</p>
			</header>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{SHOWCASES.map((s) => (
					<Link key={s.id} to={`/showcase/${s.id}`} className="group">
						<Card className="h-full transition-colors hover:bg-card">
							<CardContent className="space-y-3 p-5">
								<div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent">
									<Icon name={s.icon} className="h-5 w-5" />
								</div>
								<div>
									<p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
										{s.repo}
									</p>
									<h2 className="mt-1 text-base font-semibold text-foreground">{s.title}</h2>
								</div>
								<p className="text-sm text-muted-foreground">{s.description}</p>
								<div className="flex items-center gap-1 pt-2 text-xs text-muted-foreground transition-colors group-hover:text-foreground">
									<span>View demo</span>
									<Icon name="ArrowRight" className="h-3.5 w-3.5" />
								</div>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>
		</div>
	);
}
