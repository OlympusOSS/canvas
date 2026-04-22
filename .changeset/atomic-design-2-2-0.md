---
"@olympusoss/canvas": minor
---

**Atomic-design migration (2.2.0)**

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
