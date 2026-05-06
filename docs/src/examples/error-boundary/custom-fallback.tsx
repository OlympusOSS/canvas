import { Button, ErrorBoundary } from "@olympusoss/canvas";
import { useState } from "react";

function Crashy({ shouldThrow }: { shouldThrow: boolean }) {
	if (shouldThrow) throw new Error("Network timeout");
	return (
		<div className="rounded-md border border-border bg-muted/30 p-3 text-sm text-foreground">
			Loaded successfully on retry.
		</div>
	);
}

export default function App() {
	const [shouldThrow, setShouldThrow] = useState(true);
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="p-6">
				<ErrorBoundary
					fallback={(error, reset) => (
						<div className="flex items-center justify-between gap-3 rounded-md bg-destructive/10 p-3 text-sm">
							<span className="text-destructive">Error: {error.message}</span>
							<Button
								size="sm"
								variant="outline"
								onClick={() => {
									setShouldThrow(false);
									reset();
								}}
							>
								Retry
							</Button>
						</div>
					)}
				>
					<Crashy shouldThrow={shouldThrow} />
				</ErrorBoundary>
			</div>
		</div>
	);
}
