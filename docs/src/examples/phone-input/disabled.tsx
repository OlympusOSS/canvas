import { PhoneInput } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="w-full max-w-sm">
				<PhoneInput
					id="dphone"
					label="Phone number"
					value="+15551234567"
					onChange={() => {}}
					disabled
				/>
			</div>
		</div>
	);
}
