import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@olympusoss/canvas";
import { useEffect, useState } from "react";

export default function App() {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!api) return;
		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap());
		api.on("select", () => setCurrent(api.selectedScrollSnap()));
	}, [api]);

	return (
		<div className="flex min-h-[200px] items-center justify-center px-14 py-8">
			<div className="space-y-3">
				<Carousel className="w-full max-w-xs" setApi={setApi}>
					<CarouselContent>
						{[1, 2, 3, 4, 5].map((n) => (
							<CarouselItem key={n}>
								<div className="grid h-32 place-content-center rounded-md border border-border bg-muted/30 text-3xl">
									{n}
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
				<p className="text-center font-mono text-xs text-muted-foreground">
					Slide {current + 1} of {count}
				</p>
			</div>
		</div>
	);
}
