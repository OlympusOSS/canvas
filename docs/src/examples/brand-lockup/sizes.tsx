import { BrandLockup } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[240px] flex-col items-center justify-center gap-6 p-8">
			<BrandLockup productName="Athena" subtitle="sm — sidebar collapsed peek" size="sm" />
			<BrandLockup productName="Athena" subtitle="md — sidebar expanded" size="md" />
			<BrandLockup productName="Athena" subtitle="lg — hero" size="lg" />
		</div>
	);
}
