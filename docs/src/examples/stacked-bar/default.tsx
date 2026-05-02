import { StackedBar } from "@olympusoss/canvas";

const SEGMENTS = [
	{ label: "Password", value: 48 },
	{ label: "Google", value: 22, colorVar: "chart-2" },
	{ label: "WebAuthn", value: 14, colorVar: "chart-6" },
	{ label: "GitHub", value: 9, colorVar: "chart-3" },
	{ label: "Microsoft", value: 5, colorVar: "chart-4" },
	{ label: "Magic link", value: 2, colorVar: "chart-5" },
];

export default function App() {
	return (
		<div className="flex min-h-[260px] items-center justify-center p-8">
			<div className="w-full max-w-md rounded-xl border border-border bg-card p-5">
				<p className="mb-3 text-[15px] font-semibold">Sign-in methods</p>
				<StackedBar segments={SEGMENTS} caption="Last 7 days" />
			</div>
		</div>
	);
}
