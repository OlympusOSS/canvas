import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuSeparator,
	ContextMenuTrigger,
	Icon,
} from "@olympusoss/canvas";

export default function App() {
	return (
		<ContextMenu>
			<ContextMenuTrigger className="grid h-32 w-72 place-content-center rounded-md bg-muted/40 text-sm text-muted-foreground">
				Right-click here
			</ContextMenuTrigger>
			<ContextMenuContent className="w-52">
				<ContextMenuLabel inset>Actions</ContextMenuLabel>
				<ContextMenuSeparator />
				<ContextMenuItem>
					<Icon name="Pencil" />
					Rename
				</ContextMenuItem>
				<ContextMenuItem inset>Duplicate (no icon)</ContextMenuItem>
				<ContextMenuItem inset>Move to trash</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
}
