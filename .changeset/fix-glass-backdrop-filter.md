---
"@olympusoss/canvas": patch
---

Fix glass surface backdrop-filter being stripped by Lightning CSS

Lightning CSS (used by Turbopack/Next.js via @tailwindcss/postcss) silently
removes `backdrop-filter` declarations when `var()` appears inside filter
functions like `blur()` or `saturate()`. Replaced the CSS variable references
with literal values (`blur(18px) saturate(140%)`) so the frosted-glass effect
survives compilation. The values are constant across light and dark themes.
