"use client";

import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import * as React from "react";

import { usePortalContainer } from "../../lib/portal-container";
import { cn } from "../../lib/utils";
import { buttonVariants } from "../atoms/button";

export interface AlertDialogProps extends React.ComponentProps<typeof AlertDialogPrimitive.Root> {
	/** Controlled open state. Pair with `onOpenChange`. */
	open?: boolean;
	/**
	 * Initial open state for uncontrolled usage.
	 * @default false
	 */
	defaultOpen?: boolean;
	/** Fires whenever the dialog opens or closes. */
	onOpenChange?: (open: boolean) => void;
	/** Trigger + Content. */
	children?: React.ReactNode;
}

const AlertDialog = AlertDialogPrimitive.Root as React.FC<AlertDialogProps>;

export interface AlertDialogTriggerProps
	extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Trigger> {
	/**
	 * Render as a Radix Slot — forwards props onto the immediate child.
	 * @default false
	 */
	asChild?: boolean;
	/** The button (or slot) that opens the alert. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged via `cn()`. */
	className?: string;
}

const AlertDialogTrigger = AlertDialogPrimitive.Trigger as React.ForwardRefExoticComponent<
	AlertDialogTriggerProps & React.RefAttributes<HTMLButtonElement>
>;

export interface AlertDialogPortalProps
	extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Portal> {
	/** DOM element to portal into. Defaults to `document.body`. */
	container?: HTMLElement | null;
	/**
	 * Force the portal to mount its children even when closed.
	 * @default false
	 */
	forceMount?: true;
	children?: React.ReactNode;
}

const AlertDialogPortal = AlertDialogPrimitive.Portal as React.FC<AlertDialogPortalProps>;

export interface AlertDialogOverlayProps
	extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay> {
	/**
	 * Render as a Radix Slot — forwards props onto the immediate child.
	 * @default false
	 */
	asChild?: boolean;
	/**
	 * Force the overlay to mount even when closed.
	 * @default false
	 */
	forceMount?: true;
	/** Tailwind / CSS classes merged via `cn()`. */
	className?: string;
}

const AlertDialogOverlay = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
	AlertDialogOverlayProps
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Overlay
		className={cn(
			"fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
			className,
		)}
		{...props}
		ref={ref}
	/>
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

export interface AlertDialogContentProps
	extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> {
	/**
	 * Render as a Radix Slot — forwards props onto the immediate child.
	 * @default false
	 */
	asChild?: boolean;
	/**
	 * Force the content to mount even when closed. Useful for
	 * exit animations.
	 * @default false
	 */
	forceMount?: true;
	/** Fires when focus enters the dialog after it opens. */
	onOpenAutoFocus?: (event: Event) => void;
	/** Fires when focus leaves the dialog after it closes. */
	onCloseAutoFocus?: (event: Event) => void;
	/** Fires when the Escape key is pressed. */
	onEscapeKeyDown?: (event: KeyboardEvent) => void;
	/**
	 * Title + Description + Footer (with `<AlertDialogAction>` and
	 * `<AlertDialogCancel>`).
	 */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged via `cn()`. */
	className?: string;
}

const AlertDialogContent = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Content>,
	AlertDialogContentProps
>(({ className, ...props }, ref) => {
	const container = usePortalContainer();
	return (
		<AlertDialogPortal container={container ?? undefined}>
			<AlertDialogOverlay />
			<AlertDialogPrimitive.Content
				ref={ref}
				className={cn(
					"fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border border-border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
					className,
				)}
				{...props}
			/>
		</AlertDialogPortal>
	);
});
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

export interface AlertDialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Title + optional description. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged via `cn()`. */
	className?: string;
}

const AlertDialogHeader = ({ className, ...props }: AlertDialogHeaderProps) => (
	<div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

export interface AlertDialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Action + Cancel buttons. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged via `cn()`. */
	className?: string;
}

const AlertDialogFooter = ({ className, ...props }: AlertDialogFooterProps) => (
	<div
		className={cn(
			"flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end",
			className,
		)}
		{...props}
	/>
);
AlertDialogFooter.displayName = "AlertDialogFooter";

export interface AlertDialogTitleProps
	extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title> {
	/**
	 * Render as a Radix Slot — useful to swap the heading level.
	 * @default false
	 */
	asChild?: boolean;
	/** Title text. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged via `cn()`. */
	className?: string;
}

const AlertDialogTitle = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Title>,
	AlertDialogTitleProps
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Title
		ref={ref}
		className={cn("text-lg font-semibold", className)}
		{...props}
	/>
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

export interface AlertDialogDescriptionProps
	extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description> {
	/**
	 * Render as a Radix Slot.
	 * @default false
	 */
	asChild?: boolean;
	/** Description text shown below the title. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged via `cn()`. */
	className?: string;
}

const AlertDialogDescription = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Description>,
	AlertDialogDescriptionProps
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Description
		ref={ref}
		className={cn("text-sm text-muted-foreground", className)}
		{...props}
	/>
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

export interface AlertDialogActionProps
	extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> {
	/**
	 * Render as a Radix Slot — wrap a custom button while still hooking the
	 * dialog's commit behaviour.
	 * @default false
	 */
	asChild?: boolean;
	/** Action label (e.g. "Delete", "Confirm"). */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged via `cn()`. Defaults to canvas's primary button. */
	className?: string;
}

const AlertDialogAction = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Action>,
	AlertDialogActionProps
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants(), className)} {...props} />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

export interface AlertDialogCancelProps
	extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> {
	/**
	 * Render as a Radix Slot.
	 * @default false
	 */
	asChild?: boolean;
	/** Cancel label (e.g. "Cancel", "Keep editing"). */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged via `cn()`. Defaults to canvas's outline button. */
	className?: string;
}

const AlertDialogCancel = React.forwardRef<
	React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
	AlertDialogCancelProps
>(({ className, ...props }, ref) => (
	<AlertDialogPrimitive.Cancel
		ref={ref}
		className={cn(buttonVariants({ variant: "outline" }), className)}
		{...props}
	/>
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	AlertDialogPortal,
	AlertDialogTitle,
	AlertDialogTrigger,
};
