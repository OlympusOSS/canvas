import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@olympusoss/canvas";

export default function App() {
	return (
		<ResizablePanelGroup
			orientation="horizontal"
			className="h-32 max-w-md rounded-lg border border-border"
		>
			<ResizablePanel defaultSize={50} className="grid place-content-center text-sm">
				One
			</ResizablePanel>
			<ResizableHandle />
			<ResizablePanel defaultSize={50} className="grid place-content-center text-sm">
				Two
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}
