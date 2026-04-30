import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	Button,
} from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [open, setOpen] = useState(false);
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Button variant="outline" onClick={() => setOpen(true)}>
				Open programmatically
			</Button>
			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Hello from controlled state</AlertDialogTitle>
						<AlertDialogDescription>
							This dialog's open state is controlled via React state.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Close</AlertDialogCancel>
						<AlertDialogAction>OK</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
