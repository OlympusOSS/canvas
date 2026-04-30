import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid w-64 gap-1 p-2">
								<li>
									<NavigationMenuLink
										href="#"
										className="block rounded p-2 text-sm hover:bg-accent"
									>
										Installation
									</NavigationMenuLink>
								</li>
								<li>
									<NavigationMenuLink
										href="#"
										className="block rounded p-2 text-sm hover:bg-accent"
									>
										Theming
									</NavigationMenuLink>
								</li>
								<li>
									<NavigationMenuLink
										href="#"
										className="block rounded p-2 text-sm hover:bg-accent"
									>
										Customization
									</NavigationMenuLink>
								</li>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink href="#" className="px-3 py-2 text-sm font-medium">
							Components
						</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
}
