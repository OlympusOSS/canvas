#!/usr/bin/env bun
/**
 * Crawl sibling Olympus repos (hera, athena, site) for `@olympusoss/canvas`
 * imports and emit a manifest of "where each component is used in real code."
 *
 * Output: src/data/used-in.json — a map of componentName → array of
 * { repo, path, line } pointing at concrete files in the sibling repos.
 *
 * Run: `bun scripts/extract-used-in.ts`
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Glob } from "bun";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = resolve(__dirname, "../src/data/used-in.json");

const SIBLING_ROOT = resolve(__dirname, "../../../");
const REPOS = ["hera", "athena", "site"] as const;
const REPO_BASE_URL: Record<(typeof REPOS)[number], string> = {
	hera: "https://github.com/OlympusOSS/hera/blob/main",
	athena: "https://github.com/OlympusOSS/athena/blob/main",
	site: "https://github.com/OlympusOSS/site/blob/main",
};

type Usage = { repo: string; path: string; line: number; url: string };

const IMPORT_REGEX = /import\s*(?:type\s+)?\{([^}]+)\}\s*from\s*["']@olympusoss\/canvas["']/g;

async function main() {
	const usagesByName: Record<string, Usage[]> = {};

	for (const repo of REPOS) {
		const repoSrc = resolve(SIBLING_ROOT, repo, "src");
		if (!existsSync(repoSrc)) {
			console.log(`[used-in] ${repo}: skipping (no src/)`);
			continue;
		}

		const glob = new Glob("**/*.{ts,tsx}");
		let fileCount = 0;
		for await (const rel of glob.scan({ cwd: repoSrc, onlyFiles: true })) {
			const full = resolve(repoSrc, rel);
			let content: string;
			try {
				content = readFileSync(full, "utf-8");
			} catch {
				continue;
			}
			fileCount += 1;

			IMPORT_REGEX.lastIndex = 0;
			let match: RegExpExecArray | null = IMPORT_REGEX.exec(content);
			while (match !== null) {
				const before = content.slice(0, match.index);
				const line = before.split("\n").length;
				const names = match[1]
					.split(",")
					.map((n) => n.replace(/(?:type\s+)?(\w+)(?:\s+as\s+\w+)?/, "$1").trim())
					.filter(Boolean);

				const path = `src/${rel}`;
				const url = `${REPO_BASE_URL[repo]}/${path}#L${line}`;

				for (const name of names) {
					if (!name) continue;
					if (!usagesByName[name]) usagesByName[name] = [];
					usagesByName[name].push({ repo, path, line, url });
				}

				match = IMPORT_REGEX.exec(content);
			}
		}
		console.log(`[used-in] ${repo}: scanned ${fileCount} files`);
	}

	const totalUsages = Object.values(usagesByName).reduce((sum, list) => sum + list.length, 0);
	const output = {
		generatedAt: new Date().toISOString(),
		repos: REPOS,
		usagesByName,
	};
	writeFileSync(OUTPUT, `${JSON.stringify(output, null, 2)}\n`);
	console.log(`[used-in] wrote ${OUTPUT}`);
	console.log(`[used-in] components referenced: ${Object.keys(usagesByName).length}`);
	console.log(`[used-in] total usages: ${totalUsages}`);
}

void main();
