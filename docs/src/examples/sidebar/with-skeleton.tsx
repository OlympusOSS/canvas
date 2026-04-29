import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuSkeleton,
	SidebarProvider,
	SidebarTrigger,
} from "@olympusoss/canvas";

import { BrandTrigger, NAV_GROUPS, Topbar } from "./_shared";

export default function App() {
	return (
		<SidebarProvider className="min-h-[520px]">
			<Sidebar collapsible="icon">
				<SidebarHeader>
					<BrandTrigger />
					<SidebarTrigger className="ml-auto group-data-[collapsible=icon]:hidden" />
				</SidebarHeader>
				<SidebarContent>
					{NAV_GROUPS.map((group) => (
						<SidebarGroup key={group.label}>
							<SidebarGroupLabel>{group.label}</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{group.items.map((item, i) => (
										<SidebarMenuItem key={item.id}>
											<SidebarMenuSkeleton showIcon={i % 2 === 0} />
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					))}
				</SidebarContent>
			</Sidebar>
			<SidebarInset>
				<Topbar title="Loading…" />
				<div className="p-4 text-sm text-muted-foreground">
					Loading state: every menu item is replaced by a `SidebarMenuSkeleton`. Rows with even
					indexes show a leading icon placeholder.
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
