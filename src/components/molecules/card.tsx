import * as React from "react";

import { cn } from "../../lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	/** `<CardHeader>`, `<CardContent>`, `<CardFooter>` (or any custom layout). */
	children?: React.ReactNode;
	/**
	 * Tailwind / CSS classes merged onto the card via `cn()`. Default
	 * styling: `rounded-xl` (12px), `border`, `bg-card`, `shadow`.
	 */
	className?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		data-slot="card"
		className={cn("rounded-xl border border-border bg-card text-card-foreground shadow", className)}
		{...props}
	/>
));
Card.displayName = "Card";

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Typically `<CardTitle>` + `<CardDescription>`. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the header via `cn()`. Default: `p-6 space-y-1.5`. */
	className?: string;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
	),
);
CardHeader.displayName = "CardHeader";

export interface CardTitleProps extends React.HTMLAttributes<HTMLDivElement> {
	/** The card heading. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the title via `cn()`. */
	className?: string;
}

const CardTitle = React.forwardRef<HTMLDivElement, CardTitleProps>(
	({ className, ...props }, ref) => (
		<div
			ref={ref}
			className={cn("font-semibold leading-none tracking-tight", className)}
			{...props}
		/>
	),
);
CardTitle.displayName = "CardTitle";

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Subtitle / supporting copy below the title. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the description via `cn()`. */
	className?: string;
}

const CardDescription = React.forwardRef<HTMLDivElement, CardDescriptionProps>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
	),
);
CardDescription.displayName = "CardDescription";

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Card body. */
	children?: React.ReactNode;
	/** Tailwind / CSS classes merged onto the content via `cn()`. Default: `p-6 pt-0`. */
	className?: string;
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
	),
);
CardContent.displayName = "CardContent";

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
	/** Card actions / metadata row. */
	children?: React.ReactNode;
	/**
	 * Tailwind / CSS classes merged onto the footer via `cn()`. Default:
	 * `flex items-center p-6 pt-0`.
	 */
	className?: string;
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
	),
);
CardFooter.displayName = "CardFooter";

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
