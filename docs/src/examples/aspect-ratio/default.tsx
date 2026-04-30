import { AspectRatio } from "@olympusoss/canvas";

const PINK_DIAGONAL: React.CSSProperties = {
	backgroundColor: "hsl(330 80% 96%)",
	backgroundImage: "repeating-linear-gradient(45deg, hsl(330 80% 60%) 0 1px, transparent 1px 12px)",
};

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<AspectRatio
				ratio={16 / 9}
				className="w-72 overflow-hidden rounded-md border-2 border-[hsl(330_80%_60%)]"
				style={PINK_DIAGONAL}
			>
				<div className="flex h-full w-full items-center justify-center font-mono text-sm text-foreground">
					16 : 9
				</div>
			</AspectRatio>
		</div>
	);
}
