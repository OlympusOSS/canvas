import { Button, HoverCard, HoverCardContent, HoverCardTrigger } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="flex gap-6">
				<HoverCard openDelay={0}>
					<HoverCardTrigger asChild>
						<Button variant="link">Instant</Button>
					</HoverCardTrigger>
					<HoverCardContent className="w-48 text-xs">openDelay = 0ms</HoverCardContent>
				</HoverCard>
				<HoverCard openDelay={800}>
					<HoverCardTrigger asChild>
						<Button variant="link">Slow open</Button>
					</HoverCardTrigger>
					<HoverCardContent className="w-48 text-xs">openDelay = 800ms</HoverCardContent>
				</HoverCard>
			</div>
		</div>
	);
}
