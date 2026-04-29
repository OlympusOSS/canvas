import {
	ActivityFeed,
	ActivityItem,
	AdminShell,
	AppHeader,
	Badge,
	BrandLockup,
	Button,
	Icon,
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

const ACTIVITY = [
	{ subject: "ada@olympus.dev", action: "signed in", timestamp: "2 minutes ago" },
	{
		subject: "Athena admin",
		action: "revoked session for grace@olympus.dev",
		timestamp: "12 minutes ago",
	},
	{
		subject: "M2M client billing-svc",
		action: "exchanged client credentials",
		timestamp: "27 minutes ago",
	},
	{
		subject: "linus@olympus.dev",
		action: "completed password reset",
		timestamp: "1 hour ago",
	},
	{
		subject: "OAuth2 client athena-admin",
		action: "rotated client_secret",
		timestamp: "3 hours ago",
	},
];

const HOURLY = Array.from(
	{ length: 24 },
	(_, i) => 30 + Math.round(Math.sin(i / 2) * 25 + ((i * 37) % 20)),
);

function Sidebar({ active, expanded }: { active: string; expanded: boolean }) {
	return (
		<aside
			className="flex h-full flex-col border-r border-sidebar-border bg-sidebar"
			style={{ width: expanded ? 240 : 56 }}
		>
			<div className="flex h-14 items-center border-b border-sidebar-border px-4">
				<BrandLockup productName="Athena" size={expanded ? "md" : "sm"} collapsed={!expanded} />
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
						timestamp="366d ago"
						onClick={() => {}}
					/>
					<NotificationItem
						icon={<Icon name="Lock" className="h-4 w-4" />}
						iconTone="destructive"
						title="Account locked out"
						description="tomas.morris@outlook.com · 8 failed attempts"
						timestamp="366d ago"
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
					<Button variant="ghost" size="icon" aria-label="Toggle theme">
						<Icon name="Moon" />
					</Button>
					<NotificationsBell />
				</>
			}
			user={<UserAvatarChip name="admin@olympus.dev" />}
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
								key={entry.subject + entry.action}
								index={i}
								subject={entry.subject}
								action={entry.action}
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
