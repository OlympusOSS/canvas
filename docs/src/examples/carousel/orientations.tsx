import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@olympusoss/canvas";

const items = [1, 2, 3, 4];

export default function App() {
	return (
		<div className="flex min-h-[280px] items-center justify-center p-14">
			<div className="flex items-start gap-20">
				<Carousel className="w-64">
					<CarouselContent>
						{items.map((n) => (
							<CarouselItem key={n}>
								<div className="grid h-24 place-content-center rounded-md border border-border bg-muted/30 text-2xl">
									H {n}
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
				<Carousel orientation="vertical" className="w-48">
					<CarouselContent className="h-24">
						{items.map((n) => (
							<CarouselItem key={n}>
								<div className="grid h-24 place-content-center rounded-md border border-border bg-muted/30 text-2xl">
									V {n}
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
		</div>
	);
}
