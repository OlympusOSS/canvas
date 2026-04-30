import {
	Button,
	Input,
	Label,
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Sheet>
				<SheetTrigger asChild>
					<Button>Edit profile</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Edit profile</SheetTitle>
						<SheetDescription>Update your name and email.</SheetDescription>
					</SheetHeader>
					<div className="grid gap-3 py-4">
						<div className="grid gap-1.5">
							<Label htmlFor="sh-name">Name</Label>
							<Input id="sh-name" defaultValue="Alice Carter" />
						</div>
						<div className="grid gap-1.5">
							<Label htmlFor="sh-email">Email</Label>
							<Input id="sh-email" type="email" defaultValue="alice@example.com" />
						</div>
					</div>
					<SheetFooter>
						<Button>Save</Button>
						<SheetClose asChild>
							<Button variant="outline">Cancel</Button>
						</SheetClose>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</div>
	);
}
