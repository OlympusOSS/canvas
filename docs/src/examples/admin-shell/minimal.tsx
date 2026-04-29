import { AdminShell, Icon, PageHeader } from "@olympusoss/canvas";

const MENU = [
	{ label: "Dashboard", icon: "LayoutDashboard" as const },
	{ label: "Users", icon: "Users" as const },
	{ label: "Billing", icon: "CreditCard" as const },
	{ label: "Settings", icon: "Settings" as const },
];

export default function App() {
	return (
		<AdminShell
			className="min-h-[420px]"
			sidebar={
				<aside className="flex h-full w-60 flex-col border-r border-border bg-card/30">
					<div className="px-4 py-3 text-sm font-semibold text-foreground">Acme Inc.</div>
					<nav className="flex flex-col gap-1 px-2 py-2">
						{MENU.map((item, i) => (
							<button
								key={item.label}
								type="button"
								className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${i === 0 ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/50"}`}
							>
								<Icon name={item.icon} />
								{item.label}
							</button>
						))}
					</nav>
				</aside>
			}
		>
			<div className="space-y-4 p-6">
				<PageHeader title="Dashboard" subtitle="Overview of your workspace activity." />
				<div className="grid grid-cols-3 gap-3">
					{[1, 2, 3].map((n) => (
						<div key={n} className="h-20 rounded-md border border-border bg-card/30" />
					))}
				</div>
			</div>
		</AdminShell>
	);
}
