---
"@olympusoss/canvas": patch
---

Fix: `DashboardGrid` now generates per-breakpoint layouts by scaling each item's `x` and `w` proportionally to the target breakpoint's column count. Resolves the cascading "staircase" bug at `sm`/`xs`/`xxs` (caused by fanning a single lg-shaped layout into every breakpoint, which made `react-grid-layout` clamp `w` while preserving the original `x` offsets). `items` continues to be consumed in lg-coords; no public API changes.

Caveat: drags performed at smaller breakpoints update only that breakpoint's layout (per react-grid-layout). Persist drag-to-edit changes at the `lg` breakpoint.
