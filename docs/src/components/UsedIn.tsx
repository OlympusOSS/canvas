import { Icon } from "@olympusoss/canvas";
import usedInData from "../data/used-in.json";

interface Usage {
	repo: string;
	path: string;
	line: number;
	url: string;
}

interface UsedInData {
	generatedAt: string;
	repos: string[];
	usagesByName: Record<string, Usage[]>;
}

const DATA = usedInData as UsedInData;

const REPO_COLOR: Record<string, string> = {
	hera: "bg-blue-500/10 text-blue-500",
	athena: "bg-purple-500/10 text-purple-500",
	site: "bg-green-500/10 text-green-500",
};

interface UsedInProps {
	displayName: string;
}

export function UsedIn({ displayName }: UsedInProps) {
	const usages = DATA.usagesByName[displayName] ?? [];
	if (usages.length === 0) return null;

	const byRepo: Record<string, Usage[]> = {};
	for (const u of usages) {
		if (!byRepo[u.repo]) byRepo[u.repo] = [];
		byRepo[u.repo].push(u);
	}

	return (
		<section className="space-y-3">
			<div>
				<h2 className="text-2xl font-semibold tracking-tight text-foreground">Used in</h2>
				<p className="text-sm text-muted-foreground">
					{usages.length} call site{usages.length === 1 ? "" : "s"} across{" "}
					{Object.keys(byRepo).length} sibling {Object.keys(byRepo).length === 1 ? "repo" : "repos"}
					.
				</p>
			</div>
			<div className="space-y-3">
				{Object.entries(byRepo).map(([repo, list]) => (
					<div key={repo} className="space-y-1.5">
						<span
							className={`inline-flex items-center rounded-md px-2 py-0.5 font-mono text-xs font-medium ${
								REPO_COLOR[repo] ?? "bg-muted text-muted-foreground"
							}`}
						>
							{repo}
						</span>
						<ul className="space-y-1">
							{list.slice(0, 8).map((u) => (
								<li key={`${u.path}-${u.line}`}>
									<a
										href={u.url}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground"
									>
										<Icon name="ExternalLink" className="h-3 w-3" />
										<code>
											{u.path}:{u.line}
										</code>
									</a>
								</li>
							))}
							{list.length > 8 && (
								<li className="font-mono text-xs text-muted-foreground/60">
									… and {list.length - 8} more
								</li>
							)}
						</ul>
					</div>
				))}
			</div>
		</section>
	);
}
