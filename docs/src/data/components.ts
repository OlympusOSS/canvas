export interface ComponentManifestEntry {
	/** URL slug (matches the source filename without extension). */
	id: string;
	/** Display name. */
	label: string;
	/** Tier folder. */
	tier: "atoms" | "molecules" | "organisms" | "templates" | "charts";
}

export const COMPONENTS: ComponentManifestEntry[] = [
	// atoms
	{ id: "aspect-ratio", label: "AspectRatio", tier: "atoms" },
	{ id: "avatar", label: "Avatar", tier: "atoms" },
	{ id: "badge", label: "Badge", tier: "atoms" },
	{ id: "button", label: "Button", tier: "atoms" },
	{ id: "checkbox", label: "Checkbox", tier: "atoms" },
	{ id: "flex-box", label: "FlexBox", tier: "atoms" },
	{ id: "icon", label: "Icon", tier: "atoms" },
	{ id: "input", label: "Input", tier: "atoms" },
	{ id: "label", label: "Label", tier: "atoms" },
	{ id: "brand-mark", label: "BrandMark", tier: "atoms" },
	{ id: "progress", label: "Progress", tier: "atoms" },
	{ id: "radio-group", label: "RadioGroup", tier: "atoms" },
	{ id: "scroll-area", label: "ScrollArea", tier: "atoms" },
	{ id: "section", label: "Section", tier: "atoms" },
	{ id: "separator", label: "Separator", tier: "atoms" },
	{ id: "skeleton", label: "Skeleton", tier: "atoms" },
	{ id: "slider", label: "Slider", tier: "atoms" },
	{ id: "switch", label: "Switch", tier: "atoms" },
	{ id: "textarea", label: "Textarea", tier: "atoms" },
	{ id: "toggle", label: "Toggle", tier: "atoms" },

	// molecules
	{ id: "action-bar", label: "ActionBar", tier: "molecules" },
	{ id: "activity-heatmap", label: "ActivityHeatmap", tier: "molecules" },
	{ id: "activity-item", label: "ActivityItem", tier: "molecules" },
	{ id: "alert", label: "Alert", tier: "molecules" },
	{ id: "animated-background", label: "AnimatedBackground", tier: "molecules" },
	{ id: "brand-lockup", label: "BrandLockup", tier: "molecules" },
	{ id: "breadcrumb", label: "Breadcrumb", tier: "molecules" },
	{ id: "button-group", label: "ButtonGroup", tier: "molecules" },
	{ id: "calendar", label: "Calendar", tier: "molecules" },
	{ id: "card", label: "Card", tier: "molecules" },
	{ id: "code-block", label: "CodeBlock", tier: "molecules" },
	{ id: "empty-state", label: "EmptyState", tier: "molecules" },
	{ id: "error-state", label: "ErrorState", tier: "molecules" },
	{ id: "field-display", label: "FieldDisplay", tier: "molecules" },
	{ id: "gauge", label: "Gauge", tier: "molecules" },
	{ id: "input-otp", label: "InputOTP", tier: "molecules" },
	{ id: "labeled-bar-list", label: "LabeledBarList", tier: "molecules" },
	{ id: "loading-state", label: "LoadingState", tier: "molecules" },
	{ id: "notification-list", label: "NotificationList", tier: "molecules" },
	{ id: "number-badge", label: "NumberBadge", tier: "molecules" },
	{ id: "page-header", label: "PageHeader", tier: "molecules" },
	{ id: "page-tabs", label: "PageTabs", tier: "molecules" },
	{ id: "pagination", label: "Pagination", tier: "molecules" },
	{ id: "phone-input", label: "PhoneInput", tier: "molecules" },
	{ id: "search-bar", label: "SearchBar", tier: "molecules" },
	{ id: "secret-field", label: "SecretField", tier: "molecules" },
	{ id: "section-card", label: "SectionCard", tier: "molecules" },
	{ id: "service-health-list", label: "ServiceHealthList", tier: "molecules" },
	{ id: "sparkline", label: "Sparkline", tier: "molecules" },
	{ id: "stacked-bar", label: "StackedBar", tier: "molecules" },
	{ id: "stat-card", label: "StatCard", tier: "molecules" },
	{ id: "status-badge", label: "StatusBadge", tier: "molecules" },
	{ id: "stepper", label: "Stepper", tier: "molecules" },
	{ id: "table", label: "Table", tier: "molecules" },
	{ id: "toggle-group", label: "ToggleGroup", tier: "molecules" },
	{ id: "tooltip", label: "Tooltip", tier: "molecules" },
	{ id: "user-avatar-chip", label: "UserAvatarChip", tier: "molecules" },

	// organisms
	{ id: "accordion", label: "Accordion", tier: "organisms" },
	{ id: "alert-dialog", label: "AlertDialog", tier: "organisms" },
	{ id: "carousel", label: "Carousel", tier: "organisms" },
	{ id: "code-editor", label: "CodeEditor", tier: "organisms" },
	{ id: "collapsible", label: "Collapsible", tier: "organisms" },
	{ id: "command", label: "Command", tier: "organisms" },
	{ id: "context-menu", label: "ContextMenu", tier: "organisms" },
	{ id: "data-table", label: "DataTable", tier: "organisms" },
	{ id: "dialog", label: "Dialog", tier: "organisms" },
	{ id: "drawer", label: "Drawer", tier: "organisms" },
	{ id: "dropdown-menu", label: "DropdownMenu", tier: "organisms" },
	{ id: "error-boundary", label: "ErrorBoundary", tier: "organisms" },
	{ id: "form", label: "Form", tier: "organisms" },
	{ id: "hover-card", label: "HoverCard", tier: "organisms" },
	{ id: "markdown-editor", label: "MarkdownEditor", tier: "organisms" },
	{ id: "menubar", label: "Menubar", tier: "organisms" },
	{ id: "navbar", label: "NavBar", tier: "organisms" },
	{ id: "navigation-menu", label: "NavigationMenu", tier: "organisms" },
	{ id: "popover", label: "Popover", tier: "organisms" },
	{ id: "resizable", label: "Resizable", tier: "organisms" },
	{ id: "rich-text-editor", label: "RichTextEditor", tier: "organisms" },
	{ id: "schema-form", label: "SchemaForm", tier: "organisms" },
	{ id: "select", label: "Select", tier: "organisms" },
	{ id: "sheet", label: "Sheet", tier: "organisms" },
	{ id: "sidebar", label: "Sidebar", tier: "organisms" },
	{ id: "sonner", label: "Toaster", tier: "organisms" },
	{ id: "tabs", label: "Tabs", tier: "organisms" },
	{ id: "theme-provider", label: "ThemeProvider", tier: "organisms" },

	// charts
	{ id: "area-chart", label: "AreaChart", tier: "charts" },
	{ id: "bar-chart", label: "BarChart", tier: "charts" },
	{ id: "composed-chart", label: "ComposedChart", tier: "charts" },
	{ id: "funnel-chart", label: "FunnelChart", tier: "charts" },
	{ id: "line-chart", label: "LineChart", tier: "charts" },
	{ id: "pie-chart", label: "PieChart", tier: "charts" },
	{ id: "radar-chart", label: "RadarChart", tier: "charts" },
	{ id: "radial-bar-chart", label: "RadialBarChart", tier: "charts" },
	{ id: "sankey", label: "Sankey", tier: "charts" },
	{ id: "scatter-chart", label: "ScatterChart", tier: "charts" },
	{ id: "sunburst-chart", label: "SunburstChart", tier: "charts" },
	{ id: "treemap", label: "Treemap", tier: "charts" },
	{ id: "world-heat-map", label: "WorldHeatMap", tier: "charts" },

	// templates
	{ id: "admin-shell", label: "AdminShell", tier: "templates" },
	{ id: "app-header", label: "AppHeader", tier: "templates" },
	{ id: "auth-layout", label: "AuthLayout", tier: "templates" },
	{ id: "auth-shell", label: "AuthShell", tier: "templates" },
	{ id: "wizard-shell", label: "WizardShell", tier: "templates" },
];

export const TIER_META: Record<
	ComponentManifestEntry["tier"],
	{ label: string; description: string }
> = {
	atoms: { label: "Atoms", description: "Primitive wrappers" },
	molecules: { label: "Molecules", description: "Compositions of atoms" },
	organisms: { label: "Organisms", description: "Stateful surfaces" },
	templates: { label: "Templates", description: "Page-level scaffolding" },
	charts: { label: "Charts", description: "Theme-aware Recharts wrappers" },
};

export function componentsByTier(tier: ComponentManifestEntry["tier"]) {
	return COMPONENTS.filter((c) => c.tier === tier);
}
