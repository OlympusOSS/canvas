# Changelog

## 2.20.1

### Patch Changes

- a16095f: Trigger republish after NPM_TOKEN rotation (2.19.0 and 2.20.0 failed to publish with expired token)

## 2.20.0

### Minor Changes

- 2655ff7: Add children prop to StatCard for embedding mini charts, plus two new chart primitives: SparklineArea (SVG area sparkline) and DotPulse (CSS severity indicator)

## 2.19.3

### Patch Changes

- 4147dd3: fix(glass): make SidebarInset transparent in glass surface mode

  Adds `data-slot="sidebar-inset"` to the `<SidebarInset>` element and a
  corresponding rule in `glass.css` that sets `background: transparent`
  under `html[data-surface="glass"]`. The Tailwind `bg-background`
  utility on the component previously painted a solid surface color
  that covered the body's aurora gradient in glass mode. The new rule
  lets the gradient read through the content column unimpeded; no
  backdrop-filter is applied, so the content area stays a clear window
  rather than a frosted pane. The sidebar continues to render as a
  frosted pane matching the topbar.

  Non-glass consumers are unaffected: the rule only activates under
  `html[data-surface="glass"]`, and `bg-background` still paints the
  default-mode content area.

## 2.19.2

### Patch Changes

- 5b92348: fix(surface): remove @layer base from glass.css so frosted-pane backgrounds override Tailwind utilities

  Glass surfaces (cards, sidebar, dialogs, etc.) rendered with fully
  opaque backgrounds because Tailwind v4 places `bg-card` and similar
  utilities in `@layer utilities`, which always wins over `@layer base`
  regardless of selector specificity. Moving glass.css to unlayered CSS
  restores the intended translucent fills and backdrop-filter blur.

## 2.19.1

### Patch Changes

- b3b22f5: chore: retry npm publish (2.19.0 hit transient E404)

## 2.19.0

### Minor Changes

- dbbd9cc: feat(tokens): make vivid blue the default `--primary` and `--ring`

  Adopts the handoff prototype's rendered accent colour as the Canvas
  default. The handoff prototype runs a runtime theme picker that
  injects an inline `style="--primary: 240 79% 60%; --ring: 240 79% 60%"`
  on the `<html>` root, so every consumer of the prototype sees a vivid
  blue accent even though the canonical `colors_and_type.css` declares
  `--primary: 240 5.9% 10%` (dark zinc). Baking the blue into Canvas
  means consumers pick it up without re-implementing the picker.

  Light mode:
  --primary: 240 79% 60% (was 240 5.9% 10%)
  --primary-foreground: 0 0% 100% (was 0 0% 98%)
  --ring: 240 79% 60% (was 240 5.9% 10%)

  Dark mode:
  --primary: 240 79% 60% (was 0 0% 98%)
  --primary-foreground: 0 0% 100% (was 240 5.9% 10%)
  --ring: 240 79% 60% (was 240 4.9% 83.9%)

  Everything else stays on the canonical shadcn zinc neutral palette.

  Visible impact: primary `<Button>`s, focus rings, the Sign-ins chart
  bars in Athena's dashboard, and any other surface that reads from
  `hsl(var(--primary))` will now render as vivid blue instead of dark
  zinc / near-white. Components that need the prior neutral can read
  `hsl(var(--foreground))` or `hsl(var(--secondary))`.

## 2.18.0

### Minor Changes

