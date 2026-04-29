"use client";

import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../lib/utils";

const toggleVariants = cva(
	"inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-brand data-[state=on]:text-brand-foreground data-[state=on]:hover:bg-brand/90 data-[state=on]:hover:text-brand-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "bg-transparent",
				outline:
					"border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
			},
			size: {
				default: "h-9 px-2 min-w-9",
				sm: "h-8 px-1.5 min-w-8",
				lg: "h-10 px-2.5 min-w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ToggleProps
	extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
		VariantProps<typeof toggleVariants> {
	/**
	 * `default` (filled when on) or `outline` (bordered).
	 * @default "default"
	 */
	variant?: "default" | "outline";
	/**
	 * Square size — `sm` (32px), `default` (36px), or `lg` (40px).
	 * @default "default"
	 */
	size?: "default" | "sm" | "lg";
	/** Controlled pressed state. Pair with `onPressedChange`. */
	pressed?: boolean;
	/**
	 * Initial pressed state for uncontrolled usage.
	 * @default false
	 */
	defaultPressed?: boolean;
	/** Fires when the user toggles the pressed state. */
	onPressedChange?: (pressed: boolean) => void;
	/**
	 * Disable the toggle.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Render as a Radix Slot.
	 * @default false
	 */
	asChild?: boolean;
	/** Toggle content (typically an icon or short label). */
	children?: React.ReactNode;
	className?: string;
}

const Toggle = React.forwardRef<React.ElementRef<typeof TogglePrimitive.Root>, ToggleProps>(
	({ className, variant, size, ...props }, ref) => (
		<TogglePrimitive.Root
			ref={ref}
			className={cn(toggleVariants({ variant, size, className }))}
			{...props}
		/>
	),
);

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
