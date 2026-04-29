import { Avatar, AvatarFallback, NotificationItem } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="w-full max-w-sm divide-y divide-border rounded-xl border border-border bg-card">
				<NotificationItem
					icon={
						<Avatar className="h-8 w-8">
							<AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-500 text-[11px] font-semibold text-white">
								AO
							</AvatarFallback>
						</Avatar>
					}
					title="Ada Olympus"
					description="commented on identity #01HZ7K"
					timestamp="3 minutes ago"
				/>
				<NotificationItem
					icon={
						<Avatar className="h-8 w-8">
							<AvatarFallback className="bg-gradient-to-br from-amber-500 to-rose-500 text-[11px] font-semibold text-white">
								BN
							</AvatarFallback>
						</Avatar>
					}
					title="Bobby Nannier"
					description="approved schema change"
					timestamp="1 hour ago"
				/>
			</div>
		</div>
	);
}
