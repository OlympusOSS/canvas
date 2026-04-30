import {
	Button,
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [open, setOpen] = useState(false);
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Button variant="outline" onClick={() => setOpen(true)}>
				Open programmatically
			</Button>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Controlled sheet</SheetTitle>
						<SheetDescription>open / onOpenChange come from React state.</SheetDescription>
					</SheetHeader>
				</SheetContent>
			</Sheet>
		</div>
	);
}
