import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [theme, setTheme] = useState("system");
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline">Theme: {theme}</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-44">
					<DropdownMenuLabel>Theme</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
						<DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
						<DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