- 6fd645d: feat(tokens): adopt the handoff's two-tone shadow scale

  Aligns Canvas's `box-shadow` tokens with the Athena design handoff
  (`~/Downloads/Athena/canvas.css`). The handoff uses two visible
  tones, both single-layer:

  - **Subtle** (`0 1px 2px 0 rgb(0 0 0 / 0.05)`) on inputs, outline
    buttons, secondary buttons.
  - **Card** (`0 1px 3px 0 rgb(0 0 0 / 0.08)`) on cards, primary
    buttons, destructive buttons.

  Canvas previously inherited Tailwind's default scale, which is a
  two-layer stack at 10% opacity. That read as noticeably heavier
  shadows on cards and buttons, and even heavier (`shadow-lg`) on
  popovers.

  This change overrides the `@theme` shadow tokens so every
  `shadow`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`
  utility picks up the softer handoff palette without touching
  component source. Tokens:

      --shadow-2xs / xs / sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
      --shadow (DEFAULT):    0 1px 3px 0 rgb(0 0 0 / 0.08)
      --shadow-md:           0 4px 6px -1px / 0.08, 0 2px 4px -2px / 0.06
      --shadow-lg:           0 10px 15px -3px / 0.08, 0 4px 6px -4px / 0.06
      --shadow-xl:           0 20px 25px -5px / 0.08, 0 8px 10px -6px / 0.06

  `shadow-inner` keeps the Tailwind default.

  Also flips `<Button variant="destructive">` from `shadow-sm` to
  `shadow` so destructive buttons sit on the same card-tier shadow as
  the default/primary variant, matching the handoff's `.btn-destructive`
  rule. No other component sources change.

  Snapshots are unaffected because the tokens render as CSS-variable
  values, not class names, and the Button-destructive class change
  isn't covered by an existing snapshot test.

## 2.17.0

### Minor Changes

- 67ba395: feat(surface): extend glass surface mode to every component with a surface

  Completes the glass-mode port started in 2.16.0. Every Canvas component
  that paints a background or border now opts into the frosted-pane
  treatment when `html[data-surface="glass"]` is set. Adds `data-slot`
  markers and matching selectors in `styles/glass.css` for:

  - `Alert` → `data-slot="alert"`
  - `AlertDialogContent` → `data-slot="alert-dialog-content"`
  - `Calendar` (DayPicker root) → `data-slot="calendar"` (already had it
    on its custom `Root` override; now also propagates via DayPicker
    props for consumers that pass their own Root)
  - `Command` → `data-slot="command"`
  - `ContextMenuContent` → `data-slot="context-menu-content"`
  - `ContextMenuSubContent` → `data-slot="context-menu-sub-content"`
  - `DialogContent` → `data-slot="dialog-content"`
  - `DropdownMenuContent` → `data-slot="dropdown-menu-content"`
  - `DropdownMenuSubContent` → `data-slot="dropdown-menu-sub-content"`
  - `HoverCardContent` → `data-slot="hover-card-content"`
  - `Menubar` → `data-slot="menubar"`
  - `MenubarContent` → `data-slot="menubar-content"`
  - `MenubarSubContent` → `data-slot="menubar-sub-content"`
  - `NavigationMenuViewport` → `data-slot="navigation-menu-viewport"`
  - `SelectContent` → `data-slot="select-content"`
  - `TabsList` → `data-slot="tabs-list"`
  - `Terminal` → `data-slot="terminal"`
  - `TooltipContent` → `data-slot="tooltip-content"`
  - `AccordionItem` → `data-slot="accordion-item"` (border-only treatment)

  Three tone groups in `glass.css`:

  - Card-tone (translucent fill + blur + alpha border + inner highlight)
    covers cards, chrome, alert/calendar/terminal, and all dialog/popover
    surfaces by default.
  - Dialog-tone (`0.85` tint over card-tone) keeps popover/dialog content
    legible against the body aurora.
  - Input-tone (`0.35` tint + 8px blur) covers form fields, code blocks,
    and tabs list.

  AccordionItem gets a border-only override since it has no fill.

  All snapshots regenerated; 861/861 tests pass. No API surface change —
  the new `data-slot` HTML attributes are non-breaking.

## 2.16.0

### Minor Changes

- 71d623a: feat(surface): add opt-in "glass" surface mode

  Ports the design handoff's frosted-pane surface variant (Athena's
  `app.css` glass block). When the consumer sets `data-surface="glass"`
  on the `<html>` root, all load-bearing Canvas surfaces (Card,
  SectionCard, StatCard, Sidebar, DataTable, EmptyState, Input,
  CodeBlock, Popover, Sheet, Drawer) pick up a translucent tint with
  `backdrop-filter: blur(...) saturate(...)`, an alpha-blended border
  that drops to white/black against the backdrop, and a 1-px inner
  highlight on the top edge to suggest a refractive lip. The body
  gains a three-radial aurora gradient (pastel washes in light, deep
  indigo/violet/teal in dark) so the page palette bleeds through every
  pane and the layout reads as layered glass instead of rectangles on
  flat paint.

  New stylesheet shipped at `@olympusoss/canvas/styles/glass.css`.
  Import it alongside `tokens.css`:

  ```css
  @import "@olympusoss/canvas/styles/tokens.css";
  @import "@olympusoss/canvas/styles/glass.css";
  ```

  Then toggle the mode at runtime:

  ```ts
  document.documentElement.dataset.surface = "glass";
  // or unset to return to the default solid palette
  delete document.documentElement.dataset.surface;
  ```

  New tokens (scoped under `html[data-surface="glass"]`):
  `--glass-tint`, `--glass-tint-alpha`, `--glass-border`,
  `--glass-border-alpha`, `--glass-highlight`,
  `--glass-highlight-alpha`, `--glass-shadow`, `--glass-blur`,
  `--glass-saturate`. Light and dark modes have separate values.

  Components now carry `data-slot` attributes used by the glass cascade:
  `card`, `card-divider`, `sidebar`, `data-table`, `input`,
  `popover-content`, `sheet-content`, `drawer-content`, `empty-state`,
  `code-block`. They are HTML attributes; no API surface change.

## 2.15.0

### Minor Changes

- b4ae89b: feat(tokens): self-host Roboto variable font + prefer it in `--font-sans`

  Matches the Athena design handoff (`colors_and_type.css`), which moved its
  canonical sans family from Inter to Roboto. Canvas now ships the Roboto
  variable font (`styles/fonts/Roboto-VariableFont_wdth_wght.ttf`, wght 100-900,
  wdth 75-100) and declares the `@font-face` inside `tokens.css`, so any
  consumer that imports `@olympusoss/canvas/styles/tokens.css` picks up the
  font without each app re-loading it.

  `--font-sans` is updated in both light and dark roots to:

      "Roboto", "Inter", system-ui, -apple-system, sans-serif

  Inter is retained as a fallback so consumers that still preload Inter via
  `next/font/google` get a graceful degradation while they remove that
  preload. JetBrains Mono is intentionally not pulled in via Google Fonts to
  keep Canvas free of external network dependencies; consumer apps continue
  to load their preferred mono font.

## 2.14.0

### Minor Changes

- bc79b3a: feat(tokens): align light + dark base palette and sidebar with the Athena design handoff

  The light-mode sidebar palette and the entire dark-mode base palette now mirror the Athena design handoff (`~/Downloads/athena/colors_and_type.css`) verbatim. Canvas's previous customisations are removed in favour of the shadcn neutral defaults the handoff specifies:

  - **Light mode** drops the blue-tinted sidebar (hue 230) for the handoff's neutral shadcn zinc (`--sidebar-background: 0 0% 98%`, foreground / accent / accent-foreground / border / primary all at hue 240 or 220). `--destructive` also moves from `4 78% 50%` to the handoff's `0 84.2% 60.2%`.

  - **Dark mode** drops the "tiered elevation" design (hue 225 with lightness stepping across body / sidebar / card / accent surfaces) for the handoff's flat shadcn neutrals (hue 240). Body, card, popover all share the same lightness inside dark mode; the visible separation now comes from `--border` rather than tonal lift.

  - Both the raw HSL triplets (consumed by `hsl(var(--…))` in component CSS) and the resolved `hsl()` forms in the dual-form sidebar block (consumed by Tailwind v4's `@theme inline` mapping) are kept in sync.

  Preserved as Canvas extensions: `--chart-1` through `--chart-6`, `--stat-*`, `--tracking-*`, `--brand`, `--brand-foreground`, scrollbar styling. The handoff dashboard renders chart bars with `hsl(var(--primary))`, not `--chart-1`, so the chart palette divergence has no visible effect in the prototype.

  Consumers carrying `:root` / `:root:root` overrides for these tokens (Athena does) should drop the overrides after bumping to this version. Consumers that render in dark mode (Hera) will see a flatter look; visually verify after bumping.

## 2.13.0

### Minor Changes

- 8decab3: Add `SocialButtons` and `OrSeparator` molecules for auth flows.

  `SocialButtons` renders a vertical stack of provider buttons (GitHub,
  Google, Apple, Microsoft, generic SSO). Outline-style with monochrome or
  multi-color brand glyphs depending on the provider. Stays purely
  presentational; callers wire `onProviderClick` to their OAuth2
  initiation flow.

  `OrSeparator` is a small two-rule divider with a centred label (default
  `"or"`) sized to sit on a card surface between sections of an auth form.

  Exports: `SocialButton`, `SocialButtonProps`, `SocialButtons`,
  `SocialButtonsProps`, `SocialProvider`, `OrSeparator`, `OrSeparatorProps`.

## 2.12.0

### Minor Changes

- 48ac02d: Add `MetricBreakdown` chart component. Hand-rolled composite card for
  throughput-style dashboards: a headline value with optional tone-aware
  secondary rate, an inline SVG trend sparkline with unit suffix, a
  per-category breakdown with delta arrows and proportional bars, and a
  chip footer for recent error or notable codes.

  Identity-agnostic. Works for OAuth token issuance, API request volume,
  job throughput, sign-up sources, and any other metric that needs
  decomposition by category plus trend and notable issues in one card.

  Exports: `MetricBreakdown`, `MetricBreakdownProps`, `MetricBreakdownRow`,
  `MetricBreakdownChip`, `MetricBreakdownTone`.

## 2.11.1

### Patch Changes

- 7cd64fe: Brand: update CHANGELOG copy from "OlympusOSS site" to "Olympus site". Visible
  copy only — npm scope, repo URLs, and other operational identifiers are
  unchanged.

## 2.11.0

### Minor Changes

- 20a96b7: Add auth-flow primitives: `Spinner` atom, `PasswordInput`,
  `PasswordStrengthMeter` (with `scorePassword` heuristic), `CountdownButton`,
  `ClientBrand`, and a slot-based `AuthShell` molecule.

  `AuthShell` reverses an earlier decision to keep page-level layouts out of
  canvas. Auth flows share a constrained, well-defined shape (single centered
  card, brand header above, optional footer below) across every Olympus
  surface that needs them, and that shape is now baked into canvas. Full app
  shells with sidebars or multi-pane layouts still stay out: compose
  `Sidebar` + `SidebarInset` + your own flexbox for those.

## 2.10.0

### Minor Changes

- 83dd127: **`NavBar` sticky behavior** — when `sticky=true` (default), the bar now uses `position: sticky` + `top: 0` instead of `position: fixed`. Content scrolls underneath through a translucent `bg-background/80 backdrop-blur` for a frosted-glass effect that matches the canvas hand-off. The previous `<div className="h-14" />` spacer is gone (sticky doesn't need it).

  Default opacity changes from `bg-background/95` to `bg-background/80` so the page beneath reads through clearly. The `supports-[backdrop-filter]:bg-background/60` progressive fallback is dropped — browsers without `backdrop-filter` see the `/80` background, which is still legible.

  No props changed — consumers that pass `sticky={true|false}` keep working. Visual position at rest is identical; on scroll the bar now frosts hero/feature content reading through it.

## 2.9.0

### Minor Changes

- e528738: Charts: visual affordances now ship as component-level defaults rather than example-level boilerplate, so every consumer gets the polished look without copying snippets.

  - `ChartContainer` themes the cartesian axis line (`hsl(var(--border))`) and hides the tick lines via CSS — Line / Bar / Area / Composed / Scatter charts now all render visible, themed X/Y axes by default.
  - `ChartContainer`'s palette walker now (a) cycles palette colours across `<Pie>`'s `<Cell>` children when no fill is set, (b) defaults `<Pie label>` to `true` so each slice renders its value, and (c) distributes palette colours across `<Funnel>` data rows when none of them carry a `fill`. Consumers no longer need to write per-slice or per-stage fills to get a multi-hue chart.
  - `ActivityHeatmap` now defaults `rowLabels` to `["Mon", … , "Sun"]` whenever the data has exactly 7 rows, covering the GitHub-style yearly-contribution layout out of the box.
  - The `_shared.tsx` axis-prop helpers in the docs examples are simplified to just the tick font/colour, since the rest is handled by `ChartContainer`.

- cd8280b: Add `LauncherCard` and `Terminal` molecules, and a `theme` prop on `CodeBlock`. Lifted from the Olympus site so every Olympus surface can use the same tile / terminal / dark-code pattern.

  - **`LauncherCard`** — tone-driven launcher tile (badge + title + description + footer slot). Built-in tones: `default` (uses `--primary`), `indigo`, `violet`, `slate`. Set `href` to make the whole card a hover-lifted link; mirrors `NavBar`'s `linkComponent` prop for Next.js routing.
  - **`Terminal`** — dark macOS-style terminal panel with traffic-light chrome, optional title in the strip, and a `<pre>` body. Free-form `children` so consumers can drop inline `<span>` highlights for colour-coded status/values.
  - **`CodeBlock` `theme="light" | "dark"`** — additive prop; default `"light"` keeps the existing `bg-muted` styling. `theme="dark"` switches to the terminal palette (`#0a0a0b` background, `#e4e4e7` text) for marketing surfaces. The `overflow-hidden` class is now applied in both themes so the rounded corners always clip the header border.

