import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuTrigger,
} from "@olympusoss/canvas";

export default function App() {
	return (
		<ContextMenu>
			<ContextMenuTrigger className="grid h-32 w-72 place-content-center rounded-md bg-muted/40 text-sm text-muted-foreground">
				Right-click here
			</ContextMenuTrigger>
			<ContextMenuContent className="w-48">
				<ContextMenuItem>Cut</ContextMenuItem>
				<ContextMenuItem>Copy</ContextMenuItem>
				<ContextMenuItem>Paste</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuItem>Delete</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}
