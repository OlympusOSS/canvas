/**
 * React Native entry point.
 *
 * Currently exports only platform-agnostic tokens and types.
 * When an RN app is built, add .native.tsx component implementations
 * alongside the web components and export them here.
 */

// Design tokens (shared with web)
export { colors, hslToString, hslToVar } from "./tokens/colors";
export { spacing, radius, defaultRadius } from "./tokens/spacing";
export { fontFamily, fontSize, fontWeight } from "./tokens/typography";

// Types only (no DOM dependencies)
export type { IconName, IconProps } from "./components/ui/icon";
export type { ButtonProps } from "./components/ui/button";
export type { DataTableColumn, DataTableProps } from "./components/ui/data-table";
export type { CodeBlockProps } from "./components/ui/code-block";
export type { EmptyStateProps } from "./components/ui/empty-state";
export type { ErrorStateProps } from "./components/ui/error-state";
export type { FieldDisplayProps } from "./components/ui/field-display";
export type { LoadingStateProps } from "./components/ui/loading-state";
export type { SearchBarProps } from "./components/ui/search-bar";
export type { StatusBadgeProps } from "./components/ui/status-badge";
export type { AuthLayoutProps } from "./components/shared/auth/auth-layout";
