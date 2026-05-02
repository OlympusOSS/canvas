import {
	ActivityFeed,
	ActivityItem,
	AdminShell,
	AppHeader,
	Badge,
	BrandLockup,
	Button,
	Icon,
	Logo,
	NotificationItem,
	NotificationList,
	NumberBadge,
	PageHeader,
	Popover,
	PopoverContent,
	PopoverTrigger,
	SearchBar,
	SectionCard,
	Sparkline,
	StatCard,
	StatusBadge,
	UserAvatarChip,
} from "@olympusoss/canvas";
import { useState } from "react";

const NAV = [
	{ label: "Overview", items: [{ id: "dashboard", label: "Dashboard", icon: "House" as const }] },
	{
		label: "Identity",
		items: [
			{ id: "identities", label: "Identities", icon: "Users" as const },
			{ id: "sessions", label: "Sessions", icon: "Activity" as const },
			{ id: "messages", label: "Messages", icon: "Mail" as const },
			{ id: "schemas", label: "Schemas", icon: "Layers" as const },
			{ id: "social", label: "Social connections", icon: "Globe" as const },
		],
	},
	{
		label: "OAuth2",
		items: [
			{ id: "clients", label: "Clients", icon: "AppWindow" as const },
			{ id: "tokens", label: "Tokens", icon: "Key" as const },
			{ id: "applications", label: "M2M apps", icon: "Shield" as const },
		],
	},
	{
		label: "System",
		items: [
			{ id: "security", label: "Security", icon: "Lock" as const },
			{ id: "settings", label: "Settings", icon: "Settings" as const },
			{ id: "profile", label: "Profile", icon: "User" as const },
		],
	},
];

// Tints follow the prototype's `eventDot` / `eventColor` map — auth uses
// the primary blue, admin a purple, oauth a teal, security a red — to give
// each activity row a glanceable category tag without crowding the layout.
type ActivityKind = "auth" | "admin" | "oauth" | "security";

const KIND_TOKENS: Record<
	ActivityKind,
	{ dot: string; bg: string; icon: "User" | "Shield" | "Key" | "Lock" }
> = {
	auth: {
		dot: "hsl(var(--chart-1))",
		bg: "hsl(var(--chart-1) / 0.18)",
		icon: "User",
	},
	admin: {
		dot: "hsl(271 70% 60%)",
		bg: "hsl(271 70% 60% / 0.18)",
		icon: "Shield",
	},
	oauth: {
		dot: "hsl(var(--chart-6))",
		bg: "hsl(var(--chart-6) / 0.18)",
		icon: "Key",
	},
	security: {
		dot: "hsl(var(--destructive))",
		bg: "hsl(var(--destructive) / 0.18)",
		icon: "Lock",
	},
};

function ActivityKindIcon({ kind }: { kind: ActivityKind }) {
	const t = KIND_TOKENS[kind];
	return (
		<span
			className="inline-flex h-7 w-7 items-center justify-center rounded-md"
			style={{ background: t.bg, color: t.dot }}
			aria-hidden
		>
			<Icon name={t.icon} className="h-3.5 w-3.5" />
		</span>
	);
}

const ACTIVITY: Array<{
	subject: string;
	action: React.ReactNode;
	event: string;
	timestamp: string;
	kind: ActivityKind;
}> = [
	{
		subject: "rachel.chen@gmail.com",
		action: "signed in",
		event: "session.created",
		timestamp: "2 minutes ago",
		kind: "auth",
	},
	{
		subject: "admin@olympus.dev",
		action: "revoked session for grace.hopper@acme.dev",
		event: "session.revoked",
		timestamp: "12 minutes ago",
		kind: "admin",
	},
	{
		subject: "cli_billing_m2m",
		action: "exchanged client credentials",
		event: "token.issued",
		timestamp: "27 minutes ago",
		kind: "oauth",
	},
	{
		subject: "linus.berg@acme.dev",
		action: "completed password reset",
		event: "recovery.completed",
		timestamp: "1 hour ago",
		kind: "auth",
	},
	{
		subject: "kai.tanaka@protonmail.com",
		action: "locked after 12 failed attempts",
		event: "account.locked",
		timestamp: "4 hours ago",
		kind: "security",
	},
];

const HOURLY = Array.from(
	{ length: 24 },
	(_, i) => 30 + Math.round(Math.sin(i / 2) * 25 + ((i * 37) % 20)),
);

