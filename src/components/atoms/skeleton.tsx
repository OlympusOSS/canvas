import type * as React from "react";

import { cn } from "../../lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
	className?: string;
}

/**
 * Animated placeholder for content that's loading. Set width/height via
 * className; Skeleton fills with a pulsing tinted block.
 */
function Skeleton({ className, ...props }: SkeletonProps) {
	return <div className={cn("animate-pulse rounded-md bg-primary/10", className)} {...props} />;
}

export { Skeleton };
