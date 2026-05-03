// Utility

/* ────────────────────────────────────────────────────────────────
   ATOMS — single primitive wrappers, no composition.
   Can import only: tokens/, lib/utils.
   ──────────────────────────────────────────────────────────────── */
export { AspectRatio } from "./components/atoms/aspect-ratio";
export { Avatar, AvatarFallback, AvatarImage } from "./components/atoms/avatar";
export { Badge, badgeVariants } from "./components/atoms/badge";
export { BrandMark, type BrandMarkProps } from "./components/atoms/brand-mark";
export { Button, type ButtonProps, buttonVariants } from "./components/atoms/button";
export { Checkbox } from "./components/atoms/checkbox";
export { FlexBox, type FlexBoxProps } from "./components/atoms/flex-box";
export {
	Icon,
	type IconName,
	type IconProps,
	iconNames,
} from "./components/atoms/icon";
export { Input } from "./components/atoms/input";
export { Label } from "./components/atoms/label";
export { Logo, type LogoProps } from "./components/atoms/logo";
export { Progress } from "./components/atoms/progress";
export { RadioGroup, RadioGroupItem } from "./components/atoms/radio-group";
export { ScrollArea, ScrollBar } from "./components/atoms/scroll-area";
export { Section, type SectionProps } from "./components/atoms/section";
export { Separator } from "./components/atoms/separator";
export { Skeleton } from "./components/atoms/skeleton";
export { Slider } from "./components/atoms/slider";
export { Switch } from "./components/atoms/switch";
export { Textarea } from "./components/atoms/textarea";
export { Toggle, toggleVariants } from "./components/atoms/toggle";
/* ────────────────────────────────────────────────────────────────
   CHARTS — theme-aware Recharts wrappers + auto-palette container,
   plus hand-rolled data-viz primitives (Gauge, StackedBar,
   LabeledBarList, ServiceHealthList, ActivityHeatmap) built on
   canvas tokens.
   ──────────────────────────────────────────────────────────────── */
export {
	ActivityHeatmap,
	type ActivityHeatmapProps,
} from "./components/charts/activity-heatmap";
export {
	CartesianAxis,
	PolarAngleAxis,
	PolarRadiusAxis,
	XAxis,
	YAxis,
	ZAxis,
} from "./components/charts/axes";
export {
	type ChartConfig,
	ChartContainer,
	ChartStyle,
	useChart,
} from "./components/charts/chart-container";
export { ChartLegend, ChartLegendContent } from "./components/charts/chart-legend";
export { ChartTooltip, ChartTooltipContent } from "./components/charts/chart-tooltip";
export {
	AreaChart,
	BarChart,
	ComposedChart,
	FunnelChart,
	LineChart,
	PieChart,
	RadarChart,
	RadialBarChart,
	Sankey,
	ScatterChart,
	SunburstChart,
	Treemap,
} from "./components/charts/chart-types";
export { Brush, Layer, ResponsiveContainer, Surface } from "./components/charts/containers";
export {
	Area,
	Bar,
	Funnel,
	Line,
	Pie,
	Radar,
	RadialBar,
	Scatter,
} from "./components/charts/data";
export {
	ChartCell,
	ChartCustomized,
	Cross,
	Curve,
	Dot,
	ErrorBar,
	Polygon,
	Rectangle,
	Sector,
	Trapezoid,
} from "./components/charts/details";
export { Gauge, type GaugeProps } from "./components/charts/gauge";
export { CartesianGrid, PolarGrid } from "./components/charts/grids";
export {
	LabeledBarList,
	type LabeledBarListItem,
	type LabeledBarListProps,
} from "./components/charts/labeled-bar-list";
export {
	ReferenceArea,
	ReferenceDot,
	ReferenceLine,
} from "./components/charts/references";
export {
	type ServiceHealthItem,
	ServiceHealthList,
	type ServiceHealthListProps,
	type ServiceHealthStatus,
} from "./components/charts/service-health-list";
export {
	StackedBar,
	type StackedBarProps,
	type StackedBarSegment,
} from "./components/charts/stacked-bar";
export { ChartLabel, LabelList, Text } from "./components/charts/text";
export {
	WorldHeatMap,
	type WorldHeatMapPoint,
	type WorldHeatMapProps,
} from "./components/charts/world-heat-map";
/* ────────────────────────────────────────────────────────────────
   MOLECULES — small compositions of atoms.
   Can import: tokens/, lib/utils, atoms/.
   ──────────────────────────────────────────────────────────────── */
