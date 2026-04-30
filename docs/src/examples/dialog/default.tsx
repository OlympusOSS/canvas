import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Input,
	Label,
} from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="outline">Edit profile</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Edit profile</DialogTitle>
						<DialogDescription>Make changes to your account here.</DialogDescription>
					</DialogHeader>
					<div className="grid gap-3 py-2">
						<div className="grid gap-1.5">
							<Label htmlFor="d-name">Name</Label>
							<Input id="d-name" defaultValue="Alice Carter" />
						</div>
						<div className="grid gap-1.5">
							<Label htmlFor="d-email">Email</Label>
							<Input id="d-email" type="email" defaultValue="alice@example.com" />
						</div>
					</div>
					<DialogFooter>
						<Button>Save</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
