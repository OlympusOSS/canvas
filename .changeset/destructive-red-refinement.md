---
"@olympusoss/canvas": patch
---

Tweak: Refine the `--destructive` (and matching `--stat-destructive`) token to a warmer, more vibrant coral-red — replacing the previous flat pinkish red.

- Light: `hsl(0 84.2% 60.2%)` (`#ef4444`) → `hsl(4 78% 50%)` (`#df341d`) — warm, deep, authoritative
- Dark: `hsl(0 70% 45%)` (`#c33b3b`) → `hsl(4 88% 62%)` (`#f15238`) — warm coral, vibrant on dark surfaces

Cascades to every error/danger surface (Form errors, AlertDialog destructive action, destructive Button, Badge, Alert, Stepper error step, StatCard `destructive` variant, Textarea `border-destructive`, etc.). White foreground text still passes WCAG AA against the new background.
