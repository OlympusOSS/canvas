import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarMenu,
	MenubarTrigger,
} from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [sidebar, setSidebar] = useState(true);
	const [activity, setActivity] = useState(false);
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger>View</MenubarTrigger>
					<MenubarContent>
						<MenubarCheckboxItem checked={sidebar} onCheckedChange={setSidebar}>
							Show sidebar
						</MenubarCheckboxItem>
						<MenubarCheckboxItem checked={activity} onCheckedChange={setActivity}>
							Show activity
						</MenubarCheckboxItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		</div>
	);
}
