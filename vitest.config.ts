import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: ["./test/setup.ts"],
		include: ["test/**/*.test.{ts,tsx}"],
		coverage: {
			provider: "v8",
			reporter: ["text", "html", "json-summary"],
			// Full src/ in scope; barrels, token data, and native-only paths excluded.
			include: ["src/**/*.{ts,tsx}"],
			exclude: [
				"src/**/*.stories.tsx",
				"src/**/*.test.{ts,tsx}",
				"src/**/__tests__/**",
				"src/**/*.d.ts",
				"src/index.ts",
				"src/native.ts",
				"src/tokens/**",
				"src/**/constants.ts",
				"src/**/types.ts",
				// Editor components (CodeMirror, Tiptap) require real DOM measurements
				// and are jsdom-incompatible — same class as the Leaflet map inner.
				"src/components/organisms/editors/**",
			],
			thresholds: {
				// Per-file locks: every component file must individually hit 100% on
				// every metric, including branches. Anything less invites silent drift.
				perFile: true,
				"src/components/**": {
					lines: 100,
					statements: 100,
					functions: 100,
					branches: 100,
				},
				// Global gate — 100% across the board.
				lines: 100,
				statements: 100,
				functions: 100,
				branches: 100,
			},
		},
	},
	resolve: {
		alias: {
			"@": new URL("./src", import.meta.url).pathname,
		},
	},
});
