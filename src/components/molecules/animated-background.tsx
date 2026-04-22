import { cn } from "../../lib/utils";

export interface AnimatedBackgroundOrb {
	/** CSS color for the radial gradient. */
	color: string;
	/** Size in pixels. Default: 500. */
	size?: number;
	opacity?: number;
	blur?: number;
	/** Tailwind position classes, e.g. `"-top-32 -right-32"`. */
	position?: string;
	/** Animation name declared in your CSS (or inline style). */
	animation?: string;
}

export interface AnimatedBackgroundProps {
	/**
	 * Orbs to render. Defaults to a 3-orb indigo/purple/cyan composition that
	 * mirrors hera's auth background.
	 */
	orbs?: AnimatedBackgroundOrb[];
	className?: string;
}

const DEFAULT_ORBS: AnimatedBackgroundOrb[] = [
	{
		color: "#6366f1",
		size: 500,
		opacity: 0.2,
		blur: 120,
		position: "-top-32 -right-32",
		animation: "orb-float-1 8s ease-in-out infinite",
	},
	{
		color: "#8b5cf6",
		size: 400,
		opacity: 0.15,
		blur: 100,
		position: "-bottom-32 -left-32",
		animation: "orb-float-2 10s ease-in-out infinite",
	},
	{
		color: "#06b6d4",
		size: 300,
		opacity: 0.1,
		blur: 80,
		position: "left-1/2 top-1/3 -translate-x-1/2",
		animation: "orb-float-1 12s ease-in-out 2s infinite",
	},
];

export function AnimatedBackground({ orbs = DEFAULT_ORBS, className }: AnimatedBackgroundProps) {
	return (
		<div className={cn("pointer-events-none fixed inset-0 overflow-hidden", className)}>
			{orbs.map((orb, i) => (
				<div
					key={i}
					className={cn("absolute rounded-full", orb.position)}
					style={{
						width: orb.size ?? 500,
						height: orb.size ?? 500,
						opacity: orb.opacity ?? 0.2,
						filter: `blur(${orb.blur ?? 100}px)`,
						background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
						animation: orb.animation,
					}}
				/>
			))}
		</div>
	);
}

AnimatedBackground.displayName = "AnimatedBackground";
