---
"@olympusoss/canvas": minor
---

Add auth-flow primitives: `Spinner` atom, `PasswordInput`,
`PasswordStrengthMeter` (with `scorePassword` heuristic), `CountdownButton`,
`ClientBrand`, and a slot-based `AuthShell` molecule.

`AuthShell` reverses an earlier decision to keep page-level layouts out of
canvas. Auth flows share a constrained, well-defined shape (single centered
card, brand header above, optional footer below) across every Olympus
surface that needs them, and that shape is now baked into canvas. Full app
shells with sidebars or multi-pane layouts still stay out: compose
`Sidebar` + `SidebarInset` + your own flexbox for those.
