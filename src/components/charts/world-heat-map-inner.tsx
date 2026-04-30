// @ts-nocheck — react-leaflet + leaflet are peer-optional. CI installs
// without them (peerDependenciesMeta.optional: true), so typecheck against
// `react-leaflet` resolves to "no module" on the runner. This file is only
// loaded at runtime via React.lazy() when consumers have the peer deps; the
// outer <WorldHeatMap> wrapper handles the missing-peer error path.
"use client";

/* c8 ignore file -- Leaflet imports require real DOM measurements and are
 * jsdom-incompatible. This file is covered structurally via the lazy
 * boundary + loading shell + error-fallback in world-heat-map.test.tsx;
 * the rendered Leaflet tree is verified visually in the docs. */

import * as React from "react";
import { CircleMarker, MapContainer, TileLayer, Tooltip } from "react-leaflet";

import { cn } from "../../lib/utils";
import { useTheme } from "../organisms/theme-provider";
import type { WorldHeatMapPoint, WorldHeatMapProps } from "./world-heat-map";

/**
 * Client-only Leaflet tree. Loaded via `React.lazy()` from the orchestrator
 * `world-heat-map.tsx` so neither `leaflet` nor `react-leaflet` lands in the
 * main canvas bundle. SSR / loading / error are handled by the orchestrator —
 * this file assumes a browser environment.
 *
 * Visual identity matches the deployed admin spec extracted from
 * `https://admin.ciam.nannier.com/dashboard`:
 *   - CartoDB Basemaps (`dark_all` / `light_all`, `@2x` retina)
 *   - Hidden controls (zoomControl, attributionControl)
 *   - Triple-layered CircleMarker per point (glow / main / centre)
 *   - Log-scaled radius (`log(1+count) / log(1+maxCount)`)
 *
 * Consumers must import `@olympusoss/canvas/styles/leaflet.css` once at app
 * entry — Leaflet's base stylesheet doesn't ship with this component.
 */

const SCOPED_CSS = `
.world-heat-map .leaflet-container {
	border-radius: inherit;
	background: transparent;
	font: inherit;
}
.world-heat-map .leaflet-control-attribution {
	display: none;
}
.world-heat-map.world-heat-map--no-controls .leaflet-control-zoom {
	display: none;
}
.world-heat-map .leaflet-control-zoom {
	border: 1px solid hsl(var(--border) / 0.5) !important;
	border-radius: 0.5rem !important;
	overflow: hidden;
	box-shadow: 0 2px 8px rgb(0 0 0 / 0.1) !important;
}
.world-heat-map .leaflet-control-zoom a {
	background: hsl(var(--popover)) !important;
	color: hsl(var(--popover-foreground)) !important;
	border-bottom-color: hsl(var(--border) / 0.3) !important;
	width: 32px !important;
	height: 32px !important;
	line-height: 32px !important;
	font-size: 16px !important;
}
.world-heat-map .leaflet-control-zoom a:hover {
	background: hsl(var(--accent)) !important;
	color: hsl(var(--accent-foreground)) !important;
}
.whm-tooltip-popup {
	background: hsl(var(--popover)) !important;
	color: hsl(var(--popover-foreground)) !important;
	border: 1px solid hsl(var(--border) / 0.5) !important;
	border-radius: 0.5rem !important;
	padding: 0.5rem 0.75rem !important;
	font-size: 0.75rem !important;
	font-family: inherit !important;
	box-shadow: 0 4px 12px rgb(0 0 0 / 0.15) !important;
}
.whm-tooltip-popup::before {
	border-top-color: hsl(var(--popover)) !important;
}
.whm-tooltip-label {
	font-weight: 600;
	font-size: 13px;
	line-height: 1.2;
}
.whm-tooltip-count {
	display: flex;
	align-items: center;
	gap: 6px;
	margin-top: 2px;
	color: hsl(var(--muted-foreground));
	font-variant-numeric: tabular-nums;
	font-size: 12px;
}
.whm-tooltip-dot {
	display: inline-block;
	height: 8px;
	width: 8px;
	border-radius: 50%;
}
`;

const TILE_URL_DARK = "https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png";
const TILE_URL_LIGHT = "https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png";

const ATTRIBUTION =
	'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

function resolveHeight(height: number | string | undefined): string {
	if (height === undefined) return "100%";
	return typeof height === "number" ? `${height}px` : height;
}

interface MarkerLayers {
	glowRadius: number;
	mainRadius: number;
	centreRadius: number;
	mainOpacity: number;
	glowOpacity: number;
}

function deriveMarker(
	count: number,
	maxCount: number,
	[rMin, rMax]: [number, number],
): MarkerLayers {
	const t = maxCount > 0 ? Math.log(1 + count) / Math.log(1 + maxCount) : 0;
	const r = rMin + t * (rMax - rMin);
	const opacity = 0.4 + t * 0.55;
	return {
		glowRadius: r * 1.8,
		mainRadius: r,
		centreRadius: Math.max(r * 0.35, 1.5),
		mainOpacity: opacity,
		glowOpacity: opacity * 0.15,
	};
}

