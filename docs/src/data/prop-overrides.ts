/**
 * Per-component prop description overrides.
 *
 * Canvas's source code rarely has JSDoc on individual props (most descend
 * from Radix or use `cva` `VariantProps<>` so docgen can't extract a
 * meaningful comment). This file fills the gap with hand-authored
 * descriptions so every prop in every prop table is documented.
 *
 * Lookup chain inside `PropsTable`:
 *   1. `propsOverride` passed in via `<PropsTable overrides={…}/>` (richest, page-local)
 *   2. This file's `PROP_OVERRIDES[sourceId]?.[displayName]?.[propName]`
 *   3. Extracted JSDoc from `generated.json`
 *   4. `SHARED_PROP_DESCRIPTIONS` (asChild / className / inset only)
 *   5. "—"
 *
 * Keep entries terse and behaviour-focused — what does the prop do, and
 * what does it default to? Avoid restating the type.
 */

import type { PropsOverrideMap } from "../components/PropsTable";

/**
 * Synthetic prop entries appended to the auto-extracted props in the prop
 * table. Use this for canvas atoms that just spread `React.ComponentProps<>`
 * over a native HTML element or a Radix primitive — `react-docgen` can't
 * enumerate those inherited attributes, so we describe the most relevant
 * ones by hand here.
 *
 * Keyed: `sourceId` → component displayName → list of synthetic prop rows.
 */
export interface ExtraPropEntry {
	name: string;
	required: boolean;
	type: string;
	defaultValue: string | null;
	description: string;
}

