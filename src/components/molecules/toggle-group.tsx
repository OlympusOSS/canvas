"use client";

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../lib/utils";
import { toggleVariants } from "../atoms/toggle";

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
	size: "default",
	variant: "default",
});

export interface ToggleGroupProps {
	/**
	 * Selection mode. `"single"` allows one item active at a time;
	 * `"multiple"` allows independent toggles.
	 */
	type: "single" | "multiple";
	/**
	 * Controlled value. For `type="single"` it's a string; for
	 * `type="multiple"` it's an array of strings.
	 */
	value?: string | string[];
	/** Initial value for uncontrolled usage. */
	defaultValue?: string | string[];
	/** Fires when the user toggles an item. */
	onValueChange?: (value: string & string[]) => void;
	/**
	 * Disable every toggle in the group.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Layout direction.
	 * @default "horizontal"
	 */
	orientation?: "horizontal" | "vertical";
	/**
	 * Reading direction. Affects keyboard arrow navigation.
	 * @default "ltr"
	 */
	dir?: "ltr" | "rtl";
	/**
	 * When true, arrow-key navigation wraps from the last item to the first.
	 * @default true
	 */
	loop?: boolean;
	/**
	 * Filled vs outlined preset (inherits from `<Toggle>`).
	 * @default "default"
	 */
	variant?: "default" | "outline";
	/**
	 * Size preset (inherits from `<Toggle>`).
	 * @default "default"
	 */
	size?: "default" | "sm" | "lg";
	/**
	 * Render as a Radix Slot — forwards props onto the immediate child.
	 * @default false
	 */
	asChild?: boolean;
	/** A flat list of `<ToggleGroupItem>`s. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the group via `cn()`. */
	className?: string;
}

const ToggleGroupImpl = React.forwardRef<
	React.ElementRef<typeof ToggleGroupPrimitive.Root>,
	ToggleGroupProps
>(({ className, variant, size, children, ...props }, ref) => (
	<ToggleGroupPrimitive.Root
		ref={ref}
		// biome-ignore lint/suspicious/noExplicitAny: Radix's discriminated union doesn't survive intersection
		{...(props as any)}
		className={cn("flex items-center justify-center gap-1", className)}
	>
		<ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
	</ToggleGroupPrimitive.Root>
));

ToggleGroupImpl.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroup = ToggleGroupImpl as React.ForwardRefExoticComponent<
	ToggleGroupProps & React.RefAttributes<HTMLDivElement>
>;

export interface ToggleGroupItemProps
	extends React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>,
		VariantProps<typeof toggleVariants> {
	/** Required — value reported when this toggle is active. */
	value: string;
	/**
	 * Disable only this toggle.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Filled vs outlined. Defaults to inheriting from the parent
	 * `<ToggleGroup>`.
	 */
	variant?: "default" | "outline";
	/**
	 * Size preset. Defaults to inheriting from the parent `<ToggleGroup>`.
	 */
	size?: "default" | "sm" | "lg";
	/**
	 * Render as a Radix Slot — forwards props onto the immediate child.
	 * @default false
	 */
	asChild?: boolean;
	/** Toggle label or icon. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the toggle via `cn()`. */
	className?: string;
}

const ToggleGroupItem = React.forwardRef<
	React.ElementRef<typeof ToggleGroupPrimitive.Item>,
	ToggleGroupItemProps
>(({ className, children, variant, size, ...props }, ref) => {
	const context = React.useContext(ToggleGroupContext);

	return (
		<ToggleGroupPrimitive.Item
			ref={ref}
			className={cn(
				toggleVariants({
					variant: context.variant || variant,
					size: context.size || size,
				}),
				className,
			)}
			{...props}
		>
			{children}
		</ToggleGroupPrimitive.Item>
	);
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
