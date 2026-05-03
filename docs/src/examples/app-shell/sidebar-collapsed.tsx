import { AppShell } from "@olympusoss/canvas";
import { useState } from "react";

import { AthenaSidebar } from "./_shared";

export default function App() {
	const [active, setActive] = useState("dashboard");
	return (
		<AppShell
			className="min-h-[420px]"
			defaultSidebarExpanded={false}
			sidebar={({ expanded, setExpanded }) => (
				<AthenaSidebar
					active={active}
					onActiveChange={setActive}
					expanded={expanded}
					onToggle={() => setExpanded(!expanded)}
				/>
			)}
		>
			<div className="p-6 text-sm text-muted-foreground">
				Sidebar starts collapsed (`defaultSidebarExpanded=false`). The collapsed rail shows tooltips
				on icon hover and matches the canvas Sidebar organism's surface tokens (`bg-sidebar`,
				`bg-sidebar-accent`).
			</div>
		</AppShell>
	);
}
