---
"@olympusoss/canvas": patch
---

Add globally-themed scrollbars in `tokens.css`. Every overflow-scroll element across canvas (and any consumer app loading the canvas tokens stylesheet) now renders thin, rounded scrollbars tinted with the `--muted-foreground` token at 30% / 45% / 60% opacity for idle / hover / active. Replaces stark OS-default scrollbars (chunky on Win/Linux, mismatched in dark mode) with a subtle treatment that matches the rest of the canvas surface chrome. Firefox uses `scrollbar-color`; WebKit (Chrome/Safari) uses `::-webkit-scrollbar` pseudo-elements. Radix `ScrollArea` continues to render its own custom scrollbar for explicit-scrollbar use cases.
