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
		<SidebarProvider defaultOpen={false} className="min-h-[520px]">
			<Sidebar collapsible="icon">
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
											<SidebarMenuButton tooltip={item.label} isActive={item.active}>
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
			<SidebarInset>
				<Topbar collapsible="icon" title="Dashboard" />
				<div className="p-4 text-sm">
					<p className="text-muted-foreground">
						Starts collapsed to the icon rail. Click the logo to expand. Hover any icon to see its
						tooltip label. On mobile, use the hamburger in the topbar.
					</p>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
