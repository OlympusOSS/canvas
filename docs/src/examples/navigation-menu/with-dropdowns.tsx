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
						<NavigationMenuTrigger>Product</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid w-72 gap-1 p-2">
								<li>
									<NavigationMenuLink
										href="#"
										className="block rounded p-2 text-sm hover:bg-accent"
									>
										Components
									</NavigationMenuLink>
								</li>
								<li>
									<NavigationMenuLink
										href="#"
										className="block rounded p-2 text-sm hover:bg-accent"
									>
										Templates
									</NavigationMenuLink>
								</li>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Company</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid w-72 gap-1 p-2">
								<li>
									<NavigationMenuLink
										href="#"
										className="block rounded p-2 text-sm hover:bg-accent"
									>
										About
									</NavigationMenuLink>
								</li>
								<li>
									<NavigationMenuLink
										href="#"
										className="block rounded p-2 text-sm hover:bg-accent"
									>
										Careers
									</NavigationMenuLink>
								</li>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
}
