import {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuLabel,
	ContextMenuSeparator,
	ContextMenuTrigger,
} from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [bookmarks, setBookmarks] = useState(true);
	const [history, setHistory] = useState(false);
	return (
		<div className="flex min-h-[300px] items-center justify-center p-8">
			<ContextMenu>
				<ContextMenuTrigger className="grid h-32 w-72 place-content-center rounded-md bg-muted/40 text-sm text-muted-foreground">
					Right-click here
				</ContextMenuTrigger>
				<ContextMenuContent className="w-52">
					<ContextMenuLabel>Show in sidebar</ContextMenuLabel>
					<ContextMenuSeparator />
					<ContextMenuCheckboxItem checked={bookmarks} onCheckedChange={setBookmarks}>
						Bookmarks bar
					</ContextMenuCheckboxItem>
					<ContextMenuCheckboxItem checked={history} onCheckedChange={setHistory}>
						Recently visited
					</ContextMenuCheckboxItem>
				</ContextMenuContent>
			</ContextMenu>
		</div>
	);
}
