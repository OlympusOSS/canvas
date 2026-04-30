import { AdminShell, Button, Icon, PageHeader } from "@olympusoss/canvas";

export default function App() {
	return (
		<AdminShell
			className="min-h-[420px]"
			sidebar={
				<aside className="flex h-full w-56 flex-col border-r border-border bg-card/30 px-3 py-3 text-sm">
					<p className="font-semibold">Workspace</p>
					<p className="mt-2 text-muted-foreground">Settings</p>
				</aside>
			}
		>
			<div className="p-6 space-y-3">
				<PageHeader
					breadcrumbs={[
						{ label: "Settings", href: "#" },
						{ label: "Workspace", href: "#" },
						{ label: "Members" },
					]}
					title="Workspace members"
					subtitle="Invite teammates and manage their roles."
					actions={
						<Button size="sm">
							<Icon name="Plus" />
							Invite member
						</Button>
					}
				/>
			</div>
		</AdminShell>
	);
}
