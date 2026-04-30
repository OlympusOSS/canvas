import { PhoneInput } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [phone, setPhone] = useState<string | undefined>("");
	const [error, setError] = useState("");
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="w-full max-w-sm space-y-1.5">
				<PhoneInput
					id="vphone"
					label="Phone number"
					value={phone}
					onChange={setPhone}
					required
					onValidityChange={setError}
				/>
				{error && <p className="text-xs text-destructive">{error}</p>}
			</div>
		</div>
	);
}
