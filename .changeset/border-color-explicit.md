---
"@olympusoss/canvas": patch
---

Fix: bind every component that uses `border` to the `border-border` token explicitly. The base `* { border-color: hsl(var(--border)) }` rule from `tokens.css` was supposed to set the default, but Tailwind v4's `border` utility produced `currentColor` borders in some render contexts (notably iframes), making the borders render as bright white in dark mode. Affects: `Badge`, `Card`, `Alert`, `Stepper`, `ButtonGroupText`, `Popover`, `HoverCard`, `DropdownMenu` (content + sub), `Menubar` (root + content + sub), `ContextMenu` (content + sub), `NavigationMenuViewport`, `Drawer`, `DataTable` wrapper, `SelectContent`. `AlertDialog`/`Dialog` content was already fixed in the previous patch.
