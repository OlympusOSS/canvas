"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import * as React from "react";

import { cn } from "../../lib/utils";

export interface RadioGroupProps
	extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
	/**
	 * Controlled selected value. Pair with `onValueChange`. Match the
	 * `value` of one of the child `<RadioGroupItem>`s.
	 */
	value?: string;
	/**
	 * Initial selected value for uncontrolled usage. Ignored if `value` is
	 * also passed.
	 */
	defaultValue?: string;
	/** Fires when the user picks a different option. */
	onValueChange?: (value: string) => void;
	/**
	 * Disables every radio in the group.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Required for native form submission — at least one option must be
	 * selected.
	 * @default false
	 */
	required?: boolean;
	/** Form field name. Required when relying on uncontrolled native form submission. */
	name?: string;
	/**
	 * Layout direction of the radios.
	 * @default "vertical"
	 */
	orientation?: "horizontal" | "vertical";
	/**
	 * Reading direction of the group. Affects keyboard arrow navigation.
	 * @default "ltr"
	 */
	dir?: "ltr" | "rtl";
	/**
	 * When true, arrow-key navigation wraps from the last item back to the
	 * first.
	 * @default true
	 */
	loop?: boolean;
	/**
	 * Render as a Radix Slot — forwards props onto the immediate child
	 * element instead of rendering a wrapper `<div>`.
	 * @default false
	 */
	asChild?: boolean;
	/** A flat list of `<RadioGroupItem>`s. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the group via `cn()`. */
	className?: string;
}

const RadioGroup = React.forwardRef<
	React.ElementRef<typeof RadioGroupPrimitive.Root>,
	RadioGroupProps
>(({ className, ...props }, ref) => {
	return <RadioGroupPrimitive.Root className={cn("grid gap-2", className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

export interface RadioGroupItemProps
	extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
	/**
	 * Value reported when this radio is selected. Required — must match
	 * the parent `<RadioGroup>`'s `value` for selection to register.
	 */
	value: string;
	/**
	 * Disables only this radio.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Required for native form submission.
	 * @default false
	 */
	required?: boolean;
	/**
	 * Render as a Radix Slot — forwards props onto the immediate child
	 * element instead of rendering a wrapper `<button>`.
	 * @default false
	 */
	asChild?: boolean;
	/** Optional inner content (visual only — Radix provides the indicator). */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the radio button via `cn()`. */
	className?: string;
}

const RadioGroupItem = React.forwardRef<
	React.ElementRef<typeof RadioGroupPrimitive.Item>,
	RadioGroupItemProps
>(({ className, ...props }, ref) => {
	return (
		<RadioGroupPrimitive.Item
			ref={ref}
			className={cn(
				"aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		>
			<RadioGroupPrimitive.Indicator className="flex items-center justify-center">
				<Circle className="h-3.5 w-3.5 fill-primary" />
			</RadioGroupPrimitive.Indicator>
		</RadioGroupPrimitive.Item>
	);
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
