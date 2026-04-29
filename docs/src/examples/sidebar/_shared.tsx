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
 * 3-line hamburger that toggles the sidebar via canvas's `useSidebar`. The
 * caller controls visibility via `className` so the same icon can be used in
 * the sidebar header (always visible while the sidebar is rendered) and in
 * the topbar (only visible when the sidebar is fully hidden).
 */
export function HamburgerTrigger({ className }: { className?: string }) {
	const { toggleSidebar } = useSidebar();
	// No `inline-flex`/`hidden` in base — the caller's className picks the
	// display rule so the topbar can hide the trigger conditionally without
	// fighting a default class.
	const base =
		"h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring";
	return (
		<button
			type="button"
			onClick={toggleSidebar}
			aria-label="Toggle navigation"
			className={[base, className].filter(Boolean).join(" ")}
		>
			<Menu className="h-4 w-4" />
		</button>
	);
}

/**
 * The Topbar hamburger is only visible when the sidebar is "fully hidden" —
 * either the Sheet drawer is closed (mobile) or the desktop sidebar is in
 * `collapsible="offcanvas"` mode and currently collapsed. In every other
 * configuration (icon rail, expanded, `collapsible="none"`) the in-sidebar
 * hamburger is reachable, so the topbar's would just be a redundant opener.
 *
 * peer-data-* selectors can't be used here because the hamburger sits inside
 * SidebarInset > Topbar, while `data-state` / `data-collapsible` are on the
 * Sidebar's own root — not a direct sibling. We compute visibility from the
 * `useSidebar` hook plus the example-supplied `collapsible` prop instead.
 */
type CollapsibleMode = "offcanvas" | "icon" | "none";

function useTopbarHamburgerHidden(collapsible: CollapsibleMode) {
	const { state, isMobile, openMobile } = useSidebar();
	if (isMobile) return openMobile;
	return !(state === "collapsed" && collapsible === "offcanvas");
}

/**
 * Topbar shown at the top of the SidebarInset on every example. The hamburger
 * is always rendered but self-hides when the sidebar is visible (rail or
 * expanded), so the layout never has two redundant openers active at once.
 */
export function Topbar({
	title,
	actions,
	collapsible = "offcanvas",
}: {
	title: ReactNode;
	actions?: ReactNode;
	collapsible?: CollapsibleMode;
}) {
	const hidden = useTopbarHamburgerHidden(collapsible);
	return (
		<header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<HamburgerTrigger className={hidden ? "hidden" : "inline-flex"} />
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
