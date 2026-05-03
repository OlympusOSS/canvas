---
"@olympusoss/canvas": major
---

**BREAKING: `AppShell` template removed.**

`AppShell` was a thin wrapper around a custom `<aside>` sidebar layout that duplicated canvas's existing `SidebarProvider` + `Sidebar` + `SidebarInset` system. Removed in favor of using those primitives directly — same capability, single source of truth.

**Migration**:

```tsx
// Before:
<AppShell
  sidebar={({ expanded, setExpanded, closeMobile }) => (
    <MyNav expanded={expanded} onToggle={() => setExpanded(!expanded)} onNavigate={closeMobile} />
  )}
  header={({ onMobileMenuToggle }) => <MyHeader onMobileMenuToggle={onMobileMenuToggle} />}
>
  {content}
</AppShell>

// After:
<SidebarProvider>
  <Sidebar collapsible="icon">
    <SidebarHeader>...</SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard"><Icon name="LayoutDashboard" />Dashboard</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>...</SidebarFooter>
  </Sidebar>
  <SidebarInset>
    <MyHeader />     {/* uses <SidebarTrigger /> internally for the mobile menu */}
    <main>{content}</main>
  </SidebarInset>
</SidebarProvider>
```

The mobile menu hamburger is now `<SidebarTrigger />`, which calls `useSidebar().toggleSidebar` from context — no need to thread `onMobileMenuToggle` callbacks.

This is the second major today (v3.0.0 → v4.0.0). Both removals (`AdminShell` in v3, `AppShell` in v4) are part of the same cleanup: the canvas Sidebar primitives are the canonical way to build app shells, and the redundant template wrappers were causing layout bugs and forcing parallel state management.
