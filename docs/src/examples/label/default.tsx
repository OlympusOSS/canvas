import { Input, Label } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="email">Email address</Label>
				<Input id="email" type="email" placeholder="you@example.com" />
				<p className="text-xs text-muted-foreground">We&apos;ll never share your email.</p>
			</div>
		</div>
	);
}
