---
"@olympusoss/canvas": patch
---

Fix: every Radix-based portal in canvas now respects `<PortalContainerProvider>`. Previously only `Select` honored the context — `ContextMenu`, `DropdownMenu`, `Popover`, `Menubar`, `Tooltip`, `Dialog`, `AlertDialog`, and `Sheet` all portaled to `document.body` regardless of context. Inside iframes / shadow DOM / scoped containers (e.g. canvas's own docs preview), positioning-based menus (ContextMenu, DropdownMenu, Popover, Menubar, Tooltip) opened at the wrong viewport coordinates. They now portal into whatever container the nearest `PortalContainerProvider` provides — falls back to `document.body` when no provider is in scope.
