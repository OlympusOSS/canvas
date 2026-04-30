import { Button, Toaster, toast } from "@olympusoss/canvas";
import { useState } from "react";

const positions = [
	"top-left",
	"top-center",
	"top-right",
	"bottom-left",
	"bottom-center",
	"bottom-right",
] as const;

export default function App() {
	const [position, setPosition] = useState<(typeof positions)[number]>("bottom-right");
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="space-y-3">
				<div className="flex flex-wrap gap-2">
					{positions.map((p) => (
						<Button
							key={p}
							size="sm"
							variant={p === position ? "default" : "outline"}
							onClick={() => setPosition(p)}
						>
							{p}
						</Button>
					))}
				</div>
				<Button onClick={() => toast(`Toast at ${position}`)}>Fire</Button>
				<Toaster position={position} />
			</div>
		</div>
	);
}
