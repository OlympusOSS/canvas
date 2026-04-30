import { Stepper } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Stepper
				steps={[
					{ id: "cart", label: "Review cart", status: "complete" },
					{ id: "shipping", label: "Shipping address", status: "active" },
					{ id: "payment", label: "Payment", status: "pending" },
					{ id: "confirm", label: "Confirm order", status: "pending" },
				]}
			/>
		</div>
	);
}
