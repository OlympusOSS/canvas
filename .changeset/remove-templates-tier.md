---
"@olympusoss/canvas": major
---

**BREAKING: All templates removed.** The entire `templates/` tier is gone — `AppHeader`, `AuthLayout`, `AuthShell`, and `WizardShell` no longer exist. Canvas's atomic-design hierarchy is now atoms / molecules / organisms / charts only.

Templates were thin wrappers that duplicated canvas primitives. After removing `AdminShell` (v3.0.0) and `AppShell` (v4.0.0), the remaining four templates added little value over composing the underlying primitives directly. This release deletes them all.

**Migration patterns:**

- `AppHeader` → build a custom `<header>` with `Avatar` / `SearchBar` / `DropdownMenu` / `SidebarTrigger` etc.
- `AuthShell` / `AuthLayout` → centered `<Card>`:
  ```tsx
  <div className="flex min-h-screen items-center justify-center bg-background p-4">
    <div className="flex w-full max-w-md flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <Card className="w-full">
        <CardContent className="p-6">{children}</CardContent>
      </Card>
    </div>
  </div>
  ```
- `WizardShell` → `<Stepper>` + custom flex layout. See daedalus's `WizardLayout` for a full reference.

The `templates/` directory in the canvas docs site is also gone — no Templates section in the component navigation.