export const EXTRA_PROPS: Record<string, Record<string, ExtraPropEntry[]>> = {
	"atoms/input": {
		Input: [
			{
				name: "type",
				required: false,
				type: '"text" | "email" | "password" | "number" | "tel" | "url" | "search" | "date" | "time" | "file" | …',
				defaultValue: '"text"',
				description: "Native input type. Drives keyboard, validation, and on iOS the picker.",
			},
			{
				name: "value",
				required: false,
				type: "string | number",
				defaultValue: null,
				description:
					"Controlled value. Pair with `onChange`. For uncontrolled inputs use `defaultValue` instead.",
			},
			{
				name: "defaultValue",
				required: false,
				type: "string | number",
				defaultValue: null,
				description: "Initial value for an uncontrolled input. Ignored if `value` is also passed.",
			},
			{
				name: "placeholder",
				required: false,
				type: "string",
				defaultValue: null,
				description: "Hint text shown when the input is empty. Renders in `text-muted-foreground`.",
			},
			{
				name: "disabled",
				required: false,
				type: "boolean",
				defaultValue: "false",
				description:
					"Visually dims to 50% and blocks all input. Pair with `Label` so the dim cascades.",
			},
			{
				name: "readOnly",
				required: false,
				type: "boolean",
				defaultValue: "false",
				description: "Selectable but not editable. Useful for displaying server-set values.",
			},
			{
				name: "required",
				required: false,
				type: "boolean",
				defaultValue: "false",
				description:
					"Block native form submit unless the input has a value. Mirror with a visual cue.",
			},
			{
				name: "name",
				required: false,
				type: "string",
				defaultValue: null,
				description:
					"Form field name. Required when relying on uncontrolled native form submission.",
			},
			{
				name: "id",
				required: false,
				type: "string",
				defaultValue: null,
				description: "DOM id. Match this from `<Label htmlFor>` for screen-reader association.",
			},
			{
				name: "min / max / step",
				required: false,
				type: "number | string",
				defaultValue: null,
				description:
					'Numeric / date bounds. Honoured by `type="number"` / `"date"` / `"time"` / `"range"`.',
			},
			{
				name: "pattern",
				required: false,
				type: "string (regex)",
				defaultValue: null,
				description:
					"Native HTML5 validation regex. Triggers `:invalid` if the value doesn't match.",
			},
			{
				name: "minLength / maxLength",
				required: false,
				type: "number",
				defaultValue: null,
				description: "Character count limits for text inputs.",
			},
			{
				name: "autoComplete",
				required: false,
				type: '"on" | "off" | "email" | "current-password" | …',
				defaultValue: null,
				description: "Browser autofill hint. See MDN for the full token list.",
			},
			{
				name: "autoFocus",
				required: false,
				type: "boolean",
				defaultValue: "false",
				description: "Focus the input on mount. Use sparingly — surprises keyboard users.",
			},
			{
				name: "onChange",
				required: false,
				type: "(e: ChangeEvent<HTMLInputElement>) => void",
				defaultValue: null,
				description:
					"Fires on every keystroke. Read `e.target.value`. Required if you pass `value`.",
			},
			{
				name: "onBlur / onFocus",
				required: false,
				type: "(e: FocusEvent<HTMLInputElement>) => void",
				defaultValue: null,
				description: "Focus events. Common for blur-validation or remote-typeahead lookups.",
			},
			{
				name: "ref",
				required: false,
				type: "React.Ref<HTMLInputElement>",
				defaultValue: null,
				description:
					"Forwarded to the native `<input>` for imperative focus / select / scrollIntoView.",
			},
			{
				name: "className",
				required: false,
				type: "string",
				defaultValue: null,
				description: "Tailwind / CSS classes merged onto the input via `cn()`.",
			},
		],
	},
	"atoms/textarea": {
		Textarea: [
			{
				name: "value",
				required: false,
				type: "string",
				defaultValue: null,
				description: "Controlled value. Pair with `onChange`.",
			},
			{
				name: "defaultValue",
				required: false,
				type: "string",
				defaultValue: null,
				description: "Uncontrolled initial value.",
			},
			{
				name: "placeholder",
				required: false,
				type: "string",
				defaultValue: null,
				description: "Hint text shown when empty.",
			},
			{
				name: "rows",
				required: false,
				type: "number",
				defaultValue: null,
				description:
					"Visible row count. Canvas's default min-height is 60px regardless; `rows` overrides.",
			},
			{
				name: "cols",
				required: false,
				type: "number",
				defaultValue: null,
				description: "Visible column count (width). Canvas overrides this with `w-full`.",
			},
			{
				name: "disabled / readOnly / required",
				required: false,
				type: "boolean",
				defaultValue: "false",
				description: "Same semantics as native `<textarea>`.",
			},
			{
				name: "maxLength / minLength",
				required: false,
				type: "number",
				defaultValue: null,
				description: "Character count limits.",
			},
			{
				name: "autoComplete / autoFocus",
				required: false,
				type: "string / boolean",
				defaultValue: null,
				description: "Browser autofill hint / focus on mount.",
			},
			{
				name: "onChange",
				required: false,
				type: "(e: ChangeEvent<HTMLTextAreaElement>) => void",
				defaultValue: null,
				description: "Fires on every keystroke.",
			},
			{
				name: "onBlur / onFocus",
				required: false,
				type: "(e: FocusEvent<HTMLTextAreaElement>) => void",
				defaultValue: null,
				description: "Focus events.",
			},
			{
				name: "ref",
				required: false,
				type: "React.Ref<HTMLTextAreaElement>",
				defaultValue: null,
				description: "Forwarded to the native `<textarea>`.",
			},
			{
				name: "className",
				required: false,
				type: "string",
				defaultValue: null,
				description: "Tailwind / CSS classes merged via `cn()`.",
			},
		],
	},
	"atoms/checkbox": {
		Checkbox: [
			{
				name: "checked",
				required: false,
				type: "boolean | 'indeterminate'",
				defaultValue: null,
				description:
					"Controlled state. Pass `'indeterminate'` to render the dash glyph instead of the check.",
			},
			{
				name: "defaultChecked",
				required: false,
				type: "boolean | 'indeterminate'",
				defaultValue: "false",
				description: "Uncontrolled initial state.",
			},
			{
				name: "onCheckedChange",
				required: false,
				type: "(checked: boolean | 'indeterminate') => void",
				defaultValue: null,
				description: "Fires when the user toggles the checkbox. Use this instead of `onChange`.",
			},
			{
				name: "disabled",
				required: false,
				type: "boolean",
				defaultValue: "false",
				description: "Dims to 50% and blocks input.",
			},
			{
				name: "required / name / value",
				required: false,
				type: "boolean / string / string",
				defaultValue: null,
				description: "Used inside native `<form>` submission.",
			},
			{
				name: "ref",
				required: false,
				type: "React.Ref<HTMLButtonElement>",
				defaultValue: null,
				description: "Forwarded to Radix's button.",
			},
		],
	},
	"atoms/switch": {
		Switch: [
			{
				name: "checked",
				required: false,
				type: "boolean",
				defaultValue: null,
				description: "Controlled state.",
			},
			{
				name: "defaultChecked",
				required: false,
				type: "boolean",
				defaultValue: "false",
				description: "Uncontrolled initial state.",
			},
			{
				name: "onCheckedChange",
				required: false,
				type: "(checked: boolean) => void",
				defaultValue: null,
				description: "Fires when the user flips the switch.",
			},
			{
				name: "disabled",
				required: false,
				type: "boolean",
				defaultValue: "false",
				description: "Dims and blocks input.",
			},
			{
				name: "required / name / value",
				required: false,
				type: "boolean / string / string",
				defaultValue: null,
				description: "Used inside native `<form>` submission.",
			},
			{
				name: "ref",
				required: false,
				type: "React.Ref<HTMLButtonElement>",
				defaultValue: null,
				description: "Forwarded to Radix's button.",
			},
		],
	},
	"atoms/separator": {
		Separator: [
			{
				name: "orientation",
				required: false,
				type: '"horizontal" | "vertical"',
				defaultValue: '"horizontal"',
				description:
					"Layout direction. `horizontal` is a 1px row spanning width; `vertical` is a 1px column spanning height.",
			},
			{
				name: "decorative",
				required: false,
				type: "boolean",
				defaultValue: "true",
				description:
					"When true (default), the separator is hidden from screen readers. Set to false for separators that have semantic meaning.",
			},
			{
				name: "className",
				required: false,
				type: "string",
				defaultValue: null,
				description: "Tailwind / CSS classes merged via `cn()`.",
			},
		],
	},
	"atoms/avatar": {
		AvatarImage: [
			{
				name: "src",
				required: false,
				type: "string",
				defaultValue: null,
				description: "Image URL. Hides itself if loading errors so the fallback can render.",
			},
			{
				name: "alt",
				required: false,
				type: "string",
				defaultValue: null,
				description: "Accessible label. Defaults to the empty string for decorative use.",
			},
			{
				name: "onLoadingStatusChange",
				required: false,
				type: "(status: 'idle' | 'loading' | 'loaded' | 'error') => void",
				defaultValue: null,
				description: "Radix lifecycle hook for tracking the load state.",
			},
		],
		AvatarFallback: [
			{
				name: "delayMs",
				required: false,
				type: "number",
				defaultValue: null,
				description:
					"Wait this many ms before showing the fallback (avoids flash on fast image loads).",
			},
		],
	},
};

/**
 * Component-level descriptions. Used by `<PropsTable>` when a component has
 * no explicit JSDoc but accepts only standard HTML attributes — instead of
 * the bland "takes no documented props" fallback, we explain *what the
 * component is for*.
 *
 * Keyed: `sourceId` (e.g. `organisms/sidebar`) → component displayName.
 */
