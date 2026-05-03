---
"@olympusoss/canvas": major
---

**BREAKING: `AdminShell` template removed.**

`AdminShell` had a layout bug (double-counted sidebar width via `md:ml-60` margin on top of flex layout, producing ~240px of dead space) and an inconsistent role. Replaced by the new **`AppShell`** template — same sidebar + header + children layout, with the bug fixed and the unused margin override props removed.

**Migration**:

```tsx
// Before:
<AdminShell sidebar={...} header={...}>
  {content}
</AdminShell>

// After:
<AppShell sidebar={...} header={...}>
  {content}
</AppShell>
```

The `AppShell` API is identical to the old `AdminShell` minus two unused props:

- `expandedSidebarClass` (removed — was the source of the layout bug)
- `collapsedSidebarClass` (removed — was the source of the layout bug)

For dashboard routes that need a widget grid, compose `AppShell` with the canvas `Sidebar` organism + `DashboardGrid` directly.
