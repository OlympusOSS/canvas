import { Button, Toaster, toast } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="space-y-2">
				<Button
					onClick={() =>
						toast("Project archived.", {
							action: { label: "Undo", onClick: () => toast.success("Restored.") },
						})
					}
				>
					Archive with undo
				</Button>
				<Toaster />
			</div>
		</div>
	);
}
