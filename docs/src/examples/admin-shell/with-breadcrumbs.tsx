import { AdminShell, Button, Icon, PageHeader } from "@olympusoss/canvas";
import { useState } from "react";

import { AthenaSidebar } from "./_shared";

export default function App() {
	const [active, setActive] = useState("settings");
	return (
		<AdminShell
			className="min-h-[420px]"
			sidebar={({ expanded, setExpanded }) => (
				<AthenaSidebar
					active={active}
					onActiveChange={setActive}
					expanded={expanded}
					onToggle={() => setExpanded(!expanded)}
				/>
			)}
		>
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
		</AdminShell>
	);
}
