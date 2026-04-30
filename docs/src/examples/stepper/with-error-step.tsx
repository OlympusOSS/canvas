import { Stepper } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Stepper
				steps={[
					{ id: "form", label: "Submit form", status: "complete" },
					{ id: "verify", label: "Email verification", status: "error" },
					{ id: "done", label: "All set", status: "pending", disabled: true },
				]}
			/>
		</div>
	);
}
