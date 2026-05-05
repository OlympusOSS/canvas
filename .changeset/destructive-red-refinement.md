---
"@olympusoss/canvas": patch
---

Tweak: Refine the `--destructive` (and matching `--stat-destructive`) token to a deeper, more professional red.

- Light: `hsl(0 84.2% 60.2%)` → `hsl(0 72% 51%)` (Tailwind red-500 → red-600 / `#ef4444` → `#dc2626`)
- Dark: `hsl(0 70% 45%)` → `hsl(0 70% 55%)` (slightly lighter for legibility on dark surfaces)

Cascades to every error/danger surface (Form errors, AlertDialog destructive action, destructive Button, Badge, Alert, Stepper error step, StatCard `destructive` variant, etc.). White foreground text still passes WCAG AA against the new background.
