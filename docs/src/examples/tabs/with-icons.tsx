import { Icon, Tabs, TabsContent, TabsList, TabsTrigger } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Tabs defaultValue="profile" className="w-full max-w-md">
				<TabsList>
					<TabsTrigger value="profile">
						<Icon name="User" /> Profile
					</TabsTrigger>
					<TabsTrigger value="notifications">
						<Icon name="Bell" /> Notifications
					</TabsTrigger>
					<TabsTrigger value="security">
						<Icon name="Shield" /> Security
					</TabsTrigger>
				</TabsList>
				<TabsContent value="profile" className="rounded-md border border-border p-3 text-sm">
					Profile settings.
				</TabsContent>
				<TabsContent value="notifications" className="rounded-md border border-border p-3 text-sm">
					Notification preferences.
				</TabsContent>
				<TabsContent value="security" className="rounded-md border border-border p-3 text-sm">
					Security settings.
				</TabsContent>
			</Tabs>
		</div>
	);
}
