"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";

import { usePortalContainer } from "../../lib/portal-container";
import { cn } from "../../lib/utils";

export interface TooltipProviderProps
	extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider> {
	/**
	 * Delay in ms before any tooltip in the provider opens. Set to 0 for
	 * instant tooltips (e.g. icon rails).
	 * @default 700
	 */
	delayDuration?: number;
	/**
	 * Delay in ms before a tooltip closes after the cursor leaves. Useful
	 * for letting users drag from the trigger to the content.
	 * @default 300
	 */
	skipDelayDuration?: number;
	/**
	 * When true, the tooltip will not close while the user is interacting
	 * with content inside it (e.g. hover, focus).
	 * @default false
	 */
	disableHoverableContent?: boolean;
	/** All `<Tooltip>`s in the subtree share this provider's delays. */
	children: React.ReactNode;
}

const TooltipProvider = TooltipPrimitive.Provider as React.FC<TooltipProviderProps>;

export interface TooltipProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root> {
	/** Controlled open state. */
	open?: boolean;
	/** Initial open state for uncontrolled usage. */
	defaultOpen?: boolean;
	/** Fires whenever the tooltip opens or closes. */
	onOpenChange?: (open: boolean) => void;
	/**
	 * Override the parent provider's `delayDuration` for this tooltip
	 * specifically.
	 */
	delayDuration?: number;
	/**
	 * Override the parent provider's `disableHoverableContent` for this
	 * tooltip.
	 */
	disableHoverableContent?: boolean;
	/** Trigger + Content. */
	children?: React.ReactNode;
}

const Tooltip = TooltipPrimitive.Root as React.FC<TooltipProps>;

export interface TooltipTriggerProps
	extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger> {
	/**
	 * Render as a Radix Slot — forwards props onto the immediate child.
	 * Common pattern for wrapping a `<Button>` or icon.
	 * @default false
	 */
	asChild?: boolean;
	/** The element that opens the tooltip on hover/focus. */
	children?: React.ReactNode;
}

const TooltipTrigger = TooltipPrimitive.Trigger as React.ForwardRefExoticComponent<
	TooltipTriggerProps & React.RefAttributes<HTMLButtonElement>
>;

export interface TooltipContentProps
	extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
	/**
	 * Distance in pixels between the trigger and the tooltip content.
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
	 * @default "top"
	 */
	side?: "top" | "right" | "bottom" | "left";
	/**
	 * Alignment along the chosen side.
	 * @default "center"
	 */
	align?: "start" | "center" | "end";
	/**
	 * Avoid colliding with the viewport edges by flipping/shifting.
	 * @default true
	 */
	avoidCollisions?: boolean;
	/**
	 * Padding kept from collision boundaries.
	 * @default 0
	 */
	collisionPadding?: number | { top?: number; right?: number; bottom?: number; left?: number };
	/**
	 * Stick to the trigger or partially follow on scroll.
	 * @default "partial"
	 */
	sticky?: "partial" | "always";
	/** Hide the content when the trigger is detached or covered. */
	hideWhenDetached?: boolean;
	/**
	 * Force the content to mount even when closed. Pair with a CSS
	 * animation that fades in/out based on `data-state`.
	 * @default false
	 */
	forceMount?: true;
	/**
	 * Render as a Radix Slot — forwards props onto the immediate child.
	 * @default false
	 */
	asChild?: boolean;
	/** Tooltip body. Keep terse — one short line is the convention. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the content via `cn()`. */
	className?: string;
}

const TooltipContent = React.forwardRef<
	React.ElementRef<typeof TooltipPrimitive.Content>,
	TooltipContentProps
>(({ className, sideOffset = 6, children, ...props }, ref) => {
	const container = usePortalContainer();
	return (
		<TooltipPrimitive.Portal container={container ?? undefined}>
			<TooltipPrimitive.Content
				ref={ref}
				data-slot="tooltip-content"
				sideOffset={sideOffset}
				className={cn(
					"z-50 max-w-xs overflow-hidden rounded-md border border-border/50 bg-popover px-2 py-1 text-[11px] font-medium text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1 origin-[var(--radix-tooltip-content-transform-origin)]",
					className,
				)}
				{...props}
			>
				{children}
				<TooltipPrimitive.Arrow width={10} height={5} style={{ fill: "hsl(var(--popover))" }} />
			</TooltipPrimitive.Content>
		</TooltipPrimitive.Portal>
	);
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