### Patch Changes

- 6274e63: Docs: `FunnelChart` example redesigned (Phase 13 of the 14-chart redesign).

  - `default.tsx`: replaces the per-stage `chart-1..5` rainbow rotation with a single-hue opacity ramp on `chart-3` (`1.0` → `0.85` → `0.7` → `0.55` → `0.4`). The funnel decay now reads as a continuous tunnel, mirroring the SunburstChart depth-via-opacity pattern instead of competing hues per stage.

## 2.8.6

### Patch Changes

- 65f3aa1: Docs: `ComposedChart` examples redesigned (Phase 12 of the 14-chart redesign).

  - Adds `composed-chart/_shared.tsx` with the canonical `axisProps` helper.
  - `default.tsx`: drops grid, uses `axisProps`. Each series gets its own hue — Area revenue → `chart-1` with gradient fill; Bar expenses → `chart-2` solid + `radius={[4,4,0,0]}`; Line margin → `chart-5` stroke `2` with `dot={r:3}`.
  - `dual-axis.tsx`: drops grid, `axisProps` on left + right axes. Bar visitors → `chart-1`; Line conversion → `chart-5` (warm orange = secondary metric).

- ea4269f: Docs: `PieChart` examples redesigned with explicit `<ChartCell>` per slice (Phase 10 of the 14-chart redesign).

  - `default.tsx` (4 plan tiers) → `chart-1` → `chart-4` walk.
  - `donut.tsx` (4 traffic sources) → `chart-2` → `chart-5` walk (different starting hue from `default.tsx` so the two pie examples read distinct).
  - `half-pie.tsx` (3-status mix) → `--stat-success` / `--stat-amber` / `--stat-destructive`. Status data carries meaning that chart-N rotation throws away.
  - `with-labels.tsx` (5 browsers) → full `chart-1` → `chart-5` walk; LabelList stays.

  Adds the parallel `_shared.tsx` for symmetry with the other chart families.

- 084dbf8: Docs: `RadarChart` examples redesigned (Phase 11 of the 14-chart redesign).

  - Adds `radar-chart/_shared.tsx` exporting `polarAxisProps` (axis line off, muted tick text) and `POLAR_GRID_PROPS` (`stroke=--border`, `gridType="polygon"` — quieter, polygonal spider web).
  - `default.tsx` → single radar in `chart-4` (purple) with `0.35` fill opacity. Distinct from LineChart's `chart-5` and ScatterChart's `chart-1`.
  - `multi-series.tsx` → `you` in `chart-1` (blue), `peer` in `chart-3` (red-pink). Each at `0.25` fill opacity so overlap reads cleanly.

## 2.8.5

### Patch Changes

- a1a3e65: Docs: `LineChart` examples redesigned to match SunburstChart visual quality (Phase 9 of the 14-chart redesign).

  Adds `docs/src/examples/line-chart/_shared.tsx` with the canonical `axisProps` helper. All six examples drop `<CartesianGrid>` and use `axisProps`. Per-page palette diversification:

  - `default.tsx` → `chart-5` (warm orange — deliberately not blue, distinct from AreaChart Default).
  - `curve-types.tsx` → linear `chart-1`, monotone `chart-2`, step `chart-3` (lets consumers map curve type to colour).
  - `multi-series.tsx` → desktop `chart-3`, mobile `chart-4`, tablet `chart-5`.
  - `time-series.tsx` → `chart-3`, `dot={false}` for the dense 30-day series.
  - `with-brush.tsx` → `chart-1`. Brush keeps `--brand`.
  - `with-reference.tsx` → line `chart-2`, ReferenceLine restyled with `--stat-destructive` + `strokeDasharray="4 4"` so the SLO threshold reads as an alert line.

  All series get `strokeWidth={2}` and `dot={{ r: 3 }}` (or `false` on dense data) for consistent visual treatment.

- 6aef904: Docs: `ScatterChart` examples redesigned to match SunburstChart visual quality (Phase 3 of the 14-chart redesign).

  - Adds `docs/src/examples/scatter-chart/_shared.tsx` with the canonical `axisProps` helper.
  - All three examples (`default`, `bubble`, `multi-series`) drop `<CartesianGrid>` and use `axisProps` for hidden axis lines + muted tick text.
  - Diversified palette across the page: default → `chart-1` (blue), bubble → `chart-3` (purple), multi-series → `chart-2` + `chart-4` (green + orange-pink). Avoids the "all blue" rotation Recharts defaults to.

- 260ed95: Docs: `StackedBar` examples switched to canvas semantic status tokens where the data carries status meaning (Phase 6 of the 14-chart redesign).

  - `no-legend.tsx`: Healthy / Degraded / Down → `--stat-success` / `--stat-amber` / `--stat-destructive`. Reads as a real ops bar.
  - `raw-counts.tsx`: 200 OK / 4xx / 5xx → semantic stat tokens; 3xx redirects keep `chart-1` since they're not an alert state.
  - `default.tsx` left unchanged — its sign-in-method palette is intentionally diverse.

## 2.8.4

### Patch Changes

