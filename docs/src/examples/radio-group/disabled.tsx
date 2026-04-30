import { Label, RadioGroup, RadioGroupItem } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<RadioGroup defaultValue="basic" className="space-y-2">
				<div className="flex items-center gap-2">
					<RadioGroupItem id="d-basic" value="basic" />
					<Label htmlFor="d-basic">Basic</Label>
				</div>
				<div className="flex items-center gap-2">
					<RadioGroupItem id="d-pro" value="pro" />
					<Label htmlFor="d-pro">Pro</Label>
				</div>
				<div className="flex items-center gap-2">
					<RadioGroupItem id="d-team" value="team" disabled />
					<Label htmlFor="d-team" className="opacity-50">
						Team — coming soon
					</Label>
				</div>
			</RadioGroup>
		</div>
	);
}
