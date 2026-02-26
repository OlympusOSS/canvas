# Canvas

Shared design system for the [OlympusOSS Identity Platform](https://github.com/OlympusOSS/platform).

React component library + CSS design tokens consumed by [Athena](https://github.com/OlympusOSS/athena), [Hera](https://github.com/OlympusOSS/hera), and [Demo](https://github.com/OlympusOSS/demo).

**[Storybook](https://olympusoss.github.io/canvas/)** — Browse and interact with all components live.

---

## Installation

```bash
bun add @olympusoss/canvas
```

Import the styles in your app's global CSS:

```css
@import "@olympusoss/canvas/styles/tokens.css";
@import "@olympusoss/canvas/styles/animations.css";
@import "@olympusoss/canvas/styles/glass.css";
```

---

## Components

### UI Primitives

Built on [Radix UI](https://www.radix-ui.com/) with Tailwind styling:

`Button` · `Card` · `Dialog` · `DropdownMenu` · `Select` · `Input` · `Textarea` · `Checkbox` · `Switch` · `Label` · `Tooltip` · `Popover` · `Accordion` · `Avatar` · `Badge` · `Alert` · `Table` · `Tabs` · `Toast` · `CodeBlock` · `Separator` · `ScrollArea` · `Skeleton`

### Charts

Built on [Nivo](https://nivo.rocks/):

- **AnimatedAreaChart** — Time-series area chart with gradient fill
- **AnimatedPieChart** — Donut/pie chart with animated transitions
- **ChartCard** — Card wrapper for charts
- **StatCard** — KPI metric display with trend indicator
- **VerificationGauge** — Progress/status visualization

### Data Display

- **DataTable** — Searchable, sortable, filterable table with pagination
- **InfoPanel** — Titled card with columnar field layout
- **FieldDisplay** — Label + value pair
- **DataList** — Structured list of fields
- **StatusBadge** — Color-coded status indicator

### Feedback

- **LoadingState** — Spinner with message
- **ErrorState** — Error display with retry action
- **EmptyState** — Empty content placeholder

### Auth Components

- **AuthLayout** — Full-screen centered layout with animated background
- **AuthFormCard** — Glass card for login/registration forms
- **AuthFormHeader** — Animated brand header (logo, title, subtitle)
- **AuthFormError** — Animated error message
- **AuthFormField** — Animated field wrapper
- **AuthSubmitButton** — Gradient button with shimmer and loading state
- **AuthCard** — Animated feature card with gradient hover effects
- **LoginButton** — Branded CTA button with shimmer effect

### Shared

- **PageShell** — App page layout wrapper
- **SessionDisplay** — User session/token viewer
- **AnimatedBackground** — Floating gradient orbs

### Utilities

- **Icon** — Lucide icon wrapper with consistent sizing
- **cn()** — Class merge utility (clsx + tailwind-merge)
- **useCanvasTheme()** — Theme context hook
- **useNivoTheme()** — Nivo chart theme hook

---

## Design Tokens

`tokens.css` defines CSS custom properties for colors, spacing, and glass effects in both light and dark mode.

Key token groups:
- **Colors** — background, foreground, primary, secondary, muted, accent, destructive, success
- **Layout** — radius, border, ring, input
- **Glass** — blur, opacity, border, and shadow tokens for each glass tier

---

## Glass System

Three tiers of frosted-glass surfaces for dark mode. Light mode renders as solid surfaces.

| Class | Use | Blur | Opacity |
|-------|-----|------|---------|
| `glass-surface` | Content cards, panels | 12px | 60% |
| `glass-chrome` | Sidebar, header, toolbars | 16px | 75% |
| `glass-overlay` | Dialogs, popovers, dropdowns | 20px | 80% |

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Primitives | Radix UI |
| Charts | Nivo |
| Styling | Tailwind CSS, CVA |
| Icons | Lucide React |
| Animations | Framer Motion (peer dep) |
| Language | TypeScript |

---

## Development

```bash
bun install
```

Canvas is consumed as source (not pre-built). Consuming apps transpile it via `transpilePackages: ["@olympusoss/canvas"]` in their Next.js config.

### Storybook

```bash
bun run storybook        # Dev server on http://localhost:6006
bun run build-storybook  # Static build to storybook-static/
```

Storybook is deployed to GitHub Pages automatically on push to `main`.

---

## License

proprietary
