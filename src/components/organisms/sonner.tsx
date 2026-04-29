"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterPropsBase = React.ComponentProps<typeof Sonner>;

export interface ToasterProps extends ToasterPropsBase {
	/**
	 * Where toasts stack.
	 * @default "bottom-right"
	 */
	position?:
		| "top-left"
		| "top-center"
		| "top-right"
		| "bottom-left"
		| "bottom-center"
		| "bottom-right";
	/**
	 * Toast colour scheme. Defaults to inheriting from `next-themes`.
	 * @default "system"
	 */
	theme?: "light" | "dark" | "system";
	/**
	 * Make toasts rich-coloured by default — success/error/warning tints.
	 * @default false
	 */
	richColors?: boolean;
	/**
	 * Show a close button on every toast.
	 * @default false
	 */
	closeButton?: boolean;
	/**
	 * How long toasts stay visible (ms).
	 * @default 4000
	 */
	duration?: number;
	/**
	 * Visual gap between stacked toasts (px).
	 * @default 14
	 */
	gap?: number;
	/**
	 * Maximum number of toasts visible at once.
	 * @default 3
	 */
	visibleToasts?: number;
	/**
	 * Hide the toaster's offset region — useful when you want toasts to
	 * butt against the viewport edge.
	 * @default 32
	 */
	offset?: string | number;
	/**
	 * Pause toast timers when the user hovers any toast.
	 * @default true
	 */
	pauseWhenPageIsHidden?: boolean;
	/**
	 * Reading direction.
	 * @default "ltr"
	 */
	dir?: "ltr" | "rtl" | "auto";
	/** Tailwind / CSS classes merged onto the toaster region. */
	className?: string;
	/**
	 * Default toast options applied to every toast (className,
	 * descriptionClassName, etc.). See sonner docs for the full list.
	 */
	toastOptions?: ToasterPropsBase["toastOptions"];
}

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			className="toaster group"
			toastOptions={{
				classNames: {
					toast:
						"group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
					description: "group-[.toast]:text-muted-foreground",
					actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
					cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
				},
			}}
			{...props}
		/>
	);
};

export { Toaster, toast };
