import { BrandLockup, Logo } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] flex-col items-center justify-center gap-6 p-8">
			<BrandLockup
				logo={<Logo className="h-7 w-auto" />}
				productName="Athena"
				subtitle="v1.1.4"
				size="md"
			/>
			<BrandLockup
				logo={<Logo className="h-10 w-auto" />}
				productName="Hera"
				subtitle="auth · consent"
				size="lg"
			/>
			<BrandLockup
				logo={<Logo className="h-5 w-auto" />}
				productName="Athena"
				size="sm"
				collapsed
			/>
		</div>
	);
}
