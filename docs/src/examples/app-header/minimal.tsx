import { AppHeader, UserAvatarChip } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="min-h-[160px] rounded-xl border border-border bg-background">
			<AppHeader user={<UserAvatarChip name="admin@olympus.dev" />} />
			<div className="p-6 text-sm text-muted-foreground">
				Minimal — only the user chip, no search or actions.
			</div>
		</div>
	);
}
