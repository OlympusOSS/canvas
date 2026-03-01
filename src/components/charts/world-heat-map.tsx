"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import "./world-heat-map.css";

// ── Types ────────────────────────────────────────────

type ChartColorToken =
	| "chart-1"
	| "chart-2"
	| "chart-3"
	| "chart-4"
	| "chart-5"
	| "primary"
	| "success"
	| "destructive";

export interface GeoPoint {
	/** Latitude */
	lat: number;
	/** Longitude */
	lng: number;
	/** Display label (e.g. "Munich, DE") */
	label: string;
	/** Session / event count at this location */
	count: number;
}

export interface WorldHeatMapProps {
	/** Array of geo-located data points */
	data: GeoPoint[];
	height?: number | string;
	/** Design token name or raw CSS color for the heat dots */
	color?: ChartColorToken | (string & {});
	/** Show a simple legend below the map */
	showLegend?: boolean;
	/** Optional title overlaid on the map */
	title?: string;
}

// ── Helpers ──────────────────────────────────────────

/** Detect dark mode by watching the .dark class on <html> */
function useIsDarkMode(): boolean {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		if (typeof document === "undefined") return;

		const html = document.documentElement;
		setIsDark(html.classList.contains("dark"));

		const observer = new MutationObserver(() => {
			setIsDark(html.classList.contains("dark"));
		});
		observer.observe(html, { attributes: true, attributeFilter: ["class"] });

		return () => observer.disconnect();
	}, []);

	return isDark;
}

/** CSS var() colour reference for DOM overlays */
function resolveCssColor(color: string): string {
	if (
		color.startsWith("#") ||
		color.startsWith("rgb") ||
		color.startsWith("hsl(")
	) {
		return color;
	}
	return `hsl(var(--${color}))`;
}

/** Resolve a design-token name to a concrete hex colour for Leaflet */
function resolveTokenToHex(token: string): string {
	if (token.startsWith("#")) return token;
	if (typeof document === "undefined") return "#5b9df9";

	const varName = token.startsWith("--") ? token : `--${token}`;
	const raw = getComputedStyle(document.documentElement)
		.getPropertyValue(varName)
		.trim();

	if (!raw) return "#5b9df9";

	// Convert HSL values to hex via a temp element
	const temp = document.createElement("div");
	temp.style.color = `hsl(${raw})`;
	document.body.appendChild(temp);
	const computed = getComputedStyle(temp).color;
	document.body.removeChild(temp);

	// Parse rgb(r, g, b) to hex
	const match = computed.match(/\d+/g);
	if (match && match.length >= 3) {
		const hex = `#${Number(match[0]).toString(16).padStart(2, "0")}${Number(match[1]).toString(16).padStart(2, "0")}${Number(match[2]).toString(16).padStart(2, "0")}`;
		return hex;
	}
	return "#5b9df9";
}

// ── Component ────────────────────────────────────────

