"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import * as React from "react";

import { cn } from "../../lib/utils";

export interface AccordionProps {
	/**
	 * Selection mode. `"single"` allows one item open at a time;
	 * `"multiple"` allows multiple items open simultaneously.
	 */
	type: "single" | "multiple";
	/**
	 * Controlled value. For `type="single"` it's a string (id of the open
	 * item); for `type="multiple"` it's a string array.
	 */
	value?: string | string[];
	/** Initial value for uncontrolled usage. */
	defaultValue?: string | string[];
	/** Fires when the user opens/closes an item. */
	onValueChange?: (value: string & string[]) => void;
	/**
	 * For `type="single"` only — when true, an open item can be collapsed
	 * by clicking it again.
	 * @default false
	 */
	collapsible?: boolean;
	/**
	 * Disable the entire accordion.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Reading direction. Affects keyboard arrow navigation.
	 * @default "ltr"
	 */
	dir?: "ltr" | "rtl";
	/**
	 * Layout direction.
	 * @default "vertical"
	 */
	orientation?: "vertical" | "horizontal";
	/**
	 * Render as a Radix Slot.
	 * @default false
	 */
	asChild?: boolean;
	/** A list of `<AccordionItem>`s. */
	children?: React.ReactNode;
	className?: string;
}

const Accordion = AccordionPrimitive.Root as React.ForwardRefExoticComponent<
	AccordionProps & React.RefAttributes<HTMLDivElement>
>;

export interface AccordionItemProps
	extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {
	/** Required — unique value identifying this item. */
	value: string;
	/**
	 * Disable only this item.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Render as a Radix Slot.
	 * @default false
	 */
	asChild?: boolean;
	/** A `<AccordionTrigger>` + `<AccordionContent>`. */
	children?: React.ReactNode;
	className?: string;
}

const AccordionItem = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Item>,
	AccordionItemProps
>(({ className, ...props }, ref) => (
	<AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

export interface AccordionTriggerProps
	extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
	/**
	 * Render as a Radix Slot.
	 * @default false
	 */
	asChild?: boolean;
	/** Trigger label — typically a section heading. */
	children?: React.ReactNode;
	className?: string;
}

const AccordionTrigger = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Trigger>,
	AccordionTriggerProps
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Header className="flex">
		<AccordionPrimitive.Trigger
			ref={ref}
			className={cn(
				"flex flex-1 items-center justify-between py-4 text-sm font-medium transition-colors hover:text-foreground/70 text-left [&[data-state=open]>svg]:rotate-180",
				className,
			)}
			{...props}
		>
			{children}
			<ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
		</AccordionPrimitive.Trigger>
	</AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

export interface AccordionContentProps
	extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
	/**
	 * Force the content to mount even when collapsed.
	 * @default false
	 */
	forceMount?: true;
	/**
	 * Render as a Radix Slot.
	 * @default false
	 */
	asChild?: boolean;
	/** Item body. */
	children?: React.ReactNode;
	className?: string;
}

const AccordionContent = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Content>,
	AccordionContentProps
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Content
		ref={ref}
		className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
		{...props}
	>
		<div className={cn("pb-4 pt-0", className)}>{children}</div>
	</AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
