import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[300px] items-center justify-center p-8">
			<ContextMenu>
				<ContextMenuTrigger className="grid h-32 w-72 place-content-center rounded-md bg-muted/40 text-sm text-muted-foreground">
					Right-click here
				</ContextMenuTrigger>
				<ContextMenuContent className="w-48">
					<ContextMenuItem>Open</ContextMenuItem>
					<ContextMenuItem>Rename</ContextMenuItem>
					<ContextMenuSub>
						<ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
						<ContextMenuSubContent className="w-44">
							<ContextMenuItem>Copy link</ContextMenuItem>
							<ContextMenuItem>Email…</ContextMenuItem>
							<ContextMenuItem>Slack…</ContextMenuItem>
						</ContextMenuSubContent>
					</ContextMenuSub>
					<ContextMenuItem>Delete</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
		</div>
	);
}
