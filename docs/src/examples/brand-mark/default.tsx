import { BrandMark } from "@olympusoss/canvas";

const ACME_PATH = "M12 2 L22 20 L2 20 Z M12 8 L7 18 L17 18 Z";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<BrandMark path={ACME_PATH} className="h-12 w-12 text-primary" />
		</div>
	);
}
