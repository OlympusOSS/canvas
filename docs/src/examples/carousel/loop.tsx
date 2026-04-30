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
			<Carousel opts={{ loop: true, align: "start" }} className="w-full max-w-xs">
				<CarouselContent>
					{["A", "B", "C"].map((c) => (
						<CarouselItem key={c}>
							<div className="grid h-32 place-content-center rounded-md border border-border bg-muted/30 text-3xl">
								{c}
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
