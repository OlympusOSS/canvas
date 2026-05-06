---
"@olympusoss/canvas": patch
---

Docs:

- Example iframes now show a vertical scrollbar **only** when content flows past the bottom of the iframe. Two fixes stacked:
  - `<html>` overflow `hidden` → `auto` so content taller than `MAX_FRAME_HEIGHT` (1400px) gets a themed scrollbar instead of being silently clipped.
  - `box-sizing: content-box` on the iframe so the 2px of border doesn't subtract from the inner viewport. Tailwind's preflight applies `box-sizing: border-box` globally, which made `height: 200px` resolve to a 198px viewport and triggered a phantom scrollbar on every example whose content was sized to match the iframe.
- `Icon` page: `Catalog` example moved to the top of the Examples list so the searchable index appears right after the Import section.
