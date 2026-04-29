import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
} from "@olympusoss/canvas";

import { BrandTrigger, HamburgerTrigger, NAV_GROUPS, Topbar } from "./_shared";

export default function App() {
	return (
		<SidebarProvider className="min-h-[520px]">
			<SidebarInset>
				<Topbar collapsible="icon" side="right" title="Dashboard" />
				<div className="p-4 text-sm text-muted-foreground">
					Sidebar lives on the right. Same Olympus shell, mirrored layout.
				</div>
			</SidebarInset>
			<Sidebar side="right" collapsible="icon">
				<SidebarHeader>
					<BrandTrigger />
					<HamburgerTrigger className="ml-auto inline-flex group-data-[collapsible=icon]:hidden" />
				</SidebarHeader>
				<SidebarContent>
					{NAV_GROUPS.map((group) => (
						<SidebarGroup key={group.label}>
							<SidebarGroupLabel>{group.label}</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{group.items.map((item) => (
										<SidebarMenuItem key={item.id}>
											<SidebarMenuButton isActive={item.active}>
												<item.icon />
												<span>{item.label}</span>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					))}
				</SidebarContent>
			</Sidebar>
		</SidebarProvider>
	);
}
