"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import * as React from "react";

import { cn } from "../../lib/utils";

export interface CheckboxProps
	extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
	/**
	 * Controlled checked state. Pass `'indeterminate'` to render the dash
	 * glyph instead of the check.
	 */
	checked?: boolean | "indeterminate";
	/**
	 * Initial state for uncontrolled usage.
	 * @default false
	 */
	defaultChecked?: boolean | "indeterminate";
	/** Fires when the user toggles the checkbox. Use this instead of `onChange`. */
	onCheckedChange?: (checked: boolean | "indeterminate") => void;
	/**
	 * Dims to 50% and blocks input.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Block native form submit unless the box is checked.
	 * @default false
	 */
	required?: boolean;
	/** Form field name for native form submission. */
	name?: string;
	/** Form field value when submitted. */
	value?: string;
	asChild?: boolean;
	className?: string;
}

/**
 * Wraps Radix's `Checkbox.Root`. The check glyph is rendered inside
 * automatically.
 */
const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
	({ className, ...props }, ref) => (
		<CheckboxPrimitive.Root
			ref={ref}
			className={cn(
				"grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
				className,
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator className={cn("grid place-content-center text-current")}>
				<Check className="h-4 w-4" />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	),
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
