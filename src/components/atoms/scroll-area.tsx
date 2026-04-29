"use client";

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import * as React from "react";

import { cn } from "../../lib/utils";

export interface ScrollAreaProps
	extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
	/**
	 * When the scrollbar is shown:
	 * - `"hover"` reveals on hover and 600ms after scroll
	 * - `"scroll"` reveals only while scrolling
	 * - `"auto"` defers to OS conventions (always-visible on Linux/Win)
	 * - `"always"` keeps the scrollbar visible at all times
	 * @default "hover"
	 */
	type?: "auto" | "always" | "scroll" | "hover";
	/**
	 * How long the scrollbar lingers after scroll/hover ends, in ms. Only
	 * applies when `type` is `"hover"` or `"scroll"`.
	 * @default 600
	 */
	scrollHideDelay?: number;
	/**
	 * Reading direction. Affects which side the vertical scrollbar lives on.
	 * @default "ltr"
	 */
	dir?: "ltr" | "rtl";
	/**
	 * Render as a Radix Slot — forwards props onto the immediate child
	 * element instead of rendering a wrapper `<div>`.
	 * @default false
	 */
	asChild?: boolean;
	/** Scrollable content. */
	children?: React.ReactNode;
	/**
	 * Tailwind / CSS classes merged onto the root via `cn()`. Set the
	 * height/max-height here so the scroll area knows when to scroll.
	 */
	className?: string;
}

const ScrollArea = React.forwardRef<
	React.ElementRef<typeof ScrollAreaPrimitive.Root>,
	ScrollAreaProps
>(({ className, children, ...props }, ref) => (
	<ScrollAreaPrimitive.Root
		ref={ref}
		className={cn("relative overflow-hidden", className)}
		{...props}
	>
		<ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
			{children}
		</ScrollAreaPrimitive.Viewport>
		<ScrollBar />
		<ScrollAreaPrimitive.Corner />
	</ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

export interface ScrollBarProps
	extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> {
	/**
	 * Which axis the scrollbar controls.
	 * @default "vertical"
	 */
	orientation?: "horizontal" | "vertical";
	/**
	 * Force the scrollbar to mount even when it's not needed (no overflow).
	 * Pair with a CSS animation that fades in/out based on `data-state`.
	 * @default false
	 */
	forceMount?: true;
	/**
	 * Render as a Radix Slot — forwards props onto the immediate child
	 * element instead of rendering a wrapper `<div>`.
	 * @default false
	 */
	asChild?: boolean;
	/** Tailwind / CSS classes merged onto the scrollbar via `cn()`. */
	className?: string;
}

const ScrollBar = React.forwardRef<
	React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
	ScrollBarProps
>(({ className, orientation = "vertical", ...props }, ref) => (
	<ScrollAreaPrimitive.ScrollAreaScrollbar
		ref={ref}
		orientation={orientation}
		className={cn(
			"flex touch-none select-none transition-colors",
			orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
			orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
			className,
		)}
		{...props}
	>
		<ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
	</ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
