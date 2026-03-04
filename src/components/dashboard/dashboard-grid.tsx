"use client";

import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ResponsiveGridLayout, verticalCompactor } from "react-grid-layout";
import type { Layout, ResponsiveLayouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./dashboard-grid.css";
import { cn } from "../../lib/utils";

export type { Layout, ResponsiveLayouts as Layouts };

export interface DashboardGridProps {
	/** Layouts per breakpoint (xl, lg, md, sm, xs) */
	layouts: ResponsiveLayouts;
	/** Called when layout changes (drag, resize) */
	onLayoutChange: (layout: Layout, allLayouts: ResponsiveLayouts) => void;
	/** Widget elements keyed by layout item `i` */
	children: ReactNode;
	/** Number of columns per breakpoint */
	cols?: Record<string, number>;
	/** Row height in pixels */
	rowHeight?: number;
	/** Additional class name */
	className?: string;
	/** Whether the grid is editable (draggable + resizable) */
	isEditable?: boolean;
}

const DEFAULT_COLS = { xl: 12, lg: 12, md: 6, sm: 3, xs: 1 };
const DEFAULT_BREAKPOINTS = { xl: 1280, lg: 1024, md: 768, sm: 480, xs: 0 };

/**
 * Auto-width wrapper that measures its container and passes width to RGL.
 * Uses react-grid-layout v2 API with config objects.
 */
export function DashboardGrid({
	layouts,
	onLayoutChange,
	children,
	cols = DEFAULT_COLS,
	rowHeight = 56,
	className,
	isEditable = true,
}: DashboardGridProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState(1200);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		const observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				setWidth(entry.contentRect.width);
			}
		});

		observer.observe(el);
		// Set initial width
		setWidth(el.offsetWidth);

		return () => observer.disconnect();
	}, []);

	const dragConfig = useMemo(
		() => ({
			enabled: isEditable,
			handle: ".widget-drag-handle",
		}),
		[isEditable],
	);

	const resizeConfig = useMemo(
		() => ({
			enabled: isEditable,
			handles: ["se", "e", "s"] as const,
		}),
		[isEditable],
	);

	return (
		<div ref={containerRef} className={cn("dashboard-grid", className)}>
			<ResponsiveGridLayout
				className="layout"
				width={width}
				layouts={layouts}
				breakpoints={DEFAULT_BREAKPOINTS}
				cols={cols}
				rowHeight={rowHeight}
				onLayoutChange={onLayoutChange}
				dragConfig={dragConfig}
				resizeConfig={resizeConfig}
				compactor={verticalCompactor}
				margin={[20, 20]}
				containerPadding={[0, 0]}
			>
				{children}
			</ResponsiveGridLayout>
		</div>
	);
}
