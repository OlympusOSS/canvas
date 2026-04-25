import { Input, Label } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="w-full max-w-sm space-y-1.5">
			<Label htmlFor="email">Email</Label>
			<Input id="email" type="email" placeholder="ada@olympus.dev" />
		</div>
	);
}
