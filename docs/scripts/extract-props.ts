#!/usr/bin/env tsx
/**
 * Extract prop type metadata from canvas component sources at build time.
 *
 * Reads ../src/components/{atoms,molecules,organisms,templates}/*.tsx,
 * runs react-docgen-typescript over each file, filters out inherited HTML
 * attributes via a propFilter, and writes a single JSON manifest to
 * src/data/props/generated.json.
 *
 * Run via `bun run prebuild` or directly: `bunx tsx scripts/extract-props.ts`
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Glob } from "bun";
import * as docgen from "react-docgen-typescript";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CANVAS_ROOT = resolve(__dirname, "../../");
const COMPONENTS_GLOB = "src/components/{atoms,molecules,organisms,templates,charts}/**/*.tsx";
const OUTPUT = resolve(__dirname, "../src/data/props/generated.json");

const parser = docgen.withCustomConfig(resolve(CANVAS_ROOT, "tsconfig.json"), {
	savePropValueAsString: true,
	shouldExtractLiteralValuesFromEnum: true,
	shouldRemoveUndefinedFromOptional: true,
	propFilter: (prop) => {
		// Skip inherited HTML attributes — they bury Canvas-specific props.
		if (prop.parent) {
			const parentName = prop.parent.fileName ?? "";
			if (parentName.includes("node_modules")) return false;
			if (parentName.includes("@types/react")) return false;
		}
		// Skip ref forwarding noise.
		if (prop.name === "ref" || prop.name === "key") return false;
		return true;
	},
});

interface ExportedProp {
	name: string;
	required: boolean;
	type: string;
	defaultValue: string | null;
	description: string;
}

interface ExportedComponent {
	displayName: string;
	description: string;
	file: string;
	props: ExportedProp[];
}

/**
 * Parse the surface that a source file actually exports — names from
 * `export {…}`, `export const Foo`, `export function Foo`, `export class Foo`.
 * Also include any name a local export rebinds itself to via `.displayName = "X"`.
 * docgen-typescript can return components from imported modules (raw Recharts
 * re-exports surface as `Tooltip`, `Legend`, lifecycle stubs, etc.) — this
 * allow-list lets us filter those out before they reach the docs.
 */
function readExportNames(filePath: string): Set<string> {
	const source = readFileSync(filePath, "utf8");
	const names = new Set<string>();

	for (const match of source.matchAll(
		/^\s*export\s+(?:default\s+)?(?:const|function|class|let)\s+([A-Z]\w*)/gm,
	)) {
		names.add(match[1]);
	}

	for (const block of source.matchAll(/^\s*export\s*\{([^}]+)\}/gm)) {
		for (const segment of block[1].split(",")) {
			const piece = segment.trim();
			if (!piece) continue;
			const aliased = piece.match(/\bas\s+([A-Z]\w*)/);
			if (aliased) {
				names.add(aliased[1]);
				continue;
			}
			const direct = piece.match(/^([A-Z]\w*)/);
			if (direct) names.add(direct[1]);
		}
	}

	// Pick up `Foo.displayName = "Bar"` so the docgen displayName "Bar" passes
	// even when the named export is "Foo".
	for (const match of source.matchAll(/^\s*([A-Z]\w*)\.displayName\s*=\s*["']([A-Z]\w*)["']/gm)) {
		if (names.has(match[1])) names.add(match[2]);
	}

	return names;
}

/** Recharts forwards a sea of DOM/lifecycle handlers; never document them. */
const ALWAYS_DROP_PROPS = new Set<string>([
	"componentDidMount",
	"componentDidUpdate",
	"componentWillUnmount",
	"render",
	"context",
	"props",
	"state",
	"refs",
	"setState",
	"forceUpdate",
	"shouldComponentUpdate",
]);

/**
 * Per-source-file prop blocklists. Used when a canvas component's prop type
 * intersects a foreign API surface (e.g. `ChartTooltipContent` extends
 * `React.ComponentProps<typeof RechartsPrimitive.Tooltip>`). The intersected
 * Recharts props leak through docgen — we drop them here so the docs only
 * describe canvas-authored props.
 */
const FOREIGN_PROPS_BY_FILE: Record<string, Set<string>> = {
	"organisms/chart": new Set([
		"content",
		"cursor",
		"offset",
		"viewBox",
		"allowEscapeViewBox",
		"animationDuration",
		"animationEasing",
		"coordinate",
		"filterNull",
		"defaultIndex",
		"isAnimationActive",
		"payloadUniqBy",
		"position",
		"reverseDirection",
		"shared",
		"trigger",
		"useTranslate3d",
		"wrapperStyle",
		"onBBoxUpdate",
		"chartWidth",
		"chartHeight",
		"margin",
	]),
};

async function main() {
	const glob = new Glob(COMPONENTS_GLOB);
	const files: string[] = [];
	for await (const file of glob.scan({ cwd: CANVAS_ROOT, onlyFiles: true })) {
		files.push(resolve(CANVAS_ROOT, file));
	}
	files.sort();

	console.log(`[extract-props] scanning ${files.length} files…`);

	const manifest: Record<string, ExportedComponent[]> = {};
	let droppedComponents = 0;
	let droppedProps = 0;

	for (const file of files) {
		const relative = file.replace(`${CANVAS_ROOT}/`, "");
		const sourceId = relative.replace("src/components/", "").replace(".tsx", "");
		const allowedExports = readExportNames(file);
		const foreignProps = FOREIGN_PROPS_BY_FILE[sourceId] ?? new Set<string>();
		try {
			const components = parser.parse(file);
			if (components.length === 0) continue;
			const filtered = components.filter((c) => {
				if (ALWAYS_DROP_PROPS.has(c.displayName)) {
					droppedComponents++;
					return false;
				}
				if (allowedExports.size === 0) return true;
				if (!allowedExports.has(c.displayName)) {
					droppedComponents++;
					return false;
				}
				return true;
			});
			const entries: ExportedComponent[] = filtered.map((c) => ({
				displayName: c.displayName,
				description: c.description,
				file: relative,
				props: Object.entries(c.props)
					.filter(([name]) => {
						if (ALWAYS_DROP_PROPS.has(name)) {
							droppedProps++;
							return false;
						}
						if (foreignProps.has(name)) {
							droppedProps++;
							return false;
						}
						return true;
					})
					.map(([name, p]) => ({
						name,
						required: p.required,
						type: p.type.name,
						defaultValue: p.defaultValue?.value ?? null,
						description: p.description ?? "",
					})),
			}));
			entries.sort((a, b) => a.displayName.localeCompare(b.displayName));
			manifest[sourceId] = entries;
		} catch (err) {
			console.warn(`[extract-props] skipped ${relative}:`, (err as Error).message);
		}
	}

	if (droppedComponents > 0 || droppedProps > 0) {
		console.log(
			`[extract-props] dropped ${droppedComponents} non-exported components, ${droppedProps} forbidden props`,
		);
	}

	writeFileSync(OUTPUT, `${JSON.stringify(manifest, null, 2)}\n`);
	console.log(`[extract-props] wrote ${OUTPUT}`);
	console.log(`[extract-props] components: ${Object.keys(manifest).length}`);
}

void main();
