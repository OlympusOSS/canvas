import { LabeledBarList } from "@olympusoss/canvas";

const REGIONS = [
	{ label: "United States", value: 412, leading: <span aria-hidden>🇺🇸</span> },
	{ label: "Germany", value: 218, leading: <span aria-hidden>🇩🇪</span> },
	{ label: "United Kingdom", value: 156, leading: <span aria-hidden>🇬🇧</span> },
	{ label: "Japan", value: 121, leading: <span aria-hidden>🇯🇵</span> },
	{ label: "Brazil", value: 88, leading: <span aria-hidden>🇧🇷</span> },
	{ label: "Other", value: 209, leading: <span aria-hidden>🌐</span> },
];

export default function App() {
	return (
		<div className="flex min-h-[260px] items-center justify-center p-8">
			<div className="w-full max-w-md rounded-xl border border-border bg-card p-5">
				<p className="mb-3 text-[15px] font-semibold">Top regions</p>
				<LabeledBarList items={REGIONS} caption="Active sessions" />
			</div>
		</div>
	);
}
