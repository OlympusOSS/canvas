import {
	Button,
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline">Open sheet</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Edit profile</SheetTitle>
						<SheetDescription>Update your account information.</SheetDescription>
					</SheetHeader>
					<div className="grid gap-3 py-4 text-sm text-muted-foreground">
						Sheet body content goes here.
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
}
