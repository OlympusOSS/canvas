import { NotificationList } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<NotificationList title="Notifications">
				<div className="flex flex-col items-center justify-center gap-1 px-3 py-8 text-center">
					<p className="text-[13px] font-medium text-foreground">You're all caught up</p>
					<p className="text-[12px] text-muted-foreground">No new alerts in the last 7 days.</p>
				</div>
			</NotificationList>
		</div>
	);
}
