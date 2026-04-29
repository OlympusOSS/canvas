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
	SidebarSeparator,
	SidebarTrigger,
} from "@olympusoss/canvas";
import { Fragment } from "react";

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
					{NAV_GROUPS.map((group, i) => (
						<Fragment key={group.label}>
							{i > 0 ? <SidebarSeparator /> : null}
							<SidebarGroup>
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
						</Fragment>
					))}
				</SidebarContent>
			</Sidebar>
			<SidebarInset>
				<Topbar title="Dashboard" />
				<div className="p-4 text-sm text-muted-foreground">
					Each labeled group is separated by a `SidebarSeparator`.
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
