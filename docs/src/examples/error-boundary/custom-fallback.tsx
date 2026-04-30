import { Button, ErrorBoundary } from "@olympusoss/canvas";

function Crashy(): React.ReactElement {
	throw new Error("Network timeout");
}

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="p-6">
				<ErrorBoundary
					fallback={(error, reset) => (
						<div className="flex items-center justify-between gap-3 rounded-md bg-destructive/10 p-3 text-sm">
							<span className="text-destructive">Error: {error.message}</span>
							<Button size="sm" variant="outline" onClick={reset}>
								Retry
							</Button>
						</div>
					)}
				>
					<Crashy />
				</ErrorBoundary>
			</div>
		</div>
	);
}
