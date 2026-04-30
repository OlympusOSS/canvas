import { Progress } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="w-full max-w-sm space-y-2">
				<div className="flex items-baseline justify-between text-sm">
					<span className="font-medium text-foreground">Uploading…</span>
					<span className="font-mono text-xs text-muted-foreground">65%</span>
				</div>
				<Progress value={65} />
			</div>
		</div>
	);
}
