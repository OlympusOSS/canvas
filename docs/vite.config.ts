import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import mdx from "@mdx-js/rollup";
import rehypeShiki from "@shikijs/rehype";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { defineConfig } from "vite";

// Allow overriding the base path at build time for GitHub Pages
// (e.g. `/canvas/` for olympusoss.github.io/canvas/).
const base = process.env.VITE_BASE_PATH ?? "/";

const __dirname = dirname(fileURLToPath(import.meta.url));
const canvasPkg = JSON.parse(readFileSync(resolve(__dirname, "../package.json"), "utf-8"));

export default defineConfig({
	base,
	plugins: [
		{
			enforce: "pre",
			...mdx({
				remarkPlugins: [remarkGfm],
				rehypePlugins: [
					[
						rehypeShiki,
						{
							themes: { light: "github-light", dark: "github-dark" },
						},
					],
					rehypeSlug,
					[rehypeAutolinkHeadings, { behavior: "wrap" }],
				],
			}),
		},
		react({ include: /\.(jsx|tsx|mdx)$/ }),
		tailwindcss(),
	],
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
	define: {
		__CANVAS_VERSION__: JSON.stringify(canvasPkg.version),
	},
	server: { port: 5173 },
	build: {
		chunkSizeWarningLimit: 2000,
	},
});
