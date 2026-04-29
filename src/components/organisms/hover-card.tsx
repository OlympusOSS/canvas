"use client";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import * as React from "react";

import { cn } from "../../lib/utils";

export interface HoverCardProps extends React.ComponentProps<typeof HoverCardPrimitive.Root> {
	/** Controlled open state. Pair with `onOpenChange`. */
	open?: boolean;
	/**
	 * Initial open state for uncontrolled usage.
	 * @default false
	 */
	defaultOpen?: boolean;
	/** Fires whenever the hover card opens or closes. */
	onOpenChange?: (open: boolean) => void;
	/**
	 * Delay in ms before the card opens after the user hovers the trigger.
	 * @default 700
	 */
	openDelay?: number;
	/**
	 * Delay in ms before the card closes after the cursor leaves.
	 * @default 300
	 */
	closeDelay?: number;
	/** Trigger + Content. */
	children?: React.ReactNode;
}

const HoverCard = HoverCardPrimitive.Root as React.FC<HoverCardProps>;

export interface HoverCardTriggerProps
	extends React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Trigger> {
	/**
	 * Render as a Radix Slot.
	 * @default false
	 */
	asChild?: boolean;
	children?: React.ReactNode;
	className?: string;
}

const HoverCardTrigger = HoverCardPrimitive.Trigger as React.ForwardRefExoticComponent<
	HoverCardTriggerProps & React.RefAttributes<HTMLAnchorElement>
>;

export interface HoverCardContentProps
	extends React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> {
	/**
	 * Distance in pixels between the trigger and the card.
	 * @default 4
	 */
	sideOffset?: number;
	/**
	 * Distance from the alignment edge.
	 * @default 0
	 */
	alignOffset?: number;
	/**
	 * Preferred side of the trigger to render on.
	 * @default "bottom"
	 */
	side?: "top" | "right" | "bottom" | "left";
	/**
	 * Alignment along the chosen side.
	 * @default "center"
	 */
	align?: "start" | "center" | "end";
	/**
	 * Avoid colliding with the viewport edges.
	 * @default true
	 */
	avoidCollisions?: boolean;
	/**
	 * Padding kept from collision boundaries.
	 * @default 0
	 */
	collisionPadding?: number | { top?: number; right?: number; bottom?: number; left?: number };
	/**
	 * Force the content to mount even when closed.
	 * @default false
	 */
	forceMount?: true;
	/**
	 * Render as a Radix Slot.
	 * @default false
	 */
	asChild?: boolean;
	/** Card body. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged via `cn()`. */
	className?: string;
}

const HoverCardContent = React.forwardRef<
	React.ElementRef<typeof HoverCardPrimitive.Content>,
	HoverCardContentProps
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
	<HoverCardPrimitive.Content
		ref={ref}
		align={align}
		sideOffset={sideOffset}
		className={cn(
			"z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[var(--radix-hover-card-content-transform-origin)]",
			className,
		)}
		{...props}
	/>
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardContent, HoverCardTrigger };
