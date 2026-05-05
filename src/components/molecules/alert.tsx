import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../lib/utils";

const alertVariants = cva(
	"relative w-full rounded-lg border border-border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
	{
		variants: {
			variant: {
				default: "bg-background text-foreground",
				destructive:
					"border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface AlertProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof alertVariants> {
	/**
	 * Visual emphasis preset. `default` is informational, `destructive`
	 * uses the danger palette for errors and warnings.
	 * @default "default"
	 */
	variant?: "default" | "destructive";
	/**
	 * Optional leading icon (lucide-react), `<AlertTitle>`, and
	 * `<AlertDescription>`. The icon — when present as a direct child —
	 * is auto-positioned in the top-left.
	 */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the alert via `cn()`. */
	className?: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
	({ className, variant, ...props }, ref) => (
		<div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
	),
);
Alert.displayName = "Alert";

export interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
	/** The alert headline. Renders as an `<h5>`. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the title via `cn()`. */
	className?: string;
}

const AlertTitle = React.forwardRef<HTMLParagraphElement, AlertTitleProps>(
	({ className, ...props }, ref) => (
		<h5
			ref={ref}
			className={cn("mb-1 font-medium leading-none tracking-tight", className)}
			{...props}
		/>
	),
);
AlertTitle.displayName = "AlertTitle";

export interface AlertDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
	/** Body copy of the alert. Renders as a `<div>` so it can hold paragraphs and lists. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the description via `cn()`. */
	className?: string;
}

const AlertDescription = React.forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
	),
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertDescription, AlertTitle };
