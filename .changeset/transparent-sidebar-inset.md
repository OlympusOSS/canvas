---
"@olympusoss/canvas": patch
---

fix(glass): make SidebarInset transparent in glass surface mode

Adds `data-slot="sidebar-inset"` to the `<SidebarInset>` element and a
corresponding rule in `glass.css` that sets `background: transparent`
under `html[data-surface="glass"]`. The Tailwind `bg-background`
utility on the component previously painted a solid surface color
that covered the body's aurora gradient in glass mode. The new rule
lets the gradient read through the content column unimpeded; no
backdrop-filter is applied, so the content area stays a clear window
rather than a frosted pane. The sidebar continues to render as a
frosted pane matching the topbar.

Non-glass consumers are unaffected: the rule only activates under
`html[data-surface="glass"]`, and `bg-background` still paints the
default-mode content area.
