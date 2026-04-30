import {
	Button,
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Drawer>
				<DrawerTrigger asChild>
					<Button variant="outline">Open drawer</Button>
				</DrawerTrigger>
				<DrawerContent>
					<div className="mx-auto w-full max-w-sm">
						<DrawerHeader>
							<DrawerTitle>Move to project</DrawerTitle>
							<DrawerDescription>Pick a destination project for this asset.</DrawerDescription>
						</DrawerHeader>
						<DrawerFooter>
							<Button>Confirm</Button>
							<DrawerClose asChild>
								<Button variant="outline">Cancel</Button>
							</DrawerClose>
						</DrawerFooter>
					</div>
				</DrawerContent>
			</Drawer>
		</div>
	);
}
