import { AuthShell, Button, InputOTP, InputOTPGroup, InputOTPSlot } from "@olympusoss/canvas";

export default function App() {
	return (
		<AuthShell
			title="Two-factor verification"
			subtitle="Enter the 6-digit code from your authenticator app."
			className="min-h-[480px]"
		>
			<div className="flex flex-col items-center gap-4">
				<InputOTP maxLength={6}>
					<InputOTPGroup>
						<InputOTPSlot index={0} />
						<InputOTPSlot index={1} />
						<InputOTPSlot index={2} />
						<InputOTPSlot index={3} />
						<InputOTPSlot index={4} />
						<InputOTPSlot index={5} />
					</InputOTPGroup>
				</InputOTP>
				<Button className="w-full">Verify</Button>
			</div>
		</AuthShell>
	);
}
