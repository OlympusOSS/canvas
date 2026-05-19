---
"@olympusoss/canvas": minor
---

feat(tokens): adopt the handoff's two-tone shadow scale

Aligns Canvas's `box-shadow` tokens with the Athena design handoff
(`~/Downloads/Athena/canvas.css`). The handoff uses two visible
tones, both single-layer:

- **Subtle** (`0 1px 2px 0 rgb(0 0 0 / 0.05)`) on inputs, outline
  buttons, secondary buttons.
- **Card** (`0 1px 3px 0 rgb(0 0 0 / 0.08)`) on cards, primary
  buttons, destructive buttons.

Canvas previously inherited Tailwind's default scale, which is a
two-layer stack at 10% opacity. That read as noticeably heavier
shadows on cards and buttons, and even heavier (`shadow-lg`) on
popovers.

This change overrides the `@theme` shadow tokens so every
`shadow`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`
utility picks up the softer handoff palette without touching
component source. Tokens:

	--shadow-2xs / xs / sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
	--shadow (DEFAULT):    0 1px 3px 0 rgb(0 0 0 / 0.08)
	--shadow-md:           0 4px 6px -1px / 0.08, 0 2px 4px -2px / 0.06
	--shadow-lg:           0 10px 15px -3px / 0.08, 0 4px 6px -4px / 0.06
	--shadow-xl:           0 20px 25px -5px / 0.08, 0 8px 10px -6px / 0.06

`shadow-inner` keeps the Tailwind default.

Also flips `<Button variant="destructive">` from `shadow-sm` to
`shadow` so destructive buttons sit on the same card-tier shadow as
the default/primary variant, matching the handoff's `.btn-destructive`
rule. No other component sources change.

Snapshots are unaffected because the tokens render as CSS-variable
values, not class names, and the Button-destructive class change
isn't covered by an existing snapshot test.
