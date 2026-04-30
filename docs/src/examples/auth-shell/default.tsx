import { AuthShell, Button, Input, Label } from "@olympusoss/canvas";

export default function App() {
	return (
		<AuthShell
			title="Welcome back"
			subtitle="Sign in to your Canvas workspace."
			className="min-h-[460px]"
		>
			<form className="space-y-3">
				<div className="space-y-1.5">
					<Label htmlFor="ash-email">Email</Label>
					<Input id="ash-email" type="email" placeholder="you@example.com" />
				</div>
				<div className="space-y-1.5">
					<Label htmlFor="ash-pass">Password</Label>
					<Input id="ash-pass" type="password" />
				</div>
				<Button className="w-full">Sign in</Button>
			</form>
		</AuthShell>
	);
}
