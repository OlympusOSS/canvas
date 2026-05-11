"use client";

import { Menu, X } from "lucide-react";
import * as React from "react";

import { cn } from "../../lib/utils";
import { Button } from "../atoms/button";

export interface NavLink {
	label: string;
	href: string;
	external?: boolean;
}

export interface NavBarProps extends React.HTMLAttributes<HTMLElement> {
	logo?: React.ReactNode;
	links?: NavLink[];
	actions?: React.ReactNode;
	/**
	 * When `true` (default) the bar uses `position: sticky` + `top: 0` so it
	 * stays anchored to the top of its scroll container while page content
	 * scrolls underneath. The translucent background + `backdrop-blur` creates
	 * a frosted-glass effect through which the scrolling content reads.
	 * Set `false` to render inline (e.g. for examples or non-sticky layouts).
	 */
	sticky?: boolean;
	/** Custom link component (e.g. Next.js Link) for client-side navigation */
	linkComponent?: React.ElementType;
}

const NavBar = React.forwardRef<HTMLElement, NavBarProps>(
	({ logo, links = [], actions, sticky = true, linkComponent, className, ...props }, ref) => {
		const [mobileOpen, setMobileOpen] = React.useState(false);
		const LinkEl = linkComponent || "a";

		return (
			<nav
				ref={ref}
				className={cn(
					"z-50 border-b border-border bg-background/80 backdrop-blur",
					sticky && "sticky top-0",
					className,
				)}
				{...props}
			>
				<div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
					{/* Logo */}
					{logo && <div className="shrink-0">{logo}</div>}

					{/* Desktop links */}
					<div className="hidden items-center gap-6 md:flex">
						{links.map((link) => (
							<LinkEl
								key={link.href}
								href={link.href}
								className="text-sm font-medium text-muted-foreground no-underline transition-colors hover:text-brand"
								{...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
							>
								{link.label}
							</LinkEl>
						))}
						{actions}
					</div>

					{/* Mobile hamburger */}
					{(links.length > 0 || actions) && (
						<Button
							variant="ghost"
							size="icon"
							className="md:hidden"
							onClick={() => setMobileOpen((v) => !v)}
							aria-label={mobileOpen ? "Close menu" : "Open menu"}
						>
							{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
						</Button>
					)}
				</div>

				{/* Mobile dropdown */}
				{mobileOpen && (
					<div className="border-t md:hidden">
						<div className="flex flex-col gap-1 px-4 py-3 sm:px-6">
							{links.map((link) => (
								<LinkEl
									key={link.href}
									href={link.href}
									onClick={() => setMobileOpen(false)}
									className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground no-underline transition-colors hover:bg-accent hover:text-brand"
									{...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
								>
									{link.label}
								</LinkEl>
							))}
							{actions && <div className="px-3 py-2.5">{actions}</div>}
						</div>
					</div>
				)}
			</nav>
		);
	},
);
NavBar.displayName = "NavBar";

export { NavBar };
