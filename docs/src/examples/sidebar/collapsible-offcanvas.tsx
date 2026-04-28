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
	SidebarTrigger,
} from "@olympusoss/canvas";

import { BrandTrigger, NAV_GROUPS } from "./_shared";

export default function App() {
	return (
		<SidebarProvider defaultOpen={false} className="min-h-[520px]">
			<Sidebar collapsible="offcanvas">
				<SidebarHeader>
					<BrandTrigger />
					<SidebarTrigger className="ml-auto" />
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
			<SidebarInset className="p-4 text-sm">
				<SidebarTrigger />
				<p className="mt-2 text-muted-foreground">
					Starts hidden. Click the trigger to slide the sidebar in from the left.
				</p>
			</SidebarInset>
		</SidebarProvider>
	);
}
