# Changelog

## 2.6.18

### Patch Changes

- 567d778: **Fix**: `DashboardGrid` now measures parent width correctly in iframes, modals, and any other container that resizes independently of the window.

  Previously DashboardGrid wrapped `react-grid-layout` with the upstream `WidthProvider` HOC, which defaults its initial width to 1280px and updates only on `window.resize` events. In iframes (e.g. the canvas docs preview) that resize event never fires from the parent context, so the grid stayed at the 1280px default forever — items overflowed any narrower container by 240px and got clipped.

  Replaced with a `ResizeObserver` that observes the grid's own wrapper, plus a synchronous `useLayoutEffect` initial measurement so the first paint already has the correct width in real browsers. SSR / jsdom fall back to a 1024px default.

  **Change**: default vertical margin reduced from `16px` to `8px` (default `margin` prop is now `[16, 8]` instead of `[16, 16]`). Tighter row gaps match the visual density most dashboards want; consumers who liked the looser spacing can pass `margin={[16, 16]}` explicitly.

## 5.0.0

### Major Changes

- 139eb27: **BREAKING: All templates removed.** The entire `templates/` tier is gone — `AppHeader`, `AuthLayout`, `AuthShell`, and `WizardShell` no longer exist. Canvas's atomic-design hierarchy is now atoms / molecules / organisms / charts only.

  Templates were thin wrappers that duplicated canvas primitives. After removing `AdminShell` (v3.0.0) and `AppShell` (v4.0.0), the remaining four templates added little value over composing the underlying primitives directly. This release deletes them all.

  **Migration patterns:**

  - `AppHeader` → build a custom `<header>` with `Avatar` / `SearchBar` / `DropdownMenu` / `SidebarTrigger` etc.
  - `AuthShell` / `AuthLayout` → centered `<Card>`:
    ```tsx
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <Card className="w-full">
          <CardContent className="p-6">{children}</CardContent>
        </Card>
      </div>
    </div>
    ```
  - `WizardShell` → `<Stepper>` + custom flex layout. See daedalus's `WizardLayout` for a full reference.

  The `templates/` directory in the canvas docs site is also gone — no Templates section in the component navigation.

## 4.0.0

### Major Changes

- 9e2f4e7: **BREAKING: `AppShell` template removed.**

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

## 3.0.0

### Major Changes

- 8551b07: **BREAKING: `AdminShell` template removed.**

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

## 2.4.0

### Minor Changes

- f96ba6d: **Chart tier — full migration from organism to `src/components/charts/`**

  The legacy `organisms/chart.tsx` has been replaced by a dedicated chart tier
  with 14 source files. All existing named exports (`ChartConfig`,
  `ChartContainer`, `ChartStyle`, `useChart`, `ChartTooltip`,
  `ChartTooltipContent`, `ChartLegend`, `ChartLegendContent`) continue to work
  unchanged.

  New exports:

  - **Chart-type wrappers**: `AreaChart`, `BarChart`, `ComposedChart`,
    `FunnelChart`, `LineChart`, `PieChart`, `RadarChart`, `RadialBarChart`,
    `Sankey`, `ScatterChart`, `SunburstChart`, `Treemap`.
  - **Data primitives**: `Area`, `Bar`, `Funnel`, `Line`, `Pie`, `Radar`,
    `RadialBar`, `Scatter`.
  - **Axes**: `CartesianAxis`, `XAxis`, `YAxis`, `ZAxis`, `PolarAngleAxis`,
    `PolarRadiusAxis`.
  - **Grids**: `CartesianGrid`, `PolarGrid`.
  - **References**: `ReferenceArea`, `ReferenceDot`, `ReferenceLine`.
  - **Labels**: `ChartLabel` (renamed from recharts `Label` to avoid collision
    with the atom-tier form `Label`), `LabelList`, `Text`.
  - **Containers**: `Brush`, `Layer`, `ResponsiveContainer`, `Surface`.
  - **Details**: `ChartCell`, `ChartCustomized`, `Cross`, `Curve`, `Dot`,
    `ErrorBar`, `Polygon`, `Rectangle`, `Sector`, `Trapezoid`.
  - **Geo**: `WorldHeatMap` (lazy-loaded Leaflet; peer-optional `leaflet` +
    `react-leaflet`).

  **Auto-palette**: `ChartContainer` now walks its children and injects
  `hsl(var(--chart-N))` on data primitives that have neither `fill` nor
  `stroke` set. Consumers passing explicit colors are unaffected.

- c89d485: **8 new components from Athena admin handoff**

  - New molecules: `ActivityItem`, `BrandLockup`, `NotificationItem`,
    `NotificationList`, `NumberBadge`, `Sparkline`, `UserAvatarChip`.
  - New template: `AppHeader`.
  - Surface-elevation token layer.

