import { InputOTP, InputOTPGroup, InputOTPSlot } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [value, setValue] = useState("");
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="space-y-2">
				<InputOTP maxLength={6} value={value} onChange={setValue}>
					<InputOTPGroup>
						<InputOTPSlot index={0} />
						<InputOTPSlot index={1} />
						<InputOTPSlot index={2} />
						<InputOTPSlot index={3} />
						<InputOTPSlot index={4} />
						<InputOTPSlot index={5} />
					</InputOTPGroup>
				</InputOTP>
				<p className="text-xs text-muted-foreground">Enter your 6-digit verification code.</p>
			</div>
		</div>
	);
}
