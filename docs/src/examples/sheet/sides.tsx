import {
	Button,
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@olympusoss/canvas";

const sides = ["top", "right", "bottom", "left"] as const;

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="flex flex-wrap gap-3">
				{sides.map((side) => (
					<Sheet key={side}>
						<SheetTrigger asChild>
							<Button variant="outline">{side}</Button>
						</SheetTrigger>
						<SheetContent side={side}>
							<SheetHeader>
								<SheetTitle>{side.charAt(0).toUpperCase() + side.slice(1)} sheet</SheetTitle>
								<SheetDescription>Slides in from {side}.</SheetDescription>
							</SheetHeader>
						</SheetContent>
					</Sheet>
				))}
			</div>
		</div>
	);
}
