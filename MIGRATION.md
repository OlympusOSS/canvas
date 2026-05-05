# Migration guide

Upgrade guide for consumers of `@olympusoss/canvas`. Entries cover only changes that require consumer action — drop-in additions are listed in the appendix.

## 2.6.x → registry move (GitHub Packages → npmjs.org)

`@olympusoss/canvas` now publishes to the public npm registry. The GitHub Packages registry is no longer used.

**Migration**: drop the GitHub Packages auth from your `.npmrc`:

```diff
- @olympusoss:registry=https://npm.pkg.github.com
- //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Reinstall:

```sh
npm install @olympusoss/canvas@latest
```

No code changes required.

## 2.5 → 2.6: DashboardGrid overhaul

`DashboardGrid` (organism) had three behavior changes that consumers may notice but don't break source compatibility:

- **Width measurement** — `react-grid-layout`'s `WidthProvider` HOC was removed in favor of an internal `ResizeObserver`. Result: the grid now measures correctly inside iframes, modals, and other isolated render contexts (`WidthProvider` only listened to `window.resize`, which never fires inside an iframe). No consumer change needed; the `width` prop is no longer accepted.
- **Per-breakpoint layouts auto-derived** — pass `items` once in `lg`-coords (the default 12-col layout). Smaller breakpoints (`md`/`sm`/`xs`/`xxs`) now scale each item's `x` and `w` proportionally to the target breakpoint's column count, matching the documented `react-grid-layout` pattern. Previously a single layout was fanned out to all breakpoints, which clamped wide items into a "staircase" cascade at smaller widths.
- **Default `margin`** is now `[16, 16]` (was `[16, 8]` briefly in 2.6.0–2.6.18). Pass `margin={[x, y]}` to override.

If you implemented your own per-breakpoint layouts via the prop (rare), they continue to work — the auto-scaling only fires when you pass a single `items` array.

## Pre-2.5 → 2.5: Templates removed

`AuthShell`, `AdminShell`, `WizardShell`, and `AuthLayout` are no longer exported. The `templates/` tier has been removed entirely.

**Why**: page-level layout templates over-prescribed how consumers wired their app shells (sidebar widths, header structure, drawer behavior) and consistently caused friction. Compose the building blocks directly instead — Canvas exports the full `Sidebar` family, and the rest is a normal flexbox shell.

**Migration** (mirroring what `AdminShell` did internally):

```tsx
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
} from "@olympusoss/canvas";

export function AppShell({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider defaultOpen>
			<Sidebar>
				<SidebarHeader>{/* logo + product name */}</SidebarHeader>
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel>Overview</SidebarGroupLabel>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton>Dashboard</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroup>
				</SidebarContent>
				<SidebarFooter>{/* user profile, logout */}</SidebarFooter>
			</Sidebar>
			<SidebarInset>
				<header className="flex h-14 items-center gap-2 border-b px-4">
					<SidebarTrigger />
					{/* topbar content */}
				</header>
				<main className="flex-1 overflow-y-auto p-6">{children}</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
```

`AuthShell` users: render a centered card on a full-screen flex container — there's no Canvas-specific affordance to replace. `WizardShell` users: compose `Stepper` + your own panel layout.

## Appendix — additions since 2.1.x

These shipped over many minor releases and don't require migration; just available to use:

| Tier | Component | Notes |
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
| molecule | `StatusBadge` | semantic status pill |
| molecule | `FieldDisplay` | label-on-the-left field row |
| molecule | `EmptyState` | icon + title + description + action |
| molecule | `AnimatedBackground` | gradient orb composition |
| molecule | `PhoneInput` | libphonenumber-js phone field (peer dep) |
| organism | `ThemeProvider` + `useTheme` | SSR-safe light/dark/system theme |
| organism | `ErrorBoundary` | React error boundary with reset |
| organism | `SchemaForm` | RJSF wrapper with Canvas widgets (peer dep) |
| organism | `DashboardGrid` | drag-to-reorder/resize widget grid |
| organism | full `Sidebar` family | composable sidebar primitives |
| chart | `ActivityHeatmap`, `Gauge`, `LabeledBarList`, `ServiceHealthList`, `Sparkline`, `StackedBar`, `WorldHeatMap` | theme-aware chart components |

`DataTable` accepts both legacy and TanStack-style column shapes — see the component docs for both APIs.
