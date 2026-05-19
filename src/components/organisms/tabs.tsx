"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";

import { cn } from "../../lib/utils";

export interface TabsProps extends React.ComponentProps<typeof TabsPrimitive.Root> {
	/** Controlled active tab value. Pair with `onValueChange`. */
	value?: string;
	/** Initial active tab for uncontrolled usage. */
	defaultValue?: string;
	/** Fires when the user switches tabs. */
	onValueChange?: (value: string) => void;
	/**
	 * Tab orientation. Affects keyboard arrow navigation.
	 * @default "horizontal"
	 */
	orientation?: "horizontal" | "vertical";
	/**
	 * Reading direction.
	 * @default "ltr"
	 */
	dir?: "ltr" | "rtl";
	/**
	 * When and how content is activated.
	 * - `automatic` activates on focus (best for tabs that load fast)
	 * - `manual` requires Enter/Space (best for tabs that fetch data)
	 * @default "automatic"
	 */
	activationMode?: "automatic" | "manual";
	/** TabsList + TabsContent siblings. */
	children?: React.ReactNode;
	className?: string;
}

const Tabs = TabsPrimitive.Root as React.FC<TabsProps>;

export interface TabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
	/** When true, hold-to-skip-disabled-tabs is on. */
	loop?: boolean;
	/**
	 * Render as a Radix Slot.
	 * @default false
	 */
	asChild?: boolean;
	/** A flat list of `<TabsTrigger>`s. */
	children?: React.ReactNode;
	className?: string;
}

const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, TabsListProps>(
	({ className, ...props }, ref) => (
		<TabsPrimitive.List
			ref={ref}
			data-slot="tabs-list"
			className={cn(
				"inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
				className,
			)}
			{...props}
		/>
	),
);
TabsList.displayName = TabsPrimitive.List.displayName;

export interface TabsTriggerProps
	extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
	/** Required — value of the tab this trigger activates. Match with `<TabsContent value>`. */
	value: string;
	/** Disable this tab. */
	disabled?: boolean;
	/**
	 * Render as a Radix Slot.
	 * @default false
	 */
	asChild?: boolean;
	/** Tab label. */
	children?: React.ReactNode;
	className?: string;
}

const TabsTrigger = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Trigger>,
	TabsTriggerProps
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Trigger
		ref={ref}
		className={cn(
			"inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
			className,
		)}
		{...props}
	/>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export interface TabsContentProps
	extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {
	/** Required — matches the `value` of a `<TabsTrigger>`. */
	value: string;
	/**
	 * Force the content to mount even when not active. Useful for
	 * preserving form state across tab switches.
	 * @default false
	 */
	forceMount?: true;
	/**
	 * Render as a Radix Slot.
	 * @default false
	 */
	asChild?: boolean;
	/** Tab pane body. */
	children?: React.ReactNode;
	className?: string;
}

const TabsContent = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Content>,
	TabsContentProps
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Content
		ref={ref}
		className={cn(
			"mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
			className,
		)}
		{...props}
	/>
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
