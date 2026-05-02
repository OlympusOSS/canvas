import { Icon, LabeledBarList } from "@olympusoss/canvas";

// Custom valueFormatter renders human-readable storage sizes.
// `leading` accepts any React node — here we pass `<Icon />` from canvas/atoms.
const STORAGE = [
	{
		label: "Postgres · sessions",
		value: 412,
		leading: <Icon name="Database" size={14} className="text-muted-foreground" />,
	},
	{
		label: "Postgres · identities",
		value: 218,
		leading: <Icon name="Database" size={14} className="text-muted-foreground" />,
	},
	{
		label: "Redis · cache",
		value: 78,
		leading: <Icon name="Zap" size={14} className="text-muted-foreground" />,
	},
	{
		label: "S3 · audit logs",
		value: 1_204,
		leading: <Icon name="Archive" size={14} className="text-muted-foreground" />,
	},
];

export default function App() {
	return (
		<div className="flex min-h-[260px] items-center justify-center p-8">
			<div className="w-full max-w-md rounded-xl border border-border bg-card p-5">
				<p className="mb-3 text-[15px] font-semibold">Storage</p>
				<LabeledBarList
					items={STORAGE}
					colorVar="chart-2"
					valueFormatter={(v) => `${v.toLocaleString()} MB`}
				/>
			</div>
		</div>
	);
}
