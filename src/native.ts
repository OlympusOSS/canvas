/**
 * React Native entry point.
 *
 * Currently exports only platform-agnostic tokens and types.
 * When an RN app is built, add .native.tsx component implementations
 * alongside the web components and export them here.
 */

export type { ButtonProps } from "./components/atoms/button";
// Types only (no DOM dependencies)
export type { IconName, IconProps } from "./components/atoms/icon";
export type { CodeBlockProps } from "./components/molecules/code-block";
export type { EmptyStateProps } from "./components/molecules/empty-state";
export type { ErrorStateProps } from "./components/molecules/error-state";
export type { FieldDisplayProps } from "./components/molecules/field-display";
export type { LoadingStateProps } from "./components/molecules/loading-state";
export type { SearchBarProps } from "./components/molecules/search-bar";
export type { StatusBadgeProps } from "./components/molecules/status-badge";
export type { DataTableColumn, DataTableProps } from "./components/organisms/data-table";
// Design tokens (shared with web)
export { colors, hslToString, hslToVar } from "./tokens/colors";
export { defaultRadius, radius, spacing } from "./tokens/spacing";
export { fontFamily, fontSize, fontWeight } from "./tokens/typography";
