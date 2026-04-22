# Organisms

Stateful surfaces. Compositions of atoms + molecules that own interactive
state (open/close, selection, form state) or complete complex UX.

**Can import**: `tokens/`, `lib/utils`, `atoms/`, `molecules/`, React.

**Cannot import**: anything from `templates/`.

Organisms are reusable — they don't know about specific app routes or domain
data. `DataTable` is an organism; `IdentitiesTable` (which knows how to render
a `Kratos.Identity`) is app-specific and belongs in that app's `features/`.

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) for the full atomic-design rules.