- 1e638c5: Docs: `Sankey` default example tuned (Phase 2 of the 14-chart redesign). `linkCurvature` `0.55` → `0.6` for a slightly bolder S-curve and `link.strokeOpacity` `0.4` → `0.3` so the chart-1 links read softer against the chart-2 nodes.

## 2.8.3

### Patch Changes

- b8d3cc2: Docs: `ActivityHeatmap` → `Yearly contribution graph` example uses larger rows (`cellHeight={14}` + `gap={3}`) so the `Mon` / `Wed` / `Fri` row labels have breathing room and don't squish against the cell pitch.
- 8a79b2c: Docs: `RadialBarChart` default example redesigned to match SunburstChart visual quality (Phase 1 of the 14-chart redesign).

  - Each of the 5 rings now paints a distinct chart-N hue (`chart-1`→`chart-5`) via explicit `<ChartCell>` children of `<RadialBar>`. Previously every ring rendered the same Recharts default colour rotated by index, so the five days read as a single hue family.
  - Adds `cornerRadius={6}` for the polished rounded-end look matching the Sunburst inner ring.
  - Keeps the existing `background` track, `innerRadius`/`outerRadius`/`barSize` layout, and 12-o'clock-clockwise sweep.

## 2.8.2

### Patch Changes

- 1140934: Docs: `AreaChart` → `Stacked areas` example redesigned to match the SunburstChart visual quality bar (Phase 1 of the AreaChart redesign).

  - Drops `<CartesianGrid>`. Hides axis + tick lines on `<XAxis>` / `<YAxis>` via the new shared `axisProps` helper (`docs/src/examples/area-chart/_shared.tsx`); tick text now renders in `--muted-foreground`.
  - Three stacked layers paint in **one hue** (`--chart-2`) at progressively lighter opacity (`0.7` / `0.45` / `0.2`) instead of three different default Recharts colours. Mirrors the "Deep hierarchy" SunburstChart pattern — depth via opacity, not new hues.
  - All three layers use `type="monotone"` for consistency with `Default`.

  Curve types and Gradient examples will follow in subsequent phases.

## 2.8.1

### Patch Changes

- 7a22820: Docs: `Weekly view with row labels` and `Yearly contribution graph` `ActivityHeatmap` examples now use the new `rowLabels` / `colLabels` / `legend` props instead of hand-rolled layout glue:

  - Weekly: drops the bespoke flexbox day-of-week column; passes `rowLabels={["Mon"…"Sun"]}` plus sparse hour-tick `colLabels` (`0h`/`6h`/`12h`/`18h`/`23h`) plus `legend`.
  - Yearly contribution graph: GitHub-style sparse `Mon`/`Wed`/`Fri` row labels + month-name column labels positioned at each month's first week (Jan ≈ 0, Feb ≈ 4, …, Dec ≈ 48) + `legend`.

## 2.8.0

### Minor Changes

- 6104a25: `ActivityHeatmap` now ships axes + legend as opt-in props, so consumers don't have to glue them on by hand:

  - `rowLabels?: ReactNode[]` — Y-axis labels rendered to the left of the grid, perfectly aligned to each row's pitch (cellHeight + gap).
  - `colLabels?: ReactNode[]` — X-axis labels rendered below the grid. Pass empty / nullish entries for sparse ticks (e.g. label only `0`, `6`, `12`, `18`, `23` in a 24-column matrix).
  - `legend?: boolean | { fromLabel?, toLabel? }` — `Fewer ↔ More` gradient legend below the grid. `true` uses the defaults; an object overrides one or both ends.

  Default example simplified to use the new props instead of hand-rolling layout.

  Backwards-compatible: existing consumers that omit the new props get the same render they did before (no labels, no legend).

## 2.7.2

### Patch Changes

- 2179d24: Docs:

  - `AreaChart` default example: brings `<XAxis>` and `<YAxis>` back with text/number labels (axis lines + tick lines hidden, ticks rendered in `--muted-foreground`). Keeps the `--chart-1` gradient fill from the previous pass — now the chart has both readable scales and a visible area.
  - `ActivityHeatmap` default example: adds row labels (`D-N` Y-axis), sparse hour-tick X-axis (`0h`, `6h`, `12h`, `18h`, `23h`), a "Fewer ↔ More" gradient legend, taller cells (`cellHeight: 16`), and switches the cell hue to the more vibrant `chart-2`. Previously it was just a wash of cells with no axis context.

## 2.7.1

### Patch Changes

- 1418175: Docs: `AreaChart` default example cleaned up. Previously the chart rendered axes + a `<CartesianGrid>` but no actual area fill (Recharts' default `<Area>` colour wasn't visible against the canvas dark background), so the example looked broken. Dropped the axes and grid (the "borders" the chart was carrying), replaced with an explicit gradient fill from `--chart-1` (`70%` opacity at top → `5%` at bottom) and a 2px stroke — matches the visual style of the Sunburst / Treemap / Pie examples. The grid + axis pattern is still demonstrated by `Stacked areas`, `Curve types`, and `Gradient` so consumers see both options.

## 2.7.0

### Minor Changes

- f1cda7f: `DashboardGrid` now renders a "Remove" button at the bottom-center of each widget when `editing` is true. Clicking it filters the item out of the controlled list and fires `onItemsChange`. Pairs with the existing top-right drag handle to give consumers a complete customize-mode UX (reorder + resize + delete) without writing per-widget chrome.

### Patch Changes

- a3a0f09: Docs: `ActivityHeatmap` props reference expanded.

  - `data` description spells out the row-major shape `data[row][col]`, the `[0, 1]` value range with clamping behaviour, and the jagged-array caveat.
  - `colorVar` description pins the rendering formula (`hsl(var(--{colorVar}) / opacity)`) and the linear opacity ramp from `0.08` → `0.93`, plus suggests `stat-success`/`stat-destructive` for semantic heatmaps.
  - `cellHeight` / `gap` / `cellRadius` / `cellTitle` get tighter behavioural hints.
  - Adds inherited HTML attrs (`className`, `id`, `role`, `aria-label`) — calls out that cells are `aria-hidden`, so `role="img"` + `aria-label` is required when the heatmap conveys meaning.

- cf03104: Tweak: Extend the brand-color hover convention to every text-link-style surface in the design system.

  - `AccordionTrigger` — hover now shifts to `text-brand` (was `text-foreground/70`).
  - `BreadcrumbLink` — hover now shifts to `text-brand` (was `text-foreground`).
  - `PageHeader` breadcrumbs (LinkComp + plain `<a>` paths) — hover now `text-brand` (was `text-foreground`).
  - `NavBar` desktop links — hover now `text-brand` (was `text-foreground`).
  - `NavBar` mobile links — hover now `text-brand` while keeping the existing `bg-accent` row-hover.

  Variant-specific hovers on solid buttons (default/destructive/secondary/outline/ghost), tab triggers, sidebar/dropdown row items, etc. are unchanged — those still use their `bg-accent` / variant-specific shifts to keep destructive/primary cues distinct.

- 474b05f: Docs: Fix the side-by-side carousel orientations example.

  - Wrapper gap: `gap-12` → `gap-20` (was 48px, now 80px). The horizontal carousel's `CarouselNext` button overhangs `-right-12` (48px), so `gap-12` left exactly 0px clearance — making the buttons appear to touch the vertical carousel.
  - Vertical carousel width: `w-32` → `w-48` (128px → 192px) so the card no longer feels cramped next to the 256px horizontal one.
  - Vertical `CarouselContent` height: `h-24` → `h-28` (96px → 112px). The carousel's inner flex container uses `-mt-4` to compensate for slides' `pt-4`, which made the viewport auto-fit at `inner_h - 16`. With a 96px card and `h-24` (96px) on the content, the viewport ended up at 80px and clipped the card's bottom 16px. `h-28` ensures the viewport renders at 96px, fully showing the card.

