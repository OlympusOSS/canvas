import {
	Icon,
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupAction,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from "@olympusoss/canvas";

import { BrandTrigger, NAV_GROUPS } from "./_shared";

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
							{group.label === "OAuth2" ? (
								<SidebarGroupAction title={`Add ${group.label} item`}>
									<Icon name="Plus" />
								</SidebarGroupAction>
							) : null}
							<SidebarGroupContent>
								<SidebarMenu>
									{group.items.map((item) => (
										<SidebarMenuItem key={item.id}>
											<SidebarMenuButton isActive={item.active}>
												<item.icon />
												<span>{item.label}</span>
											</SidebarMenuButton>
											<SidebarMenuAction showOnHover aria-label={`More for ${item.label}`}>
												<Icon name="EllipsisVertical" />
											</SidebarMenuAction>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					))}
				</SidebarContent>
			</Sidebar>
			<SidebarInset className="p-4 text-sm text-muted-foreground">
				Hover any nav row to reveal its menu action. The OAuth2 group also exposes a group-level "+"
				action.
			</SidebarInset>
		</SidebarProvider>
	);
}
