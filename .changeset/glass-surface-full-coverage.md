---
"@olympusoss/canvas": minor
---

feat(surface): extend glass surface mode to every component with a surface

Completes the glass-mode port started in 2.16.0. Every Canvas component
that paints a background or border now opts into the frosted-pane
treatment when `html[data-surface="glass"]` is set. Adds `data-slot`
markers and matching selectors in `styles/glass.css` for:

- `Alert` → `data-slot="alert"`
- `AlertDialogContent` → `data-slot="alert-dialog-content"`
- `Calendar` (DayPicker root) → `data-slot="calendar"` (already had it
  on its custom `Root` override; now also propagates via DayPicker
  props for consumers that pass their own Root)
- `Command` → `data-slot="command"`
- `ContextMenuContent` → `data-slot="context-menu-content"`
- `ContextMenuSubContent` → `data-slot="context-menu-sub-content"`
- `DialogContent` → `data-slot="dialog-content"`
- `DropdownMenuContent` → `data-slot="dropdown-menu-content"`
- `DropdownMenuSubContent` → `data-slot="dropdown-menu-sub-content"`
- `HoverCardContent` → `data-slot="hover-card-content"`
- `Menubar` → `data-slot="menubar"`
- `MenubarContent` → `data-slot="menubar-content"`
- `MenubarSubContent` → `data-slot="menubar-sub-content"`
- `NavigationMenuViewport` → `data-slot="navigation-menu-viewport"`
- `SelectContent` → `data-slot="select-content"`
- `TabsList` → `data-slot="tabs-list"`
- `Terminal` → `data-slot="terminal"`
- `TooltipContent` → `data-slot="tooltip-content"`
- `AccordionItem` → `data-slot="accordion-item"` (border-only treatment)

Three tone groups in `glass.css`:

- Card-tone (translucent fill + blur + alpha border + inner highlight)
  covers cards, chrome, alert/calendar/terminal, and all dialog/popover
  surfaces by default.
- Dialog-tone (`0.85` tint over card-tone) keeps popover/dialog content
  legible against the body aurora.
- Input-tone (`0.35` tint + 8px blur) covers form fields, code blocks,
  and tabs list.

AccordionItem gets a border-only override since it has no fill.

All snapshots regenerated; 861/861 tests pass. No API surface change —
the new `data-slot` HTML attributes are non-breaking.
