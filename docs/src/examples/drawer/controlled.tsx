import {
	Button,
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [open, setOpen] = useState(false);
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Button variant="outline" onClick={() => setOpen(true)}>
				Open programmatically
			</Button>
			<Drawer open={open} onOpenChange={setOpen}>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>Controlled drawer</DrawerTitle>
						<DrawerDescription>open / onOpenChange come from React state.</DrawerDescription>
					</DrawerHeader>
				</DrawerContent>
			</Drawer>
		</div>
	);
}
