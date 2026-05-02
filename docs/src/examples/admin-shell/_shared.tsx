"use client";

import {
	BrandLockup,
	Icon,
	type IconName,
	Logo,
	ScrollArea,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@olympusoss/canvas";
import { Fragment } from "react";

/**
 * Shared sidebar used by every AdminShell example. Visually matches the
 * canvas Sidebar organism — bg-sidebar surface, sidebar-foreground/accent
 * tokens, rounded menu buttons, group labels, tooltips on the collapsed rail
 * — but is a self-contained `<aside>` so AdminShell's slot semantics work
 * without an outer SidebarProvider.
 */

export interface NavItem {
	id: string;
	title: string;
	icon: IconName;
	/** Tailwind class applied to the icon when the row is INACTIVE. */
	iconColor?: string;
}

export interface NavGroup {
	label: string;
	items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
	{
		label: "Overview",
		items: [
			{
				id: "dashboard",
				title: "Dashboard",
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
				icon: "Users",
				iconColor: "text-purple-500",
			},
			{
				id: "sessions",
				title: "Sessions",
				icon: "Shield",
				iconColor: "text-emerald-500",
			},
			{
				id: "messages",
				title: "Messages",
				icon: "Mail",
				iconColor: "text-amber-500",
			},
			{
				id: "schemas",
				title: "Schemas",
				icon: "FileText",
				iconColor: "text-cyan-500",
			},
			{
				id: "social",
				title: "Social Connections",
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
				icon: "AppWindow",
				iconColor: "text-rose-500",
			},
			{
				id: "applications",
				title: "Machine-to-Machine",
				icon: "Server",
				iconColor: "text-violet-500",
			},
		],
	},
	{
		label: "System",
		items: [
			{ id: "security", title: "Security", icon: "Lock", iconColor: "text-red-500" },
			{ id: "settings", title: "Settings", icon: "Settings", iconColor: "text-slate-400" },
		],
	},
];

export interface AthenaSidebarProps {
	groups?: NavGroup[];
	active: string;
	onActiveChange?: (id: string) => void;
	expanded: boolean;
	onToggle?: () => void;
	footer?: React.ReactNode;
}

export function AthenaSidebar({
	groups = NAV_GROUPS,
	active,
	onActiveChange,
	expanded,
	onToggle,
	footer,
}: AthenaSidebarProps) {
	return (
		<TooltipProvider delayDuration={0}>
			<aside
				className="flex h-full flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-300"
				style={{ width: expanded ? 240 : 56 }}
				data-state={expanded ? "expanded" : "collapsed"}
			>
				<div
					className={`flex h-14 items-center border-b border-sidebar-border ${expanded ? "justify-between px-4" : "justify-center px-2"}`}
				>
					{expanded ? (
						<BrandLockup logo={<Logo className="h-7 w-auto" />} productName="Athena" size="md" />
					) : (
						<Logo className="h-6 w-auto" />
					)}
					{expanded && onToggle && (
						<button
							type="button"
							onClick={onToggle}
							aria-label="Collapse sidebar"
							className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded text-sidebar-foreground/60 transition-opacity hover:text-sidebar-foreground"
						>
							<Icon name="PanelLeftClose" className="h-4 w-4" />
						</button>
					)}
				</div>

				<ScrollArea className={`flex-1 py-2 ${expanded ? "px-2.5" : "px-1.5"}`}>
					<nav className="flex flex-col gap-3">
						{groups.map((group) => (
							<div key={group.label} className="flex flex-col gap-0.5">
								{expanded && (
									<div className="px-3 pb-1 pt-1.5 text-[11px] font-medium uppercase tracking-[0.06em] text-sidebar-foreground/60">
										{group.label}
									</div>
								)}
								{group.items.map((item) => {
									const isActive = item.id === active;
									const button = (
										<button
											type="button"
											onClick={() => onActiveChange?.(item.id)}
											className={`flex w-full items-center rounded-md text-[13px] transition-colors ${
												expanded ? "gap-3 px-3 py-2" : "justify-center px-2 py-2"
											} ${
												isActive
													? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
													: "text-sidebar-foreground/75 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
											}`}
										>
											<Icon
												name={item.icon}
												className={`h-4 w-4 shrink-0 ${isActive ? "" : (item.iconColor ?? "")}`}
											/>
											{expanded && <span className="truncate">{item.title}</span>}
										</button>
									);
									if (expanded) {
										return <Fragment key={item.id}>{button}</Fragment>;
									}
									return (
										<Tooltip key={item.id}>
											<TooltipTrigger asChild>{button}</TooltipTrigger>
											<TooltipContent side="right">{item.title}</TooltipContent>
										</Tooltip>
									);
								})}
							</div>
						))}
					</nav>
				</ScrollArea>

				{footer && (
					<div className={`border-t border-sidebar-border ${expanded ? "p-2.5" : "p-1.5"}`}>
						{footer}
					</div>
				)}

				{!expanded && onToggle && !footer && (
					<div className="border-t border-sidebar-border p-1.5">
						<button
							type="button"
							onClick={onToggle}
							aria-label="Expand sidebar"
							className="inline-flex h-8 w-full items-center justify-center rounded text-sidebar-foreground/60 hover:text-sidebar-foreground"
						>
							<Icon name="PanelLeftOpen" className="h-4 w-4" />
						</button>
					</div>
				)}
			</aside>
		</TooltipProvider>
	);
}
