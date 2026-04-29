"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";
import * as React from "react";

import { cn } from "../../lib/utils";

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
	/** Controlled state. */
	checked?: boolean;
	/**
	 * Initial state for uncontrolled usage.
	 * @default false
	 */
	defaultChecked?: boolean;
	/** Fires when the user flips the switch. */
	onCheckedChange?: (checked: boolean) => void;
	/**
	 * Dims and blocks input.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Block native form submit unless the switch is on.
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
 * Wraps Radix's `Switch.Root` — a binary on/off toggle. Pair with `<Label>`
 * for accessibility.
 */
const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
	({ className, ...props }, ref) => (
		<SwitchPrimitives.Root
			className={cn(
				"peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
				className,
			)}
			{...props}
			ref={ref}
		>
			<SwitchPrimitives.Thumb
				className={cn(
					"pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
				)}
			/>
		</SwitchPrimitives.Root>
	),
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
