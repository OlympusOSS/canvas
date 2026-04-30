import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<ResizablePanelGroup
				orientation="horizontal"
				className="h-32 max-w-md rounded-lg border border-border"
			>
				<ResizablePanel className="grid place-content-center text-sm">Left</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel className="grid place-content-center text-sm">Right</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
