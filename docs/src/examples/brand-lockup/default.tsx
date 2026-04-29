import { BrandLockup } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] flex-col items-center justify-center gap-6 p-8">
			<BrandLockup productName="Athena" subtitle="v1.1.4" size="md" />
			<BrandLockup productName="Hera" subtitle="auth · consent" size="lg" />
			<BrandLockup productName="Athena" size="sm" collapsed />
		</div>
	);
}
