import { AspectRatio } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<AspectRatio ratio={16 / 9} className="w-80 overflow-hidden rounded-lg border border-border">
				<img
					src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=640&q=80"
					alt="Mountain landscape at sunrise"
					className="h-full w-full object-cover"
				/>
			</AspectRatio>
		</div>
	);
}
