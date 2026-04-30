import { BrandMark } from "@olympusoss/canvas";

const TRIANGLE_PATH = "M12 2 L22 20 L2 20 Z M12 8 L7 18 L17 18 Z";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="flex items-center gap-8">
				<div className="flex flex-col items-center gap-2">
					<BrandMark path={TRIANGLE_PATH} from="#1E40AF" to="#60A5FA" className="h-12 w-12" />
					<span className="font-mono text-[10px] text-muted-foreground">blue</span>
				</div>
				<div className="flex flex-col items-center gap-2">
					<BrandMark path={TRIANGLE_PATH} from="#7E22CE" to="#EC4899" className="h-12 w-12" />
					<span className="font-mono text-[10px] text-muted-foreground">violet → pink</span>
				</div>
				<div className="flex flex-col items-center gap-2">
					<BrandMark path={TRIANGLE_PATH} from="#F59E0B" to="#EF4444" className="h-12 w-12" />
					<span className="font-mono text-[10px] text-muted-foreground">amber → red</span>
				</div>
			</div>
		</div>
	);
}
