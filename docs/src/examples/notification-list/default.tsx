import { Icon, NotificationItem, NotificationList } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[400px] items-center justify-center p-8">
			<NotificationList
				title="Notifications"
				count="3 new"
				footer={<button type="button">View security activity</button>}
			>
				<NotificationItem
					icon={<Icon name="Lock" className="h-4 w-4" />}
					iconTone="destructive"
					title="Account locked out"
					description="kai.tanaka@protonmail.com · 12 failed attempts"
					timestamp="366d ago"
					onClick={() => {}}
				/>
				<NotificationItem
					icon={<Icon name="Lock" className="h-4 w-4" />}
					iconTone="destructive"
					title="Account locked out"
					description="tomas.morris@outlook.com · 8 failed attempts"
					timestamp="366d ago"
					onClick={() => {}}
				/>
				<NotificationItem
					icon={<Icon name="Info" className="h-4 w-4" />}
					iconTone="info"
					title="Hydra v2.2.3 released"
					description="Routine upgrade available for the auth fleet"
					timestamp="6h ago"
					onClick={() => {}}
				/>
			</NotificationList>
		</div>
	);
}
