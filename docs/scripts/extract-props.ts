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

import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Glob } from "bun";
import * as docgen from "react-docgen-typescript";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CANVAS_ROOT = resolve(__dirname, "../../");
const COMPONENTS_GLOB = "src/components/{atoms,molecules,organisms,templates}/*.tsx";
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

async function main() {
	const glob = new Glob(COMPONENTS_GLOB);
	const files: string[] = [];
	for await (const file of glob.scan({ cwd: CANVAS_ROOT, onlyFiles: true })) {
		files.push(resolve(CANVAS_ROOT, file));
	}
	files.sort();

	console.log(`[extract-props] scanning ${files.length} files…`);

	const manifest: Record<string, ExportedComponent[]> = {};

	for (const file of files) {
		const relative = file.replace(`${CANVAS_ROOT}/`, "");
		const sourceId = relative.replace("src/components/", "").replace(".tsx", "");
		try {
			const components = parser.parse(file);
			if (components.length === 0) continue;
			manifest[sourceId] = components.map((c) => ({
				displayName: c.displayName,
				description: c.description,
				file: relative,
				props: Object.entries(c.props).map(([name, p]) => ({
					name,
					required: p.required,
					type: p.type.name,
					defaultValue: p.defaultValue?.value ?? null,
					description: p.description ?? "",
				})),
			}));
		} catch (err) {
			console.warn(`[extract-props] skipped ${relative}:`, (err as Error).message);
		}
	}

	writeFileSync(OUTPUT, `${JSON.stringify(manifest, null, 2)}\n`);
	console.log(`[extract-props] wrote ${OUTPUT}`);
	console.log(`[extract-props] components: ${Object.keys(manifest).length}`);
}

void main();
