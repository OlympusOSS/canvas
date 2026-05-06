import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[280px] items-center justify-center p-8">
			<div className="grid w-full gap-4 md:grid-cols-2">
				<ResizablePanelGroup
					orientation="horizontal"
					className="h-48 rounded-lg border border-border"
				>
					<ResizablePanel className="grid place-content-center text-sm">A</ResizablePanel>
					<ResizableHandle />
					<ResizablePanel className="grid place-content-center text-sm">B</ResizablePanel>
				</ResizablePanelGroup>
				<ResizablePanelGroup
					orientation="vertical"
					className="h-48 rounded-lg border border-border"
				>
					<ResizablePanel className="grid place-content-center text-sm">Top</ResizablePanel>
					<ResizableHandle />
					<ResizablePanel className="grid place-content-center text-sm">Bottom</ResizablePanel>
				</ResizablePanelGroup>
			</div>
		</div>
	);
}
