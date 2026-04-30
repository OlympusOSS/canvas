import { Tabs, TabsContent, TabsList, TabsTrigger } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Tabs defaultValue="account" className="w-full max-w-sm">
				<TabsList>
					<TabsTrigger value="account">Account</TabsTrigger>
					<TabsTrigger value="password">Password</TabsTrigger>
				</TabsList>
				<TabsContent
					value="account"
					className="rounded-md border border-border p-4 text-sm text-muted-foreground"
				>
					Update your account settings here.
				</TabsContent>
				<TabsContent
					value="password"
					className="rounded-md border border-border p-4 text-sm text-muted-foreground"
				>
					Change your password here.
				</TabsContent>
			</Tabs>
		</div>
	);
}
