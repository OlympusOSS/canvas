# Changelog

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
