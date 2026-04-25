import { NavLink, Outlet } from "react-router-dom";

const SUB_NAV = [
	{ to: "/tokens/colors", label: "Colors" },
	{ to: "/tokens/typography", label: "Typography" },
	{ to: "/tokens/spacing", label: "Spacing" },
	{ to: "/tokens/radii", label: "Radii" },
	{ to: "/tokens/shadows", label: "Shadows" },
	{ to: "/tokens/icons", label: "Icons" },
	{ to: "/tokens/animation", label: "Animation" },
	{ to: "/tokens/brand", label: "Brand" },
];

export function TokensLayout() {
	return (
		<div className="space-y-8">
			<header>
				<h1 className="text-3xl font-bold tracking-tight text-foreground">Tokens</h1>
				<p className="mt-2 text-muted-foreground">
					Every visual decision in Canvas is grounded in a token. Toggle the theme — every preview
					updates live.
				</p>
			</header>
			<nav className="flex flex-wrap gap-1 border-b border-border">
				{SUB_NAV.map((item) => (
					<NavLink
						key={item.to}
						to={item.to}
						className={({ isActive }) =>
							`rounded-t-md border-b-2 px-3 py-2 text-sm transition-colors ${
								isActive
									? "border-foreground text-foreground"
									: "border-transparent text-muted-foreground hover:text-foreground"
							}`
						}
					>
						{item.label}
					</NavLink>
				))}
			</nav>
			<Outlet />
		</div>
	);
}
