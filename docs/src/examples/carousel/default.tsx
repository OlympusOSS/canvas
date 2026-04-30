import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center px-14 py-8">
			<Carousel className="w-full max-w-xs">
				<CarouselContent>
					{[1, 2, 3, 4, 5].map((n) => (
						<CarouselItem key={n}>
							<div className="grid h-32 place-content-center rounded-md border border-border bg-muted/30 text-3xl font-semibold text-foreground">
								{n}
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	);
}
