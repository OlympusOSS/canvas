import { ActivityFeed, ActivityItem, Avatar, AvatarFallback } from "@olympusoss/canvas";

const ACTIVITY = [
	{ subject: "Ada Olympus", action: "signed in", timestamp: "2m ago", initials: "AO" },
	{
		subject: "Bobby Nannier",
		action: "approved schema change",
		timestamp: "1h ago",
		initials: "BN",
	},
	{
		subject: "Linus Park",
		action: "completed password reset",
		timestamp: "3h ago",
		initials: "LP",
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
							leading={
								<Avatar className="h-7 w-7">
									<AvatarFallback className="text-[11px] font-semibold">
										{entry.initials}
									</AvatarFallback>
								</Avatar>
							}
						/>
					))}
				</ActivityFeed>
			</div>
		</div>
	);
}
