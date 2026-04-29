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
						<div className="relative">
							<Button variant="ghost" size="icon" aria-label="Notifications">
								<Icon name="Bell" />
							</Button>
							<NumberBadge count={3} />
						</div>
					</>
				}
				user={<UserAvatarChip name="admin@olympus.dev" />}
			/>
			<div className="p-6 text-sm text-muted-foreground">Page content goes here.</div>
		</div>
	);
}
