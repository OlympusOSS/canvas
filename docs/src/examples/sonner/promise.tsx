import { Button, Toaster, toast } from "@olympusoss/canvas";

export default function App() {
	const submit = () => {
		const work = new Promise<string>((resolve, reject) => {
			setTimeout(() => (Math.random() > 0.3 ? resolve("OK") : reject(new Error("Failed"))), 1500);
		});
		toast.promise(work, {
			loading: "Saving project…",
			success: "Project saved!",
			error: (err) => (err instanceof Error ? err.message : "Unknown error"),
		});
	};
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="space-y-2">
				<Button onClick={submit}>Save project</Button>
				<Toaster />
			</div>
		</div>
	);
}