export function WorldHeatMap({
	data,
	height = "100%",
	color = "chart-1",
	showLegend = true,
	title,
}: WorldHeatMapProps) {
	const isDark = useIsDarkMode();
	const [isMounted, setIsMounted] = useState(false);
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const mapInstanceRef = useRef<any>(null);
	const markersLayerRef = useRef<any>(null);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const cssColor = resolveCssColor(color);
	const hasData = data.length > 0;

	// Tile URLs
	const tileUrl = isDark
		? "https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png"
		: "https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png";

	// ── Initialise Leaflet map (client-side only) ────
	useEffect(() => {
		if (!isMounted || !mapContainerRef.current) return;
		if (mapInstanceRef.current) return; // Already initialised

		// Dynamic import to avoid SSR issues
		const init = async () => {
			const L = (await import("leaflet")).default;
			// Default view — will be overridden by geolocation
			const map = L.map(mapContainerRef.current!, {
				center: [20, 20],
				zoom: 2,
				minZoom: 2,
				maxBoundsViscosity: 1.0,
				zoomControl: false,
				attributionControl: false,
				worldCopyJump: false,
			});

			// Constrain panning so the map never shows repeated world copies
			const worldBounds = L.latLngBounds(
				L.latLng(-85, -180),
				L.latLng(85, 180),
			);
			map.setMaxBounds(worldBounds);

			// Try to center on the user's current location
			if ("geolocation" in navigator) {
				navigator.geolocation.getCurrentPosition(
					(pos) => {
						map.setView([pos.coords.latitude, pos.coords.longitude], 5, {
							animate: true,
							duration: 1,
						});
					},
					() => {}, // Silently ignore errors (permission denied, etc.)
					{ enableHighAccuracy: false, timeout: 5000 },
				);
			}

			// Zoom controls removed — user zooms via scroll/pinch only

			// Initial tile layer
			const tileLayer = L.tileLayer(
				isDark
					? "https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png"
					: "https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
				{ maxZoom: 19 },
			);
			tileLayer.addTo(map);

			// Store references
			mapInstanceRef.current = map;
			(map as any)._tileLayer = tileLayer;

			// Invalidate size after a brief delay to handle initial layout
			setTimeout(() => map.invalidateSize(), 100);
		};

		init();

		return () => {
			if (mapInstanceRef.current) {
				mapInstanceRef.current.remove();
				mapInstanceRef.current = null;
				markersLayerRef.current = null;
			}
		};
	}, [isMounted]); // Only run once on mount

	// ── Update tile layer on theme change ─────────────
	useEffect(() => {
		const map = mapInstanceRef.current;
		if (!map) return;

		const L = (window as any).L;
		if (!L) return;

		const oldTile = (map as any)._tileLayer;
		if (oldTile) map.removeLayer(oldTile);

		const newTile = L.tileLayer(tileUrl, { maxZoom: 19 });
		newTile.addTo(map);
		(map as any)._tileLayer = newTile;
	}, [tileUrl]);

	// ── Update data markers ──────────────────────────
	useEffect(() => {
		const map = mapInstanceRef.current;
		if (!map) return;

		const updateMarkers = async () => {
			const L = (await import("leaflet")).default;
			const resolvedHex = resolveTokenToHex(color);

			// Remove old markers layer
			if (markersLayerRef.current) {
				map.removeLayer(markersLayerRef.current);
				markersLayerRef.current = null;
			}

			if (data.length === 0) return;

			const maxCount = Math.max(...data.map((d) => d.count), 1);
			const group = L.layerGroup();

			for (const pt of data) {
				const t =
					maxCount > 0
						? Math.log(1 + pt.count) / Math.log(1 + maxCount)
						: 0;
				const radius = 4 + t * 16;
				const opacity = 0.4 + t * 0.55;

				// Outer glow
				L.circleMarker([pt.lat, pt.lng], {
					radius: radius * 1.8,
					fillColor: resolvedHex,
					fillOpacity: opacity * 0.15,
					stroke: false,
					interactive: false,
				}).addTo(group);

				// Main dot
				const main = L.circleMarker([pt.lat, pt.lng], {
					radius,
					fillColor: resolvedHex,
					fillOpacity: opacity,
					color: resolvedHex,
					weight: 1,
					opacity: 0.8,
				});

				main.bindTooltip(
					`<div class="whm-tooltip">
						<div class="whm-tooltip-label">${pt.label}</div>
						<div class="whm-tooltip-count">
							<span class="whm-tooltip-dot" style="background:${resolvedHex}"></span>
							${pt.count.toLocaleString()} session${pt.count !== 1 ? "s" : ""}
						</div>
					</div>`,
					{
						direction: "top",
						offset: [0, -radius],
						className: "whm-leaflet-tooltip",
					},
				);

				main.addTo(group);

				// Bright centre
				L.circleMarker([pt.lat, pt.lng], {
					radius: Math.max(radius * 0.35, 1.5),
					fillColor: resolvedHex,
					fillOpacity: 0.95,
					stroke: false,
					interactive: false,
				}).addTo(group);
			}

			group.addTo(map);
			markersLayerRef.current = group;
		};

		updateMarkers();
	}, [data, color, isDark]);

	// ── Handle container resize ──────────────────────
	useEffect(() => {
		const map = mapInstanceRef.current;
		const container = mapContainerRef.current;
		if (!map || !container) return;

		const resizeObserver = new ResizeObserver(() => {
			map.invalidateSize();
		});
		resizeObserver.observe(container);

		return () => resizeObserver.disconnect();
	}, [isMounted]);

	// ── Loading / SSR guard ─────────────────────────
	if (!isMounted) {
		return (
			<div
				style={{ height }}
				className="flex items-center justify-center text-sm text-muted-foreground"
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 20 20"
					className="animate-spin mr-2 opacity-50"
				>
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
			</div>
		);
	}

	return (
		<div
			style={{ height }}
			className="relative overflow-hidden rounded-xl world-heat-map"
		>
			{/* Leaflet map container */}
			<div
				ref={mapContainerRef}
				style={{ width: "100%", height: "100%" }}
			/>

			{/* Overlaid title — top-left */}
			{title && (
				<div
					className="absolute top-4 left-4 z-[1000] text-sm font-semibold tracking-tight pointer-events-none"
					style={{ color: "hsl(var(--card-foreground))" }}
				>
					{title}
				</div>
			)}

			{/* Legend — bottom-left overlay */}
			{showLegend && hasData && (
				<div className="absolute bottom-3 left-4 z-[1000] flex items-center gap-2.5 text-[10px] text-muted-foreground pointer-events-none">
					<div className="flex items-center gap-1">
						<svg width="8" height="8">
							<circle
								cx="4"
								cy="4"
								r="2.5"
								fill={cssColor.replace(")", " / 0.5)")}
							/>
						</svg>
						<span>Fewer</span>
					</div>
					<div className="flex items-center gap-1">
						<svg width="14" height="14">
							<circle
								cx="7"
								cy="7"
								r="5"
								fill={cssColor.replace(")", " / 0.9)")}
							/>
						</svg>
						<span>More</span>
					</div>
				</div>
			)}

			{/* Empty state overlay */}
			{!hasData && (
				<div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1000]">
					<div
						className="rounded-lg px-4 py-2 text-xs text-muted-foreground backdrop-blur-sm"
						style={{ backgroundColor: "hsl(var(--card) / 0.8)" }}
					>
						No geographic data available
					</div>
				</div>
			)}
		</div>
	);
}