function Sidebar({
	active,
	expanded,
	onToggle,
}: {
	active: string;
	expanded: boolean;
	onToggle?: () => void;
}) {
	return (
		<aside
			className="flex h-full flex-col border-r border-sidebar-border bg-sidebar"
			style={{ width: expanded ? 240 : 56 }}
		>
			<div className="flex h-14 items-center justify-between border-b border-sidebar-border px-4">
				<BrandLockup
					logo={<Logo className={expanded ? "h-7 w-auto" : "h-5 w-auto"} />}
					productName="Athena"
					size={expanded ? "md" : "sm"}
					collapsed={!expanded}
				/>
				{expanded && onToggle && (
					<button
						type="button"
						onClick={onToggle}
						aria-label="Collapse sidebar"
						className="inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
					>
						<Icon name="ChevronLeft" className="h-3.5 w-3.5" />
					</button>
				)}
			</div>
			<nav className="flex-1 overflow-y-auto p-2">
				{NAV.map((group) => (
					<div key={group.label} className="mb-3">
						{expanded && (
							<div className="px-2 pb-1.5 text-[11px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
								{group.label}
							</div>
						)}
						{group.items.map((item) => {
							const isActive = item.id === active;
							return (
								<button
									key={item.id}
									type="button"
									className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] transition-colors ${
										isActive
											? "bg-sidebar-accent text-sidebar-accent-foreground"
											: "text-sidebar-foreground opacity-75 hover:opacity-100"
									}`}
								>
									<Icon name={item.icon} className="h-4 w-4 shrink-0" />
									{expanded && <span>{item.label}</span>}
								</button>
							);
						})}
					</div>
				))}
			</nav>
			{!expanded && onToggle && (
				<div className="border-t border-sidebar-border p-2">
					<button
						type="button"
						onClick={onToggle}
						aria-label="Expand sidebar"
						className="inline-flex h-8 w-full items-center justify-center rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
					>
						<Icon name="ChevronRight" className="h-3.5 w-3.5" />
					</button>
				</div>
			)}
		</aside>
	);
}

function NotificationsBell() {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<div className="relative inline-flex">
					<Button variant="ghost" size="icon" aria-label="Notifications">
						<Icon name="Bell" />
					</Button>
					<NumberBadge count={3} />
				</div>
			</PopoverTrigger>
			<PopoverContent className="w-auto border-0 bg-transparent p-0 shadow-none" align="end">
				<NotificationList
					title="Notifications"
					count="3 new"
					footer={
						<button type="button" className="hover:underline">
							View security activity
						</button>
					}
				>
					<NotificationItem
						icon={<Icon name="Lock" className="h-4 w-4" />}
						iconTone="destructive"
						title="Account locked out"
						description="kai.tanaka@protonmail.com · 12 failed attempts"
						timestamp="2m ago"
						onClick={() => {}}
					/>
					<NotificationItem
						icon={<Icon name="Lock" className="h-4 w-4" />}
						iconTone="destructive"
						title="Account locked out"
						description="tomas.morris@outlook.com · 8 failed attempts"
						timestamp="14m ago"
						onClick={() => {}}
					/>
					<NotificationItem
						icon={<Icon name="Info" className="h-4 w-4" />}
						iconTone="info"
						title="Hydra v2.2.3 released"
						description="Routine upgrade available for the auth fleet"
						timestamp="6h ago"
						onClick={() => {}}
					/>
				</NotificationList>
			</PopoverContent>
		</Popover>
	);
}

function TopBar() {
	const [q, setQ] = useState("");
	const [dark, setDark] = useState(true);
	return (
		<AppHeader
			search={
				<SearchBar
					value={q}
					onChange={setQ}
					placeholder="Search identities, sessions, clients…"
					shortcut="⌘K"
				/>
			}
			actions={
				<>
					<Button
						variant="ghost"
						size="icon"
						aria-label="Toggle theme"
						onClick={() => setDark((v) => !v)}
					>
						<Icon name={dark ? "Sun" : "Moon"} />
					</Button>
					<NotificationsBell />
				</>
			}
			user={<UserAvatarChip name="admin@olympus.dev" fallback="AO" />}
		/>
	);
}

export default function App() {
	return (
		<AdminShell
			className="min-h-[640px]"
			sidebar={({ expanded }) => <Sidebar active="dashboard" expanded={expanded} />}
			header={<TopBar />}
		>
			<PageHeader
				title="Dashboard"
				subtitle="Overview of your identity platform"
				actions={
					<Button variant="outline" size="sm">
						<Icon name="ChartLine" />
						View metrics
					</Button>
				}
			/>

			<div className="mb-5 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
				<StatCard
					title="Active identities"
					value="12,348"
					icon={<Icon name="Users" />}
					colorVariant="blue"
					delta="+142 today"
					deltaTone="up"
				/>
				<StatCard
					title="Active sessions"
					value="1,204"
					icon={<Icon name="Shield" />}
					colorVariant="success"
					delta="+8%"
					deltaTone="up"
					deltaCaption="vs yesterday"
				/>
				<StatCard
					title="OAuth2 clients"
					value="38"
					icon={<Icon name="AppWindow" />}
					colorVariant="purple"
					delta="6 M2M · 32 user"
					deltaTone="neutral"
				/>
				<StatCard
					title="Locked accounts"
					value="6"
					icon={<Icon name="Lock" />}
					colorVariant="destructive"
					delta="2"
					deltaTone="down"
					deltaCaption="since 1h ago"
				/>
			</div>

			<div className="grid gap-4 [grid-template-columns:minmax(0,2fr)_minmax(0,1fr)]">
				<SectionCard
					title="Recent activity"
					icon={<Icon name="Activity" className="h-4 w-4" />}
					actions={
						<Button variant="ghost" size="sm">
							View all
						</Button>
					}
				>
					<ActivityFeed>
						{ACTIVITY.map((entry, i) => (
							<ActivityItem
								key={entry.subject + entry.event}
								index={i}
								leading={<ActivityKindIcon kind={entry.kind} />}
								subject={entry.subject}
								action={
									<>
										{entry.action}{" "}
										<code className="ml-0.5 rounded bg-muted/60 px-1 py-px font-mono text-[10.5px] text-muted-foreground">
											{entry.event}
										</code>
									</>
								}
								timestamp={entry.timestamp}
							/>
						))}
					</ActivityFeed>
				</SectionCard>

				<SectionCard
					title="Sign-ins (24h)"
					icon={<Icon name="ChartLine" className="h-4 w-4" />}
					actions={<span className="font-mono text-[11px] text-muted-foreground">887 total</span>}
				>
					<Sparkline
						data={HOURLY}
						height={140}
						caption="Hourly login attempts. Connect Grafana for live data."
					/>
				</SectionCard>
			</div>

			<div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
				Status legend:
				<StatusBadge status="success">Active</StatusBadge>
				<StatusBadge status="neutral">Inactive</StatusBadge>
				<Badge variant="secondary">employee</Badge>
				<Badge variant="secondary">customer</Badge>
			</div>
		</AdminShell>
	);
}
