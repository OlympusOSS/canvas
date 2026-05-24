import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import { gzipSync } from "node:zlib";

const STYLES_DIR = join(import.meta.dir, "..", "styles");
const MAX_TOTAL_GZIP = 30_720;
const MAX_FILE_GZIP = 2_048;

interface FileSize {
  path: string;
  raw: number;
  gzip: number;
}

async function collectCSSFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await collectCSSFiles(full)));
    else if (entry.name.endsWith(".css")) files.push(full);
  }
  return files;
}

const files = await collectCSSFiles(STYLES_DIR);
const sizes: FileSize[] = [];

for (const file of files) {
  const content = await readFile(file);
  sizes.push({
    path: relative(join(import.meta.dir, ".."), file),
    raw: content.length,
    gzip: gzipSync(content).length,
  });
}

sizes.sort((a, b) => b.gzip - a.gzip);

const totalRaw = sizes.reduce((s, f) => s + f.raw, 0);
const totalGzip = sizes.reduce((s, f) => s + f.gzip, 0);

console.log("CSS Size Report");
console.log("================\n");
console.log(`${"File".padEnd(50)} ${"Raw".padStart(8)} ${"Gzip".padStart(8)}`);
console.log("-".repeat(68));

let oversized: string[] = [];

for (const f of sizes) {
  const flag = f.gzip > MAX_FILE_GZIP ? " !" : "";
  console.log(`${f.path.padEnd(50)} ${(f.raw + "B").padStart(8)} ${(f.gzip + "B").padStart(8)}${flag}`);
  if (f.gzip > MAX_FILE_GZIP) oversized.push(f.path);
}

console.log("-".repeat(68));
console.log(`${"Total".padEnd(50)} ${(totalRaw + "B").padStart(8)} ${(totalGzip + "B").padStart(8)}`);
console.log(`\nBudget: ${MAX_TOTAL_GZIP}B gzip total, ${MAX_FILE_GZIP}B gzip per file`);

let failed = false;

if (totalGzip > MAX_TOTAL_GZIP) {
  console.log(`\nTotal gzip size ${totalGzip}B exceeds budget ${MAX_TOTAL_GZIP}B`);
  failed = true;
}

if (oversized.length) {
  console.log(`\n${oversized.length} file(s) exceed per-file budget:`);
  for (const f of oversized) console.log(`  ${f}`);
  failed = true;
}

if (!failed) console.log("\nSize check passed.");
else process.exit(1);
