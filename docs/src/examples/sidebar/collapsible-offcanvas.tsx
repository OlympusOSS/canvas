import {
	Icon,
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
	useSidebar,
} from "@olympusoss/canvas";

import { BrandTrigger, NAV_GROUPS } from "./_shared";

const cx = (...parts: Array<string | false | undefined | null>) => parts.filter(Boolean).join(" ");

/**
 * Edge tab for offcanvas mode. Visible only when the sidebar is collapsed —
 * it tucks against the left edge of the inset so users always have a way to
 * pop the sidebar back open. When the sidebar is expanded the tab fades and
 * slides off-edge while the header SidebarTrigger fades+scales in, giving the
 * illusion that the icon "moves" between the two positions.
 */
function OffcanvasOpenTab() {
	const { state, toggleSidebar } = useSidebar();
	const collapsed = state === "collapsed";
	return (
		<button
			type="button"
			onClick={toggleSidebar}
			aria-label="Open sidebar"
			className={cx(
				"absolute left-0 top-1/2 z-20 flex h-12 w-7 -translate-y-1/2 items-center justify-center",
				"rounded-r-md border border-l-0 border-sidebar-border bg-sidebar text-sidebar-foreground shadow-sm",
				"transition-[opacity,transform] duration-300 ease-out",
				"hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
				collapsed ? "translate-x-0 opacity-100" : "pointer-events-none -translate-x-full opacity-0",
			)}
		>
			<Icon
				name="PanelLeft"
				className={cx(
					"h-4 w-4 transition-transform duration-300 ease-out",
					collapsed ? "scale-100" : "scale-0",
				)}
			/>
		</button>
	);
}

/**
 * Header trigger that mirrors the OffcanvasOpenTab — visible only when the
 * sidebar is expanded, with the icon scaling in (so it feels like the same
 * icon traveled from the edge tab into the header).
 */
function OffcanvasHeaderTrigger() {
	const { state } = useSidebar();
	const collapsed = state === "collapsed";
	return (
		<SidebarTrigger
			className={cx(
				"ml-auto transition-transform duration-300 ease-out",
				"[&_svg]:transition-transform [&_svg]:duration-300",
				collapsed ? "[&_svg]:scale-0" : "[&_svg]:scale-100",
			)}
		/>
	);
}

export default function App() {
	return (
		<SidebarProvider defaultOpen={false} className="min-h-[520px]">
			<Sidebar collapsible="offcanvas">
				<SidebarHeader>
					<BrandTrigger />
					<OffcanvasHeaderTrigger />
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
				<OffcanvasOpenTab />
				<p className="ml-10 text-muted-foreground">
					Starts hidden. The edge tab on the left fades out and the icon reappears in the header as
					the sidebar slides in.
				</p>
			</SidebarInset>
		</SidebarProvider>
	);
}