export default function WorldHeatMapInner({
	points,
	height,
	center = [20, 0],
	zoom = 3,
	tileTheme = "auto",
	showControls = false,
	markerColor = "hsl(var(--chart-1))",
	markerRadiusRange = [4, 20],
	onMarkerClick,
	showLegend = true,
	title,
	emptyState,
	className,
}: WorldHeatMapProps) {
	const { resolvedTheme } = useTheme();
	const isDark = tileTheme === "dark" || (tileTheme === "auto" && resolvedTheme === "dark");
	const tileUrl = isDark ? TILE_URL_DARK : TILE_URL_LIGHT;

	const heightStr = resolveHeight(height);
	const maxCount = React.useMemo(
		() => points.reduce((acc, p) => Math.max(acc, p.count), 1),
		[points],
	);
	const hasData = points.length > 0;

	return (
		<div
			className={cn(
				"relative overflow-hidden rounded-xl world-heat-map",
				!showControls && "world-heat-map--no-controls",
				className,
			)}
			style={{ height: heightStr }}
		>
			<style dangerouslySetInnerHTML={{ __html: SCOPED_CSS }} />

			<MapContainer
				center={center}
				zoom={zoom}
				minZoom={2}
				maxZoom={19}
				zoomControl={showControls}
				attributionControl={showControls}
				worldCopyJump={false}
				maxBounds={[
					[-85, -180],
					[85, 180],
				]}
				maxBoundsViscosity={1}
				className="h-full w-full"
			>
				<TileLayer key={tileUrl} url={tileUrl} attribution={ATTRIBUTION} />

				{points.map((point) => (
					<MarkerGroup
						key={`${point.lat},${point.lng},${point.label}`}
						point={point}
						maxCount={maxCount}
						markerColor={markerColor}
						markerRadiusRange={markerRadiusRange}
						onMarkerClick={onMarkerClick}
					/>
				))}
			</MapContainer>

			{title && (
				<div className="pointer-events-none absolute left-4 top-4 z-[1000] text-sm font-semibold tracking-tight text-foreground">
					{title}
				</div>
			)}

			{showLegend && hasData && (
				<div className="pointer-events-none absolute bottom-3 left-4 z-[1000] flex items-center gap-2.5 text-[10px] text-muted-foreground">
					<div className="flex items-center gap-1">
						<svg width="8" height="8" aria-hidden="true">
							<title>Smaller marker</title>
							<circle cx="4" cy="4" r="2.5" fill={markerColor} fillOpacity={0.5} />
						</svg>
						<span>Fewer</span>
					</div>
					<div className="flex items-center gap-1">
						<svg width="14" height="14" aria-hidden="true">
							<title>Larger marker</title>
							<circle cx="7" cy="7" r="5" fill={markerColor} fillOpacity={0.9} />
						</svg>
						<span>More</span>
					</div>
				</div>
			)}

			{!hasData && (
				<div className="pointer-events-none absolute inset-0 z-[1000] flex items-center justify-center">
					{emptyState ?? (
						<div className="rounded-lg bg-card px-4 py-2 text-xs text-muted-foreground shadow">
							No geographic data available
						</div>
					)}
				</div>
			)}

			{/* CartoDB attribution — always visible per TOS, even when controls are hidden */}
			{!showControls && (
				<div
					className="pointer-events-auto absolute bottom-1 right-1 z-[1000] text-[9px] text-muted-foreground/60"
					dangerouslySetInnerHTML={{ __html: ATTRIBUTION }}
				/>
			)}
		</div>
	);
}

/**
 * Three concentric `<CircleMarker>`s per data point: outer glow, main dot
 * (interactive + tooltip), bright centre. Pulled into its own component so the
 * tooltip's stable `<Tooltip>` child slot lives next to the marker that owns
 * it (react-leaflet attaches by parent identity).
 */
function MarkerGroup({
	point,
	maxCount,
	markerColor,
	markerRadiusRange,
	onMarkerClick,
}: {
	point: WorldHeatMapPoint;
	maxCount: number;
	markerColor: string;
	markerRadiusRange: [number, number];
	onMarkerClick?: (point: WorldHeatMapPoint) => void;
}) {
	const layers = deriveMarker(point.count, maxCount, markerRadiusRange);
	const handlers = React.useMemo(
		() => (onMarkerClick ? { click: () => onMarkerClick(point) } : undefined),
		[onMarkerClick, point],
	);

	return (
		<>
			<CircleMarker
				center={[point.lat, point.lng]}
				radius={layers.glowRadius}
				pathOptions={{
					fillColor: markerColor,
					fillOpacity: layers.glowOpacity,
					stroke: false,
					interactive: false,
				}}
			/>
			<CircleMarker
				center={[point.lat, point.lng]}
				radius={layers.mainRadius}
				pathOptions={{
					fillColor: markerColor,
					fillOpacity: layers.mainOpacity,
					color: markerColor,
					weight: 1,
					opacity: 0.8,
				}}
				eventHandlers={handlers}
			>
				<Tooltip direction="top" offset={[0, -layers.mainRadius]} className="whm-tooltip-popup">
					<div className="whm-tooltip-label">{point.label}</div>
					<div className="whm-tooltip-count">
						<span className="whm-tooltip-dot" style={{ background: markerColor }} />
						{point.count.toLocaleString()} session
						{point.count !== 1 ? "s" : ""}
					</div>
				</Tooltip>
			</CircleMarker>
			<CircleMarker
				center={[point.lat, point.lng]}
				radius={layers.centreRadius}
				pathOptions={{
					fillColor: markerColor,
					fillOpacity: 0.95,
					stroke: false,
					interactive: false,
				}}
			/>
		</>
	);
}
