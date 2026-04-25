import { AnimatedBackground } from "@olympusoss/canvas";

export function TokensAnimation() {
	return (
		<div className="space-y-6">
			<section className="relative h-72 overflow-hidden rounded-lg border border-border">
				<AnimatedBackground />
				<div className="relative z-10 flex h-full items-center justify-center">
					<p className="font-mono text-sm text-foreground">
						AnimatedBackground · 3 orbs · ease-in-out
					</p>
				</div>
			</section>
			<section className="rounded-lg border border-border bg-card/50 p-6">
				<p className="text-sm text-muted-foreground">
					Phase 1 will document the motion tokens, orb-float keyframes, and transition-colors
					guidance.
				</p>
			</section>
		</div>
	);
}
