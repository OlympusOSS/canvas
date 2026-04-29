"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

import { cn } from "../../lib/utils";

export interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
	/**
	 * Render as a Radix Slot — wrap a custom element while keeping the
	 * Avatar's image-loading behaviour.
	 * @default false
	 */
	asChild?: boolean;
	/** Avatar content — typically `<AvatarImage>` + `<AvatarFallback>`. */
	children?: React.ReactNode;
	className?: string;
}

/**
 * Round profile-image container. Composes `Avatar` + `AvatarImage` +
 * `AvatarFallback`. Defaults to `h-10 w-10`.
 */
const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
	({ className, ...props }, ref) => (
		<AvatarPrimitive.Root
			ref={ref}
			className={cn(
				"relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white",
				className,
			)}
			{...props}
		/>
	),
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

export interface AvatarImageProps
	extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> {
	/** Image URL. Hides itself if loading errors so the fallback can render. */
	src?: string;
	/** Accessible label. Defaults to the empty string for decorative use. */
	alt?: string;
	/** Radix lifecycle hook for tracking the load state. */
	onLoadingStatusChange?: (status: "idle" | "loading" | "loaded" | "error") => void;
	asChild?: boolean;
	className?: string;
}

/**
 * The `<img>` slot inside `<Avatar>`. Hides itself if loading errors so the
 * fallback can render.
 */
const AvatarImage = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Image>,
	AvatarImageProps
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Image
		ref={ref}
		className={cn("aspect-square h-full w-full", className)}
		{...props}
	/>
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

export interface AvatarFallbackProps
	extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {
	/**
	 * Wait this many ms before showing the fallback (avoids flash on fast
	 * image loads).
	 */
	delayMs?: number;
	asChild?: boolean;
	/** Initials, icon, or silhouette. */
	children?: React.ReactNode;
	className?: string;
}

/**
 * Rendered when the image is missing or still loading — typically initials,
 * an icon, or a silhouette.
 */
const AvatarFallback = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Fallback>,
	AvatarFallbackProps
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Fallback
		ref={ref}
		className={cn(
			"flex h-full w-full items-center justify-center rounded-full bg-white",
			className,
		)}
		{...props}
	/>
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarFallback, AvatarImage };
