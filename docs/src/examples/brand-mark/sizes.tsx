import { BrandMark } from "@olympusoss/canvas";

const ACME_PATH = "M12 2 L22 20 L2 20 Z M12 8 L7 18 L17 18 Z";

const SIZES = [
	{ className: "h-6 w-6", label: "h-6" },
	{ className: "h-8 w-8", label: "h-8" },
	{ className: "h-12 w-12", label: "h-12" },
	{ className: "h-16 w-16", label: "h-16" },
	{ className: "h-24 w-24", label: "h-24" },
];

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="flex items-end gap-6 text-primary">
				{SIZES.map((s) => (
					<div key={s.label} className="flex flex-col items-center gap-2">
						<BrandMark path={ACME_PATH} className={s.className} />
						<span className="font-mono text-[10px] text-muted-foreground">{s.label}</span>
					</div>
				))}
			</div>
		</div>
	);
}