export {
	ActionBar,
	type ActionBarAction,
	type ActionBarProps,
	type ActionBarSecondary,
} from "./components/molecules/action-bar";
export {
	ActivityFeed,
	type ActivityFeedProps,
	ActivityItem,
	type ActivityItemProps,
} from "./components/molecules/activity-item";
export { Alert, AlertDescription, AlertTitle } from "./components/molecules/alert";
export {
	AnimatedBackground,
	type AnimatedBackgroundOrb,
	type AnimatedBackgroundProps,
} from "./components/molecules/animated-background";
export {
	BrandLockup,
	type BrandLockupProps,
} from "./components/molecules/brand-lockup";
export {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "./components/molecules/breadcrumb";
export {
	ButtonGroup,
	ButtonGroupSeparator,
	ButtonGroupText,
	buttonGroupVariants,
} from "./components/molecules/button-group";
export { Calendar, CalendarDayButton } from "./components/molecules/calendar";
export {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./components/molecules/card";
export { CodeBlock, type CodeBlockProps } from "./components/molecules/code-block";
export { EmptyState, type EmptyStateProps } from "./components/molecules/empty-state";
export { ErrorState, type ErrorStateProps } from "./components/molecules/error-state";
export {
	FieldDisplay,
	type FieldDisplayProps,
} from "./components/molecules/field-display";
export {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "./components/molecules/input-otp";
export {
	LoadingState,
	type LoadingStateProps,
} from "./components/molecules/loading-state";
export {
	NotificationItem,
	type NotificationItemProps,
} from "./components/molecules/notification-item";
export {
	NotificationList,
	type NotificationListProps,
} from "./components/molecules/notification-list";
export {
	NumberBadge,
	type NumberBadgeProps,
} from "./components/molecules/number-badge";
export {
	PageHeader,
	type PageHeaderBreadcrumb,
	type PageHeaderProps,
} from "./components/molecules/page-header";
export {
	PageTabs,
	type PageTabsItem,
	type PageTabsProps,
} from "./components/molecules/page-tabs";
export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "./components/molecules/pagination";
export {
	PhoneInput,
	type PhoneInputProps,
} from "./components/molecules/phone-input";
export { SearchBar, type SearchBarProps } from "./components/molecules/search-bar";
export {
	SecretField,
	type SecretFieldProps,
	type SecretFieldStatus,
} from "./components/molecules/secret-field";
export {
	SectionCard,
	type SectionCardProps,
} from "./components/molecules/section-card";
export {
	Sparkline,
	type SparklineProps,
} from "./components/molecules/sparkline";
export { StatCard, type StatCardProps } from "./components/molecules/stat-card";
export {
	StatusBadge,
	type StatusBadgeProps,
	statusBadgeVariants,
} from "./components/molecules/status-badge";
export {
	Stepper,
	type StepperProps,
	type StepperStep,
	type StepStatus,
} from "./components/molecules/stepper";
export {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "./components/molecules/table";
export { ToggleGroup, ToggleGroupItem } from "./components/molecules/toggle-group";
export {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./components/molecules/tooltip";
export {
	UserAvatarChip,
	type UserAvatarChipProps,
} from "./components/molecules/user-avatar-chip";
/* ────────────────────────────────────────────────────────────────
   ORGANISMS — stateful surfaces, compositions of atoms + molecules.
   Can import: tokens/, lib/utils, atoms/, molecules/.
   ──────────────────────────────────────────────────────────────── */
export {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./components/organisms/accordion";
export {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	AlertDialogPortal,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "./components/organisms/alert-dialog";
export {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "./components/organisms/carousel";
export {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "./components/organisms/collapsible";
export {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "./components/organisms/command";
export {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuGroup,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuPortal,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from "./components/organisms/context-menu";
export {
	DashboardGrid,
	type DashboardGridBreakpoint,
	type DashboardGridProps,
	type DashboardItem,
} from "./components/organisms/dashboard-grid";
export {
	DataTable,
	type DataTableColumn,
	type DataTableProps,
} from "./components/organisms/data-table";
export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
} from "./components/organisms/dialog";
export {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerPortal,
	DrawerTitle,
	DrawerTrigger,
} from "./components/organisms/drawer";
export {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "./components/organisms/dropdown-menu";
export {
	CodeEditor,
	type CodeEditorLanguage,
	type CodeEditorProps,
	MarkdownEditor,
	type MarkdownEditorProps,
	RichTextEditor,
	type RichTextEditorProps,
	TOOLBAR_ITEM_IDS,
	type ToolbarItemId,
} from "./components/organisms/editors";
export {
	ErrorBoundary,
	type ErrorBoundaryProps,
} from "./components/organisms/error-boundary";
export {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	useFormField,
} from "./components/organisms/form";
export {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "./components/organisms/hover-card";
export {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarGroup,
	MenubarItem,
	MenubarLabel,
	MenubarMenu,
	MenubarPortal,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from "./components/organisms/menubar";
export {
	NavBar,
	type NavBarProps,
	type NavLink,
} from "./components/organisms/navbar";
export {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
	navigationMenuTriggerStyle,
} from "./components/organisms/navigation-menu";
export {
	Popover,
	PopoverAnchor,
	PopoverContent,
	PopoverTrigger,
} from "./components/organisms/popover";
export {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "./components/organisms/resizable";
export {
	canvasSchemaFormTemplates,
	canvasSchemaFormWidgets,
	type IChangeEvent,
	type RJSFSchema,
	SchemaForm,
	type SchemaFormProps,
	type UiSchema,
	type WidgetProps,
} from "./components/organisms/schema-form";
export {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from "./components/organisms/select";
export {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetOverlay,
	SheetPortal,
	SheetTitle,
	SheetTrigger,
} from "./components/organisms/sheet";
export {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupAction,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInput,
	SidebarInset,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSkeleton,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarProvider,
	SidebarRail,
	SidebarSeparator,
	SidebarTrigger,
	useSidebar,
} from "./components/organisms/sidebar";
export { Toaster, toast } from "./components/organisms/sonner";
export { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/organisms/tabs";
export {
	type ResolvedTheme,
	type Theme,
	ThemeProvider,
	type ThemeProviderProps,
	useTheme,
} from "./components/organisms/theme-provider";
// Hooks
export { useIsMobile } from "./hooks/use-mobile";
export {
	PortalContainerProvider,
	usePortalContainer,
} from "./lib/portal-container";
export { cn } from "./lib/utils";

/* ────────────────────────────────────────────────────────────────
   Design tokens (cross-platform)
   ──────────────────────────────────────────────────────────────── */
export { colors, hslToString, hslToVar } from "./tokens/colors";
export { defaultRadius, radius, spacing } from "./tokens/spacing";
export { fontFamily, fontSize, fontWeight } from "./tokens/typography";
