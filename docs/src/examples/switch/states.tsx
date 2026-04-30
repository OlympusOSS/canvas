import { Label, Switch } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="grid grid-cols-2 gap-4">
				<div className="flex items-center gap-2">
					<Switch id="off" />
					<Label htmlFor="off">Off</Label>
				</div>
				<div className="flex items-center gap-2">
					<Switch id="on" defaultChecked />
					<Label htmlFor="on">On</Label>
				</div>
				<div className="flex items-center gap-2">
					<Switch id="d-off" disabled />
					<Label htmlFor="d-off" className="opacity-50">
						Disabled off
					</Label>
				</div>
				<div className="flex items-center gap-2">
					<Switch id="d-on" disabled defaultChecked />
					<Label htmlFor="d-on" className="opacity-50">
						Disabled on
					</Label>
				</div>
			</div>
		</div>
	);
}
