"use client";

import * as React from "react";

import { cn } from "../../lib/utils";

/**
 * `<WorldHeatMap>` — Leaflet-based geographic scatter / heat-map.
 *
 * Public surface lives here; the actual react-leaflet tree is in
 * `world-heat-map-inner.tsx` and is loaded via `React.lazy()` so neither
 * `leaflet` nor `react-leaflet` lands in canvas's main bundle. Both are
 * declared as **peer-optional** in `package.json` — consumers who use the map
 * install them explicitly; consumers who don't, don't pay.
 *
 * Consumers must also import the Leaflet base stylesheet at app entry:
 *
 *   import "@olympusoss/canvas/styles/leaflet.css";
 *
 * Visual identity matches the deployed admin dashboard reference (CartoDB
 * tiles, hidden controls, triple-layered CircleMarker per point).
 */

// ── Public types ─────────────────────────────────────────────

export interface WorldHeatMapPoint {
	/** Latitude. */
	lat: number;
	/** Longitude. */
	lng: number;
	/** Tooltip label (e.g. "Munich, DE"). */
	label: string;
	/** Drives marker radius. */
	count: number;
}

export interface WorldHeatMapProps {
	/** Geo-located points to render. Empty array shows the empty-state overlay. */
	points: WorldHeatMapPoint[];
	/** Container height. Number → px, string passes through. Default `"100%"`. */
	height?: number | string;
	/** Initial map center `[lat, lng]`. Default `[20, 0]`. */
	center?: [number, number];
	/** Initial zoom. Default `3`. */
	zoom?: number;
	/** Tile basemap. `"auto"` follows canvas's `useTheme()`. Default `"auto"`. */
	tileTheme?: "auto" | "dark" | "light";
	/** Show Leaflet zoom + attribution controls. Default `false`. */
	showControls?: boolean;
	/** Marker fill (any CSS colour, including `hsl(var(--chart-1))`). Default `"hsl(var(--chart-1))"`. */
	markerColor?: string;
	/** `[min, max]` marker radius in pixels (log-scaled on `count`). Default `[4, 20]`. */
	markerRadiusRange?: [number, number];
	/** Per-marker click handler. */
	onMarkerClick?: (point: WorldHeatMapPoint) => void;
	/** Show "Fewer / More" legend overlay (bottom-left). Default `true`. */
	showLegend?: boolean;
	/** Optional title overlaid top-left. */
	title?: string;
	/** Override the empty-state node. Default: a small "No geographic data available" card. */
	emptyState?: React.ReactNode;
	/** Pass-through className on the outer `.world-heat-map` wrapper. */
	className?: string;
}

// ── Lazy-loaded inner ───────────────────────────────────────

const WorldHeatMapInner = React.lazy(() => import("./world-heat-map-inner"));

// ── Error boundary (peer-missing or runtime-load failure) ───

interface WorldHeatMapErrorBoundaryProps {
	fallback: React.ReactNode;
	children: React.ReactNode;
}
interface WorldHeatMapErrorBoundaryState {
	hasError: boolean;
}

class WorldHeatMapErrorBoundary extends React.Component<
	WorldHeatMapErrorBoundaryProps,
	WorldHeatMapErrorBoundaryState
> {
	state: WorldHeatMapErrorBoundaryState = { hasError: false };

	/* c8 ignore start -- only triggers when the lazy-loaded Leaflet inner throws (peer missing or runtime load failure); both are jsdom-incompatible to simulate */
	static getDerivedStateFromError(): WorldHeatMapErrorBoundaryState {
		return { hasError: true };
	}

	render(): React.ReactNode {
		return this.state.hasError ? this.props.fallback : this.props.children;
	}
	/* c8 ignore stop */
}

// ── Shell (SSR / loading / error) ───────────────────────────

type ShellState = "loading" | "error";

interface ShellProps {
	height?: number | string;
	className?: string;
	state: ShellState;
}

function resolveHeight(height: number | string | undefined): string {
	if (height === undefined) return "100%";
	return typeof height === "number" ? `${height}px` : height;
}

function Shell({ height, className, state }: ShellProps) {
	const heightStr = resolveHeight(height);
	return (
		<div
			className={cn(
				"relative flex items-center justify-center overflow-hidden rounded-xl bg-muted/40 text-xs text-muted-foreground world-heat-map",
				className,
			)}
			style={{ height: heightStr }}
		>
			{state === "loading" ? (
				<>
					<svg
						width="20"
						height="20"
						viewBox="0 0 20 20"
						aria-hidden="true"
						className="mr-2 animate-spin opacity-50"
					>
						<title>Loading</title>
						<circle
							cx="10"
							cy="10"
							r="8"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeDasharray="40"
							strokeLinecap="round"
						/>
					</svg>
					Loading map…
				</>
			) : (
				<div className="px-4 py-2 text-center">
					Map dependencies missing — install <code>leaflet</code> and <code>react-leaflet</code>.
				</div>
			)}
		</div>
	);
}

// ── Public component ────────────────────────────────────────

export function WorldHeatMap(props: WorldHeatMapProps) {
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	// SSR / hydration guard — prevents `window`/`document` access during the
	// server pass and the first client render before hydration completes.
	if (!mounted) {
		return <Shell height={props.height} className={props.className} state="loading" />;
	}

	/* c8 ignore start -- post-mount tree mounts the lazy Leaflet inner; jsdom can't run Leaflet so the Suspense + ErrorBoundary tree is verified visually in the docs */
	return (
		<WorldHeatMapErrorBoundary
			fallback={<Shell height={props.height} className={props.className} state="error" />}
		>
			<React.Suspense
				fallback={<Shell height={props.height} className={props.className} state="loading" />}
			>
				<WorldHeatMapInner {...props} />
			</React.Suspense>
		</WorldHeatMapErrorBoundary>
	);
	/* c8 ignore stop */
}

WorldHeatMap.displayName = "WorldHeatMap";
