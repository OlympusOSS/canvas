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

export const EXTRA_PROPS: Record<string, Record<string, ExtraPropEntry[]>> = {};

/**
 * Component-level descriptions. Used by `<PropsTable>` when a component has
 * no explicit JSDoc but accepts only standard HTML attributes — instead of
 * the bland "takes no documented props" fallback, we explain *what the
 * component is for*.
 *
 * Keyed: `sourceId` (e.g. `organisms/sidebar`) → component displayName.
 */
export const COMPONENT_DESCRIPTIONS: Record<string, Record<string, string>> = {};

/** sourceId (e.g. `atoms/button`) → component displayName → prop name → override. */
export const PROP_OVERRIDES: Record<string, Record<string, PropsOverrideMap>> = {
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
	"organisms/theme-provider": {
		ThemeProvider: {
			defaultTheme: {
				description:
					"Initial theme when none is persisted in localStorage. `light`, `dark`, or `system`.",
				defaultValue: '"system"',
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
