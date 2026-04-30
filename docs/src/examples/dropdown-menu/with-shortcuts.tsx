import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline">File</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-52">
					<DropdownMenuItem>
						New file
						<DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Save
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						Save As…
						<DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
