import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
				destructive: "bg-destructive text-destructive-foreground shadow hover:bg-destructive/90",
				outline:
					"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
				secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary hover:text-brand",
			},
			size: {
				default: "h-9 px-4 py-2",
				sm: "h-8 rounded-md px-3 text-xs",
				lg: "h-10 rounded-md px-8",
				icon: "h-9 w-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	/**
	 * Visual emphasis preset. `default` is the primary action, `destructive`
	 * is for irreversible actions, `outline` and `secondary` are quieter,
	 * `ghost` is borderless, `link` looks like body-text with a soft
	 * color shift on hover (no underline).
	 * @default "default"
	 */
	variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
	/**
	 * Height + horizontal padding preset. `sm` is 32px, `default` is 36px,
	 * `lg` is 40px, `icon` is square 36×36 for icon-only buttons (always
	 * pair with `aria-label`).
	 * @default "default"
	 */
	size?: "default" | "sm" | "lg" | "icon";
	/**
	 * Render as a Radix Slot — forwards className and behaviour onto the
	 * immediate child element instead of rendering a wrapper `<button>`.
	 * Common pattern for using a router `<Link>` while keeping the Button
	 * styling.
	 * @default false
	 */
	asChild?: boolean;
	/** Visible label or any nested elements (icons, badges). */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the root element via `cn()`. */
	className?: string;
	/**
	 * When true, dims the button to 50% opacity and blocks pointer/keyboard
	 * input.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Native HTML button type. `submit` triggers parent form submission;
	 * `reset` resets parent form fields; `button` does neither.
	 * @default "button"
	 */
	type?: "button" | "submit" | "reset";
	/** Click handler. Receives a `MouseEvent<HTMLButtonElement>`. */
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	/** Form name when this button submits/resets a form (for forms with multiple buttons). */
	name?: string;
	/** Form value sent with the form when this button is the submitter. */
	value?: string | number | readonly string[];
	/**
	 * ID of the form this button belongs to, when the button sits outside
	 * the `<form>` element.
	 */
	form?: string;
	/** Tab order. Default behaviour is one of native `<button>` tab focus. */
	tabIndex?: number;
	/** Accessible label, required for icon-only buttons (`size="icon"`). */
	"aria-label"?: string;
	/** ID of an element that describes the button's purpose. */
	"aria-describedby"?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
