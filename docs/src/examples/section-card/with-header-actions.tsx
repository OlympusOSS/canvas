import { Button, Icon, SectionCard } from "@olympusoss/canvas";

const RECENT_ACTIVITY = [
	{ subject: "ada@olympus.dev", action: "signed in", timestamp: "2 minutes ago" },
	{
		subject: "Athena admin",
		action: "revoked session for grace@olympus.dev",
		timestamp: "12 minutes ago",
	},
	{
		subject: "M2M client billing-svc",
		action: "exchanged client credentials",
		timestamp: "27 minutes ago",
	},
	{
		subject: "linus@olympus.dev",
		action: "completed password reset",
		timestamp: "1 hour ago",
	},
];

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<SectionCard
				title="Recent activity"
				icon={<Icon name="Activity" className="h-4 w-4 text-muted-foreground" />}
				actions={
					<Button variant="ghost" size="sm">
						View all
					</Button>
				}
				className="w-full max-w-md"
			>
				<ul className="m-0 list-none p-0">
					{RECENT_ACTIVITY.map((entry, i) => (
						<li
							key={entry.subject + entry.action}
							className={`flex items-start justify-between gap-4 py-3 ${
								i === 0 ? "" : "border-t border-border"
							}`}
						>
							<p className="m-0 text-[13.5px]">
								<span className="font-medium text-foreground">{entry.subject}</span>{" "}
								<span className="text-muted-foreground">{entry.action}</span>
							</p>
							<span className="shrink-0 text-xs text-muted-foreground">{entry.timestamp}</span>
						</li>
					))}
				</ul>
			</SectionCard>
		</div>
	);
}
