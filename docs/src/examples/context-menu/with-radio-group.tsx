import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuLabel,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSeparator,
	ContextMenuTrigger,
} from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [theme, setTheme] = useState("system");
	return (
		<ContextMenu>
			<ContextMenuTrigger className="grid h-32 w-72 place-content-center rounded-md bg-muted/40 text-sm text-muted-foreground">
				Right-click here
			</ContextMenuTrigger>
			<ContextMenuContent className="w-44">
				<ContextMenuLabel>Theme</ContextMenuLabel>
				<ContextMenuSeparator />
				<ContextMenuRadioGroup value={theme} onValueChange={setTheme}>
					<ContextMenuRadioItem value="light">Light</ContextMenuRadioItem>
					<ContextMenuRadioItem value="dark">Dark</ContextMenuRadioItem>
					<ContextMenuRadioItem value="system">System</ContextMenuRadioItem>
				</ContextMenuRadioGroup>
			</ContextMenuContent>
		</ContextMenu>
	);
}
