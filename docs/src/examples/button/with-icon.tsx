import { Button, Icon } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="flex items-center gap-3">
				<Button>
					<Icon name="Plus" />
					New project
				</Button>
				<Button variant="outline">
					Continue
					<Icon name="ArrowRight" />
				</Button>
				<Button size="icon" aria-label="Settings">
					<Icon name="Settings" />
				</Button>
			</div>
		</div>
	);
}
