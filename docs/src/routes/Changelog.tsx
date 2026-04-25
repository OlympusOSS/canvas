import changelogContent from "../../../CHANGELOG.md?raw";
import { Markdown } from "../components/Markdown";

export function Changelog() {
	return (
		<div className="space-y-6">
			<header className="space-y-2">
				<h1 className="text-3xl font-bold tracking-tight text-foreground">Changelog</h1>
				<p className="max-w-2xl text-muted-foreground">Release history for Canvas.</p>
			</header>
			<Markdown content={changelogContent} />
		</div>
	);
}
