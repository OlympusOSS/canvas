---
"@olympusoss/canvas": patch
---

fix(surface): remove @layer base from glass.css so frosted-pane backgrounds override Tailwind utilities

Glass surfaces (cards, sidebar, dialogs, etc.) rendered with fully
opaque backgrounds because Tailwind v4 places `bg-card` and similar
utilities in `@layer utilities`, which always wins over `@layer base`
regardless of selector specificity. Moving glass.css to unlayered CSS
restores the intended translucent fills and backdrop-filter blur.
