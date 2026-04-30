import { Input, Label } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="grid w-full max-w-sm gap-4">
				<div className="space-y-1.5">
					<Label htmlFor="i-text">Text</Label>
					<Input id="i-text" type="text" placeholder="Jane Doe" />
				</div>
				<div className="space-y-1.5">
					<Label htmlFor="i-email">Email</Label>
					<Input id="i-email" type="email" placeholder="you@example.com" />
				</div>
				<div className="space-y-1.5">
					<Label htmlFor="i-password">Password</Label>
					<Input id="i-password" type="password" placeholder="••••••••" />
				</div>
				<div className="space-y-1.5">
					<Label htmlFor="i-number">Number</Label>
					<Input id="i-number" type="number" placeholder="0" />
				</div>
				<div className="space-y-1.5">
					<Label htmlFor="i-date">Date</Label>
					<Input id="i-date" type="date" />
				</div>
			</div>
		</div>
	);
}
