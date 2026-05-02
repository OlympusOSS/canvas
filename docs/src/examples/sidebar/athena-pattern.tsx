import {
	Avatar,
	AvatarFallback,
	BrandLockup,
	Icon,
	type IconName,
	Logo,
	Sidebar,
	SidebarContent,
	SidebarFooter,
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
} from "@olympusoss/canvas";
import { useState } from "react";

import { Topbar } from "./_shared";

// The nav-item config athena uses locally — single-source-of-truth array with
// per-item iconColor (a Tailwind class) for category tinting. Sections render
// as `<SidebarGroup>` with a `<SidebarGroupLabel>`. Items use the same Lucide
// icon names canvas's `<Icon />` atom accepts.
interface AthenaNavItem {
	id: string;
	title: string;
	path: string;
	icon: IconName;
	/** Tailwind class applied to the icon when the row is INACTIVE. */
	iconColor: string;
}

interface AthenaNavSection {
	label: string;
	items: AthenaNavItem[];
}

const NAV_SECTIONS: AthenaNavSection[] = [
	{
		label: "Overview",
		items: [
			{
				id: "dashboard",
				title: "Dashboard",
				path: "/dashboard",
				icon: "LayoutDashboard",
				iconColor: "text-blue-500",
			},
		],
	},
	{
		label: "Identity",
		items: [
			{
				id: "identities",
				title: "Identities",
				path: "/identities",
				icon: "Users",
				iconColor: "text-purple-500",
			},
			{
				id: "sessions",
				title: "Sessions",
				path: "/sessions",
				icon: "Shield",
				iconColor: "text-emerald-500",
			},
			{
				id: "messages",
				title: "Messages",
				path: "/messages",
				icon: "Mail",
				iconColor: "text-amber-500",
			},
			{
				id: "schemas",
				title: "Schemas",
				path: "/schemas",
				icon: "FileText",
				iconColor: "text-cyan-500",
			},
			{
				id: "social",
				title: "Social Connections",
				path: "/social-connections",
				icon: "AppWindow",
				iconColor: "text-indigo-500",
			},
		],
	},
	{
		label: "OAuth2",
		items: [
			{
				id: "clients",
				title: "OAuth2 Clients",
				path: "/clients",
				icon: "AppWindow",
				iconColor: "text-rose-500",
			},
			{
				id: "applications",
				title: "Machine-to-Machine",
				path: "/applications/m2m",
				icon: "Server",
				iconColor: "text-violet-500",
			},
		],
	},
	{
		label: "System",
		items: [
			{
				id: "security",
				title: "Security",
				path: "/security",
				icon: "Lock",
				iconColor: "text-red-500",
			},
		],
	},
];

// Default matcher mirrors athena's `pathname === path || pathname.startsWith(path + '/')`
function isActive(path: string, current: string): boolean {
	return current === path || current.startsWith(`${path}/`);
}

export default function App() {
	const [pathname, setPathname] = useState("/dashboard");
	const activeLabel =
		NAV_SECTIONS.flatMap((s) => s.items).find((i) => isActive(i.path, pathname))?.title ?? "—";

	return (
		<SidebarProvider className="min-h-[640px]">
			<Sidebar collapsible="icon">
				<SidebarHeader>
					<BrandLockup logo={<Logo className="h-7 w-auto" />} productName="Athena" />
				</SidebarHeader>

				<SidebarContent>
					{NAV_SECTIONS.map((section) => (
						<SidebarGroup key={section.label}>
							<SidebarGroupLabel>{section.label}</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{section.items.map((item) => {
										const active = isActive(item.path, pathname);
										return (
											<SidebarMenuItem key={item.id}>
												<SidebarMenuButton
													isActive={active}
													tooltip={item.title}
													onClick={() => setPathname(item.path)}
												>
													<Icon name={item.icon} className={active ? undefined : item.iconColor} />
													<span>{item.title}</span>
												</SidebarMenuButton>
											</SidebarMenuItem>
										);
									})}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					))}
				</SidebarContent>

				<SidebarSeparator />
				<SidebarFooter>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton tooltip="Account">
								<Avatar className="h-5 w-5">
									<AvatarFallback className="text-[10px]">AO</AvatarFallback>
								</Avatar>
								<span className="truncate">admin@olympus.dev</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton tooltip="Logout">
								<Icon name="LogOut" />
								<span>Logout</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>
			</Sidebar>

			<SidebarInset>
				<Topbar collapsible="icon" title={activeLabel} />
				<div className="p-6 text-sm">
					<p className="text-muted-foreground">
						This sidebar mirrors the pattern used in <code>OlympusOSS/athena</code>
						's local <code>Sidebar.tsx</code> — a single config array of grouped items with per-item{" "}
						<code>iconColor</code>, tooltips on the collapsed rail, an active matcher, and a footer
						with user chip + logout. Athena can replace its hand-rolled component by importing the
						canvas primitives shown above.
					</p>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