- d26df33: Docs: Full prop references for `BarChart` (26 props), `ComposedChart` (26 props), and `AreaChart` (22 props). All three were Recharts `CategoricalChart` passthroughs in `chart-types`, so react-docgen returned empty prop lists.

  Each entry covers the same shape: required `data` + `children` (with chart-specific child guidance — `<Bar>` + `stackId` for stacked bars, mixed `<Bar>`/`<Line>`/`<Area>`/`<Scatter>` for ComposedChart, `<defs><linearGradient>` for theme-aware AreaChart fills), layout (`margin`, `layout`, `stackOffset`, `reverseStackOrder`), Bar-only props (`barCategoryGap`, `barGap`, `barSize`, `maxBarSize`) on BarChart and ComposedChart, sync (`syncId`, `syncMethod`), `throttleDelay`, `defaultShowTooltip`, the full chart-level pointer-event surface (`onClick`, `onMouseEnter`/`Leave`/`Move`/`Down`/`Up`, `onDoubleClick`, `onContextMenu`), and root wrapper props (`width`, `height`, `className`, `style`).

- 0c4daf2: Docs: Fix the component manifest so each entry sits in its tier and tiers are alphabetical.

  - `Sparkline` was filed under molecules (with `tier: "charts"`) — it now sits in the charts section, alphabetised between `ServiceHealthList` and `StackedBar`. The Charts tier index now lists 19 components in clean alphabetical order.
  - `BrandMark` (atoms) moved up between `Badge` and `Button`.
  - Organisms `Toaster` (id: `sonner`, label `Toaster`) moved to the end of the tier so it sorts after `Tabs` and `ThemeProvider` by label.

  No component code or routes changed — manifest order only.

- 55028e4: Tweak: Refine the `--destructive` (and matching `--stat-destructive`) token to a warmer, more vibrant coral-red — replacing the previous flat pinkish red.

  - Light: `hsl(0 84.2% 60.2%)` (`#ef4444`) → `hsl(4 78% 50%)` (`#df341d`) — warm, deep, authoritative
  - Dark: `hsl(0 70% 45%)` (`#c33b3b`) → `hsl(4 88% 62%)` (`#f15238`) — warm coral, vibrant on dark surfaces

  Cascades to every error/danger surface (Form errors, AlertDialog destructive action, destructive Button, Badge, Alert, Stepper error step, StatCard `destructive` variant, Textarea `border-destructive`, etc.). White foreground text still passes WCAG AA against the new background.

- fb8be62: Fix: Drawer now opens correctly inside iframe / portal-container contexts, and clicking the visual handle cycles snap points.

  - `Drawer` (Vaul `Root`) now reads from `usePortalContainer()` and forwards a `container` prop to Vaul. Without this, Vaul portaled into the parent document's `body` instead of the iframe's, so the drawer mounted offscreen and appeared unresponsive in docs/Storybook iframes. Existing consumers can still override by passing `container` explicitly.
  - The pill at the top of `DrawerContent` is now `DrawerPrimitive.Handle` instead of a plain `<div>`. Vaul's `Handle` cycles through `snapPoints` on click — previously the visual-only div did nothing when clicked. Also exported as `DrawerHandle` for consumers who want to compose the handle manually.

- 51f112e: Docs: Fix the `ErrorBoundary` custom-fallback example so the Retry button visibly recovers.

  The previous example wrapped a `Crashy` component that always threw on every render — clicking Retry correctly reset the boundary, but the child re-threw immediately, so the user saw the same fallback and assumed Retry was broken. Updated to mirror the default example: `Crashy` accepts `shouldThrow`, parent state controls it, and Retry both flips that state and resets the boundary so the success branch can render.

  The `ErrorBoundary` component itself was correct — only the example needed fixing.

- 6c09200: Docs: Full prop reference for `FunnelChart` (15 props). Like the other Recharts chart-types passthroughs, react-docgen returned an empty list. Hand-authored entries cover required `children` (typical: `<Funnel>` + `<ChartTooltip>`, optional `<LabelList>` for stage labels), optional `data`, layout (`margin`, `syncId`, `syncMethod`), pointer events + `throttleDelay`, `defaultShowTooltip`, and root wrapper props. Notes that data lives on each `<Funnel data=…>` child rather than on the chart wrapper.
- d6cae2d: Docs: Add a "Catalog" example to the `Icon` page that lists every Lucide icon canvas re-exports. Searchable input filters the 1,695-name `iconNames` set live (case-insensitive substring match, deferred so typing stays smooth); rendered grid shows the first 240 matches at any time. Each tile is a button that copies the icon name to clipboard on click — drops the friction of jumping out to the Lucide site to find a name.
- ded8380: Docs:

  - Example iframes now show a vertical scrollbar **only** when content flows past the bottom of the iframe. Two fixes stacked:
    - `<html>` overflow `hidden` → `auto` so content taller than `MAX_FRAME_HEIGHT` (1400px) gets a themed scrollbar instead of being silently clipped.
    - `box-sizing: content-box` on the iframe so the 2px of border doesn't subtract from the inner viewport. Tailwind's preflight applies `box-sizing: border-box` globally, which made `height: 200px` resolve to a 198px viewport and triggered a phantom scrollbar on every example whose content was sized to match the iframe.
  - `Icon` page: `Catalog` example moved to the top of the Examples list so the searchable index appears right after the Import section.

- 18bd285: Docs: Expanded prop references for `LabeledBarList` (9 props) and `Gauge` (10 props).

  - `LabeledBarList` — `items` description spells out the per-row shape `{ label: ReactNode; value: number; leading?: ReactNode }` (with the `leading` slot for flags/avatars/icons). Other prop descriptions tightened with concrete defaults (`valueFormatter` shows the `(v) => `${v}%``percentage alternate;`colorVar`lists`chart-N`/`stat-success` examples). Adds inherited HTML attrs (`className`, `id`, `role`, `aria-label`).
  - `Gauge` — every documented prop tightened with usage hints (`value` clamping behaviour; `colorVar` lists semantic options like `stat-success`/`stat-destructive`; `aria-label` notes that `role="meter"` + `aria-valuenow`/`min`/`max` are already wired). Adds inherited `className`, `id`, `style`.

- 0388af6: Docs: Full prop reference for `LineChart` (21 props). Hand-authored entries cover required `data` and `children` (typical: `<CartesianGrid>`, `<XAxis>`, `<YAxis>`, `<Line>`, `<ChartTooltip>`, optional `<Brush>` / `<ReferenceLine>`), layout (`margin`, `layout`, `stackOffset` for stacked / streamgraph variants), `syncId`/`syncMethod`/`throttleDelay`/`defaultShowTooltip`, the full chart-level pointer-event surface (`onClick`, `onMouseEnter`/`Leave`/`Move`/`Down`/`Up`, `onDoubleClick`, `onContextMenu`), and root wrapper props (`width`, `height`, `className`, `style`).
- e2d8c4c: Tweak: Replace legacy "underline on hover" with a brand-color hover across every link surface in the design system.

  - `Button` `variant="link"` — drop `underline-offset-4 hover:underline`; hover now shifts text from `text-primary` → `text-brand` (canvas blue).
  - `AccordionTrigger` — drop `hover:underline`; hover now shifts to `text-foreground/70` (toggle, not link — uses muted-fade not brand).
  - Prose anchors (`PROSE_CANVAS_CLASSES`, used by `RichTextEditor` + `MarkdownEditor` preview) — drop the always-on underline + `decoration-*` shift; anchors stay `text-brand` and fade to `text-brand/80` on hover.

  Already-correct surfaces (`NavBar`, `Breadcrumb`, `PageHeader` breadcrumbs) used color-shift only — no change.

  Fix: Tighten the vertical-orientation `Carousel` prev/next buttons. They were positioned at `-top-12` / `-bottom-12` (16px gap from viewport edge). Combined with a viewport that's typically taller than a single slide, the buttons looked detached from the visible card. Now `-top-10` / `-bottom-10` (8px gap). Horizontal orientation unchanged.

