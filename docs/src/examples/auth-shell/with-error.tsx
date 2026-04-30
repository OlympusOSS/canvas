import {
	Alert,
	AlertDescription,
	AlertTitle,
	AuthShell,
	Button,
	Icon,
	Input,
	Label,
} from "@olympusoss/canvas";

export default function App() {
	return (
		<AuthShell title="Welcome back" className="min-h-[480px]">
			<Alert variant="destructive" className="mb-3">
				<Icon name="TriangleAlert" />
				<AlertTitle>Sign-in failed</AlertTitle>
				<AlertDescription>Email or password is incorrect.</AlertDescription>
			</Alert>
			<form className="space-y-3">
				<div className="space-y-1.5">
					<Label htmlFor="err-email">Email</Label>
					<Input id="err-email" type="email" defaultValue="alice@example.com" />
				</div>
				<div className="space-y-1.5">
					<Label htmlFor="err-pass">Password</Label>
					<Input id="err-pass" type="password" defaultValue="wrongpass" aria-invalid />
				</div>
				<Button className="w-full">Sign in</Button>
			</form>
		</AuthShell>
	);
}
