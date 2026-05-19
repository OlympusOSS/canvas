"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";

import { usePortalContainer } from "../../lib/portal-container";
import { cn } from "../../lib/utils";

export interface PopoverProps extends React.ComponentProps<typeof PopoverPrimitive.Root> {
	/** Controlled open state. Pair with `onOpenChange`. */
	open?: boolean;
	/**
	 * Initial open state for uncontrolled usage.
	 * @default false
	 */
	defaultOpen?: boolean;
	/** Fires whenever the popover opens or closes. */
	onOpenChange?: (open: boolean) => void;
	/**
	 * When true, blocks focus from leaving the popover.
	 * @default false
	 */
	modal?: boolean;
	/** Trigger + Content. */
	children?: React.ReactNode;
}

const Popover = PopoverPrimitive.Root as React.FC<PopoverProps>;

export interface PopoverTriggerProps
	extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger> {
	/**
	 * Render as a Radix Slot — wrap a custom button while keeping the
	 * popover's trigger behaviour.
	 * @default false
	 */
	asChild?: boolean;
	children?: React.ReactNode;
	className?: string;
}

const PopoverTrigger = PopoverPrimitive.Trigger as React.ForwardRefExoticComponent<
	PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>
>;

export interface PopoverAnchorProps
	extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Anchor> {
	/**
	 * Render as a Radix Slot. Use to anchor the popover to an element other
	 * than the trigger (e.g. a parent input while the trigger is a button).
	 * @default false
	 */
	asChild?: boolean;
	children?: React.ReactNode;
}

const PopoverAnchor = PopoverPrimitive.Anchor as React.ForwardRefExoticComponent<
	PopoverAnchorProps & React.RefAttributes<HTMLDivElement>
>;

export interface PopoverContentProps
	extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
	/**
	 * Distance in pixels between the anchor and the popover.
	 * @default 4
	 */
	sideOffset?: number;
	/**
	 * Distance from the alignment edge.
	 * @default 0
	 */
	alignOffset?: number;
	/**
	 * Preferred side of the anchor to render on.
	 * @default "bottom"
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
	/** Fires when focus enters the popover after it opens. */
	onOpenAutoFocus?: (event: Event) => void;
	/** Fires when focus leaves the popover after it closes. */
	onCloseAutoFocus?: (event: Event) => void;
	/** Fires when the Escape key is pressed inside the popover. */
	onEscapeKeyDown?: (event: KeyboardEvent) => void;
	/** Fires on pointer event outside the popover. */
	onPointerDownOutside?: (event: CustomEvent<{ originalEvent: PointerEvent }>) => void;
	/** Fires on any interaction outside (focus + pointer). */
	onInteractOutside?: (event: Event) => void;
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
	/** Popover body. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged via `cn()`. */
	className?: string;
}

const PopoverContent = React.forwardRef<
	React.ElementRef<typeof PopoverPrimitive.Content>,
	PopoverContentProps
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => {
	const container = usePortalContainer();
	return (
		<PopoverPrimitive.Portal container={container ?? undefined}>
			<PopoverPrimitive.Content
				ref={ref}
				data-slot="popover-content"
				align={align}
				sideOffset={sideOffset}
				className={cn(
					"z-50 w-72 rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[var(--radix-popover-content-transform-origin)]",
					className,
				)}
				{...props}
			/>
		</PopoverPrimitive.Portal>
	);
});
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger };
