import { AdminShell, Icon } from "@olympusoss/canvas";

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
			defaultSidebarExpanded={false}
			sidebar={({ expanded }) => (
				<aside
					className={`flex h-full flex-col border-r border-border bg-card/30 transition-all ${expanded ? "w-60" : "w-14"}`}
				>
					<nav className="flex flex-col gap-1 px-2 py-3">
						{MENU.map((item) => (
							<button
								key={item.label}
								type="button"
								className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent/50"
							>
								<Icon name={item.icon} />
								{expanded && <span>{item.label}</span>}
							</button>
						))}
					</nav>
				</aside>
			)}
		>
			<div className="p-6 text-sm text-muted-foreground">
				Sidebar starts collapsed (`defaultSidebarExpanded=false`).
			</div>
		</AdminShell>
	);
}
