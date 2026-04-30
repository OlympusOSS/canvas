import { SecretField } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [token, setToken] = useState("");
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="w-full max-w-sm">
				<SecretField
					id="api-token"
					label="API token"
					value={token}
					onChange={setToken}
					placeholder="Paste your token"
				/>
			</div>
		</div>
	);
}
