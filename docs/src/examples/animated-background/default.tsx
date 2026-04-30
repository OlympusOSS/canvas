import { AnimatedBackground } from "@olympusoss/canvas";

export default function App() {
	return (
		<>
			<AnimatedBackground />
			<div className="relative z-10 flex min-h-[260px] items-center justify-center">
				<div className="rounded-md border border-border bg-card/80 px-6 py-3 text-sm font-medium text-foreground backdrop-blur">
					Foreground content
				</div>
			</div>
		</>
	);
}
