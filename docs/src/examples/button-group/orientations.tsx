import { Button, ButtonGroup } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="flex items-start gap-8">
				<div>
					<p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
						horizontal
					</p>
					<ButtonGroup>
						<Button variant="outline">Day</Button>
						<Button variant="outline">Week</Button>
						<Button variant="outline">Month</Button>
					</ButtonGroup>
				</div>
				<div>
					<p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
						vertical
					</p>
					<ButtonGroup orientation="vertical">
						<Button variant="outline">Top</Button>
						<Button variant="outline">Middle</Button>
						<Button variant="outline">Bottom</Button>
					</ButtonGroup>
				</div>
			</div>
		</div>
	);
}
