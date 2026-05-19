---
"@olympusoss/canvas": minor
---

feat(tokens): self-host Roboto variable font + prefer it in `--font-sans`

Matches the Athena design handoff (`colors_and_type.css`), which moved its
canonical sans family from Inter to Roboto. Canvas now ships the Roboto
variable font (`styles/fonts/Roboto-VariableFont_wdth_wght.ttf`, wght 100-900,
wdth 75-100) and declares the `@font-face` inside `tokens.css`, so any
consumer that imports `@olympusoss/canvas/styles/tokens.css` picks up the
font without each app re-loading it.

`--font-sans` is updated in both light and dark roots to:

	"Roboto", "Inter", system-ui, -apple-system, sans-serif

Inter is retained as a fallback so consumers that still preload Inter via
`next/font/google` get a graceful degradation while they remove that
preload. JetBrains Mono is intentionally not pulled in via Google Fonts to
keep Canvas free of external network dependencies; consumer apps continue
to load their preferred mono font.
