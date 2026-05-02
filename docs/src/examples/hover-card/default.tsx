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
					<Button variant="link">@olympus</Button>
				</HoverCardTrigger>
				<HoverCardContent className="w-72">
					<div className="flex gap-3">
						<Avatar>
							<AvatarImage src="" alt="" />
							<AvatarFallback>OL</AvatarFallback>
						</Avatar>
						<div className="space-y-1">
							<h4 className="text-sm font-semibold text-foreground">@olympus</h4>
							<p className="text-xs text-muted-foreground">
								Olympus Identity Platform — Ory Kratos / Hydra OAuth2 admin.
							</p>
						</div>
					</div>
				</HoverCardContent>
			</HoverCard>
		</div>
	);
}
