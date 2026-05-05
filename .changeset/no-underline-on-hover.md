---
"@olympusoss/canvas": patch
---

Tweak: Replace legacy "underline on hover" with a softer color-shift hover across every link surface in the design system.

- `Button` `variant="link"` — drop `underline-offset-4 hover:underline`; hover now fades text from `text-primary` → `text-primary/70`.
- `AccordionTrigger` — drop `hover:underline`; hover now shifts to `text-foreground/70` (kept `transition-colors`).
- Prose anchors (`PROSE_CANVAS_CLASSES`, used by `RichTextEditor` + `MarkdownEditor` preview) — drop the always-on underline + `decoration-*` shift; anchors now stay `text-brand` and fade to `text-brand/70` on hover.

Already-correct surfaces (`NavBar`, `Breadcrumb`, `PageHeader` breadcrumbs) used color-shift only — no change.

Fix: Tighten the vertical-orientation `Carousel` prev/next buttons. They were positioned at `-top-12` / `-bottom-12` (16px gap from viewport edge). Combined with a viewport that's typically taller than a single slide, the buttons looked detached from the visible card. Now `-top-10` / `-bottom-10` (8px gap). Horizontal orientation unchanged.
