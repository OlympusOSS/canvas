---
"@olympusoss/canvas": minor
---

Add `LauncherCard` and `Terminal` molecules, and a `theme` prop on `CodeBlock`. Lifted from the OlympusOSS site so every Olympus surface can use the same tile / terminal / dark-code pattern.

- **`LauncherCard`** — tone-driven launcher tile (badge + title + description + footer slot). Built-in tones: `default` (uses `--primary`), `indigo`, `violet`, `slate`. Set `href` to make the whole card a hover-lifted link; mirrors `NavBar`'s `linkComponent` prop for Next.js routing.
- **`Terminal`** — dark macOS-style terminal panel with traffic-light chrome, optional title in the strip, and a `<pre>` body. Free-form `children` so consumers can drop inline `<span>` highlights for colour-coded status/values.
- **`CodeBlock` `theme="light" | "dark"`** — additive prop; default `"light"` keeps the existing `bg-muted` styling. `theme="dark"` switches to the terminal palette (`#0a0a0b` background, `#e4e4e7` text) for marketing surfaces. The `overflow-hidden` class is now applied in both themes so the rounded corners always clip the header border.