- b717545: Docs: Full prop reference for `PieChart` (15 props). Like the other Recharts passthroughs in `chart-types`, react-docgen returned an empty list. Hand-authored entries cover `children` (typical: `<Pie>`, `<ChartTooltip>`, `<ChartLegend>`; nested rings via stacked `<Pie>` siblings), optional `data`, layout (`margin`, `syncId`, `syncMethod`), pointer events (`onClick`, `onMouseEnter`/`Leave`/`Move`, `throttleDelay`), `defaultShowTooltip`, and `width`/`height`/`className`/`style`. Notes that data lives on each `<Pie data=…>` child, not on the chart wrapper.
- 7903a0f: Fix: every Radix-based portal in canvas now respects `<PortalContainerProvider>`. Previously only `Select` honored the context — `ContextMenu`, `DropdownMenu`, `Popover`, `Menubar`, `Tooltip`, `Dialog`, `AlertDialog`, and `Sheet` all portaled to `document.body` regardless of context. Inside iframes / shadow DOM / scoped containers (e.g. canvas's own docs preview), positioning-based menus (ContextMenu, DropdownMenu, Popover, Menubar, Tooltip) opened at the wrong viewport coordinates. They now portal into whatever container the nearest `PortalContainerProvider` provides — falls back to `document.body` when no provider is in scope.
- 86ec584: Docs: Full prop references for `RadialBarChart` (21 props) and `RadarChart` (20 props). Both are passthroughs of Recharts categorical-chart primitives and returned empty prop lists from react-docgen.

  - `RadialBarChart`: data composition (`data`, `children`), polar layout (`innerRadius`, `outerRadius`, `startAngle`, `endAngle`, `cx`, `cy` — `startAngle={90} endAngle={-270}` 12-o'clock-clockwise pattern called out), ring sizing (`barSize`, `barCategoryGap`, `barGap`), `margin`/`syncId`/`syncMethod`, pointer events, and `width`/`height`/`className`/`style`.
  - `RadarChart`: same shape minus the bar-only props — adds `onMouseMove` and `throttleDelay`, default `startAngle={90}` / `endAngle={-270}` documented with the typical "first spoke at 12 o'clock" convention.

- b2f4a43: Fix: `Resizable` (vertical orientation + sizing) was broken after the `react-resizable-panels` v4 upgrade. Two unrelated regressions stacked under "Top/Bottom doesn't work":

  1. **Wrong CSS attribute selector.** The wrapper styled vertical layouts off `data-[panel-group-direction=vertical]` — that attribute existed in v3 but was removed in v4. v4 only emits `aria-orientation` (and only on `Separator`). Group flex direction is now decided in JS from the `orientation` prop; separator dimension styles now key off `aria-[orientation=horizontal]` (separator inside a vertical group).

  2. **`className` height was ignored.** v4 forces inline `height: 100%; width: 100%` on the panel group, which overrides any `className="h-32"` consumers passed directly to `<ResizablePanelGroup>`. Now the group is wrapped internally in a sizing div — `className` lands on the wrapper, the library's `Group` fills 100%. Existing usage compiles unchanged.

  Bonus: docs `orientations` and `nested-panels` examples bumped to `h-48` / `h-64` so consumers can see the panels actually drag.

- 63c6624: Fix: `SelectItem` now wraps its children in a `flex items-center gap-2` row so inline icons compose horizontally with their label instead of stacking. Tailwind's preflight makes `<svg>` block-level, which previously pushed the label below the icon in both the dropdown items and the trigger's selected-value display. Affects any consumer rendering `<SelectItem><Icon name="…" /> Label</SelectItem>`.
- e437155: Docs: In the `ServiceHealthList` "All systems normal" example, change the in-card label to "All systems nominal" and prefix it with a pulsing, glowing green dot (`animate-ping` ring + solid `--stat-success` core with a soft drop-shadow). Section heading is unchanged.
- d285c9a: Docs: `ServiceHealthList` props reference expanded.

  - `items` description spells out the per-row shape `{ name: string; status: "healthy" | "degraded" | "down"; meta?: ReactNode[] }` instead of leaving consumers to chase the `ServiceHealthItem` type. Calls out that the pulse-+-glow halo only fires on `"healthy"`.
  - `caption` description gains concrete examples (`Last 5 minutes`, `Updated 24s ago`).
  - Adds the inherited HTML attributes (`className`, `id`, `role`, `aria-label`) that come from `extends React.HTMLAttributes<HTMLDivElement>` and react-docgen can't surface. The `aria-label`/`role="status"` pairing is documented for live-updating health panels.

- 79fc2be: Tweak: `ServiceHealthList` healthy-status dots now pulse and glow.

  - Healthy rows render an `animate-ping` ring around the dot plus a soft drop-shadow halo (in addition to the existing 3px outline). Degraded / down dots stay static so the pulse is reserved for the "everything's alive" signal.
  - Docs `all-healthy` example: the in-card label is now "All systems nominal" (heading text only — no extra dot beside it; the per-service pulse carries the signal).

- 44a1d5b: Docs: `StackedBar` props page expanded.

  - `segments` description now spells out the per-segment shape `{ label, value, colorVar? }` instead of just showing the bare `StackedBarSegment[]` type.
  - Other prop descriptions tightened with concrete default-formatting examples (e.g. `valueFormatter` shows the `toLocaleString()` alternate for raw counts) and usage hints.
  - Added inherited HTML attributes that come from `extends React.HTMLAttributes<HTMLDivElement>` and react-docgen can't surface: `className`, `id`, `role`, `aria-label`.

- 1f23654: Docs: Full prop references for `SunburstChart`, `ScatterChart`, and `Sankey`. All three were passthroughs of Recharts primitives, so react-docgen returned empty prop lists and the pages rendered the "no documented props" fallback.

  - `SunburstChart` (19 props): `data`, `dataKey`, `padding`, `ringPadding`, `innerRadius`, `outerRadius`, `cx`, `cy`, `startAngle`, `endAngle`, `fill`, `stroke`, `textOptions`, `onClick`, `onMouseEnter`, `onMouseLeave`, `width`, `height`, `children`. Notes call out the `startAngle`/`endAngle` half-circle pattern and the `letterSpacing` cast inside `textOptions`.
  - `ScatterChart` (19 props): `children`, `data`, `margin`, `layout`, `syncId`, `syncMethod`, `throttleDelay`, `defaultShowTooltip`, `width`, `height`, `style`, plus the chart-level pointer events. Notes clarify that scatter data lives on each `<Scatter>` child rather than on the chart wrapper.
  - `Sankey` (17 props): `data`, `nameKey`, `dataKey`, `nodePadding`, `nodeWidth`, `linkCurvature`, `iterations`, `node`, `link`, `sort`, `margin`, `onClick`, `onMouseEnter`, `onMouseLeave`, `width`, `height`, `children`. Includes the `(element, type, event)` event callback shape and the `node`/`link` styling vs custom-renderer dual API.

- ec48e6a: Add globally-themed scrollbars in `tokens.css`. Every overflow-scroll element across canvas (and any consumer app loading the canvas tokens stylesheet) now renders thin, rounded scrollbars tinted with the `--muted-foreground` token at 30% / 45% / 60% opacity for idle / hover / active. Replaces stark OS-default scrollbars (chunky on Win/Linux, mismatched in dark mode) with a subtle treatment that matches the rest of the canvas surface chrome. Firefox uses `scrollbar-color`; WebKit (Chrome/Safari) uses `::-webkit-scrollbar` pseudo-elements. Radix `ScrollArea` continues to render its own custom scrollbar for explicit-scrollbar use cases.
- 1c6ce92: Docs: `Treemap` default example now uses a custom cell renderer for cleaner text — white semibold name + smaller muted value, both with a soft drop-shadow for readability on any palette colour. Labels and values automatically hide on cells too small to fit them, so nothing clips on small slices.
- 0262e72: Docs: `Treemap` default example uses `stroke="transparent"` so adjacent cells touch directly instead of being separated by a 1px background-coloured stroke. Cleaner, more modern look.
- d7c804a: Docs: `Treemap` props page goes from "Treemap takes no documented props beyond the standard HTML attributes" to a full 18-row reference. Because canvas re-exports `RechartsPrimitive.Treemap` directly, react-docgen returned an empty prop list — added explicit entries via `EXTRA_PROPS["charts/chart-types"].Treemap` covering data shape (`data`, `dataKey`, `nameKey`, `type`, `aspectRatio`), styling (`fill`, `stroke`, `content`), animation (`isAnimationActive`, `animationBegin`, `animationDuration`, `animationEasing`, `onAnimationStart`, `onAnimationEnd`), interaction (`onClick`, `onMouseEnter`, `onMouseLeave`), and `children`.
- 222cce1: Docs: `WorldHeatMap` props reference fleshed out.

  - DEFAULT column now populates for every prop (`"100%"`, `[20, 0]`, `3`, `"auto"`, `false`, `"hsl(var(--chart-1))"`, `[4, 20]`, `true`) — previously empty because the source's JSDoc embedded defaults inline in the description text rather than as `@default` tags.
  - `points` description spells out the `{ lat, lng, label, count }` shape inline so consumers don't have to chase the `WorldHeatMapPoint` type.
  - Behaviour hints expanded (e.g. `zoom` calls out `0` = whole world / `3` = continent / `5–7` = country; `markerRadiusRange` notes the log-scale).

## 2.6.28

### Patch Changes

- ee67a71: docs: dashboard-grid examples gain a `LayoutDashboard` icon next to the "Dashboard" title and reduce the edit toggle to an icon-only button. No library changes.
- 435f61c: `DashboardGrid` edit-mode drag handle now overlays the top-right corner of each widget instead of stealing a 28px-tall strip above it. Frees up vertical space, keeps the card chrome consistent between view and edit modes, and makes the affordance more discoverable next to the widget's own icon.

## 2.6.27

### Patch Changes

- 97027dd: Fix: bind every component that uses `border` to the `border-border` token explicitly. The base `* { border-color: hsl(var(--border)) }` rule from `tokens.css` was supposed to set the default, but Tailwind v4's `border` utility produced `currentColor` borders in some render contexts (notably iframes), making the borders render as bright white in dark mode. Affects: `Badge`, `Card`, `Alert`, `Stepper`, `ButtonGroupText`, `Popover`, `HoverCard`, `DropdownMenu` (content + sub), `Menubar` (root + content + sub), `ContextMenu` (content + sub), `NavigationMenuViewport`, `Drawer`, `DataTable` wrapper, `SelectContent`. `AlertDialog`/`Dialog` content was already fixed in the previous patch.
- dacfc6a: Fix: `AlertDialog` and `Dialog` footer buttons now stay vertically aligned in horizontal layout. The previous behavior left a stray `mt-2` on `AlertDialogCancel` when the `sm:mt-0` reset didn't fire (e.g. when the dialog renders inside a constrained iframe context), pushing Cancel 8px below the action button. Footer layout now uses `gap-2 sm:items-center sm:justify-end` (matching the canvas-canonical `ActionBar` pattern) and `AlertDialogCancel` no longer carries a hand-rolled margin. Consumers with custom `mt-*` overrides on `AlertDialogCancel` can drop them.
- 8258aa6: Fix: `AlertDialogContent` and `DialogContent` now have unconditional `rounded-lg` corners. The previous `sm:rounded-lg` only fired at viewport ≥640px and was unreliable in iframe / portal contexts where the `sm:` breakpoint didn't match — the dialog rendered with sharp square corners instead of the rounded modal style. Same `sm:`-reliability lesson as the previous footer alignment fix.

## 2.6.26

### Patch Changes

- 14b3156: docs: comprehensive refresh of the install / migration / contributing surfaces — strip stale GitHub Packages instructions (Canvas now ships from npmjs.org), remove dangling references to the removed `templates` tier (`AuthShell`, `AdminShell`, `WizardShell`), and add migration entries for the registry move and the `DashboardGrid` overhaul. No library API changes; just docs + README/MIGRATION/CONTRIBUTING markdown.

## 2.6.25

### Patch Changes

- e9da0b1: Add `README.md` to the published package so the npm package page shows install instructions, quick start, and a link to the docs site instead of "This package does not have a README."

## 2.6.24

### Patch Changes

- f26088c: docs: dashboard-grid examples now compose `PageHeader` for the dashboard title + actions row instead of a plain styled paragraph + button — matches the documented pattern for top-of-page chrome and demonstrates intended usage of the molecule. Library code unchanged.

## 2.6.23

### Patch Changes

- fd2c728: Republish via CI after granting `@olympusoss:canvas` team `read-write` access to the package and configuring a Granular Access Token with the correct scope. Heals version drift between `package.json` (`2.6.22`) and the npm registry (`2.6.19`) by shipping `2.6.23` through the pipeline.

## 2.6.22

### Patch Changes

- 795cc08: Republish via CI on a fresh changeset after granting the npm org write access to the package and regenerating the publish token. Heals version drift between `package.json` (currently `2.6.21`) and the npm registry (currently `2.6.19`) by shipping `2.6.22` through the corrected pipeline.

## 2.6.21

### Patch Changes

- 65f8a4a: Republish via CI after the previous Release run failed at the publish step due to a token-permission misconfiguration. No library changes — `package.json` already drifted to `2.6.20` (the previous run version-bumped before failing); this changeset bumps to `2.6.21` and ships through the corrected pipeline.

## 2.6.20

### Patch Changes

- 5375a68: Internal: validate the workflow_run-gated release pipeline by republishing through CI. No library API or behavior changes. Earlier patch (`2.6.19`) was published manually from a local terminal because the prior pipeline raced CI against Release in parallel; this version lands via the new CI-success-gated chain.

## 2.6.19

### Patch Changes

- a5f5ca6: Fix: `DashboardGrid` now generates per-breakpoint layouts by scaling each item's `x` and `w` proportionally to the target breakpoint's column count. Resolves the cascading "staircase" bug at `sm`/`xs`/`xxs` (caused by fanning a single lg-shaped layout into every breakpoint, which made `react-grid-layout` clamp `w` while preserving the original `x` offsets). `items` continues to be consumed in lg-coords; no public API changes.

  Caveat: drags performed at smaller breakpoints update only that breakpoint's layout (per react-grid-layout). Persist drag-to-edit changes at the `lg` breakpoint.

## 2.6.18

### Patch Changes

- 567d778: **Fix**: `DashboardGrid` now measures parent width correctly in iframes, modals, and any other container that resizes independently of the window.

  Previously DashboardGrid wrapped `react-grid-layout` with the upstream `WidthProvider` HOC, which defaults its initial width to 1280px and updates only on `window.resize` events. In iframes (e.g. the canvas docs preview) that resize event never fires from the parent context, so the grid stayed at the 1280px default forever — items overflowed any narrower container by 240px and got clipped.

  Replaced with a `ResizeObserver` that observes the grid's own wrapper, plus a synchronous `useLayoutEffect` initial measurement so the first paint already has the correct width in real browsers. SSR / jsdom fall back to a 1024px default.

  **Change**: default vertical margin reduced from `16px` to `8px` (default `margin` prop is now `[16, 8]` instead of `[16, 16]`). Tighter row gaps match the visual density most dashboards want; consumers who liked the looser spacing can pass `margin={[16, 16]}` explicitly.

## 5.0.0

### Major Changes

- 139eb27: **BREAKING: All templates removed.** The entire `templates/` tier is gone — `AppHeader`, `AuthLayout`, `AuthShell`, and `WizardShell` no longer exist. Canvas's atomic-design hierarchy is now atoms / molecules / organisms / charts only.

  Templates were thin wrappers that duplicated canvas primitives. After removing `AdminShell` (v3.0.0) and `AppShell` (v4.0.0), the remaining four templates added little value over composing the underlying primitives directly. This release deletes them all.

  **Migration patterns:**

  - `AppHeader` → build a custom `<header>` with `Avatar` / `SearchBar` / `DropdownMenu` / `SidebarTrigger` etc.
  - `AuthShell` / `AuthLayout` → centered `<Card>`:
    ```tsx
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <Card className="w-full">
          <CardContent className="p-6">{children}</CardContent>
        </Card>
      </div>
    </div>
    ```
  - `WizardShell` → `<Stepper>` + custom flex layout. See daedalus's `WizardLayout` for a full reference.

  The `templates/` directory in the canvas docs site is also gone — no Templates section in the component navigation.

## 4.0.0

### Major Changes

- 9e2f4e7: **BREAKING: `AppShell` template removed.**

  `AppShell` was a thin wrapper around a custom `<aside>` sidebar layout that duplicated canvas's existing `SidebarProvider` + `Sidebar` + `SidebarInset` system. Removed in favor of using those primitives directly — same capability, single source of truth.

  **Migration**:

  ```tsx
  // Before:
  <AppShell
    sidebar={({ expanded, setExpanded, closeMobile }) => (
      <MyNav expanded={expanded} onToggle={() => setExpanded(!expanded)} onNavigate={closeMobile} />
    )}
    header={({ onMobileMenuToggle }) => <MyHeader onMobileMenuToggle={onMobileMenuToggle} />}
  >
    {content}
  </AppShell>

  // After:
  <SidebarProvider>
    <Sidebar collapsible="icon">
      <SidebarHeader>...</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/dashboard"><Icon name="LayoutDashboard" />Dashboard</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>...</SidebarFooter>
    </Sidebar>
    <SidebarInset>
      <MyHeader />     {/* uses <SidebarTrigger /> internally for the mobile menu */}
      <main>{content}</main>
    </SidebarInset>
  </SidebarProvider>
  ```

  The mobile menu hamburger is now `<SidebarTrigger />`, which calls `useSidebar().toggleSidebar` from context — no need to thread `onMobileMenuToggle` callbacks.

  This is the second major today (v3.0.0 → v4.0.0). Both removals (`AdminShell` in v3, `AppShell` in v4) are part of the same cleanup: the canvas Sidebar primitives are the canonical way to build app shells, and the redundant template wrappers were causing layout bugs and forcing parallel state management.

## 3.0.0

### Major Changes

- 8551b07: **BREAKING: `AdminShell` template removed.**

  `AdminShell` had a layout bug (double-counted sidebar width via `md:ml-60` margin on top of flex layout, producing ~240px of dead space) and an inconsistent role. Replaced by the new **`AppShell`** template — same sidebar + header + children layout, with the bug fixed and the unused margin override props removed.

  **Migration**:

  ```tsx
  // Before:
  <AdminShell sidebar={...} header={...}>
    {content}
  </AdminShell>

  // After:
  <AppShell sidebar={...} header={...}>
    {content}
  </AppShell>
  ```

  The `AppShell` API is identical to the old `AdminShell` minus two unused props:

  - `expandedSidebarClass` (removed — was the source of the layout bug)
  - `collapsedSidebarClass` (removed — was the source of the layout bug)

  For dashboard routes that need a widget grid, compose `AppShell` with the canvas `Sidebar` organism + `DashboardGrid` directly.

## 2.4.0

### Minor Changes

- f96ba6d: **Chart tier — full migration from organism to `src/components/charts/`**

  The legacy `organisms/chart.tsx` has been replaced by a dedicated chart tier
  with 14 source files. All existing named exports (`ChartConfig`,
  `ChartContainer`, `ChartStyle`, `useChart`, `ChartTooltip`,
  `ChartTooltipContent`, `ChartLegend`, `ChartLegendContent`) continue to work
  unchanged.

  New exports:

  - **Chart-type wrappers**: `AreaChart`, `BarChart`, `ComposedChart`,
    `FunnelChart`, `LineChart`, `PieChart`, `RadarChart`, `RadialBarChart`,
    `Sankey`, `ScatterChart`, `SunburstChart`, `Treemap`.
  - **Data primitives**: `Area`, `Bar`, `Funnel`, `Line`, `Pie`, `Radar`,
    `RadialBar`, `Scatter`.
  - **Axes**: `CartesianAxis`, `XAxis`, `YAxis`, `ZAxis`, `PolarAngleAxis`,
    `PolarRadiusAxis`.
  - **Grids**: `CartesianGrid`, `PolarGrid`.
  - **References**: `ReferenceArea`, `ReferenceDot`, `ReferenceLine`.
  - **Labels**: `ChartLabel` (renamed from recharts `Label` to avoid collision
    with the atom-tier form `Label`), `LabelList`, `Text`.
  - **Containers**: `Brush`, `Layer`, `ResponsiveContainer`, `Surface`.
  - **Details**: `ChartCell`, `ChartCustomized`, `Cross`, `Curve`, `Dot`,
    `ErrorBar`, `Polygon`, `Rectangle`, `Sector`, `Trapezoid`.
  - **Geo**: `WorldHeatMap` (lazy-loaded Leaflet; peer-optional `leaflet` +
    `react-leaflet`).

  **Auto-palette**: `ChartContainer` now walks its children and injects
  `hsl(var(--chart-N))` on data primitives that have neither `fill` nor
  `stroke` set. Consumers passing explicit colors are unaffected.

- c89d485: **8 new components from Athena admin handoff**

  - New molecules: `ActivityItem`, `BrandLockup`, `NotificationItem`,
    `NotificationList`, `NumberBadge`, `Sparkline`, `UserAvatarChip`.
  - New template: `AppHeader`.
  - Surface-elevation token layer.

### Docs

- 280+ curated component examples across all tiers.
- 13 chart-slug example pages (area, bar, composed, funnel, line, pie, radar,
  radial-bar, sankey, scatter, sunburst, treemap, world-heat-map).
- Viewport preview (desktop / tablet / mobile) for all examples.
- Scroll-position-based TOC tracking with click-aware active indicator.
- Props tables and search index regenerated for all shipped components.

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
