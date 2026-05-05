"use client";

import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import * as React from "react";

import { cn } from "../../lib/utils";

export interface NavigationMenuProps
	extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> {
	/** Controlled active item value. */
	value?: string;
	/** Initial value for uncontrolled usage. */
	defaultValue?: string;
	/** Fires when the active item changes. */
	onValueChange?: (value: string) => void;
	/**
	 * Delay (ms) before opening on hover.
	 * @default 200
	 */
	delayDuration?: number;
	/**
	 * Delay (ms) for skipping subsequent open delays once one menu is open.
	 * @default 300
	 */
	skipDelayDuration?: number;
	/**
	 * Reading direction.
	 * @default "ltr"
	 */
	dir?: "ltr" | "rtl";
	/**
	 * Layout direction.
	 * @default "horizontal"
	 */
	orientation?: "horizontal" | "vertical";
	/** List + Indicator + Viewport. */
	children?: React.ReactNode;
	className?: string;
}

const NavigationMenu = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Root>,
	NavigationMenuProps
>(({ className, children, ...props }, ref) => (
	<NavigationMenuPrimitive.Root
		ref={ref}
		className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
		{...props}
	>
		{children}
		<NavigationMenuViewport />
	</NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

export interface NavigationMenuListProps
	extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List> {
	asChild?: boolean;
	/** A list of `<NavigationMenuItem>`s. */
	children?: React.ReactNode;
	className?: string;
}

const NavigationMenuList = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.List>,
	NavigationMenuListProps
>(({ className, ...props }, ref) => (
	<NavigationMenuPrimitive.List
		ref={ref}
		className={cn("group flex flex-1 list-none items-center justify-center space-x-1", className)}
		{...props}
	/>
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

export interface NavigationMenuItemProps
	extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Item> {
	/** Required for controlled menus — unique id of this item. */
	value?: string;
	/** Trigger + Content (or Link). */
	children?: React.ReactNode;
	className?: string;
}

const NavigationMenuItem = NavigationMenuPrimitive.Item as React.ForwardRefExoticComponent<
	NavigationMenuItemProps & React.RefAttributes<HTMLLIElement>
>;

const navigationMenuTriggerStyle = cva(
	"group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent",
);

export interface NavigationMenuTriggerProps
	extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger> {
	asChild?: boolean;
	/** Trigger label. */
	children?: React.ReactNode;
	className?: string;
}

const NavigationMenuTrigger = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
	NavigationMenuTriggerProps
>(({ className, children, ...props }, ref) => (
	<NavigationMenuPrimitive.Trigger
		ref={ref}
		className={cn(navigationMenuTriggerStyle(), "group", className)}
		{...props}
	>
		{children}{" "}
		<ChevronDown
			className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
			aria-hidden="true"
		/>
	</NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

export interface NavigationMenuContentProps
	extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content> {
	/**
	 * Force the content to mount even when not active. Useful for
	 * preserving form state during transitions.
	 * @default false
	 */
	forceMount?: true;
	/** Fires when focus enters the content. */
	onFocusOutside?: (event: Event) => void;
	/** Fires on pointer event outside the content. */
	onPointerDownOutside?: (event: CustomEvent<{ originalEvent: PointerEvent }>) => void;
	asChild?: boolean;
	/** Sub-menu content. */
	children?: React.ReactNode;
	className?: string;
}

const NavigationMenuContent = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Content>,
	NavigationMenuContentProps
>(({ className, ...props }, ref) => (
	<NavigationMenuPrimitive.Content
		ref={ref}
		className={cn(
			"left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
			className,
		)}
		{...props}
	/>
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

export interface NavigationMenuLinkProps
	extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link> {
	/**
	 * Mark as the current/active link.
	 * @default false
	 */
	active?: boolean;
	/** Fires when the link is selected (click, Enter, Space). */
	onSelect?: (event: Event) => void;
	asChild?: boolean;
	/** Anchor target. */
	href?: string;
	children?: React.ReactNode;
	className?: string;
}

const NavigationMenuLink = NavigationMenuPrimitive.Link as React.ForwardRefExoticComponent<
	NavigationMenuLinkProps & React.RefAttributes<HTMLAnchorElement>
>;

export interface NavigationMenuViewportProps
	extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport> {
	/** Force the viewport to mount even when no content is open. */
	forceMount?: true;
	asChild?: boolean;
	className?: string;
}

const NavigationMenuViewport = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
	NavigationMenuViewportProps
>(({ className, ...props }, ref) => (
	<div className={cn("absolute left-0 top-full flex justify-center")}>
		<NavigationMenuPrimitive.Viewport
			className={cn(
				"origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
				className,
			)}
			ref={ref}
			{...props}
		/>
	</div>
));
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

export interface NavigationMenuIndicatorProps
	extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator> {
	/** Force the indicator to mount even when no content is open. */
	forceMount?: true;
	asChild?: boolean;
	className?: string;
}

const NavigationMenuIndicator = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
	NavigationMenuIndicatorProps
>(({ className, ...props }, ref) => (
	<NavigationMenuPrimitive.Indicator
		ref={ref}
		className={cn(
			"top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
			className,
		)}
		{...props}
	>
		<div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
	</NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

export {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
	navigationMenuTriggerStyle,
};
