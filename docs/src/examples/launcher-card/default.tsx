import { LauncherCard } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<LauncherCard
				badge="C"
				title="Customer login (CIAM)"
				description="Sign in or register on the customer-facing identity domain. Built for end-users of apps you ship."
				href="https://example.com/login"
				className="max-w-sm"
			/>
		</div>
	);
}
