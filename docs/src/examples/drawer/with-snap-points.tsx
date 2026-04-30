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
			<Drawer snapPoints={[0.3, 0.6, 0.95]}>
				<DrawerTrigger asChild>
					<Button variant="outline">Drawer with snap points</Button>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>Snap-pointed drawer</DrawerTitle>
						<DrawerDescription>
							Drag the handle to snap to 30%, 60%, or 95% of the viewport.
						</DrawerDescription>
					</DrawerHeader>
					<div className="mx-auto w-full max-w-md p-4 text-sm text-muted-foreground">
						Try dragging — the drawer settles at each snap point.
					</div>
				</DrawerContent>
			</Drawer>
		</div>
	);
}
