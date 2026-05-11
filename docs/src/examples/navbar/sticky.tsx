import { BrandMark, NavBar } from "@olympusoss/canvas";

const ACME_PATH = "M12 2 L22 20 L2 20 Z M12 8 L7 18 L17 18 Z";

export default function App() {
	return (
		<>
			<NavBar
				sticky
				logo={
					<div className="flex items-center gap-2">
						<BrandMark path={ACME_PATH} className="h-5 w-5 text-primary" />
						<span className="text-sm font-semibold text-foreground">Acme</span>
					</div>
				}
				links={[
					{ label: "Docs", href: "#" },
					{ label: "Components", href: "#" },
				]}
			/>
			{/* Coloured hero block — visible through the bar's translucent backdrop as you scroll. */}
			<div className="bg-gradient-to-br from-indigo-100 via-violet-100 to-cyan-100 px-6 py-12 dark:from-indigo-950/40 dark:via-violet-950/40 dark:to-cyan-950/40">
				<p className="text-2xl font-semibold tracking-tight text-foreground">
					Scroll up — the navbar&apos;s <code className="font-mono">backdrop-blur</code> frosts this
					gradient as the page slides underneath.
				</p>
			</div>
			<div className="space-y-6 px-6 py-8 text-sm text-muted-foreground">
				{Array.from({ length: 24 }, (_, i) => (
					<p key={i.toString()}>Scroll content row {i + 1}.</p>
				))}
			</div>
		</>
	);
}
