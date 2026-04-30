import { Tabs, TabsContent, TabsList, TabsTrigger } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="grid gap-6 md:grid-cols-2">
				<div>
					<p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
						horizontal (default)
					</p>
					<Tabs defaultValue="a" orientation="horizontal">
						<TabsList>
							<TabsTrigger value="a">A</TabsTrigger>
							<TabsTrigger value="b">B</TabsTrigger>
						</TabsList>
						<TabsContent value="a" className="rounded-md border border-border p-3 text-sm">
							Content A
						</TabsContent>
						<TabsContent value="b" className="rounded-md border border-border p-3 text-sm">
							Content B
						</TabsContent>
					</Tabs>
				</div>
				<div>
					<p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
						vertical
					</p>
					<Tabs defaultValue="a" orientation="vertical" className="flex gap-3">
						<TabsList className="h-auto flex-col">
							<TabsTrigger value="a">A</TabsTrigger>
							<TabsTrigger value="b">B</TabsTrigger>
						</TabsList>
						<div className="flex-1">
							<TabsContent value="a" className="rounded-md border border-border p-3 text-sm">
								Content A
							</TabsContent>
							<TabsContent value="b" className="rounded-md border border-border p-3 text-sm">
								Content B
							</TabsContent>
						</div>
					</Tabs>
				</div>
			</div>
		</div>
	);
}
