import { Icon, NotificationItem } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[160px] items-center justify-center p-8">
			<div className="w-full max-w-sm divide-y divide-border rounded-xl border border-border bg-card">
				<NotificationItem
					icon={<Icon name="CircleCheck" className="h-4 w-4" />}
					iconTone="success"
					title="Migration complete"
					description="All 12,348 identities migrated to schema v2"
				/>
				<NotificationItem
					icon={<Icon name="Server" className="h-4 w-4" />}
					iconTone="info"
					title="Hydra v2.2.3 deployed"
				/>
			</div>
		</div>
	);
}
