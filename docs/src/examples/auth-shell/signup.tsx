import { AuthShell, Button, Input, Label } from "@olympusoss/canvas";

export default function App() {
	return (
		<AuthShell
			title="Create your account"
			subtitle="Start your 14-day free trial."
			className="min-h-[480px]"
			footer={
				<p className="text-center text-xs text-muted-foreground">
					Already have an account?{" "}
					<a href="/login" className="text-primary hover:underline">
						Sign in
					</a>
				</p>
			}
		>
			<form className="space-y-3">
				<div className="space-y-1.5">
					<Label htmlFor="su-name">Full name</Label>
					<Input id="su-name" placeholder="Alice Carter" />
				</div>
				<div className="space-y-1.5">
					<Label htmlFor="su-email">Work email</Label>
					<Input id="su-email" type="email" placeholder="alice@company.com" />
				</div>
				<div className="space-y-1.5">
					<Label htmlFor="su-pass">Password</Label>
					<Input id="su-pass" type="password" />
				</div>
				<Button className="w-full">Create account</Button>
			</form>
		</AuthShell>
	);
}
