import {
	Button,
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [showSidebar, setShowSidebar] = useState(true);
	const [showActivity, setShowActivity] = useState(false);
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline">View</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-48">
					<DropdownMenuLabel>Panels</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuCheckboxItem checked={showSidebar} onCheckedChange={setShowSidebar}>
						Sidebar
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem checked={showActivity} onCheckedChange={setShowActivity}>
						Activity feed
					</DropdownMenuCheckboxItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
