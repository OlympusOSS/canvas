# Changelog

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
