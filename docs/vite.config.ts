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
		// Force a single React copy. Canvas src is aliased to ../src/index.ts and
		// resolves react from canvas/node_modules; docs/main.tsx resolves it from
		// docs/node_modules. Two instances share no internal dispatcher and
		// useState throws "Cannot read properties of null".
		dedupe: ["react", "react-dom"],
	},
	server: { port: 5173 },
	build: {
		chunkSizeWarningLimit: 2000,
	},
});
