"use client";

import * as React from "react";

import { cn } from "../../lib/utils";

export interface AppHeaderProps extends React.HTMLAttributes<HTMLElement> {
	/**
	 * Search slot — typically a `<SearchBar>` constrained to a max width.
	 * Rendered on the left, flex-grows to fill available space.
	 */
	search?: React.ReactNode;
	/**
	 * Actions slot — chrome buttons (theme toggle, bell, settings). Rendered
	 * right of the search, before the user chip.
	 */
	actions?: React.ReactNode;
	/**
	 * User slot — typically a `<UserAvatarChip>` or `<DropdownMenu>`-wrapped
	 * avatar. Rendered last on the right.
	 */
	user?: React.ReactNode;
	/**
	 * Mobile menu trigger slot — rendered before search on small viewports.
	 * Typically a hamburger Button that calls AdminShell's `onMobileMenuToggle`.
	 */
	mobileMenuTrigger?: React.ReactNode;
	/**
	 * When true, sticks the header to the top with `bg-background` and a
	 * border-bottom. Defaults to true — the typical admin pattern.
	 */
	sticky?: boolean;
}

export const AppHeader = React.forwardRef<HTMLElement, AppHeaderProps>(
	({ search, actions, user, mobileMenuTrigger, sticky = true, className, ...props }, ref) => {
		return (
			<header
				ref={ref}
				className={cn(
					"flex h-14 items-center gap-3 border-b border-border bg-background px-4",
					sticky && "sticky top-0 z-20",
					className,
				)}
				{...props}
			>
				{mobileMenuTrigger && <div className="md:hidden">{mobileMenuTrigger}</div>}
				{search && <div className="max-w-[480px] flex-1">{search}</div>}
				{!search && <div className="flex-1" />}
				{actions && <div className="flex items-center gap-2">{actions}</div>}
				{user && (
					<>
						{actions && <div className="mx-1 h-6 w-px bg-border" aria-hidden />}
						{user}
					</>
				)}
			</header>
		);
	},
);
AppHeader.displayName = "AppHeader";
