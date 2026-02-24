"use client";

import { useMemo } from "react";
import type { PartialTheme } from "@nivo/theming";
import { useTheme } from "./use-canvas-theme";

export function useNivoTheme(): PartialTheme {
	const { theme } = useTheme();
	const isDark = theme === "dark";

	return useMemo<PartialTheme>(
		() => ({
			background: "transparent",
			text: {
				fontFamily: "Inter, system-ui, -apple-system, sans-serif",
				fontSize: 12,
				fill: isDark ? "hsl(0 0% 63%)" : "hsl(0 0% 45%)",
			},
			axis: {
				domain: {
					line: { stroke: "transparent" },
				},
				ticks: {
					line: { stroke: "transparent" },
					text: {
						fontSize: 12,
						fill: isDark ? "hsl(0 0% 63%)" : "hsl(0 0% 45%)",
					},
				},
				legend: {
					text: {
						fontSize: 12,
						fill: isDark ? "hsl(0 0% 80%)" : "hsl(0 0% 25%)",
						fontWeight: 600,
					},
				},
			},
			grid: {
				line: {
					stroke: isDark ? "hsl(0 0% 20%)" : "hsl(0 0% 90%)",
					strokeDasharray: "3 3",
				},
			},
			crosshair: {
				line: {
					stroke: isDark ? "hsl(0 0% 50%)" : "hsl(0 0% 60%)",
					strokeWidth: 1,
					strokeOpacity: 0.5,
				},
			},
			legends: {
				text: {
					fontSize: 12,
					fill: isDark ? "hsl(0 0% 63%)" : "hsl(0 0% 45%)",
				},
			},
			tooltip: {
				container: {
					background: isDark ? "hsl(0 0% 12%)" : "hsl(0 0% 100%)",
					color: isDark ? "hsl(0 0% 88%)" : "hsl(0 0% 9%)",
					fontSize: "13px",
					borderRadius: "8px",
					boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
					border: `1px solid ${isDark ? "hsl(0 0% 25%)" : "hsl(0 0% 90%)"}`,
				},
			},
		}),
		[isDark],
	);
}
