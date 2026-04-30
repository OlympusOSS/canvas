import { Label, RadioGroup, RadioGroupItem } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<RadioGroup defaultValue="card" className="space-y-2">
				<div className="flex items-center gap-2">
					<RadioGroupItem id="rg-card" value="card" />
					<Label htmlFor="rg-card">Credit card</Label>
				</div>
				<div className="flex items-center gap-2">
					<RadioGroupItem id="rg-paypal" value="paypal" />
					<Label htmlFor="rg-paypal">PayPal</Label>
				</div>
				<div className="flex items-center gap-2">
					<RadioGroupItem id="rg-apple" value="apple" />
					<Label htmlFor="rg-apple">Apple Pay</Label>
				</div>
			</RadioGroup>
		</div>
	);
}
