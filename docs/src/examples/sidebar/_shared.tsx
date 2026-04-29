import { Logo, useSidebar } from "@olympusoss/canvas";
import {
	Activity,
	Bell,
	Home,
	Key,
	Layers,
	Lock,
	Mail,
	Menu,
	Search,
	Settings,
	Shield,
	User,
	Users,
} from "lucide-react";
import type { ComponentType, ReactNode, SVGProps } from "react";

export interface NavItem {
	id: string;
	label: string;
	icon: ComponentType<SVGProps<SVGSVGElement>>;
	active?: boolean;
}

export interface NavGroup {
	label: string;
	items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
	{
		label: "Overview",
		items: [{ id: "dashboard", label: "Dashboard", icon: Home, active: true }],
	},
	{
		label: "Identity",
		items: [
			{ id: "identities", label: "Identities", icon: Users },
			{ id: "sessions", label: "Sessions", icon: Activity },
			{ id: "messages", label: "Messages", icon: Mail },
			{ id: "schemas", label: "Schemas", icon: Layers },
		],
	},
	{
		label: "OAuth2",
		items: [
			{ id: "clients", label: "Clients", icon: Shield },
			{ id: "tokens", label: "Tokens", icon: Key },
		],
	},
	{
		label: "System",
		items: [
			{ id: "security", label: "Security", icon: Lock },
			{ id: "settings", label: "Settings", icon: Settings },
			{ id: "profile", label: "Profile", icon: User },
		],
	},
];

/**
 * 3-line hamburger that toggles the sidebar via canvas's `useSidebar` hook.
 * Used in place of the panel-left SidebarTrigger inside the topbar so the
 * affordance reads correctly at every viewport — including the mobile drawer.
 */
export function HamburgerTrigger() {
	const { toggleSidebar } = useSidebar();
	return (
		<button
			type="button"
			onClick={toggleSidebar}
			aria-label="Toggle navigation"
			className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
		>
			<Menu className="h-4 w-4" />
		</button>
	);
}

/**
 * Topbar shown at the top of the SidebarInset on every example. The hamburger
 * is always rendered — on mobile/tablet it's the only way to open the
 * Sheet-style drawer canvas's Sidebar falls back to under the md breakpoint.
 * On desktop the inline trigger inside the SidebarHeader takes over visually,
 * but having one here means the layout never gets stranded with no opener.
 */
export function Topbar({ title, actions }: { title: ReactNode; actions?: ReactNode }) {
	return (
		<header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<HamburgerTrigger />
			<h1 className="text-sm font-semibold tracking-tight">{title}</h1>
			<div className="ml-auto flex items-center gap-1.5 text-muted-foreground">
				{actions ?? (
					<>
						<button
							type="button"
							aria-label="Search"
							className="inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-foreground"
						>
							<Search className="h-4 w-4" />
						</button>
						<button
							type="button"
							aria-label="Notifications"
							className="inline-flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-foreground"
						>
							<Bell className="h-4 w-4" />
						</button>
					</>
				)}
			</div>
		</header>
	);
}

/**
 * Olympus brand area for the sidebar header. The whole block is a button
 * so clicking the logo or wordmark toggles the sidebar — handy when the
 * sidebar is collapsed to the icon rail and the dedicated trigger is hidden.
 */
export function BrandTrigger() {
	const { toggleSidebar } = useSidebar();
	return (
		<button
			type="button"
			onClick={toggleSidebar}
			aria-label="Toggle sidebar"
			className="flex items-center gap-2.5 rounded-md outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-sidebar-ring"
		>
			<Logo variant="ring" className="h-8 w-auto shrink-0" />
			<span className="text-sm font-semibold tracking-tight group-data-[collapsible=icon]:hidden">
				Olympus
			</span>
		</button>
	);
}
