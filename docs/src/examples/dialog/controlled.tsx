import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [open, setOpen] = useState(false);
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Button variant="outline" onClick={() => setOpen(true)}>
				Open programmatically
			</Button>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Controlled dialog</DialogTitle>
						<DialogDescription>open / onOpenChange come from React state.</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
}
