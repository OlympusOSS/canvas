# Templates

Page-level scaffolding. Layout regions + composition slots.

**Can import**: `tokens/`, `lib/utils`, `atoms/`, `molecules/`, `organisms/`, React.

Templates stop at structure — they don't fetch data or know about specific
routes. `AppShell` provides header + sidebar + main slots; the app composes
its own `Header` and `Sidebar` into those slots.

Templates are where composition slots belong. Prefer render-prop signatures
(e.g. `sidebar?: ReactNode | ((ctx) => ReactNode)`) over deeply prescriptive
props — consumer apps vary in what they put in the chrome.

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) for the full atomic-design rules.
