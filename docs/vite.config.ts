import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Allow overriding the base path at build time for GitHub Pages
// (e.g. `/canvas/` for olympusoss.github.io/canvas/).
const base = process.env.VITE_BASE_PATH ?? "/";

export default defineConfig({
	base,
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@olympusoss/canvas": new URL("../src/index.ts", import.meta.url).pathname,
		},
	},
	server: { port: 5173 },
	build: {
		chunkSizeWarningLimit: 2000,
	},
});
