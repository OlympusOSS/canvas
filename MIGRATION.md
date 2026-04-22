# Migration guide

Upgrade guide for consumers of `@olympusoss/canvas`.

## 2.1.x → 2.2.0

**Summary**: non-breaking minor release. New primitives, templates, and doc
structure. Existing imports continue to work unchanged.

### Internal folder reorganization (invisible to consumers)

`src/components/` is now split into `atoms/`, `molecules/`, `organisms/`, and
`templates/`. The public barrel (`@olympusoss/canvas`) exports the same names
as before. Do **not** import from deep paths like
`@olympusoss/canvas/components/ui/button` — always import from the package
root.

### New components (opt-in)

| Tier | Component | Replaces / enables |
|---|---|---|
| atom | `FlexBox` | flexbox utility wrapper |
| atom | `Section` | vertical-stack wrapper with spacing steps |
| molecule | `PageHeader` | title / subtitle / breadcrumbs / actions |
| molecule | `ActionBar` | primary + secondary button cluster |
| molecule | `SectionCard` | card with loading/error/empty states |
| molecule | `PageTabs` | default / pills / underline tab variants |
| molecule | `SecretField` | password field with async validation + reveal toggle |
| molecule | `Stepper` | horizontal / vertical step indicator |
| molecule | `StatCard` | compact KPI card |
| molecule | `AnimatedBackground` | gradient orb background composition |
| molecule | `PhoneInput` | libphonenumber-js-backed phone field (peer dep) |
| organism | `ThemeProvider` + `useTheme` | SSR-safe light/dark/system theme |
| organism | `ErrorBoundary` | React error boundary with reset |
| organism | `SchemaForm` | RJSF wrapper with Canvas widgets (peer dep) |
| template | `AdminShell` | sidebar + header + main composition |
| template | `WizardShell` | step list + content + terminal drawer |
| template | `AuthShell` | centered auth card with brand header + slots |

### Deprecated

- **`AuthLayout`** — use `AuthShell` instead. `AuthLayout` is still exported
  as a `@deprecated` alias and will be removed in the next major (3.0.0).

### Enhanced `DataTable`

`DataTable` now accepts **both** API shapes (legacy and TanStack-style).
Existing call sites keep working; new code can use either.

Legacy column / prop shape (preserved):
```tsx
const columns: DataTableColumn<Row>[] = [
  { field: "id", headerName: "ID", renderCell: (v) => <code>{v}</code> },
];
<DataTable
  data={rows}
  columns={columns}
  keyField="id"
  loading={isLoading}
  searchable
  searchValue={q}
  onSearchChange={setQ}
  selectable
  selectedKeys={selected}
  onSelectionChange={setSelected}
  onRowClick={handleRowClick}
  onRefresh={refetch}
  onAdd={handleAdd}
  addButtonText="Create"
/>
```

TanStack-style (also works):
```tsx
const columns: DataTableColumn<Row>[] = [
  { accessorKey: "id", header: "ID", cell: ({ row }) => <code>{row.original.id}</code> },
];
<DataTable columns={columns} data={rows} searchKey="id" searchValue={q} />
```

### Optional peer dependencies

`SchemaForm` and `PhoneInput` are optional — you only need their peer deps if
you import them:

```jsonc
{
  "peerDependencies": {
    "@rjsf/core": "^6.0.0",
    "@rjsf/utils": "^6.0.0",
    "@rjsf/validator-ajv8": "^6.0.0",
    "libphonenumber-js": "^1.12.0"
  }
}
```

If you don't use `SchemaForm`/`PhoneInput`, ignore these — no install cost.

### Lint guardrails (recommended)

If your app uses Biome, add `noRestrictedImports` to stop accidental direct
imports of libraries Canvas wraps:

```jsonc
// biome.json
{
  "linter": {
    "rules": {
      "style": {
        "noRestrictedImports": {
          "level": "error",
          "options": {
            "paths": {
              "lucide-react": "Import Icon from @olympusoss/canvas.",
              "sonner": "Import toast/Toaster from @olympusoss/canvas.",
              "@radix-ui/react-dialog": "Import Dialog from @olympusoss/canvas."
            }
          }
        }
      }
    }
  }
}
```

### Migration checklist

If you're following along with an existing app:

1. Bump your `@olympusoss/canvas` dep to `^2.2.0`.
2. Run `bun install` (or `npm install`).
3. `bunx tsc --noEmit` — should pass without source changes.
4. Optionally adopt new primitives incrementally. Recommended order:
   - `ThemeProvider` + `useTheme` if you had a custom theme context.
   - `PageHeader` / `ActionBar` / `SectionCard` / `PageTabs` if you had local
     copies.
   - `AdminShell` / `WizardShell` / `AuthShell` for page-level chrome.
   - `SchemaForm` / `PhoneInput` if you were using RJSF / libphonenumber-js
     directly.
5. Delete your local duplicates after call sites are migrated.

## 2.0.x → 2.1.x

See Canvas v2 shadcn/ui rebuild notes in the 2.1.x release.
