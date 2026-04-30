import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Icon,
} from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline">Actions</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-52">
					<DropdownMenuLabel inset>Actions</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<Icon name="Pencil" />
						Rename
					</DropdownMenuItem>
					<DropdownMenuItem inset>Duplicate</DropdownMenuItem>
					<DropdownMenuItem inset>Move to trash</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
