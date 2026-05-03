import {
	AppHeader,
	Button,
	Icon,
	NumberBadge,
	SearchBar,
	UserAvatarChip,
} from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [q, setQ] = useState("");
	return (
		<div className="min-h-[200px] rounded-xl border border-border bg-background">
			<AppHeader
				mobileMenuTrigger={
					<Button variant="ghost" size="icon" aria-label="Open menu">
						<Icon name="Menu" />
					</Button>
				}
				search={<SearchBar value={q} onChange={setQ} placeholder="Search…" shortcut="⌘K" />}
				actions={
					<div className="relative">
						<Button variant="ghost" size="icon" aria-label="Notifications">
							<Icon name="Bell" />
						</Button>
						<NumberBadge count={3} />
					</div>
				}
				user={<UserAvatarChip name="AO" collapsed />}
			/>
			<div className="p-6 text-sm text-muted-foreground">
				The hamburger renders only on viewports below `md`. Connect it to AppShell's
				`onMobileMenuToggle`.
			</div>
		</div>
	);
}
