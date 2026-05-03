#!/usr/bin/env bun
/**
 * Build an Orama search index covering components, props, and tokens.
 * Output: src/data/search-index.json — a serialized Orama snapshot loaded
 * lazily by the Cmd-K palette on the docs site.
 */

import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { create, insert, save } from "@orama/orama";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = resolve(__dirname, "../src/data/search-index.json");

interface ComponentEntry {
	displayName: string;
	description: string;
	file: string;
	props: { name: string; description: string }[];
}

const propsManifest = (
	await import("../src/data/props/generated.json", {
		with: { type: "json" },
	})
).default as Record<string, ComponentEntry[]>;

const componentsManifest = (await import("../src/data/components.ts")).COMPONENTS;

const TOKENS_DOCS = [
	{ name: "background", section: "colors" },
	{ name: "foreground", section: "colors" },
	{ name: "primary", section: "colors" },
	{ name: "secondary", section: "colors" },
	{ name: "muted", section: "colors" },
	{ name: "muted-foreground", section: "colors" },
	{ name: "accent", section: "colors" },
	{ name: "border", section: "colors" },
	{ name: "input", section: "colors" },
	{ name: "ring", section: "colors" },
	{ name: "destructive", section: "colors" },
	{ name: "card", section: "colors" },
	{ name: "popover", section: "colors" },
	{ name: "chart-1", section: "colors" },
	{ name: "chart-2", section: "colors" },
	{ name: "chart-3", section: "colors" },
	{ name: "chart-4", section: "colors" },
	{ name: "chart-5", section: "colors" },
	{ name: "radius", section: "radii" },
];

const STATIC_PAGES = [
	{
		id: "home",
		title: "Overview",
		path: "/",
		body: "Canvas design system landing tokens components",
	},
	{
		id: "install",
		title: "Installation",
		path: "/install",
		body: "bun npm pnpm yarn install package GitHub Packages",
	},
	{
		id: "principles",
		title: "Principles",
		path: "/principles",
		body: "Atomic design voice motion accessibility lint guardrails",
	},
	{
		id: "tokens",
		title: "Tokens",
		path: "/tokens",
		body: "Colors typography spacing radii shadows icons animation brand",
	},
	{ id: "migration", title: "Migration", path: "/migration", body: "Upgrade guide version" },
	{ id: "changelog", title: "Changelog", path: "/changelog", body: "Release history" },
];

async function main() {
	const db = create({
		schema: {
			id: "string",
			kind: "string",
			title: "string",
			path: "string",
			body: "string",
			tier: "string",
		},
	});

	let count = 0;

	for (const page of STATIC_PAGES) {
		insert(db, {
			id: `page-${page.id}`,
			kind: "page",
			title: page.title,
			path: page.path,
			body: page.body,
			tier: "",
		});
		count += 1;
	}

	for (const c of componentsManifest) {
		const propsKey = `${c.tier}/${c.id}`;
		const props = propsManifest[propsKey] ?? [];
		const propText = props
			.flatMap((entry) => entry.props.map((p) => `${p.name} ${p.description}`))
			.join(" ");
		insert(db, {
			id: `component-${c.id}`,
			kind: "component",
			title: c.label,
			path: `/components/${c.tier}/${c.id}`,
			body: `${c.label} ${propText}`,
			tier: c.tier,
		});
		count += 1;
	}

	for (const t of TOKENS_DOCS) {
		insert(db, {
			id: `token-${t.name}`,
			kind: "token",
			title: `--${t.name}`,
			path: `/tokens#${t.section}`,
			body: `${t.name} token css variable canvas`,
			tier: "",
		});
		count += 1;
	}

	const snapshot = await save(db);
	writeFileSync(OUTPUT, `${JSON.stringify(snapshot)}\n`);
	console.log(`[search-index] indexed ${count} entries → ${OUTPUT}`);
}

void main();
