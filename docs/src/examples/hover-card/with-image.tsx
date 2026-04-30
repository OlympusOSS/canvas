import { Button, HoverCard, HoverCardContent, HoverCardTrigger } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<HoverCard>
				<HoverCardTrigger asChild>
					<Button variant="link">Preview place</Button>
				</HoverCardTrigger>
				<HoverCardContent className="w-72 p-0">
					<img
						src="https://images.unsplash.com/photo-1542223616-740d5dff7f56?auto=format&fit=crop&w=320&q=60"
						alt=""
						className="aspect-video w-full rounded-t-md object-cover"
					/>
					<div className="space-y-1 p-3">
						<h4 className="text-sm font-semibold text-foreground">Mountain Cabin</h4>
						<p className="text-xs text-muted-foreground">Aspen, Colorado · $240/night</p>
					</div>
				</HoverCardContent>
			</HoverCard>
		</div>
	);
}
