import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Dialog>
				<DialogTrigger asChild>
					<Button>Open outer</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Outer dialog</DialogTitle>
						<DialogDescription>You can open another dialog from inside this one.</DialogDescription>
					</DialogHeader>
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="outline">Open inner</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Inner dialog</DialogTitle>
								<DialogDescription>Stacked on top of the outer one.</DialogDescription>
							</DialogHeader>
						</DialogContent>
					</Dialog>
				</DialogContent>
			</Dialog>
		</div>
	);
}
