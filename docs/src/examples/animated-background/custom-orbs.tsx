import { AnimatedBackground } from "@olympusoss/canvas";

export default function App() {
	return (
		<>
			<AnimatedBackground
				orbs={[
					{
						color: "#f472b6",
						size: 360,
						opacity: 0.35,
						blur: 90,
						position: "-top-20 -left-10",
						animation: "orb-float-1 8s ease-in-out infinite",
					},
					{
						color: "#fbbf24",
						size: 260,
						opacity: 0.3,
						blur: 70,
						position: "bottom-0 right-0",
						animation: "orb-float-2 10s ease-in-out infinite",
					},
				]}
			/>
			<div className="relative z-10 flex min-h-[260px] items-center justify-center">
				<div className="rounded-md border border-border bg-card/80 px-6 py-3 text-sm font-medium text-foreground backdrop-blur">
					Custom orbs (pink + amber)
				</div>
			</div>
		</>
	);
}
