import { PhoneInput } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [phone, setPhone] = useState<string | undefined>("");
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="w-full max-w-sm">
				<PhoneInput
					id="rphone"
					label="Phone (US / CA / GB only)"
					value={phone}
					onChange={setPhone}
					countryCodes={["US", "CA", "GB"]}
					defaultCountry="US"
				/>
			</div>
		</div>
	);
}
