import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Input,
	Label,
	Textarea,
} from "@olympusoss/canvas";
import { type FormEvent, useState } from "react";

export default function App() {
	const [open, setOpen] = useState(false);
	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setOpen(false);
	};
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button>New issue</Button>
				</DialogTrigger>
				<DialogContent>
					<form onSubmit={onSubmit}>
						<DialogHeader>
							<DialogTitle>Create issue</DialogTitle>
							<DialogDescription>Provide a clear title and a short description.</DialogDescription>
						</DialogHeader>
						<div className="grid gap-3 py-3">
							<div className="grid gap-1.5">
								<Label htmlFor="i-title">Title</Label>
								<Input id="i-title" required placeholder="Login button is misaligned on Safari" />
							</div>
							<div className="grid gap-1.5">
								<Label htmlFor="i-desc">Description</Label>
								<Textarea id="i-desc" rows={4} placeholder="Steps to reproduce…" />
							</div>
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button variant="outline" type="button">
									Cancel
								</Button>
							</DialogClose>
							<Button type="submit">Create</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
