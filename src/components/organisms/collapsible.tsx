"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import type * as React from "react";

export interface CollapsibleProps extends React.ComponentProps<typeof CollapsiblePrimitive.Root> {
	/** Controlled open state. Pair with `onOpenChange`. */
	open?: boolean;
	/**
	 * Initial open state for uncontrolled usage.
	 * @default false
	 */
	defaultOpen?: boolean;
	/** Fires whenever the collapsible opens or closes. */
	onOpenChange?: (open: boolean) => void;
	/**
	 * Disable the trigger.
	 * @default false
	 */
	disabled?: boolean;
	/** Trigger + Content. */
	children?: React.ReactNode;
	className?: string;
}

const Collapsible = CollapsiblePrimitive.Root as React.FC<CollapsibleProps>;

export interface CollapsibleTriggerProps
	extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger> {
	/**
	 * Render as a Radix Slot — wrap a custom button while keeping the
	 * collapsible's toggle behaviour.
	 * @default false
	 */
	asChild?: boolean;
	/** The button (or slot) that opens/closes the content. */
	children?: React.ReactNode;
	className?: string;
}

const CollapsibleTrigger =
	CollapsiblePrimitive.CollapsibleTrigger as React.ForwardRefExoticComponent<
		CollapsibleTriggerProps & React.RefAttributes<HTMLButtonElement>
	>;

export interface CollapsibleContentProps
	extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent> {
	/**
	 * Force the content to mount even when collapsed. Useful for measuring
	 * height for animations.
	 * @default false
	 */
	forceMount?: true;
	/**
	 * Render as a Radix Slot.
	 * @default false
	 */
	asChild?: boolean;
	/** Content shown when expanded. */
	children?: React.ReactNode;
	className?: string;
}

const CollapsibleContent =
	CollapsiblePrimitive.CollapsibleContent as React.ForwardRefExoticComponent<
		CollapsibleContentProps & React.RefAttributes<HTMLDivElement>
	>;

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
