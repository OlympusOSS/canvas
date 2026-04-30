import { Label, Switch } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="flex items-center gap-3">
				<Switch id="airplane" />
				<Label htmlFor="airplane">Airplane mode</Label>
			</div>
		</div>
	);
}
