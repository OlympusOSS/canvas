import {
	AnimatedBackground,
	AuthShell,
	Button,
	Checkbox,
	Icon,
	Input,
	Label,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@olympusoss/canvas";

function LoginCard() {
	return (
		<form className="space-y-4">
			<div className="space-y-1.5">
				<Label htmlFor="login-email">Email</Label>
				<Input id="login-email" type="email" placeholder="ada@olympus.dev" />
			</div>
			<div className="space-y-1.5">
				<Label htmlFor="login-password">Password</Label>
				<Input id="login-password" type="password" />
			</div>
			<div className="flex items-center justify-between">
				<label htmlFor="login-remember" className="flex items-center gap-2 text-sm">
					<Checkbox id="login-remember" /> Remember me
				</label>
				<a
					href="#recovery"
					className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
				>
					Forgot password?
				</a>
			</div>
			<Button type="button" className="w-full">
				Sign in
			</Button>
			<div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
				<span className="h-px flex-1 bg-border" />
				or
				<span className="h-px flex-1 bg-border" />
			</div>
			<div className="grid grid-cols-2 gap-2">
				<Button type="button" variant="outline">
					<Icon name="Code" className="h-4 w-4" /> GitHub
				</Button>
				<Button type="button" variant="outline">
					<Icon name="Globe" className="h-4 w-4" /> Google
				</Button>
			</div>
		</form>
	);
}

function ConsentCard() {
	const scopes = [
		{ id: "openid", name: "openid", description: "Sign in with your Olympus identity" },
		{ id: "profile", name: "profile", description: "Read your display name and avatar" },
		{ id: "email", name: "email", description: "Read your verified email address" },
		{ id: "offline_access", name: "offline_access", description: "Refresh tokens" },
	];
	return (
		<div className="space-y-5">
			<div className="flex items-center gap-3 rounded-md bg-muted p-3">
				<div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background font-semibold">
					A
				</div>
				<div>
					<div className="text-sm font-medium">Athena</div>
					<div className="font-mono text-xs text-muted-foreground">athena.olympus.dev</div>
				</div>
			</div>
			<p className="text-center text-sm">
				<strong>Athena</strong> wants to access your Olympus account.
			</p>
			<div className="space-y-2">
				{scopes.map((s) => (
					<label
						key={s.id}
						htmlFor={`scope-${s.id}`}
						className="flex cursor-pointer items-start gap-3 rounded-md border border-primary bg-primary/5 p-3"
					>
						<Checkbox id={`scope-${s.id}`} defaultChecked className="mt-0.5" />
						<div>
							<div className="font-mono text-sm font-medium">{s.name}</div>
							<div className="text-xs text-muted-foreground">{s.description}</div>
						</div>
					</label>
				))}
			</div>
			<div className="flex gap-2">
				<Button variant="outline" className="flex-1">
					Deny
				</Button>
				<Button className="flex-1">Allow</Button>
			</div>
		</div>
	);
}

function RecoveryCard() {
	return (
		<form className="space-y-4">
			<div className="space-y-1.5">
				<Label htmlFor="recovery-email">Email</Label>
				<Input id="recovery-email" type="email" placeholder="ada@olympus.dev" />
				<p className="text-xs text-muted-foreground">
					We'll send a recovery link to this address if it matches an active identity.
				</p>
			</div>
			<Button type="button" className="w-full">
				Send recovery link
			</Button>
		</form>
	);
}

function ErrorCard() {
	return (
		<div className="space-y-3 text-center">
			<Icon name="ShieldAlert" className="mx-auto h-10 w-10 text-destructive" />
			<h2 className="text-lg font-semibold text-foreground">No login flow available</h2>
			<p className="text-sm text-muted-foreground">
				Please access this page through an application.
			</p>
			<Button variant="outline">Back to overview</Button>
		</div>
	);
}

export function ShowcaseAuth() {
	return (
		<div className="space-y-6">
			<header className="space-y-2">
				<p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
					hera
				</p>
				<h1 className="text-3xl font-bold tracking-tight text-foreground">Auth UI</h1>
				<p className="max-w-2xl text-muted-foreground">
					Centered AuthShell on top of AnimatedBackground. Tabs cycle through the four canonical
					states — login, consent, recovery, error.
				</p>
				<a
					href="https://github.com/OlympusOSS/hera"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-1.5 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
				>
					<Icon name="Code" className="h-3.5 w-3.5" />
					OlympusOSS/hera
				</a>
			</header>
			<div className="overflow-hidden rounded-2xl border border-border bg-background">
				<Tabs defaultValue="login">
					<div className="border-b border-border bg-card/30 px-4 py-2">
						<TabsList>
							<TabsTrigger value="login">Login</TabsTrigger>
							<TabsTrigger value="consent">Consent</TabsTrigger>
							<TabsTrigger value="recovery">Recovery</TabsTrigger>
							<TabsTrigger value="error">Error</TabsTrigger>
						</TabsList>
					</div>
					<TabsContent value="login" className="m-0">
						<div className="relative h-[640px] overflow-hidden">
							<AuthShell
								title="Sign in"
								subtitle="Welcome back to Olympus"
								background={<AnimatedBackground />}
							>
								<LoginCard />
							</AuthShell>
						</div>
					</TabsContent>
					<TabsContent value="consent" className="m-0">
						<div className="relative h-[640px] overflow-hidden">
							<AuthShell
								title="Authorize access"
								subtitle="Review the permissions before continuing"
								background={<AnimatedBackground />}
							>
								<ConsentCard />
							</AuthShell>
						</div>
					</TabsContent>
					<TabsContent value="recovery" className="m-0">
						<div className="relative h-[640px] overflow-hidden">
							<AuthShell
								title="Reset password"
								subtitle="Enter your email to continue"
								background={<AnimatedBackground />}
							>
								<RecoveryCard />
							</AuthShell>
						</div>
					</TabsContent>
					<TabsContent value="error" className="m-0">
						<div className="relative h-[640px] overflow-hidden">
							<AuthShell brandHeader={null} background={<AnimatedBackground />}>
								<ErrorCard />
							</AuthShell>
						</div>
					</TabsContent>
				</Tabs>
			</div>
			<aside className="rounded-lg border border-border bg-card/30 p-4">
				<h3 className="text-sm font-semibold text-foreground">Components used</h3>
				<div className="mt-2 flex flex-wrap gap-2 font-mono text-xs">
					{[
						"AuthShell",
						"AnimatedBackground",
						"Button",
						"Checkbox",
						"Input",
						"Label",
						"Tabs",
						"Icon",
					].map((c) => (
						<a
							key={c}
							href={`/canvas/components/${c === "AuthShell" || c === "AdminShell" ? "templates" : c === "AnimatedBackground" ? "molecules" : "atoms"}/${c.toLowerCase()}`}
							className="rounded-md border border-border px-2 py-0.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
						>
							{c}
						</a>
					))}
				</div>
			</aside>
		</div>
	);
}
