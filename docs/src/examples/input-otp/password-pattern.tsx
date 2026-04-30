import { InputOTP, InputOTPGroup, InputOTPSlot } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="space-y-2">
				<InputOTP maxLength={4} pattern="^[0-9]+$">
					<InputOTPGroup>
						<InputOTPSlot index={0} />
						<InputOTPSlot index={1} />
						<InputOTPSlot index={2} />
						<InputOTPSlot index={3} />
					</InputOTPGroup>
				</InputOTP>
				<p className="text-xs text-muted-foreground">Numeric-only PIN.</p>
			</div>
		</div>
	);
}
