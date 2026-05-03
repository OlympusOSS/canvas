"use client";

import * as React from "react";

import { cn } from "../../lib/utils";

export interface AppShellProps {
	/**
	 * Sidebar content. Rendered on md+ in a fixed left column and in an
	 * overlay drawer on mobile.
	 */
	sidebar:
		| React.ReactNode
		| ((ctx: {
				expanded: boolean;
				setExpanded: (v: boolean) => void;
				closeMobile: () => void;
		  }) => React.ReactNode);
	/** Optional header rendered above the scrollable main area. */
	header?: React.ReactNode | ((ctx: { onMobileMenuToggle: () => void }) => React.ReactNode);
	children: React.ReactNode;
	defaultSidebarExpanded?: boolean;
	className?: string;
}

export function AppShell({
	sidebar,
	header,
	children,
	defaultSidebarExpanded = true,
	className,
}: AppShellProps) {
	const [expanded, setExpanded] = React.useState(defaultSidebarExpanded);
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const closeMobile = React.useCallback(() => setMobileOpen(false), []);
	const toggleMobile = React.useCallback(() => setMobileOpen((v) => !v), []);

	const renderSidebar = (mobile = false) => {
		if (typeof sidebar === "function") {
			return sidebar({
				expanded: mobile ? true : expanded,
				setExpanded,
				closeMobile,
			});
		}
		return sidebar;
	};

	return (
		<div className={cn("flex h-screen overflow-hidden bg-background", className)}>
			{/* Sidebar on md+ */}
			<div className="hidden md:block">{renderSidebar(false)}</div>

			{/* Mobile drawer */}
			{mobileOpen && (
				<>
					<button
						type="button"
						aria-label="Close sidebar"
						className="fixed inset-0 z-30 bg-black/50 md:hidden"
						onClick={closeMobile}
					/>
					<div className="fixed inset-y-0 left-0 z-40 md:hidden">{renderSidebar(true)}</div>
				</>
			)}

			{/* Main column */}
			<div className="flex flex-1 flex-col overflow-hidden">
				{header !== undefined &&
					(typeof header === "function" ? header({ onMobileMenuToggle: toggleMobile }) : header)}
				<main className="flex-1 overflow-y-auto">
					<div className="p-4 sm:p-6">{children}</div>
				</main>
			</div>
		</div>
	);
}

AppShell.displayName = "AppShell";
