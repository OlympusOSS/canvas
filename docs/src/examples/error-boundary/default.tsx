import { Button, ErrorBoundary } from "@olympusoss/canvas";
import { useState } from "react";

function Bomb({ shouldThrow }: { shouldThrow: boolean }) {
	if (shouldThrow) throw new Error("Synthetic render error.");
	return <p className="text-sm text-muted-foreground">Everything is fine.</p>;
}

export default function App() {
	const [boom, setBoom] = useState(false);
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="space-y-3 p-6">
				<Button variant="outline" onClick={() => setBoom(true)}>
					Trigger error
				</Button>
				<ErrorBoundary>
					<Bomb shouldThrow={boom} />
				</ErrorBoundary>
			</div>
		</div>
	);
}
