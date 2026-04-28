import { Logo, useSidebar } from "@olympusoss/canvas";
import {
	Activity,
	Home,
	Key,
	Layers,
	Lock,
	Mail,
	Settings,
	Shield,
	User,
	Users,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";

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
