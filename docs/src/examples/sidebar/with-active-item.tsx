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
import { useState } from "react";

import { BrandTrigger, HamburgerTrigger, NAV_GROUPS, Topbar } from "./_shared";

export default function App() {
	const [activeId, setActiveId] = useState("dashboard");
	const activeLabel =
		NAV_GROUPS.flatMap((g) => g.items).find((i) => i.id === activeId)?.label ?? activeId;

	return (
		<SidebarProvider className="min-h-[520px]">
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
											<SidebarMenuButton
												isActive={item.id === activeId}
												onClick={() => setActiveId(item.id)}
											>
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
				<Topbar collapsible="icon" title={activeLabel} />
				<div className="p-4 text-sm">
					<p className="text-muted-foreground">
						Active: <span className="font-medium text-foreground">{activeLabel}</span>
					</p>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