export const COMPONENT_DESCRIPTIONS: Record<string, Record<string, string>> = {
	"atoms/aspect-ratio": {
		AspectRatio:
			"Re-export of Radix's `AspectRatio.Root`. Pass `ratio` (number, e.g. `16/9`) to lock a child's aspect ratio.",
	},
	"atoms/avatar": {
		Avatar:
			"Round profile-image container. Composes `Avatar` + `AvatarImage` + `AvatarFallback`. Defaults to `h-10 w-10`.",
		AvatarImage:
			"The `<img>` slot inside `<Avatar>`. Hides itself if loading errors so the fallback can render.",
		AvatarFallback:
			"Rendered when the image is missing or still loading — typically initials, an icon, or a silhouette.",
	},
	"atoms/checkbox": {
		Checkbox: "Wraps Radix's `Checkbox.Root`. The check glyph is rendered inside automatically.",
	},
	"atoms/input": {
		Input:
			"Styled wrapper around the native `<input>` — 36px tall, rounded-md, 1px border, transparent background, canvas focus ring. Forwards every native input attribute through to the underlying element.",
	},
	"atoms/label": {
		Label:
			"Wraps Radix's `Label.Root`. Pair via `htmlFor` matching the form control's `id`, or wrap the control as a child. Auto-dims to 70% when the associated input is `:disabled`.",
	},
	"atoms/separator": {
		Separator: "Thin divider line — horizontal (default) or vertical.",
	},
	"atoms/skeleton": {
		Skeleton:
			"Animated placeholder for content that's loading. Set width/height via className; Skeleton fills with a pulsing tinted block.",
	},
	"atoms/switch": {
		Switch:
			"Wraps Radix's `Switch.Root` — a binary on/off toggle. Pair with `<Label>` for accessibility.",
	},
	"atoms/textarea": {
		Textarea:
			"Styled wrapper around the native `<textarea>`. 60px min-height, rounded-md, 1px border, transparent background.",
	},
	"organisms/sidebar": {
		SidebarProvider:
			"Wraps the entire shell and supplies the `useSidebar()` context. Reads the `--sidebar-width` / `--sidebar-width-icon` CSS variables off this element, so any width override goes here via `style`. Required around every Sidebar.",
		Sidebar:
			"The sidebar shell — chooses left/right side, `sidebar`/`floating`/`inset` variant, and the collapse mode. Renders a Sheet drawer instead of an inline column when `useIsMobile()` returns true.",
		SidebarTrigger:
			"Default button that toggles the sidebar via `useSidebar().toggleSidebar`. Renders the panel-left glyph; swap with your own button if you want a different icon (e.g. a hamburger).",
		SidebarRail:
			'Thin draggable rail at the sidebar\'s edge that toggles open/collapsed. Optional — only useful when `collapsible !== "none"`.',
		SidebarInset:
			'The main content column — sibling of `<Sidebar>`. Adapts margin/border-radius/shadow when the sidebar uses `variant="inset"`. Place your topbar + page content inside.',
		SidebarInput:
			"`<Input>` styled to fit inside the sidebar (transparent bg, no shadow, sidebar-ring focus colour). Use for an in-sidebar search field.",
		SidebarHeader:
			"Top region of the sidebar. Default styling: 56px tall, row flex, gap-2.5, 16px horizontal padding, bottom border. Centred when collapsed to the icon rail. Typically holds the brand mark and a collapse trigger.",
		SidebarFooter:
			"Bottom region of the sidebar — default styling: column flex with 8px gap and 8px padding. Common uses: a sign-out button, version string, or theme toggle.",
		SidebarSeparator:
			"Horizontal divider with `mx-2` and the sidebar-border colour. Drop between groups when you want a visible split (otherwise the gap-2 spacing on `SidebarContent` is usually enough).",
		SidebarContent:
			"Scrollable region between header and footer. Wrap one or more `<SidebarGroup>`s here. Uses canvas's `<ScrollArea>` so the scrollbar matches the rest of the design system.",
		SidebarGroup:
			"Section wrapper inside `SidebarContent`. Use one per logical chunk of nav (Overview, Identity, OAuth2, …). Pair with `SidebarGroupLabel` + `SidebarGroupContent`.",
		SidebarGroupLabel:
			"Small uppercase heading at the top of a group. 11px, tracking-wider, sidebar-foreground/70. Auto-hides when the sidebar collapses to the icon rail.",
		SidebarGroupAction:
			"Right-aligned button inside a `SidebarGroup` (e.g. a `+` to add an item to that section). Hidden when the sidebar collapses to the icon rail.",
		SidebarGroupContent:
			"Inner content slot of a `SidebarGroup`. Holds a `SidebarMenu` (or any custom UI you want grouped under the label).",
		SidebarMenu:
			"Unordered list (`<ul>`) of `SidebarMenuItem`s. The list semantics are important for screen-reader users — keep menu items in here rather than inlining buttons in the group.",
		SidebarMenuItem:
			"Single row in the menu (`<li>`). Wraps a `SidebarMenuButton` plus an optional `SidebarMenuAction` and `SidebarMenuBadge`.",
		SidebarMenuButton:
			"The clickable nav item itself — supports `isActive`, `tooltip` (shown when collapsed to the rail), and `variant`/`size`. Use `asChild` to wrap a router `<Link>` instead of rendering a `<button>`.",
		SidebarMenuAction:
			"Icon button anchored to the right of a `SidebarMenuItem` (e.g. a row's overflow menu). Use `showOnHover` to keep it hidden until the row is hovered/focused.",
		SidebarMenuBadge:
			"Right-aligned numeric or status badge inside a menu item (e.g. unread count, pending count). Hidden when the sidebar collapses to the icon rail.",
		SidebarMenuSkeleton:
			"Loading-state placeholder that matches the `SidebarMenuButton` height. Set `showIcon` to also render a leading icon placeholder.",
		SidebarMenuSub:
			"Nested menu (`<ul>`) for sub-items under a `SidebarMenuButton`. Pair with `SidebarMenuSubItem` + `SidebarMenuSubButton`.",
		SidebarMenuSubItem:
			"`<li>` wrapper for an item inside a `SidebarMenuSub`. Matches `SidebarMenuItem` semantically but at the sub level.",
		SidebarMenuSubButton:
			"The clickable element inside a `SidebarMenuSubItem`. Defaults to an `<a>` (use `asChild` for router links). Smaller than top-level menu buttons.",
	},
};

