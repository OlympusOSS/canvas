import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@olympusoss/canvas";

const ITEMS = [
	{ title: "Atoms", desc: "Building-block primitives." },
	{ title: "Molecules", desc: "Composed sets like Card, Alert, Stepper." },
	{ title: "Organisms", desc: "Larger combinations like Sidebar, DataTable." },
	{ title: "Templates", desc: "Page-level shells: Auth, Admin, Wizard." },
];

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Components</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid w-[420px] grid-cols-2 gap-2 p-3">
								{ITEMS.map((it) => (
									<li key={it.title}>
										<NavigationMenuLink href="#" className="block rounded-md p-3 hover:bg-accent">
											<p className="text-sm font-medium text-foreground">{it.title}</p>
											<p className="text-xs text-muted-foreground">{it.desc}</p>
										</NavigationMenuLink>
									</li>
								))}
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
}
