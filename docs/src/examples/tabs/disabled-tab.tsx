import { Tabs, TabsContent, TabsList, TabsTrigger } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Tabs defaultValue="overview" className="w-full max-w-sm">
				<TabsList>
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="reports" disabled>
						Reports (Pro)
					</TabsTrigger>
					<TabsTrigger value="settings">Settings</TabsTrigger>
				</TabsList>
				<TabsContent value="overview" className="rounded-md border border-border p-3 text-sm">
					Overview content.
				</TabsContent>
				<TabsContent value="settings" className="rounded-md border border-border p-3 text-sm">
					Settings content.
				</TabsContent>
			</Tabs>
		</div>
	);
}
