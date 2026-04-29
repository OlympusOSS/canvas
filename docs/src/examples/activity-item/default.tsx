import { ActivityFeed, ActivityItem } from "@olympusoss/canvas";

const ACTIVITY = [
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
		<div className="flex min-h-[280px] items-start justify-center p-8">
			<div className="w-full max-w-md rounded-xl border border-border bg-card px-5 py-4">
				<ActivityFeed>
					{ACTIVITY.map((entry, i) => (
						<ActivityItem
							key={entry.subject + entry.action}
							index={i}
							subject={entry.subject}
							action={entry.action}
							timestamp={entry.timestamp}
						/>
					))}
				</ActivityFeed>
			</div>
		</div>
	);
}
