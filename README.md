# @olympusoss/canvas

The Olympus design system — a React + Tailwind component library used by every Olympus app (Athena, Hera, Daedalus, …). Built on top of Radix primitives, Lucide icons, and Tailwind v4.

**Source-only package.** Ships TypeScript source via `main: ./src/index.ts` rather than a built bundle, so consumers tree-shake what they actually use and get accurate types from the source.

## Install

```sh
npm install @olympusoss/canvas
# peers
npm install react react-dom
```

Optional peers (only install if you use the related components):

```sh
npm install @rjsf/core @rjsf/utils @rjsf/validator-ajv8   # SchemaForm
npm install libphonenumber-js                              # PhoneInput
```

## Quick start

```tsx
import "@olympusoss/canvas/styles/tokens.css";
import { Button, Icon } from "@olympusoss/canvas";

export default function App() {
  return (
    <Button variant="default" size="sm">
      <Icon name="Plus" />
      New identity
    </Button>
  );
}
```

Tailwind v4 setup (in your app's CSS entrypoint):

```css
@import "tailwindcss";
@source "../node_modules/@olympusoss/canvas/src/**/*.{ts,tsx}";
```

That `@source` directive tells Tailwind to scan Canvas's source files so utility classes used by Canvas components are included in your build.

## Components

- **Atoms** — Button, Input, Badge, Icon, Avatar, Switch, Slider, …
- **Molecules** — PageHeader, StatCard, SectionCard, StatusBadge, FieldDisplay, EmptyState, DataTable's pieces, …
- **Organisms** — DashboardGrid, DataTable, Sidebar, Dialog, Sheet, Drawer, Popover, Form, Tabs, CodeEditor, MarkdownEditor, RichTextEditor, …
- **Charts** — Theme-aware Recharts wrappers + extras: Sparkline, Gauge, ActivityHeatmap, LabeledBarList, ServiceHealthList, StackedBar, WorldHeatMap, …

Browse the live docs for usage, props, and interactive examples for every component:

→ **https://olympusoss.github.io/canvas/**

## License

MIT — see [LICENSE](./LICENSE) (or the `license` field in `package.json`).
