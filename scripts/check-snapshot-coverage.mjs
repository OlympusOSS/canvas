#!/usr/bin/env node
/**
 * Snapshot-coverage gate.
 *
 * For every file under src/components/<tier>/*.tsx (excluding tests, stories,
 * and barrel/README), verify that a matching snapshot file exists at
 * test/__snapshots__/<basename>.test.tsx.snap.
 *
 * Exits non-zero if coverage falls below the threshold.
 *
 * Threshold can be overridden via:
 *   SNAPSHOT_COVERAGE_THRESHOLD=90   (percentage 0–100; default 100)
 */

import { existsSync, readdirSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SRC_TIERS = ["atoms", "molecules", "organisms", "templates"];
const SNAPSHOT_DIR = join(ROOT, "test", "__snapshots__");

const threshold = Number(process.env.SNAPSHOT_COVERAGE_THRESHOLD ?? 100);

function listComponentFiles() {
	const out = [];
	for (const tier of SRC_TIERS) {
		const dir = join(ROOT, "src", "components", tier);
		if (!existsSync(dir)) continue;
		for (const entry of readdirSync(dir)) {
			if (!entry.endsWith(".tsx")) continue;
			if (entry.endsWith(".test.tsx") || entry.endsWith(".stories.tsx")) continue;
			out.push({ tier, file: entry, path: join(dir, entry) });
		}
	}
	return out;
}

function hasSnapshot(componentBasename) {
	const snap = join(SNAPSHOT_DIR, `${componentBasename}.test.tsx.snap`);
	return existsSync(snap);
}

function run() {
	const components = listComponentFiles();
	const covered = [];
	const uncovered = [];

	for (const c of components) {
		const base = basename(c.file, ".tsx");
		if (hasSnapshot(base)) covered.push(c);
		else uncovered.push(c);
	}

	const total = components.length;
	const pct = total === 0 ? 100 : (covered.length / total) * 100;

	console.log(`Snapshot coverage: ${pct.toFixed(1)}% (${covered.length}/${total})`);

	if (uncovered.length) {
		console.log("\nComponents without a snapshot:");
		for (const c of uncovered) {
			console.log(`  - ${c.tier}/${c.file}`);
		}
	}

	if (pct < threshold) {
		console.error(`\n✖ Snapshot coverage ${pct.toFixed(1)}% is below threshold ${threshold}%.`);
		console.error(`  Add snapshot tests for the components listed above, or set`);
		console.error(`  SNAPSHOT_COVERAGE_THRESHOLD to the current floor to lock it in.`);
		process.exit(1);
	}
	console.log(`\n✓ Snapshot coverage is at or above threshold (${threshold}%).`);
}

run();
