# Canvas

Shared design system for the [OlympusOSS Identity Platform](https://github.com/OlympusOSS/platform).

React component library + CSS design tokens consumed by [Athena](https://github.com/OlympusOSS/athena), [Hera](https://github.com/OlympusOSS/hera), and [Site](https://github.com/OlympusOSS/site).

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

- **AuthLayout** — Full-screen centered layout
- **AuthFormCard** — Card for login/registration forms
- **AuthFormHeader** — Brand header (logo, title, subtitle)
- **AuthFormError** — Animated error message
- **AuthFormField** — Animated field wrapper
- **AuthSubmitButton** — Primary button with loading state
- **AuthCard** — Animated feature card
- **LoginButton** — Branded CTA button

### Shared

- **PageShell** — App page layout wrapper
- **SessionDisplay** — User session/token viewer

### Utilities

- **Icon** — Lucide icon wrapper with consistent sizing
- **cn()** — Class merge utility (clsx + tailwind-merge)
- **useCanvasTheme()** — Theme context hook
- **useNivoTheme()** — Nivo chart theme hook

---

## Design Tokens

`tokens.css` defines CSS custom properties for colors, spacing, and surface effects in both light and dark mode.

Key token groups:
- **Colors** — background, foreground, primary, secondary, muted, accent, destructive, success
- **Layout** — radius, border, ring, input
- **Surface** — shadow tokens for each surface tier
- **Sidebar** — always-dark navy sidebar tokens (Zoho CRM style)

---

## Surface System

Three tiers of surface classes that adapt to light and dark mode. Both modes render as solid surfaces with clean shadows.

| Class | Use |
|-------|-----|
| `glass-surface` | Content cards, panels |
| `glass-chrome` | Sidebar, header, toolbars |
| `glass-overlay` | Dialogs, popovers, dropdowns |
| `glass-nav` | Always-dark sidebar navigation |

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

Canvas is part of the [OlympusOSS Identity Platform](https://github.com/OlympusOSS/platform). All repos should be cloned as siblings under a shared workspace:

```
Olympus/
├── platform/    # Infrastructure & Docker Compose
├── athena/      # Admin dashboard
├── hera/        # Auth & consent UI
├── site/        # Brochure site & OAuth2 playground
├── canvas/      # Design system (this repo)
└── octl/        # Deployment CLI
```

Canvas is consumed as **source** (not pre-built) — consuming apps transpile it via `transpilePackages: ["@olympusoss/canvas"]` in their Next.js config. Canvas does not run in Docker; it's referenced directly from the sibling directory.

```bash
bun install
```

### Storybook

```bash
bun run storybook        # Dev server on http://localhost:6006
bun run build-storybook  # Static build to storybook-static/
```

Storybook is deployed to GitHub Pages automatically on push to `main`.

---

## License

proprietary
