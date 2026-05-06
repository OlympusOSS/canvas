---
"@olympusoss/canvas": patch
---

Docs:

- Example iframes now show a vertical scrollbar when content exceeds the iframe height (capped at `MAX_FRAME_HEIGHT` = 1400px). Previously the iframe forced `overflow: hidden` on `<html>`, so anything taller than the cap was silently clipped — most visible on the Icon Catalog example which renders ~2400px of grid. Switched to `overflow-y: auto` (themed via `tokens.css`) and kept `overflow-x: hidden` so the iframe doesn't double-scroll horizontally with the parent docs column.
- Icon page: `Catalog` example moved to the top of the Examples list so the searchable index appears right after the Import section.
