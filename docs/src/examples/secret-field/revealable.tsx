import { SecretField } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [a, setA] = useState("sk_live_a1b2c3");
	const [b, setB] = useState("sk_live_a1b2c3");
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="w-full max-w-sm space-y-4">
				<SecretField id="reveal-on" label="With reveal toggle" value={a} onChange={setA} />
				<SecretField
					id="reveal-off"
					label="Without reveal toggle"
					value={b}
					onChange={setB}
					revealable={false}
				/>
			</div>
		</div>
	);
}
