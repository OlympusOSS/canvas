---
"@olympusoss/canvas": patch
---

Fix: `SelectItem` now wraps its children in a `flex items-center gap-2` row so inline icons compose horizontally with their label instead of stacking. Tailwind's preflight makes `<svg>` block-level, which previously pushed the label below the icon in both the dropdown items and the trigger's selected-value display. Affects any consumer rendering `<SelectItem><Icon name="…" /> Label</SelectItem>`.
