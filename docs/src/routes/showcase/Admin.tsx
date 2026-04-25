import {
	Avatar,
	AvatarFallback,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Icon,
	OlympusLogo,
	PageHeader,
	StatCard,
} from "@olympusoss/canvas";

const NAV_ITEMS = [
	{ label: "Dashboard", icon: "LayoutDashboard" as const, active: true },
	{ label: "Identities", icon: "Users" as const },
	{ label: "Sessions", icon: "Shield" as const },
	{ label: "Messages", icon: "Mail" as const },
	{ label: "Schemas", icon: "FileText" as const },
	{ label: "Clients", icon: "AppWindow" as const },
	{ label: "Tokens", icon: "KeyRound" as const },
	{ label: "Security", icon: "Lock" as const },
];

const RECENT_ACTIVITY = [
	{ id: "1", subject: "ada@olympus.dev", action: "signed in", timestamp: "2 minutes ago" },
	{
		id: "2",
		subject: "Athena admin",
		action: "revoked session for grace@olympus.dev",
		timestamp: "12 minutes ago",
	},
	{
		id: "3",
		subject: "M2M client billing-svc",
		action: "exchanged client credentials",
		timestamp: "27 minutes ago",
	},
	{
		id: "4",
		subject: "linus@olympus.dev",
		action: "completed password reset",
		timestamp: "1 hour ago",
	},
	{
		id: "5",
		subject: "OAuth2 client athena-admin",
		action: "rotated client_secret",
		timestamp: "3 hours ago",
	},
];

export function ShowcaseAdmin() {
	return (
		<div className="space-y-6">
			<header className="space-y-2">
				<p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
					athena
				</p>
				<h1 className="text-3xl font-bold tracking-tight text-foreground">Admin dashboard</h1>
				<p className="max-w-2xl text-muted-foreground">
					Sidebar + Header + DataTable + StatCard composing a Kratos / Hydra admin console. The demo
					sidebar and content below are Canvas primitives only.
				</p>
				<a
					href="https://github.com/OlympusOSS/athena"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-1.5 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
				>
					<Icon name="Code" className="h-3.5 w-3.5" />
					OlympusOSS/athena
				</a>
			</header>

			<div className="overflow-hidden rounded-2xl border border-border bg-background">
				<div className="flex h-[640px]">
					{/* Sidebar */}
					<aside className="hidden w-56 shrink-0 flex-col border-r border-border bg-card/50 md:flex">
						<div className="flex h-14 items-center gap-2 border-b border-border px-4">
							<OlympusLogo variant="icon" className="h-6 w-6" />
							<div className="flex flex-col leading-tight">
								<span className="text-sm font-semibold">Olympus</span>
								<span className="text-[10px] text-muted-foreground">Admin</span>
							</div>
						</div>
						<nav className="flex-1 space-y-0.5 p-2">
							{NAV_ITEMS.map((item) => (
								<button
									key={item.label}
									type="button"
									className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
										item.active
											? "bg-accent text-accent-foreground"
											: "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
									}`}
								>
									<Icon name={item.icon} className="h-4 w-4" />
									{item.label}
								</button>
							))}
						</nav>
					</aside>

					{/* Main */}
					<div className="flex flex-1 flex-col overflow-hidden">
						<header className="flex h-14 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur">
							<span className="text-sm font-medium text-foreground">Dashboard</span>
							<div className="flex items-center gap-2">
								<Button variant="ghost" size="icon" aria-label="Search">
									<Icon name="Search" className="h-4 w-4" />
								</Button>
								<Button variant="ghost" size="icon" aria-label="Notifications">
									<Icon name="Bell" className="h-4 w-4" />
								</Button>
								<Avatar className="h-7 w-7">
									<AvatarFallback className="text-xs">A</AvatarFallback>
								</Avatar>
							</div>
						</header>
						<div className="flex-1 overflow-y-auto p-6">
							<div className="space-y-6">
								<PageHeader title="Dashboard" subtitle="Overview of your identity platform" />
								<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
									<StatCard
										title="Active identities"
										value="12,348"
										icon={<Icon name="Users" className="h-5 w-5" />}
										colorVariant="blue"
									/>
									<StatCard
										title="Active sessions"
										value="1,204"
										icon={<Icon name="Shield" className="h-5 w-5" />}
										colorVariant="success"
									/>
									<StatCard
										title="OAuth2 clients"
										value="38"
										icon={<Icon name="AppWindow" className="h-5 w-5" />}
										colorVariant="purple"
									/>
									<StatCard
										title="Locked accounts"
										value="6"
										icon={<Icon name="Lock" className="h-5 w-5" />}
										colorVariant="destructive"
									/>
								</div>
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2 text-base">
											<Icon name="Activity" className="h-4 w-4" />
											Recent activity
										</CardTitle>
									</CardHeader>
									<CardContent>
										<ul className="divide-y divide-border">
											{RECENT_ACTIVITY.map((entry) => (
												<li
													key={entry.id}
													className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0"
												>
													<div className="min-w-0">
														<p className="truncate text-sm">
															<span className="font-medium">{entry.subject}</span>{" "}
															<span className="text-muted-foreground">{entry.action}</span>
														</p>
													</div>
													<span className="shrink-0 text-xs text-muted-foreground">
														{entry.timestamp}
													</span>
												</li>
											))}
										</ul>
									</CardContent>
								</Card>
							</div>
						</div>
					</div>
				</div>
			</div>

			<aside className="rounded-lg border border-border bg-card/30 p-4">
				<h3 className="text-sm font-semibold text-foreground">Components used</h3>
				<div className="mt-2 flex flex-wrap gap-2 font-mono text-xs">
					{[
						"OlympusLogo",
						"PageHeader",
						"StatCard",
						"Card",
						"Avatar",
						"Button",
						"Icon",
						"Badge",
					].map((c) => (
						<span
							key={c}
							className="rounded-md border border-border bg-background px-2 py-0.5 text-muted-foreground"
						>
							{c}
						</span>
					))}
				</div>
				<p className="mt-3 text-xs text-muted-foreground">
					In production, athena uses the canvas <code className="font-mono">Sidebar</code> organism
					+ the <code className="font-mono">DataTable</code> for identities/sessions/clients
					screens. This demo uses a simplified static sidebar to keep the page self-contained.
				</p>
			</aside>
		</div>
	);
}
