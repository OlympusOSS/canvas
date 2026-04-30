import { SectionCard } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<SectionCard
				title="General settings"
				subtitle="Manage your account preferences."
				className="max-w-md"
			>
				<div className="space-y-2 text-sm">
					<p className="text-foreground">Theme: System</p>
					<p className="text-foreground">Language: English</p>
					<p className="text-foreground">Timezone: UTC-08:00</p>
				</div>
			</SectionCard>
		</div>
	);
}
