import { Icon } from "@olympusoss/canvas";

interface EditOnGitHubProps {
	/** Path under canvas/ on github (e.g. `docs/src/routes/Tokens.tsx`). */
	path: string;
}

const REPO_BLOB = "https://github.com/OlympusOSS/canvas/edit/main";

export function EditOnGitHub({ path }: EditOnGitHubProps) {
	return (
		<a
			href={`${REPO_BLOB}/${path}`}
			target="_blank"
			rel="noopener noreferrer"
			className="inline-flex items-center gap-1.5 text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
		>
			<Icon name="Pencil" className="h-3 w-3" />
			Edit this page on GitHub
		</a>
	);
}
