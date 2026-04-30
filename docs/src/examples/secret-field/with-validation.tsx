import { SecretField } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [key, setKey] = useState("");
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="w-full max-w-sm">
				<SecretField
					id="api-key"
					label="API key"
					value={key}
					onChange={setKey}
					minLength={10}
					onValidate={async (v) => {
						await new Promise((r) => setTimeout(r, 700));
						if (!v.startsWith("sk_")) throw new Error("Key must start with sk_");
						return true;
					}}
				/>
			</div>
		</div>
	);
}
