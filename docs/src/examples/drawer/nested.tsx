import {
	Button,
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Drawer>
				<DrawerTrigger asChild>
					<Button>Open outer drawer</Button>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>Outer drawer</DrawerTitle>
						<DrawerDescription>Open the inner drawer to stack them.</DrawerDescription>
					</DrawerHeader>
					<div className="mx-auto w-full max-w-md p-4">
						<Drawer nested>
							<DrawerTrigger asChild>
								<Button variant="outline">Open inner drawer</Button>
							</DrawerTrigger>
							<DrawerContent>
								<DrawerHeader>
									<DrawerTitle>Inner drawer</DrawerTitle>
									<DrawerDescription>Stacked drawers via the `nested` prop.</DrawerDescription>
								</DrawerHeader>
							</DrawerContent>
						</Drawer>
					</div>
				</DrawerContent>
			</Drawer>
		</div>
	);
}
