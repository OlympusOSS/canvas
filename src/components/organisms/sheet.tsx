"use client";

import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";

import { usePortalContainer } from "../../lib/portal-container";
import { cn } from "../../lib/utils";

export interface SheetProps extends React.ComponentProps<typeof SheetPrimitive.Root> {
	/** Controlled open state. Pair with `onOpenChange`. */
	open?: boolean;
	/**
	 * Initial open state for uncontrolled usage.
	 * @default false
	 */
	defaultOpen?: boolean;
	/** Fires whenever the sheet opens or closes. */
	onOpenChange?: (open: boolean) => void;
	/**
	 * When true, the sheet traps focus and renders the scrim overlay.
	 * @default true
	 */
	modal?: boolean;
	/** Trigger + Content. */
	children?: React.ReactNode;
}

const Sheet = SheetPrimitive.Root as React.FC<SheetProps>;

export interface SheetTriggerProps
	extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Trigger> {
	/**
	 * Render as a Radix Slot.
	 * @default false
	 */
	asChild?: boolean;
	children?: React.ReactNode;
	className?: string;
}

const SheetTrigger = SheetPrimitive.Trigger as React.ForwardRefExoticComponent<
	SheetTriggerProps & React.RefAttributes<HTMLButtonElement>
>;

export interface SheetCloseProps
	extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Close> {
	/**
	 * Render as a Radix Slot.
	 * @default false
	 */
	asChild?: boolean;
	children?: React.ReactNode;
	className?: string;
}

const SheetClose = SheetPrimitive.Close as React.ForwardRefExoticComponent<
	SheetCloseProps & React.RefAttributes<HTMLButtonElement>
>;

export interface SheetPortalProps
	extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Portal> {
	/** DOM element to portal into. Defaults to `document.body`. */
	container?: HTMLElement | null;
	/**
	 * Force the portal to mount even when the sheet is closed.
	 * @default false
	 */
	forceMount?: true;
	children?: React.ReactNode;
}

const SheetPortal = SheetPrimitive.Portal as React.FC<SheetPortalProps>;

export interface SheetOverlayProps
	extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay> {
	/**
	 * Render as a Radix Slot.
	 * @default false
	 */
	asChild?: boolean;
	/**
	 * Force the overlay to mount even when closed.
	 * @default false
	 */
	forceMount?: true;
	className?: string;
}

const SheetOverlay = React.forwardRef<
	React.ElementRef<typeof SheetPrimitive.Overlay>,
	SheetOverlayProps
>(({ className, ...props }, ref) => (
	<SheetPrimitive.Overlay
		className={cn(
			"fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
			className,
		)}
		{...props}
		ref={ref}
	/>
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
	"fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
	{
		variants: {
			side: {
				top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
				bottom:
					"inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
				left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
				right:
					"inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
			},
		},
		defaultVariants: {
			side: "right",
		},
	},
);

export interface SheetContentProps
	extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
		VariantProps<typeof sheetVariants> {
	/**
	 * Which edge of the viewport the sheet slides in from.
	 * @default "right"
	 */
	side?: "top" | "right" | "bottom" | "left";
	/**
	 * Render as a Radix Slot.
	 * @default false
	 */
	asChild?: boolean;
	/**
	 * Force the content to mount even when closed.
	 * @default false
	 */
	forceMount?: true;
	/** Fires when focus enters the sheet after it opens. */
	onOpenAutoFocus?: (event: Event) => void;
	/** Fires when focus leaves the sheet after it closes. */
	onCloseAutoFocus?: (event: Event) => void;
	/** Fires when Escape is pressed. */
	onEscapeKeyDown?: (event: KeyboardEvent) => void;
	/** Fires on pointer event outside the sheet. */
	onPointerDownOutside?: (event: CustomEvent<{ originalEvent: PointerEvent }>) => void;
	/** Fires on any interaction outside (focus + pointer). */
	onInteractOutside?: (event: Event) => void;
	/** Sheet body — `<SheetHeader>`, content, `<SheetFooter>`. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged via `cn()`. */
	className?: string;
}

const SheetContent = React.forwardRef<
	React.ElementRef<typeof SheetPrimitive.Content>,
	SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => {
	const container = usePortalContainer();
	return (
		<SheetPortal container={container ?? undefined}>
			<SheetOverlay />
			<SheetPrimitive.Content
				ref={ref}
				className={cn(sheetVariants({ side }), className)}
				{...props}
			>
				<SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
					<X className="h-4 w-4" />
					<span className="sr-only">Close</span>
				</SheetPrimitive.Close>
				{children}
			</SheetPrimitive.Content>
		</SheetPortal>
	);
});
SheetContent.displayName = SheetPrimitive.Content.displayName;

export interface SheetHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Title + optional description. */
	children?: React.ReactNode;
	className?: string;
}

const SheetHeader = ({ className, ...props }: SheetHeaderProps) => (
	<div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
SheetHeader.displayName = "SheetHeader";

export interface SheetFooterProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Action buttons. */
	children?: React.ReactNode;
	className?: string;
}

const SheetFooter = ({ className, ...props }: SheetFooterProps) => (
	<div
		className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
		{...props}
	/>
);
SheetFooter.displayName = "SheetFooter";

export interface SheetTitleProps
	extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title> {
	/**
	 * Render as a Radix Slot.
	 * @default false
	 */
	asChild?: boolean;
	children?: React.ReactNode;
	className?: string;
}

const SheetTitle = React.forwardRef<React.ElementRef<typeof SheetPrimitive.Title>, SheetTitleProps>(
	({ className, ...props }, ref) => (
		<SheetPrimitive.Title
			ref={ref}
			className={cn("text-lg font-semibold text-foreground", className)}
			{...props}
		/>
	),
);
SheetTitle.displayName = SheetPrimitive.Title.displayName;

export interface SheetDescriptionProps
	extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description> {
	/**
	 * Render as a Radix Slot.
	 * @default false
	 */
	asChild?: boolean;
	children?: React.ReactNode;
	className?: string;
}

const SheetDescription = React.forwardRef<
	React.ElementRef<typeof SheetPrimitive.Description>,
	SheetDescriptionProps
>(({ className, ...props }, ref) => (
	<SheetPrimitive.Description
		ref={ref}
		className={cn("text-sm text-muted-foreground", className)}
		{...props}
	/>
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetOverlay,
	SheetPortal,
	SheetTitle,
	SheetTrigger,
};
