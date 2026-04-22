import {
	ActionBar,
	Alert,
	AlertDescription,
	AlertTitle,
	AnimatedBackground,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CodeBlock,
	EmptyState,
	ErrorState,
	FieldDisplay,
	Icon,
	LoadingState,
	PageHeader,
	PageTabs,
	SearchBar,
	Section,
	SectionCard,
	SecretField,
	StatCard,
	StatusBadge,
	Stepper,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@olympusoss/canvas";
import { useState } from "react";
import { Showcase } from "../Showcase";

export function MoleculesPage() {
	const [search, setSearch] = useState("");
	const [tab, setTab] = useState("overview");
	const [secret, setSecret] = useState("");

	return (
		<Section spacing={4}>
			<Showcase title="PageHeader">
				<div className="w-full">
					<PageHeader
						title="Identities"
						subtitle="Manage users in your Kratos instance"
						breadcrumbs={[
							{ label: "Home", href: "/" },
							{ label: "Identities" },
						]}
						actions={
							<>
								<button type="button" className="text-sm text-primary">Export</button>
							</>
						}
					/>
				</div>
			</Showcase>

			<Showcase title="ActionBar">
				<ActionBar
					primaryAction={{ label: "Save", onClick: () => {} }}
					secondaryActions={[{ label: "Cancel", onClick: () => {} }]}
				/>
			</Showcase>

			<Showcase title="SectionCard" description="Card with built-in loading / error / empty states.">
				<div className="w-full grid gap-3 md:grid-cols-3">
					<SectionCard title="Loading…" loading />
					<SectionCard title="Something broke" error="Request failed" />
					<SectionCard title="Users" emptyMessage="No users yet" />
				</div>
			</Showcase>

			<Showcase title="PageTabs" description="default / pills / underline variants.">
				<div className="w-full space-y-4">
					<PageTabs
						tabs={[
							{ label: "Overview", value: "overview" },
							{ label: "Sessions", value: "sessions", badge: 12 },
							{ label: "Audit", value: "audit" },
						]}
						value={tab}
						onChange={setTab}
					/>
					<PageTabs
						tabs={[
							{ label: "Overview", value: "overview" },
							{ label: "Sessions", value: "sessions", badge: 12 },
							{ label: "Audit", value: "audit" },
						]}
						value={tab}
						onChange={setTab}
						variant="pills"
					/>
					<PageTabs
						tabs={[
							{ label: "Overview", value: "overview" },
							{ label: "Sessions", value: "sessions", badge: 12 },
							{ label: "Audit", value: "audit" },
						]}
						value={tab}
						onChange={setTab}
						variant="underline"
					/>
				</div>
			</Showcase>

			<Showcase title="StatusBadge">
				<StatusBadge status="success">Active</StatusBadge>
				<StatusBadge status="warning">Pending</StatusBadge>
				<StatusBadge status="error">Locked</StatusBadge>
				<StatusBadge status="info">Info</StatusBadge>
				<StatusBadge status="neutral">Inactive</StatusBadge>
			</Showcase>

			<Showcase title="StatCard">
				<StatCard title="Total identities" value={1_284} icon={<Icon name="Users" />} />
				<StatCard title="Active sessions" value={42} icon={<Icon name="Shield" />} colorVariant="success" />
				<StatCard title="Failed logins" value={3} icon={<Icon name="TriangleAlert" />} colorVariant="destructive" />
			</Showcase>

			<Showcase title="Stepper (vertical)" description="Horizontal form also supported.">
				<Stepper
					orientation="vertical"
					steps={[
						{ id: "welcome", label: "Welcome", status: "complete" },
						{ id: "domain", label: "Domain", status: "complete" },
						{ id: "repo", label: "Repository", status: "active" },
						{ id: "provider", label: "Provider", status: "pending" },
						{ id: "deploy", label: "Deploy", status: "pending" },
					]}
				/>
			</Showcase>

			<Showcase title="SecretField">
				<div className="w-96">
					<SecretField
						id="api-key"
						label="API key"
						value={secret}
						onChange={setSecret}
						placeholder="sk_..."
					/>
				</div>
			</Showcase>

			<Showcase title="SearchBar">
				<div className="w-96">
					<SearchBar value={search} onChange={setSearch} placeholder="Search identities…" />
				</div>
			</Showcase>

			<Showcase title="FieldDisplay">
				<FieldDisplay label="ID" value="id_abc123" mono />
				<FieldDisplay label="Email" value="user@example.com" />
				<FieldDisplay label="Note" />
			</Showcase>

			<Showcase title="Alert" description="default + destructive.">
				<Alert>
					<Icon name="Info" className="h-4 w-4" />
					<AlertTitle>Heads up</AlertTitle>
					<AlertDescription>Something you should know about.</AlertDescription>
				</Alert>
				<Alert variant="destructive">
					<Icon name="TriangleAlert" className="h-4 w-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>Something went wrong.</AlertDescription>
				</Alert>
			</Showcase>

			<Showcase title="Card / Card family">
				<Card className="w-80">
					<CardHeader>
						<CardTitle>Card title</CardTitle>
					</CardHeader>
					<CardContent>Cards compose header + content + footer sub-parts.</CardContent>
				</Card>
			</Showcase>

			<Showcase title="CodeBlock">
				<div className="w-full max-w-2xl">
					<CodeBlock language="ts" code={`import { Button } from "@olympusoss/canvas";\n\nexport const Hi = () => <Button>Hi</Button>;`} />
				</div>
			</Showcase>

			<Showcase title="LoadingState / ErrorState / EmptyState">
				<div className="grid w-full gap-2 md:grid-cols-3">
					<div className="rounded border border-border p-2">
						<LoadingState message="Loading things…" />
					</div>
					<div className="rounded border border-border p-2">
						<ErrorState message="Boom" onRetry={() => {}} retryLabel="Retry" />
					</div>
					<div className="rounded border border-border p-2">
						<EmptyState title="No items" description="Try creating one." />
					</div>
				</div>
			</Showcase>

			<Showcase title="Tooltip">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<span className="cursor-help underline decoration-dotted">Hover me</span>
						</TooltipTrigger>
						<TooltipContent>Tooltip content</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</Showcase>

			<Showcase title="AnimatedBackground (click toggle)">
				<button
					type="button"
					onClick={() => {
						const el = document.getElementById("ab-preview");
						el?.classList.toggle("hidden");
					}}
					className="rounded border border-border px-3 py-1 text-sm"
				>
					Toggle preview
				</button>
				<div id="ab-preview" className="hidden relative w-full h-48 rounded-lg overflow-hidden border border-border">
					<AnimatedBackground />
					<div className="relative z-10 flex h-full items-center justify-center text-sm text-muted-foreground">
						AnimatedBackground is rendered behind this content.
					</div>
				</div>
			</Showcase>
		</Section>
	);
}
