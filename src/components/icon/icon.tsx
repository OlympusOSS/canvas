"use client";

import type { LucideProps } from "lucide-react";
import {
	// Navigation / Layout
	ArrowLeft,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	LayoutDashboard,
	LayoutGrid,
	Menu,
	MoreVertical,
	PanelLeft,

	// Actions
	Copy,
	Eye,
	EyeOff,
	Link,
	LogOut,
	Pencil,
	Plus,
	RefreshCw,
	RotateCcw,
	Save,
	Search,
	Trash2,
	X,

	// Status / Feedback
	AlertCircle,
	AlertTriangle,
	Ban,
	Check,
	CheckCircle,
	CheckCircle2,
	Clock,
	Heart,
	HeartCrack,
	Info,
	Inbox,
	Loader2,
	ShieldAlert,
	TriangleAlert,
	XCircle,

	// Domain / Entity
	AppWindow,
	BadgeCheck,
	Cloud,
	CloudOff,
	Code,
	FileCode2,
	FileText,
	Globe,
	HeartPulse,
	Key,
	KeyRound,
	Lock,
	Mail,
	MessageSquare,
	Monitor,
	Moon,
	Palette,
	Receipt,
	Server,
	Settings,
	Shapes,
	Shield,
	ShieldCheck,
	Sun,
	User,
	Users,
	Workflow,

	// Data / Charts
	TrendingDown,
	TrendingUp,
} from "lucide-react";

/**
 * Semantic icon names grouped by purpose.
 *
 * Navigation / Layout — controlling where users go
 * Actions            — things users do
 * Status / Feedback  — system state indicators
 * Domain / Entity    — representing concepts and objects
 * Data / Charts      — metrics and trends
 */
const iconMap = {
	// ── Navigation / Layout ──────────────────────────────
	"arrow-left": ArrowLeft,
	"chevron-down": ChevronDown,
	"chevron-left": ChevronLeft,
	"chevron-right": ChevronRight,
	dashboard: LayoutDashboard,
	grid: LayoutGrid,
	menu: Menu,
	"more-vertical": MoreVertical,
	"panel-left": PanelLeft,

	// ── Actions ──────────────────────────────────────────
	copy: Copy,
	close: X,
	delete: Trash2,
	edit: Pencil,
	"eye-off": EyeOff,
	link: Link,
	logout: LogOut,
	add: Plus,
	refresh: RefreshCw,
	reset: RotateCcw,
	save: Save,
	search: Search,
	view: Eye,

	// ── Status / Feedback ────────────────────────────────
	blocked: Ban,
	check: Check,
	danger: AlertTriangle,
	empty: Inbox,
	error: AlertCircle,
	"heart-broken": HeartCrack,
	heart: Heart,
	info: Info,
	loading: Loader2,
	"shield-alert": ShieldAlert,
	success: CheckCircle,
	"success-filled": CheckCircle2,
	time: Clock,
	warning: TriangleAlert,
	"x-circle": XCircle,

	// ── Domain / Entity ──────────────────────────────────
	app: AppWindow,
	cloud: Cloud,
	"cloud-off": CloudOff,
	code: Code,
	"file-code": FileCode2,
	"file-text": FileText,
	globe: Globe,
	health: HeartPulse,
	key: Key,
	"key-round": KeyRound,
	lock: Lock,
	mail: Mail,
	message: MessageSquare,
	monitor: Monitor,
	moon: Moon,
	palette: Palette,
	receipt: Receipt,
	server: Server,
	settings: Settings,
	shapes: Shapes,
	shield: Shield,
	"shield-check": ShieldCheck,
	sun: Sun,
	user: User,
	users: Users,
	verified: BadgeCheck,
	workflow: Workflow,

	// ── Data / Charts ────────────────────────────────────
	"trending-down": TrendingDown,
	"trending-up": TrendingUp,
} as const;

export type IconName = keyof typeof iconMap;

export interface IconProps extends Omit<LucideProps, "ref"> {
	/** Semantic icon name */
	name: IconName;
}

/**
 * Semantic icon component backed by Lucide.
 *
 * Uses domain-meaningful names ("loading", "delete", "users") instead of
 * library-specific names ("Loader2", "Trash2", "Users"), so the icon
 * library can be swapped without touching every consumer.
 *
 * Default size is 16 (inline with text). Override with `size` or className.
 */
export function Icon({ name, size = 16, ...props }: IconProps) {
	const LucideIcon = iconMap[name];
	return <LucideIcon size={size} {...props} />;
}

/** Full list of available icon names (useful for autocomplete / storybook). */
export const iconNames = Object.keys(iconMap) as IconName[];
