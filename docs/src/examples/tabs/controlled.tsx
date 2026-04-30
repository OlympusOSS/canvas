import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [tab, setTab] = useState("a");
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="w-full max-w-sm space-y-3">
				<div className="flex gap-2">
					<Button
						size="sm"
						onClick={() => setTab("a")}
						variant={tab === "a" ? "default" : "outline"}
					>
						External A
					</Button>
					<Button
						size="sm"
						onClick={() => setTab("b")}
						variant={tab === "b" ? "default" : "outline"}
					>
						External B
					</Button>
				</div>
				<Tabs value={tab} onValueChange={setTab}>
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
		</div>
	);
}
