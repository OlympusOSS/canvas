import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@olympusoss/canvas";

export default function App() {
	return (
		<ResizablePanelGroup
			orientation="horizontal"
			className="h-48 max-w-xl rounded-lg border border-border"
		>
			<ResizablePanel defaultSize={30} className="grid place-content-center text-sm">
				Sidebar
			</ResizablePanel>
			<ResizableHandle withHandle />
			<ResizablePanel defaultSize={70}>
				<ResizablePanelGroup orientation="vertical">
					<ResizablePanel defaultSize={70} className="grid place-content-center text-sm">
						Main
					</ResizablePanel>
					<ResizableHandle withHandle />
					<ResizablePanel defaultSize={30} className="grid place-content-center text-sm">
						Console
					</ResizablePanel>
				</ResizablePanelGroup>
			</ResizablePanel>
		</ResizablePanelGroup>
	);
}
