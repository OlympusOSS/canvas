import { Progress } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="w-full max-w-sm space-y-3">
				{[0, 25, 50, 75, 100].map((value) => (
					<div key={value} className="flex items-center gap-3">
						<span className="w-10 font-mono text-xs text-muted-foreground">{value}%</span>
						<Progress value={value} className="flex-1" />
					</div>
				))}
			</div>
		</div>
	);
}
