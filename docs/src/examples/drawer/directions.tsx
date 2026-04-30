import {
	Button,
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@olympusoss/canvas";

const directions = ["top", "right", "bottom", "left"] as const;

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="flex flex-wrap gap-3">
				{directions.map((direction) => (
					<Drawer key={direction} direction={direction}>
						<DrawerTrigger asChild>
							<Button variant="outline">{direction}</Button>
						</DrawerTrigger>
						<DrawerContent>
							<DrawerHeader>
								<DrawerTitle>
									{direction.charAt(0).toUpperCase() + direction.slice(1)} drawer
								</DrawerTitle>
								<DrawerDescription>Slides in from {direction}.</DrawerDescription>
							</DrawerHeader>
						</DrawerContent>
					</Drawer>
				))}
			</div>
		</div>
	);
}
