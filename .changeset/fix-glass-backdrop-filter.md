---
"@olympusoss/canvas": patch
---

Fix glass surface backdrop-filter being stripped by Lightning CSS

Lightning CSS (used by Turbopack/Next.js via @tailwindcss/postcss) strips
`backdrop-filter` when `var()` appears inside a filter function like
`blur(var(--x))` because it cannot validate the argument type at compile
time. Collapsed `--glass-blur` and `--glass-saturate` into a single
`--glass-backdrop` whole-value custom property so the declaration reads
`backdrop-filter: var(--glass-backdrop)`. A top-level `var()` is preserved
as an opaque substitution that the browser resolves at runtime. Same
treatment for the subtle variant used by inputs and code blocks.
