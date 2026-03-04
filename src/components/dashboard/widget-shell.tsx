"use client";

import { type ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "../icon";
import { cn } from "../../lib/utils";

export interface WidgetShellProps {
	id: string;
	onRemove?: () => void;
	children: ReactNode;
	/** When false, hides drag/resize/remove controls and disables edit visuals. Default: true */
	isEditable?: boolean;
}

export function WidgetShell({ id, onRemove, children, isEditable = true }: WidgetShellProps) {
	const [isHovered, setIsHovered] = useState(false);
	const showControls = isHovered && isEditable;

	return (
		<div
			className={cn(
				"group relative h-full transition-all duration-200",
				isEditable && "ring-1 ring-dashed ring-border/50 rounded-xl",
			)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			data-widget-id={id}
		>
			{/* Drag handle — visible on hover in edit mode */}
			<AnimatePresence>
				{showControls && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.15 }}
						className="widget-drag-handle absolute top-2 left-2 z-20 flex cursor-grab items-center justify-center rounded-md bg-muted p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:cursor-grabbing"
					>
						<Icon name="move" className="h-3.5 w-3.5" />
					</motion.div>
				)}
			</AnimatePresence>

			{/* Remove button — visible on hover in edit mode */}
			<AnimatePresence>
				{showControls && onRemove && (
					<motion.button
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.15 }}
						onClick={(e) => {
							e.stopPropagation();
							onRemove();
						}}
						className="absolute top-2 right-2 z-20 flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground transition-colors hover:bg-destructive/20 hover:text-destructive"
						aria-label="Remove widget"
					>
						<Icon name="close" className="h-3.5 w-3.5" />
					</motion.button>
				)}
			</AnimatePresence>

			{/* Resize icon — bottom-right, visible on hover in edit mode */}
			<AnimatePresence>
				{showControls && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.15 }}
						className="pointer-events-none absolute bottom-2 right-2 z-20 flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground"
					>
						<Icon name="resize-handle" className="h-3.5 w-3.5" />
					</motion.div>
				)}
			</AnimatePresence>

			{/* Widget content — isolate stacking context so children (e.g. Leaflet z-1000) don't overlay edit controls */}
			<div className="isolate h-full [&>*]:h-full [&>div>*]:h-full">
				{children}
			</div>
		</div>
	);
}
