import { Icon } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="flex items-center gap-4 text-foreground">
				<Icon name="Mail" />
				<Icon name="Bell" />
				<Icon name="Settings" />
				<Icon name="Search" />
				<Icon name="Heart" className="text-destructive" />
			</div>
		</div>
	);
}
