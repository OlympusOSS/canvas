# Molecules

Small compositions of atoms. Meaningful UI semantics. No app-state model.

**Can import**: `tokens/`, `lib/utils`, `atoms/`, React.

**Cannot import**: anything from `organisms/` or `templates/`.

Molecules don't own interactive state more complex than a local toggle. If it
has open/close state, selection, or form integration, it's an organism.

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) for the full atomic-design rules.
