import { LabeledBarList } from "@olympusoss/canvas";

const SCHEMAS = [
	{ label: "employee", value: 8_412 },
	{ label: "customer", value: 3_104 },
	{ label: "service-account", value: 642 },
	{ label: "partner", value: 190 },
];

export default function App() {
	return (
		<div className="flex min-h-[260px] items-center justify-center p-8">
			<div className="w-full max-w-md rounded-xl border border-border bg-card p-5">
				<p className="mb-3 text-[15px] font-semibold">Schema usage</p>
				<LabeledBarList items={SCHEMAS} colorVar="chart-3" caption="Identities by schema" />
			</div>
		</div>
	);
}
