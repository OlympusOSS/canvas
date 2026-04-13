// Utility
export { cn } from "./lib/utils";

// Hooks
export {
  useTheme,
  ThemeContext,
  type Theme,
  type ThemeContextValue,
} from "./hooks/use-canvas-theme";

// UI Primitives
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./components/ui/accordion";
export { Alert, AlertTitle, AlertDescription } from "./components/ui/alert";
export { Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup, AvatarGroupCount } from "./components/ui/avatar";
export { Badge, badgeVariants } from "./components/ui/badge";
export { Button, buttonVariants } from "./components/ui/button";
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, CardAction } from "./components/ui/card";
export { Checkbox } from "./components/ui/checkbox";
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
} from "./components/ui/dialog";
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
} from "./components/ui/dropdown-menu";
export { Input } from "./components/ui/input";
export { Label } from "./components/ui/label";
export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "./components/ui/popover";
export { ScrollArea, ScrollBar } from "./components/ui/scroll-area";
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
} from "./components/ui/select";
export { Separator } from "./components/ui/separator";
export { Skeleton } from "./components/ui/skeleton";
export { Switch } from "./components/ui/switch";
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./components/ui/table";
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
export { Textarea } from "./components/ui/textarea";
export { Toast, Toaster, useToast, toastVariants, type ToastProps, type ToasterProps, type ToastState } from "./components/ui/toast";
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./components/ui/tooltip";
export { CodeBlock, type CodeBlockProps } from "./components/ui/code-block";
export { NotificationItem, type NotificationItemProps, type NotificationSeverity } from "./components/ui/notification-item";
export { NotificationList, type NotificationListProps, type NotificationData } from "./components/ui/notification-list";
export { ReleaseInfo, type ReleaseInfoProps, type ReleaseInfoEntry } from "./components/ui/release-info";

// Icon
export { Icon, iconNames, type IconName, type IconProps } from "./components/icon";

// Data Table
export { DataTable, type DataTableColumn, type DataTableProps } from "./components/data-table";
export { SearchBar, type SearchBarProps } from "./components/data-table";

// Charts
export { ActivityFeed, type ActivityItem, type ActivityFeedProps } from "./components/charts";
export { AnimatedAreaChart } from "./components/charts";
export { AnimatedBarChart } from "./components/charts";
export { AnimatedPieChart } from "./components/charts";
export { ChartCard } from "./components/charts";
export { Sparkline, type SparklineProps } from "./components/charts";
export { StatCard, type StatCardProps } from "./components/charts";
export { VerificationGauge } from "./components/charts";
export { MultiSeriesAreaChart, type SeriesDefinition } from "./components/charts";
export { ChartCardWithFilter, type ChartCardWithFilterProps } from "./components/charts";
export { LocationList, type LocationItem, type LocationListProps } from "./components/charts";
export { WorldHeatMap, type GeoPoint, type WorldHeatMapProps } from "./components/charts";
export { YearlyBarChart, type YearlyBarChartProps } from "./components/charts";
export { SecurityInsights, type SecurityInsightsProps, type SecurityAlert, type SecurityAlertSeverity, type SecurityAlertCategory } from "./components/charts";

// Dashboard
export { DashboardGrid, type DashboardGridProps, type Layout, type Layouts } from "./components/dashboard";
export { WidgetShell, type WidgetShellProps } from "./components/dashboard";
export { AddWidgetDialog, type AddWidgetDialogProps, type WidgetOption } from "./components/dashboard";

// Display
export { DataList, type DataListProps } from "./components/display";
export { FieldDisplay, type FieldDisplayProps } from "./components/display";
export { InfoPanel, type InfoPanelProps } from "./components/display";
export { StatusBadge, type StatusBadgeProps } from "./components/display";

// Feedback
export { EmptyState, type EmptyStateProps } from "./components/feedback";
export { ErrorState, type ErrorStateProps } from "./components/feedback";
export { LoadingState, type LoadingStateProps } from "./components/feedback";

// Shared
export { AuthCard, LoginButton, DemoStatusBadge } from "./components/shared";
export { AuthFormCard, AuthFormHeader, AuthFormError, AuthFormField, AuthSubmitButton } from "./components/shared";
export { AuthLayout } from "./components/shared";
export { PageShell } from "./components/shared";
export { SessionDisplay } from "./components/shared";
export { WelcomeBanner, type WelcomeBannerProps } from "./components/shared";
