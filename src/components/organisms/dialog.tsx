"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import * as React from "react";

import { usePortalContainer } from "../../lib/portal-container";
import { cn } from "../../lib/utils";

/* ────────────────────────────────────────────────────────────────
 * Public prop interfaces — every prop documented for the docs site
 * and TS hover-info. Mirrors the full Radix Dialog API surface.
 * ──────────────────────────────────────────────────────────────── */

export interface DialogProps extends React.ComponentProps<typeof DialogPrimitive.Root> {
	/**
	 * Controlled open state. Pair with `onOpenChange`. Omit for uncontrolled
	 * usage and pass `defaultOpen` instead.
	 */
	open?: boolean;
	/**
	 * Initial open state for uncontrolled usage. Ignored if `open` is also
	 * passed.
	 * @default false
	 */
	defaultOpen?: boolean;
	/**
	 * Fires whenever the user opens or closes the dialog (escape key, scrim
	 * click, X button, programmatic close).
	 */
	onOpenChange?: (open: boolean) => void;
	/**
	 * When true, blocks focus from leaving the dialog (focus trap) and
	 * renders the scrim overlay over the rest of the page.
	 * @default true
	 */
	modal?: boolean;
	/** Trigger + Content + any other Radix sub-pieces. */
	children?: React.ReactNode;
}

const Dialog = DialogPrimitive.Root as React.FC<DialogProps>;

export interface DialogTriggerProps
	extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger> {
	/**
	 * Render as a Radix Slot — forwards props onto the immediate child
	 * element instead of rendering a wrapper `<button>`.
	 * @default false
	 */
	asChild?: boolean;
	/** The button (or slot) that opens the dialog. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the trigger via `cn()`. */
	className?: string;
}

const DialogTrigger = DialogPrimitive.Trigger as React.ForwardRefExoticComponent<
	DialogTriggerProps & React.RefAttributes<HTMLButtonElement>
>;

export interface DialogPortalProps
	extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Portal> {
	/**
	 * The DOM element to portal the dialog content into. Defaults to
	 * `document.body`. Useful when canvas is embedded inside an iframe and
	 * the dialog should mount in the iframe's document instead of the parent.
	 */
	container?: HTMLElement | null;
	/**
	 * Force the portal to mount its children even when the dialog is
	 * closed. Useful when animation libraries need the DOM nodes to persist
	 * between open/close.
	 * @default false
	 */
	forceMount?: true;
	/** Overlay + Content + Close. */
	children?: React.ReactNode;
}

const DialogPortal = DialogPrimitive.Portal as React.FC<DialogPortalProps>;

export interface DialogCloseProps
	extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close> {
	/**
	 * Render as a Radix Slot — forwards props onto the immediate child
	 * element instead of rendering a wrapper `<button>`.
	 * @default false
	 */
	asChild?: boolean;
	/** The button (or slot) that closes the dialog. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the close button via `cn()`. */
	className?: string;
}

const DialogClose = DialogPrimitive.Close as React.ForwardRefExoticComponent<
	DialogCloseProps & React.RefAttributes<HTMLButtonElement>
>;

export interface DialogOverlayProps
	extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> {
	/**
	 * Render as a Radix Slot — forwards props onto the immediate child
	 * element instead of rendering a wrapper `<div>`.
	 * @default false
	 */
	asChild?: boolean;
	/**
	 * Force the overlay to mount even when the dialog is closed. Pair with
	 * a CSS animation that fades in/out based on `data-state`.
	 * @default false
	 */
	forceMount?: true;
	/** Tailwind / CSS classes merged onto the overlay via `cn()`. Defaults to a black/80% scrim. */
	className?: string;
}

const DialogOverlay = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Overlay>,
	DialogOverlayProps
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Overlay
		ref={ref}
		className={cn(
			"fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
			className,
		)}
		{...props}
	/>
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

