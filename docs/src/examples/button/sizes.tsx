import { Button, Icon } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="flex flex-wrap items-center gap-2">
				<Button size="sm">Small</Button>
				<Button>Default</Button>
				<Button size="lg">Large</Button>
				<Button size="icon" aria-label="Settings">
					<Icon name="Settings" />
				</Button>
			</div>
		</div>
	);
}
