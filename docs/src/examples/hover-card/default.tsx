import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<HoverCard>
				<HoverCardTrigger asChild>
					<Button variant="link">@shadcn</Button>
				</HoverCardTrigger>
				<HoverCardContent className="w-72">
					<div className="flex gap-3">
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" alt="" />
							<AvatarFallback>SC</AvatarFallback>
						</Avatar>
						<div className="space-y-1">
							<h4 className="text-sm font-semibold text-foreground">@shadcn</h4>
							<p className="text-xs text-muted-foreground">
								The creator of shadcn/ui — beautifully designed React components.
							</p>
						</div>
					</div>
				</HoverCardContent>
			</HoverCard>
		</div>
	);
}
