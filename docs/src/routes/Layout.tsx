import { OlympusLogo, useTheme } from "@olympusoss/canvas";
import { NavLink, Outlet } from "react-router-dom";

interface NavItem {
	to: string;
	label: string;
	end?: boolean;
}

interface NavGroup {
	label: string;
	items: NavItem[];
}

const NAV: NavGroup[] = [
	{
		label: "Getting started",
		items: [
			{ to: "/", label: "Overview", end: true },
			{ to: "/install", label: "Installation" },
			{ to: "/principles", label: "Principles" },
		],
	},
	{
		label: "Tokens",
		items: [
			{ to: "/tokens/colors", label: "Colors" },
			{ to: "/tokens/typography", label: "Typography" },
			{ to: "/tokens/spacing", label: "Spacing" },
			{ to: "/tokens/radii", label: "Radii" },
			{ to: "/tokens/shadows", label: "Shadows" },
			{ to: "/tokens/icons", label: "Icons" },
			{ to: "/tokens/animation", label: "Animation" },
			{ to: "/tokens/brand", label: "Brand" },
		],
	},
	{
		label: "Components",
		items: [
			{ to: "/components/atoms", label: "Atoms" },
			{ to: "/components/molecules", label: "Molecules" },
			{ to: "/components/organisms", label: "Organisms" },
			{ to: "/components/templates", label: "Templates" },
		],
	},
	{
		label: "Reference",
		items: [
			{ to: "/migration", label: "Migration" },
			{ to: "/changelog", label: "Changelog" },
		],
	},
];

function ThemeToggle() {
	const { resolvedTheme, toggleTheme } = useTheme();
	return (
		<button
			type="button"
			onClick={toggleTheme}
			className="rounded-md border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
		>
			{resolvedTheme === "dark" ? "Light" : "Dark"} mode
		</button>
	);
}

export function Layout() {
	return (
		<div className="flex min-h-screen bg-background">
			<aside className="w-64 shrink-0 border-r border-border bg-card/30">
				<div className="sticky top-0 max-h-screen overflow-y-auto p-6">
					<NavLink to="/" className="flex items-center gap-2">
						<OlympusLogo className="text-primary" size={28} />
						<div>
							<p className="text-sm font-semibold text-foreground">Canvas</p>
							<p className="font-mono text-[10px] text-muted-foreground">v{__CANVAS_VERSION__}</p>
						</div>
					</NavLink>

					<nav className="mt-8 space-y-6">
						{NAV.map((group) => (
							<div key={group.label}>
								<p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
									{group.label}
								</p>
								<div className="space-y-1">
									{group.items.map((item) => (
										<NavLink
											key={item.to}
											to={item.to}
											end={item.end}
											className={({ isActive }) =>
												`block rounded-md px-3 py-1.5 text-sm transition-colors ${
													isActive
														? "bg-accent text-accent-foreground"
														: "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
												}`
											}
										>
											{item.label}
										</NavLink>
									))}
								</div>
							</div>
						))}
					</nav>

					<div className="mt-8 border-t border-border pt-4">
						<ThemeToggle />
					</div>

					<footer className="mt-6 text-xs text-muted-foreground">
						<p>
							<a
								href="https://github.com/OlympusOSS/canvas"
								target="_blank"
								rel="noopener noreferrer"
								className="underline-offset-4 hover:underline"
							>
								GitHub
							</a>
							{" · "}
							<a
								href="https://github.com/OlympusOSS/canvas/blob/main/CONTRIBUTING.md"
								target="_blank"
								rel="noopener noreferrer"
								className="underline-offset-4 hover:underline"
							>
								Contribute
							</a>
						</p>
					</footer>
				</div>
			</aside>

			<main className="flex-1 overflow-y-auto">
				<div className="mx-auto max-w-5xl p-8">
					<Outlet />
				</div>
			</main>
		</div>
	);
}
