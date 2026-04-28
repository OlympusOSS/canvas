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

import { BrandTrigger, NAV_GROUPS } from "./_shared";

const variants = ["sidebar", "floating", "inset"] as const;

const Demo = ({ variant }: { variant: (typeof variants)[number] }) => (
	<SidebarProvider className="min-h-[420px]">
		<Sidebar collapsible="none" variant={variant}>
			<SidebarHeader>
				<BrandTrigger />
			</SidebarHeader>
			<SidebarContent>
				{NAV_GROUPS.slice(0, 2).map((group) => (
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
		<SidebarInset className="p-3 text-xs text-muted-foreground">variant={variant}</SidebarInset>
	</SidebarProvider>
);

export default function App() {
	return (
		<div className="grid gap-4 md:grid-cols-3">
			{variants.map((v) => (
				<Demo key={v} variant={v} />
			))}
		</div>
	);
}
