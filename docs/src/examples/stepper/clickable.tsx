import { Stepper } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [active, setActive] = useState("b");
	const status = (id: string): "complete" | "active" | "pending" =>
		id === active ? "active" : id < active ? "complete" : "pending";
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Stepper
				onStepClick={setActive}
				steps={[
					{ id: "a", label: "Step 1 — click to revisit", status: status("a") },
					{ id: "b", label: "Step 2 — current", status: status("b") },
					{ id: "c", label: "Step 3 — jump ahead", status: status("c") },
				]}
			/>
		</div>
	);
}
