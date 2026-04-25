import migrationContent from "../../../MIGRATION.md?raw";
import { Markdown } from "../components/Markdown";

export function Migration() {
	return (
		<div className="space-y-6">
			<header className="space-y-2">
				<h1 className="text-3xl font-bold tracking-tight text-foreground">Migration</h1>
				<p className="max-w-2xl text-muted-foreground">
					Upgrade guides for consumers of <code className="font-mono">@olympusoss/canvas</code>.
				</p>
			</header>
			<Markdown content={migrationContent} />
		</div>
	);
}
