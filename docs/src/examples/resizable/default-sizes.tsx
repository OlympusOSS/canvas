import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<ResizablePanelGroup
				orientation="horizontal"
				className="h-32 max-w-xl rounded-lg border border-border"
			>
				<ResizablePanel defaultSize={20} minSize={10} className="grid place-content-center text-sm">
					20%
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel defaultSize={50} minSize={20} className="grid place-content-center text-sm">
					50%
				</ResizablePanel>
				<ResizableHandle />
				<ResizablePanel defaultSize={30} minSize={10} className="grid place-content-center text-sm">
					30%
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