### Docs

- 280+ curated component examples across all tiers.
- 13 chart-slug example pages (area, bar, composed, funnel, line, pie, radar,
  radial-bar, sankey, scatter, sunburst, treemap, world-heat-map).
- Viewport preview (desktop / tablet / mobile) for all examples.
- Scroll-position-based TOC tracking with click-aware active indicator.
- Props tables and search index regenerated for all shipped components.

## 2.3.1

### Patch Changes

- 206089a: Add `@keyframes orb-float-1` and `@keyframes orb-float-2` to `styles/tokens.css`. The `AnimatedBackground` molecule references these keyframe names but did not ship the definitions, so consumers had to re-declare them locally to get the drifting orb animation. Now the contract is self-contained: any app importing `@olympusoss/canvas/styles/tokens.css` gets the animations for free.

## 2.3.0

### Minor Changes

- 8211248: **Atomic-design migration (2.2.0)**

  - Physically reorganize `src/components/` into `atoms/` / `molecules/` /
    `organisms/` / `templates/`. Public barrel API unchanged — consumer imports
    continue to work.
  - New atoms: `FlexBox`, `Section`.
  - New molecules: `PageHeader`, `ActionBar`, `SectionCard`, `PageTabs`,
    `SecretField`, `Stepper`, `StatCard`, `AnimatedBackground`, `PhoneInput`.
  - New organisms: `ThemeProvider` + `useTheme`, `ErrorBoundary`, `SchemaForm`.
  - New templates: `AdminShell`, `WizardShell`, `AuthShell`.
  - Enhanced `DataTable` with legacy+TanStack-compatible column shape and props
    (`keyField`, `loading`, `searchable`, `onRowClick`, `onRefresh`, `onAdd`,
    `selectable`, `selectedKeys`, `onSelectionChange`, `pagination`,
    `pageSizeOptions`; column `field`/`headerName`/`renderCell`/`width`/`flex`/
    `minWidth`/`maxWidth`/`sortable`).
  - `AuthLayout` marked `@deprecated` — use `AuthShell`. Will be removed in 3.0.
  - `toast` re-exported from `@olympusoss/canvas` (was only accessible via
    direct `sonner` import before).
  - Added `CONTRIBUTING.md` with atomic-design classification rules and
    per-tier READMEs documenting import boundaries.
  - Added `MIGRATION.md` for consumers upgrading 2.1.x → 2.2.0.
  - `SecretField` reveal button now has `aria-label` (a11y fix).
  - All Canvas components now correctly mark `"use client"` based on RSC
    requirements (9 files reconciled — 8 added, 1 removed).

  Optional peer deps: `@rjsf/core`, `@rjsf/utils`, `@rjsf/validator-ajv8`,
  `libphonenumber-js` (required only when importing `SchemaForm` or
  `PhoneInput`).

## 2.2.0

### Added

- **Atomic-design folder layout** — `src/components/` is now split into
  `atoms/`, `molecules/`, `organisms/`, `templates/`. Public API unchanged
  (everything still exports from the package root).
- **New atoms**: `FlexBox`, `Section`.
- **New molecules**: `PageHeader`, `ActionBar`, `SectionCard`, `PageTabs`,
  `SecretField`, `Stepper`, `StatCard`, `AnimatedBackground`.
- **New organisms**: `ThemeProvider` + `useTheme` (light/dark/system,
  SSR-safe, localStorage-backed), `ErrorBoundary`.
- **New templates**: `AuthShell`, `AdminShell`, `WizardShell`.
- **Enhanced `DataTable`** — accepts the legacy API (`keyField`, `loading`,
  `searchable`, `onRowClick`, `onRefresh`, `onAdd`, `selectable`,
  `selectedKeys`, `onSelectionChange`, `pagination`, `pageSizeOptions`) and
  legacy column shape (`field`, `headerName`, `renderCell`, `width`, `flex`,
  `minWidth`, `maxWidth`, `sortable`) alongside the TanStack-style API.
  Columns are normalized internally.
- **Documentation**: `CONTRIBUTING.md` with atomic-design rules; per-tier
  READMEs under `src/components/*/README.md`.

### Deprecated

- `AuthLayout` — use `AuthShell` instead. Removed in next major.

### Internal

- Canvas depends on `@tanstack/react-table` (already a transitive dep via
  the old DataTable).
- `src/native.ts` updated for new component paths. Still exports
  types-only (RN-safe).

## 2.1.x

- shadcn/ui rebuild (breaking changes documented in migration notes).

---

Older versions tracked on GitHub releases.