export interface DialogContentProps
	extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
	/**
	 * Render as a Radix Slot — forwards props onto the immediate child
	 * element instead of rendering a wrapper `<div>`.
	 * @default false
	 */
	asChild?: boolean;
	/**
	 * Force the content to mount even when the dialog is closed. Pair with
	 * a CSS animation that fades in/out based on `data-state`.
	 * @default false
	 */
	forceMount?: true;
	/**
	 * Fires when focus enters the dialog after it opens. Call
	 * `event.preventDefault()` to prevent the default focus-first-element
	 * behaviour.
	 */
	onOpenAutoFocus?: (event: Event) => void;
	/**
	 * Fires when focus leaves the dialog after it closes. Call
	 * `event.preventDefault()` to prevent focus from returning to the trigger.
	 */
	onCloseAutoFocus?: (event: Event) => void;
	/**
	 * Fires when the Escape key is pressed inside the dialog. Call
	 * `event.preventDefault()` to keep the dialog open.
	 */
	onEscapeKeyDown?: (event: KeyboardEvent) => void;
	/**
	 * Fires when a pointer event happens outside the dialog. Call
	 * `event.preventDefault()` to keep the dialog open.
	 */
	onPointerDownOutside?: (event: CustomEvent<{ originalEvent: PointerEvent }>) => void;
	/**
	 * Fires on any interaction (focus, pointer) outside the dialog. Call
	 * `event.preventDefault()` to keep the dialog open. Superset of the
	 * `onPointerDownOutside` and focus-out events.
	 */
	onInteractOutside?: (event: Event) => void;
	/** Title + Description + body content + Footer. */
	children?: React.ReactNode;
	/**
	 * Tailwind / CSS classes merged onto the content panel via `cn()`.
	 * Default styling: centered, max-w-lg, white card with shadow.
	 */
	className?: string;
}

const DialogContent = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Content>,
	DialogContentProps
>(({ className, children, ...props }, ref) => {
	const container = usePortalContainer();
	return (
		<DialogPortal container={container ?? undefined}>
			<DialogOverlay />
			<DialogPrimitive.Content
				ref={ref}
				className={cn(
					"fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border border-border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
					className,
				)}
				{...props}
			>
				{children}
				<DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
					<X className="h-4 w-4" />
					<span className="sr-only">Close</span>
				</DialogPrimitive.Close>
			</DialogPrimitive.Content>
		</DialogPortal>
	);
});
DialogContent.displayName = DialogPrimitive.Content.displayName;

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * Title + optional description for the dialog. Stacked column on mobile,
	 * left-aligned by default on desktop.
	 */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the header via `cn()`. */
	className?: string;
}

const DialogHeader = ({ className, ...props }: DialogHeaderProps) => (
	<div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * Action buttons for the dialog. Reverses to a column on mobile so the
	 * primary action sits on top.
	 */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the footer via `cn()`. */
	className?: string;
}

const DialogFooter = ({ className, ...props }: DialogFooterProps) => (
	<div
		className={cn(
			"flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end",
			className,
		)}
		{...props}
	/>
);
DialogFooter.displayName = "DialogFooter";

export interface DialogTitleProps
	extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {
	/**
	 * Render as a Radix Slot — forwards props onto the immediate child
	 * element. Use to swap the heading level (e.g. `<h3>` instead of the
	 * default `<h2>`).
	 * @default false
	 */
	asChild?: boolean;
	/** Title text. Required for screen-reader users. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the title via `cn()`. */
	className?: string;
}

const DialogTitle = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Title>,
	DialogTitleProps
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Title
		ref={ref}
		className={cn("text-lg font-semibold leading-none tracking-tight", className)}
		{...props}
	/>
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

export interface DialogDescriptionProps
	extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {
	/**
	 * Render as a Radix Slot — forwards props onto the immediate child
	 * element instead of the default `<p>`.
	 * @default false
	 */
	asChild?: boolean;
	/** Description text shown below the title. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the description via `cn()`. */
	className?: string;
}

const DialogDescription = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Description>,
	DialogDescriptionProps
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Description
		ref={ref}
		className={cn("text-sm text-muted-foreground", className)}
		{...props}
	/>
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
};