/** sourceId (e.g. `atoms/button`) → component displayName → prop name → override. */
export const PROP_OVERRIDES: Record<string, Record<string, PropsOverrideMap>> = {
	"atoms/badge": {
		Badge: {
			variant: {
				description:
					"Visual style. `default` is filled brand colour, `secondary` is a muted neutral, `outline` is bordered with no fill, `destructive` flags an error or warning state.",
				defaultValue: '"default"',
			},
		},
	},
	"atoms/button": {
		Button: {
			variant: {
				description:
					"Visual emphasis. `default` is the primary action, `destructive` is for irreversible actions, `outline` and `secondary` are quieter, `ghost` is borderless, `link` looks like body-text underlined.",
				defaultValue: '"default"',
			},
			size: {
				description:
					"Height + horizontal padding preset. `sm` (32px), `default` (36px), `lg` (40px), `icon` is square 36px for icon-only buttons (always pair with `aria-label`).",
				defaultValue: '"default"',
			},
		},
	},
	"atoms/flex-box": {
		FlexBox: {
			direction: {
				description:
					"Maps to `flex-direction`. `row` (default), `row-reverse`, `col`, `col-reverse`.",
				defaultValue: '"row"',
			},
			align: {
				description: "Maps to `align-items`. `start`, `center`, `end`, `stretch`, `baseline`.",
			},
			justify: {
				description:
					"Maps to `justify-content`. `start`, `center`, `end`, `between`, `around`, `evenly`.",
			},
			wrap: {
				description: "Maps to `flex-wrap`. Pass `true` for `flex-wrap`, `false` for `flex-nowrap`.",
				defaultValue: "false",
			},
		},
	},
	"atoms/icon": {
		Icon: {
			name: {
				description:
					"Lucide icon name (PascalCase, e.g. `ChevronRight`, `Mail`). Only icons re-exported through `lucide-react` are valid.",
			},
			size: {
				description:
					"Pixel size of the rendered SVG. Defaults to 16; pass any number to override (e.g. 20, 24).",
				defaultValue: "16",
			},
		},
	},
	"atoms/toggle": {
		Toggle: {
			variant: {
				description: "`default` (filled when on) or `outline` (bordered).",
				defaultValue: '"default"',
			},
			size: {
				description: "`sm` (32px), `default` (36px), or `lg` (40px) square.",
				defaultValue: '"default"',
			},
		},
	},
	"molecules/action-bar": {
		ActionBar: {
			primaryAction: {
				description:
					"Required action button shown on the trailing side. Use for the most prominent confirm/save action.",
			},
			secondaryActions: {
				description:
					"Optional list of secondary actions (cancel, dismiss, etc.) shown alongside the primary action.",
			},
			align: {
				description: "Horizontal alignment of the action group. `start`, `center`, or `end`.",
				defaultValue: '"end"',
			},
		},
	},
	"molecules/alert": {
		Alert: {
			variant: {
				description:
					"`default` (informational), `destructive` (error/warning). Variant changes border, background, and text colour.",
				defaultValue: '"default"',
			},
		},
	},
	"molecules/breadcrumb": {
		Breadcrumb: {
			separator: {
				description:
					"Custom separator node rendered between items. Defaults to a chevron icon. Pass any ReactNode (icon, text, etc.).",
			},
		},
	},
	"molecules/button-group": {
		ButtonGroup: {
			orientation: {
				description:
					"`horizontal` (default) lays buttons left-to-right with shared borders; `vertical` stacks them with shared horizontal borders.",
				defaultValue: '"horizontal"',
			},
		},
	},
	"molecules/calendar": {
		Calendar: {
			buttonVariant: {
				description:
					"Variant applied to the prev/next month nav buttons. Maps to the `Button` atom's variants.",
				defaultValue: '"ghost"',
			},
		},
	},
	"molecules/code-block": {
		CodeBlock: {
			code: { description: "The code string to render inside the block." },
			language: {
				description:
					"Language hint for the syntax highlighter (e.g. `tsx`, `ts`, `bash`, `json`, `css`). Optional — falls back to plain text.",
			},
			showCopy: {
				description: "Show the trailing copy-to-clipboard button. Pass `false` to hide.",
				defaultValue: "true",
			},
		},
	},
	"molecules/empty-state": {
		EmptyState: {
			icon: {
				description:
					"Icon shown above the message. Typically a Lucide icon at 32–40px (e.g. `<Inbox size={36} />`).",
			},
			message: {
				description: "Headline string explaining why the surface is empty (e.g. `No results yet`).",
			},
			description: {
				description:
					"Optional supporting copy below the message — usually one short sentence on what to do next.",
			},
			action: {
				description:
					"Optional CTA button rendered under the description (e.g. `Create your first…`).",
			},
		},
	},
	"molecules/error-state": {
		ErrorState: {
			message: {
				description: "Headline error string shown to the user.",
			},
			onRetry: {
				description:
					"Click handler for the retry button. When omitted, the retry button is hidden.",
			},
			retryLabel: {
				description: "Custom label for the retry button.",
				defaultValue: '"Retry"',
			},
		},
	},
	"molecules/field-display": {
		FieldDisplay: {
			label: { description: "Label text shown above the value." },
			value: {
				description: "The value to display. ReactNode — strings, badges, links, anything.",
			},
			mono: {
				description:
					"Render the value in the monospace font (useful for IDs, hashes, JSON snippets).",
				defaultValue: "false",
			},
		},
	},
	"molecules/input-otp": {
		InputOTP: {
			maxLength: {
				description: "Total number of OTP slots / characters to accept.",
			},
			value: { description: "Controlled string of entered characters." },
			onChange: {
				description: "Fires on every keystroke with the current value as a string.",
			},
			textAlign: {
				description: "`left` or `center` (default) — caret alignment within each slot.",
				defaultValue: '"center"',
			},
			onComplete: {
				description: "Fires once the user has filled every slot. Receives the final string value.",
			},
			pushPasswordManagerStrategy: {
				description:
					"Hint for how aggressively to surface password-manager autofill. See `input-otp` docs for the full strategy options.",
			},
			pasteTransformer: {
				description:
					"Function that pre-processes pasted text before it is split into slots — e.g. to strip non-digits.",
			},
			containerClassName: {
				description:
					"Class name applied to the outer wrapper (the slot row). The standard `className` applies to the underlying input.",
			},
			noScriptCSSFallback: {
				description:
					"CSS string injected when JavaScript is disabled, so the input still renders something. Pass `null` to opt out.",
			},
		},
		InputOTPSlot: {
			index: {
				description:
					"Zero-based slot position. Required so the slot can pick up the right character from the parent value.",
			},
		},
	},
	"molecules/loading-state": {
		LoadingState: {
			message: {
				description: "Optional caption shown beneath the spinner.",
				defaultValue: '"Loading…"',
			},
			size: {
				description: "`sm`, `md`, or `lg` — controls spinner diameter and overall padding.",
				defaultValue: '"md"',
			},
		},
	},
	"molecules/page-header": {
		PageHeader: {
			title: { description: "Page title — rendered as an `<h1>`." },
			subtitle: { description: "Optional one-line subtitle below the title." },
			icon: {
				description: "Icon rendered to the left of the title (typically a Lucide icon at 24–28px).",
			},
			actions: {
				description:
					"Action buttons rendered on the trailing side of the header (e.g. `New`, `Filter`).",
			},
			breadcrumbs: {
				description: "Optional `<Breadcrumb>` rendered above the title.",
			},
		},
	},
	"molecules/page-tabs": {
		PageTabs: {
			tabs: {
				description:
					"Array of tab descriptors. Each item has at minimum `{ value, label }` and optionally an `icon` and `disabled`.",
			},
			value: { description: "Currently active tab's `value` (controlled)." },
			onChange: { description: "Fires with the new active tab's `value`." },
			variant: {
				description:
					"`default` is the standard underlined tab row; alternate variants change emphasis. See examples for the full set.",
				defaultValue: '"default"',
			},
		},
	},
	"molecules/pagination": {
		PaginationLink: {
			isActive: {
				description:
					'Mark this link as the current page (highlighted styling, `aria-current="page"`).',
				defaultValue: "false",
			},
			size: {
				description:
					"Height/padding preset, mirrors `Button`'s sizes (`sm`, `default`, `lg`, `icon`).",
				defaultValue: '"icon"',
			},
		},
		PaginationNext: {
			isActive: {
				description: "Mark as current page (rare for next, but supported).",
				defaultValue: "false",
			},
			size: {
				description: "Height/padding preset, mirrors `Button`'s sizes.",
				defaultValue: '"default"',
			},
		},
		PaginationPrevious: {
			isActive: {
				description: "Mark as current page (rare for previous, but supported).",
				defaultValue: "false",
			},
			size: {
				description: "Height/padding preset, mirrors `Button`'s sizes.",
				defaultValue: '"default"',
			},
		},
	},
	"molecules/phone-input": {
		PhoneInput: {
			id: {
				description:
					"DOM id forwarded to the underlying `<input>`. Required for a11y label binding.",
			},
			value: { description: "Controlled E.164-formatted phone string (e.g. `+15551234567`)." },
			onChange: {
				description:
					"Fires with the next E.164 string. Receives `undefined` while the input is partial.",
			},
			label: { description: "Visible label rendered above the input." },
			placeholder: { description: "Placeholder text inside the input when empty." },
			disabled: {
				description: "Disable the input + country selector.",
				defaultValue: "false",
			},
			readonly: {
				description: "Render as read-only — focusable but not editable.",
				defaultValue: "false",
			},
			required: {
				description: "Mark as required for native form validation + screen-reader hints.",
				defaultValue: "false",
			},
		},
	},
	"molecules/search-bar": {
		SearchBar: {
			value: { description: "Controlled query string." },
			onChange: { description: "Fires on every keystroke with the new query string." },
			onClear: {
				description:
					"Fires when the user clicks the trailing clear (×) button. When omitted, the clear button is hidden.",
			},
		},
	},
	"molecules/secret-field": {
		SecretField: {
			id: {
				description:
					"DOM id forwarded to the underlying `<input>`. Required for a11y label binding.",
			},
			value: { description: "Controlled secret string (e.g. API token, password)." },
			onChange: {
				description: "Fires with the next value as a string.",
			},
			placeholder: { description: "Placeholder text inside the input when empty." },
			label: { description: "Visible label rendered above the input." },
			disabled: {
				description: "Disable the input + reveal toggle.",
				defaultValue: "false",
			},
		},
	},
	"molecules/section-card": {
		SectionCard: {
			title: { description: "Card title rendered in the header." },
			subtitle: { description: "Optional one-line subtitle below the title." },
			headerActions: {
				description:
					"Trailing action node in the header — typically a `<Button>` group or icon-only action.",
			},
			loading: {
				description: "When true, swap the body for a `<LoadingState>`.",
				defaultValue: "false",
			},
			error: {
				description: "When set, swap the body for an `<ErrorState>` with this message.",
			},
			emptyMessage: {
				description:
					"When set and there are no children, swap the body for an `<EmptyState>` with this message.",
			},
			padding: {
				description: "Inner padding around the body. `none`, `sm`, `md` (default), `lg`.",
				defaultValue: '"md"',
			},
		},
	},
	"molecules/stat-card": {
		StatCard: {
			title: { description: "Stat label (e.g. `Active users`)." },
			value: {
				description:
					"The headline value — usually a number or short string. Rendered in display-size type.",
			},
			icon: { description: "Optional Lucide icon rendered in the header corner." },
			colorVariant: {
				description:
					"Colour treatment for the icon + value emphasis. `default`, `success`, `warning`, `destructive`, `info`.",
				defaultValue: '"default"',
			},
		},
	},
	"molecules/status-badge": {
		StatusBadge: {
			dot: {
				description: "Render a leading status dot. When false, the badge is text-only.",
				defaultValue: "true",
			},
			status: {
				description:
					"Semantic status driving colour + dot. `success`, `warning`, `error`, `info`, `neutral`, `pending`.",
				defaultValue: '"neutral"',
			},
		},
	},
	"molecules/stepper": {
		Stepper: {
			steps: {
				description:
					"Ordered array of step descriptors. Each item has `{ id, label, status }` where status is `complete`, `current`, or `upcoming`.",
			},
			orientation: {
				description: "`horizontal` (default) for top-of-page steppers, `vertical` for sidebars.",
				defaultValue: '"horizontal"',
			},
			onStepClick: {
				description: "Fires with the clicked step's `id`. Omit to make steps non-interactive.",
			},
		},
	},
	"molecules/toggle-group": {
		ToggleGroup: {
			variant: {
				description: "`default` (filled when on) or `outline` (bordered).",
				defaultValue: '"default"',
			},
			size: {
				description: "`sm`, `default`, or `lg` — applies to every child item.",
				defaultValue: '"default"',
			},
		},
		ToggleGroupItem: {
			variant: {
				description: "Override the parent group's variant for this single item.",
			},
			size: {
				description: "Override the parent group's size for this single item.",
			},
		},
	},
	"organisms/carousel": {
		Carousel: {
			opts: {
				description:
					"Embla Carousel options object — `align`, `loop`, `dragFree`, etc. See Embla docs for the full surface.",
			},
			plugins: {
				description: "Array of Embla plugin instances (autoplay, wheel-gestures, etc.).",
			},
			orientation: {
				description: "`horizontal` (default) or `vertical` scroll axis.",
				defaultValue: '"horizontal"',
			},
			setApi: {
				description:
					"Receives the Embla API instance once it mounts — use it for programmatic control.",
			},
		},
		CarouselNext: {
			variant: {
				description: "Mirrors `Button` variants. Defaults to outline.",
				defaultValue: '"outline"',
			},
			size: {
				description: "Mirrors `Button` sizes. Defaults to icon.",
				defaultValue: '"icon"',
			},
		},
		CarouselPrevious: {
			variant: {
				description: "Mirrors `Button` variants. Defaults to outline.",
				defaultValue: '"outline"',
			},
			size: {
				description: "Mirrors `Button` sizes. Defaults to icon.",
				defaultValue: '"icon"',
			},
		},
	},
	"organisms/chart": {
		Chart: {
			config: {
				description:
					"Map of series-key → `{ label, color | theme, icon? }`. Drives the legend, tooltip, and CSS variables that colour each series.",
			},
		},
		ChartLegend: {
			hideIcon: {
				description: "Hide the colour swatches in front of each series label.",
				defaultValue: "false",
			},
			nameKey: {
				description:
					"Key on each datum that holds the series identifier. Use when the legend should label by a property other than the default series key.",
			},
		},
		ChartStyle: {
			id: {
				description: "Stable id used to scope the generated CSS variables to this chart instance.",
			},
			config: {
				description: "The same `ChartConfig` passed to `<Chart>`.",
			},
		},
		ChartTooltip: {
			nameKey: {
				description: "Key on each datum that holds the series identifier (defaults to `name`).",
			},
			hideLabel: {
				description: "Hide the heading label of the tooltip.",
				defaultValue: "false",
			},
			hideIndicator: {
				description: "Hide the colour indicator next to each series row.",
				defaultValue: "false",
			},
			indicator: {
				description: "Indicator shape. `line`, `dot`, or `dashed`.",
				defaultValue: '"dot"',
			},
			labelKey: {
				description: "Key on each datum to use for the tooltip's heading label.",
			},
		},
	},
	"organisms/editors/code-editor": {
		CodeEditor: {
			value: { description: "Source code as a string. Controlled." },
			onChange: { description: "Fires with the next source string on every doc change." },
			language: {
				description:
					"Highlighter to apply. One of `javascript` / `typescript` / `json` / `markdown` / `html` / `css`.",
			},
			placeholder: { description: "Placeholder text shown when the document is empty." },
			disabled: {
				description: "Block input + apply 50% opacity. Editor still selectable.",
				defaultValue: "false",
			},
			readonly: {
				description: "Block edits but keep selection / copy enabled.",
				defaultValue: "false",
			},
			ariaLabel: {
				description: "Accessibility label describing what the editor edits. Required.",
			},
			lineNumbers: {
				description: "Render the gutter with line numbers.",
				defaultValue: "true",
			},
			height: {
				description: "Pixel height (number) or any CSS length string for the editing surface.",
				defaultValue: "240",
			},
			extensions: {
				description: "Extra CodeMirror extensions appended after the canvas defaults.",
			},
		},
	},
	"organisms/editors/markdown-editor": {
		MarkdownEditor: {
			value: { description: "Markdown source string. Controlled." },
			onChange: { description: "Fires with the next markdown string on every doc change." },
			placeholder: { description: "Placeholder text shown when empty." },
			disabled: {
				description: "Block input + apply 50% opacity.",
				defaultValue: "false",
			},
			readonly: {
				description: "Block edits but keep selection enabled.",
				defaultValue: "false",
			},
			ariaLabel: { description: "Accessibility label for the editor. Required." },
			toolbar: {
				description: "Show the formatting toolbar above the editor.",
				defaultValue: "true",
			},
			preview: {
				description:
					"Render a side-by-side preview pane with sanitized markdown (via marked + DOMPurify).",
				defaultValue: "false",
			},
			height: {
				description: "Pixel height (number) or any CSS length string.",
				defaultValue: "240",
			},
		},
	},
	"organisms/editors/rich-text-editor": {
		RichTextEditor: {
			value: {
				description:
					'Editor content as an HTML string by default, or as a JSON string when `outputFormat="json"`. Controlled.',
			},
			onChange: { description: "Fires on every doc update with the next serialized value." },
			placeholder: { description: "Placeholder text shown when the document is empty." },
			disabled: {
				description: "Block input + apply 50% opacity.",
				defaultValue: "false",
			},
			readonly: {
				description: "Block edits but keep text selectable.",
				defaultValue: "false",
			},
			ariaLabel: { description: "Accessibility label for the editor. Required." },
			toolbar: {
				description: "Show the formatting toolbar.",
				defaultValue: "true",
			},
			toolbarItems: {
				description:
					"Whitelist of toolbar item ids to render. Defaults to every item in `TOOLBAR_ITEM_IDS`.",
			},
			outputFormat: {
				description:
					'Format `value` / `onChange` use. `"html"` (default) returns serialized HTML; `"json"` returns ProseMirror JSON serialized to a string.',
				defaultValue: '"html"',
			},
			height: {
				description: "Pixel height (number) or any CSS length string.",
				defaultValue: "240",
			},
			extensions: {
				description: "Extra Tiptap extensions appended after StarterKit + Link + Placeholder.",
			},
		},
	},
	"organisms/data-table": {
		DataTable: {
			columns: {
				description:
					"Column descriptors. Each one is `{ key, header, accessor?, render?, className? }`. `accessor` is a string path; `render` is a custom cell renderer.",
			},
			data: { description: "Array of row records. Required." },
			emptyMessage: {
				description: "Message shown when `data` is empty.",
				defaultValue: '"No results."',
			},
			pageSize: {
				description:
					"Rows per page when `pagination` is true. Use `pageSizeOptions` to surface a picker.",
				defaultValue: "10",
			},
			loading: {
				description: "Show a loading state instead of rows.",
				defaultValue: "false",
			},
			searchable: {
				description: "Show a search input above the table.",
				defaultValue: "false",
			},
			searchKey: {
				description:
					"When uncontrolled, the field on each row that the built-in search filter matches against.",
			},
			searchValue: {
				description: "Controlled search query.",
			},
			onSearchChange: {
				description: "Fires on every keystroke when search is controlled.",
			},
			searchPlaceholder: {
				description: "Placeholder shown inside the search input.",
				defaultValue: '"Search…"',
			},
			onRowClick: {
				description: "Fires with the row record when the user clicks a row.",
			},
			onRefresh: {
				description: "Fires when the refresh button is clicked. Omit to hide the button.",
			},
			onAdd: {
				description: "Fires when the `+ Add` button is clicked. Omit to hide the button.",
			},
			addButtonText: {
				description: "Label for the add button.",
				defaultValue: '"Add"',
			},
			selectable: {
				description: "Render row checkboxes for multi-select.",
				defaultValue: "false",
			},
			selectedKeys: {
				description: "Controlled set of selected row ids (must be unique per row).",
			},
			onSelectionChange: {
				description: "Fires with the next set of selected ids whenever selection changes.",
			},
			pagination: {
				description: "Show the bottom pagination bar.",
				defaultValue: "false",
			},
			pageSizeOptions: {
				description: "Page-size options shown in the dropdown picker.",
				defaultValue: "[10, 25, 50, 100]",
			},
		},
	},
	"organisms/drawer": {
		Drawer: {
			activeSnapPoint: {
				description: "Currently-active snap point identifier (controlled).",
			},
			setActiveSnapPoint: {
				description: "Setter for the controlled `activeSnapPoint`.",
			},
			open: { description: "Controlled open/closed state." },
			onOpenChange: {
				description: "Fires with the next open state when the user opens or dismisses.",
			},
			shouldScaleBackground: {
				description: "Apply the iOS-style background scale-down while the drawer is open.",
				defaultValue: "true",
			},
			onDrag: { description: "Fires while the user is dragging the drawer." },
			onRelease: { description: "Fires when the drag gesture ends." },
			nested: {
				description:
					"Mark this drawer as nested inside another drawer to coordinate stacking and dismiss order.",
				defaultValue: "false",
			},
			onClose: { description: "Fires after the drawer finishes closing." },
			container: { description: "Optional DOM node to portal the drawer into." },
			preventScrollRestoration: {
				description: "Skip the auto scroll-restoration when the drawer closes.",
				defaultValue: "false",
			},
			autoFocus: {
				description: "Auto-focus the first focusable element inside the drawer when it opens.",
				defaultValue: "true",
			},
		},
	},
	"organisms/form": {
		FormField: {
			name: {
				description:
					"Form field path (`react-hook-form` style — supports dotted paths for nested values).",
			},
			rules: {
				description: "Validation rules object passed straight to `react-hook-form`.",
			},
			shouldUnregister: {
				description: "Unregister the field when it unmounts.",
				defaultValue: "false",
			},
			defaultValue: {
				description: "Initial value if the field is not in `defaultValues`.",
			},
			control: {
				description:
					"Form `control` instance from `useForm()`. When omitted, picked up from context.",
			},
			disabled: {
				description: "Disable the field and exempt it from validation.",
				defaultValue: "false",
			},
			exact: {
				description: "Subscribe to this exact field path only — skip parent/child watch updates.",
				defaultValue: "false",
			},
		},
	},
	"organisms/menubar": {
		MenubarMenu: {
			__scopeMenubar: {
				description: "Internal Radix scoping prop — leave unset.",
			},
		},
	},
	"organisms/navbar": {
		NavBar: {
			logo: {
				description:
					"Brand-mark node rendered on the leading edge — typically `<OlympusLogo>` or a `<Link>`.",
			},
			links: {
				description:
					"Array of `{ href, label }` (and optional `active`) items rendered as the central nav.",
			},
			actions: {
				description: "Trailing action nodes — sign-in buttons, theme toggles, profile menu.",
			},
			sticky: {
				description: "Pin the bar to the top of the viewport while scrolling.",
				defaultValue: "false",
			},
		},
	},
	"organisms/resizable": {
		ResizableHandle: {
			withHandle: {
				description:
					"Render a visible grip indicator on the handle (off by default for a clean look).",
				defaultValue: "false",
			},
		},
	},
	"organisms/select": {
		Select: {
			value: { description: "Controlled selected option value." },
			defaultValue: { description: "Initial selected value when uncontrolled." },
			onValueChange: {
				description: "Fires with the new selected value when the user picks an option.",
			},
		},
	},
	"organisms/sheet": {
		SheetContent: {
			side: {
				description:
					"Which edge the sheet slides in from. `top`, `right` (default), `bottom`, or `left`.",
				defaultValue: '"right"',
			},
		},
	},
	"organisms/sidebar": {
		Sidebar: {
			side: {
				description: "Which side of the layout the sidebar lives on.",
				defaultValue: '"left"',
			},
			variant: {
				description:
					"`sidebar` is the standard layout column, `floating` lifts the sidebar with a shadow, `inset` insets it into the page surface.",
				defaultValue: '"sidebar"',
			},
			collapsible: {
				description:
					"Collapse mode. `offcanvas` slides off-screen, `icon` collapses to icons-only, `none` disables collapsing.",
				defaultValue: '"offcanvas"',
			},
		},
		SidebarMenuAction: {
			showOnHover: {
				description: "Only reveal the action when the parent menu item is hovered or focused.",
				defaultValue: "false",
			},
		},
		SidebarMenuButton: {
			variant: {
				description: "`default` or `outline`.",
				defaultValue: '"default"',
			},
			size: {
				description: "`sm`, `default`, or `lg`.",
				defaultValue: '"default"',
			},
			tooltip: {
				description:
					"Tooltip text shown when the sidebar collapses to icons-only mode (so the label is still discoverable).",
			},
			isActive: {
				description: "Mark as the currently active item (highlighted styling).",
				defaultValue: "false",
			},
		},
		SidebarMenuSkeleton: {
			showIcon: {
				description: "Render a skeleton block where the leading icon would normally be.",
				defaultValue: "false",
			},
		},
		SidebarMenuSubButton: {
			size: {
				description: "`sm` or `md` — sub-items are typically smaller than top-level menu buttons.",
				defaultValue: '"md"',
			},
			isActive: {
				description: "Mark as the currently active sub-item.",
				defaultValue: "false",
			},
		},
		SidebarProvider: {
			defaultOpen: {
				description: "Initial open state when uncontrolled.",
				defaultValue: "true",
			},
			open: { description: "Controlled open state." },
			onOpenChange: { description: "Fires with the next open state." },
		},
		SidebarTrigger: {
			variant: {
				description: "Mirrors `Button` variants. Defaults to ghost for low-emphasis chrome.",
				defaultValue: '"ghost"',
			},
			size: {
				description: "Mirrors `Button` sizes. Defaults to icon.",
				defaultValue: '"icon"',
			},
		},
	},
	"organisms/theme-provider": {
		ThemeProvider: {
			defaultTheme: {
				description:
					"Initial theme when none is persisted in localStorage. `light`, `dark`, or `system`.",
				defaultValue: '"system"',
			},
		},
	},
	"templates/admin-shell": {
		AdminShell: {
			defaultSidebarExpanded: {
				description: "Initial state of the sidebar when no preference is persisted.",
				defaultValue: "true",
			},
		},
	},
	"templates/auth-layout": {
		AuthLayout: {
			title: { description: "Headline shown above the form area." },
			description: { description: "Supporting copy under the title." },
			footer: {
				description: "Footer node — typically a `<Link>` to switch flow (e.g. sign-up ↔ sign-in).",
			},
		},
	},
	"templates/auth-shell": {
		AuthShell: {
			title: { description: "Headline shown above the form area." },
			subtitle: { description: "Supporting copy under the title." },
		},
	},
	"templates/wizard-shell": {
		WizardShell: {
			onStepChange: {
				description:
					"Fires with the next step's index when the user navigates between steps. Use to persist progress.",
			},
		},
	},
};
