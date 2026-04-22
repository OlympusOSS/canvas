import { OlympusLogo, ThemeProvider, Toaster, useTheme } from "@olympusoss/canvas";
import { useState } from "react";
import { AtomsPage } from "./pages/AtomsPage";
import { MoleculesPage } from "./pages/MoleculesPage";
import { OrganismsPage } from "./pages/OrganismsPage";
import { TemplatesPage } from "./pages/TemplatesPage";

type TierId = "atoms" | "molecules" | "organisms" | "templates";

const TIERS: Array<{ id: TierId; label: string; count: string }> = [
	{ id: "atoms", label: "Atoms", count: "Primitive wrappers" },
	{ id: "molecules", label: "Molecules", count: "Compositions of atoms" },
	{ id: "organisms", label: "Organisms", count: "Stateful surfaces" },
	{ id: "templates", label: "Templates", count: "Page-level scaffolding" },
];

function ThemeToggle() {
	const { resolvedTheme, toggleTheme } = useTheme();
	return (
		<button
			type="button"
			onClick={toggleTheme}
			className="rounded-md border border-border px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground"
		>
			{resolvedTheme === "dark" ? "Light" : "Dark"} mode
		</button>
	);
}

function Gallery() {
	const [tier, setTier] = useState<TierId>("atoms");

	return (
		<div className="flex min-h-screen">
			<aside className="w-64 shrink-0 border-r border-border bg-card/30 p-6">
				<div className="flex items-center gap-2">
					<OlympusLogo className="text-primary" size={28} />
					<div>
						<p className="text-sm font-semibold">Canvas</p>
						<p className="text-xs text-muted-foreground">Component gallery</p>
					</div>
				</div>

				<nav className="mt-8 space-y-1">
					{TIERS.map((t) => (
						<button
							key={t.id}
							type="button"
							onClick={() => setTier(t.id)}
							className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
								t.id === tier
									? "bg-accent text-accent-foreground"
									: "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
							}`}
						>
							<div className="font-medium">{t.label}</div>
							<div className="text-xs text-muted-foreground/80">{t.count}</div>
						</button>
					))}
				</nav>

				<div className="mt-8 border-t border-border pt-4">
					<ThemeToggle />
				</div>

				<footer className="mt-6 text-xs text-muted-foreground">
					<p>
						Imports live from <code>../src</code>.
					</p>
					<p className="mt-1">See MIGRATION.md + CONTRIBUTING.md.</p>
				</footer>
			</aside>

			<main className="flex-1 overflow-y-auto">
				<div className="mx-auto max-w-5xl p-8">
					<h1 className="text-3xl font-bold tracking-tight">
						{TIERS.find((t) => t.id === tier)?.label}
					</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						{TIERS.find((t) => t.id === tier)?.count}
					</p>
					<div className="mt-8">
						{tier === "atoms" && <AtomsPage />}
						{tier === "molecules" && <MoleculesPage />}
						{tier === "organisms" && <OrganismsPage />}
						{tier === "templates" && <TemplatesPage />}
					</div>
				</div>
			</main>
		</div>
	);
}

export function App() {
	return (
		<ThemeProvider defaultTheme="dark">
			<Gallery />
			<Toaster />
		</ThemeProvider>
	);
}
