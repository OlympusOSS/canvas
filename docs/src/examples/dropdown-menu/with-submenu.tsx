import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline">More</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-48">
					<DropdownMenuItem>Open</DropdownMenuItem>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
						<DropdownMenuSubContent>
							<DropdownMenuItem>Copy link</DropdownMenuItem>
							<DropdownMenuItem>Email…</DropdownMenuItem>
							<DropdownMenuItem>Slack…</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuSub>
					<DropdownMenuItem>Delete</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
