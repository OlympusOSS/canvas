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
			],
			thresholds: {
				// Per-file locks: every component file must individually meet 100/100/100/90.
				// Overall fallback at 80/80/80/80 keeps non-component dirs (hooks, lib)
				// from regressing without requiring them to hit 100.
				perFile: true,
				"src/components/**": {
					lines: 100,
					statements: 100,
					functions: 100,
					branches: 90,
				},
				// Phase 6 gate — 100% lines/stmts/funcs + 90% branches across all scope.
				lines: 100,
				statements: 100,
				functions: 100,
				branches: 90,
			},
		},
	},
	resolve: {
		alias: {
			"@": new URL("./src", import.meta.url).pathname,
		},
	},
});
