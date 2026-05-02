import { BrandLockup, Logo } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[240px] flex-col items-center justify-center gap-6 p-8">
			<BrandLockup
				logo={<Logo className="h-5 w-auto" />}
				productName="Athena"
				subtitle="sm — sidebar collapsed peek"
				size="sm"
			/>
			<BrandLockup
				logo={<Logo className="h-7 w-auto" />}
				productName="Athena"
				subtitle="md — sidebar expanded"
				size="md"
			/>
			<BrandLockup
				logo={<Logo className="h-10 w-auto" />}
				productName="Athena"
				subtitle="lg — hero"
				size="lg"
			/>
		</div>
	);
}
