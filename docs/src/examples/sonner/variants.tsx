import { Button, Toaster, toast } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="flex flex-wrap gap-2">
				<Button variant="outline" onClick={() => toast.success("Profile updated.")}>
					Success
				</Button>
				<Button variant="outline" onClick={() => toast.error("Something went wrong.")}>
					Error
				</Button>
				<Button variant="outline" onClick={() => toast.warning("Heads up — quota nearly reached.")}>
					Warning
				</Button>
				<Button variant="outline" onClick={() => toast.info("New version available.")}>
					Info
				</Button>
				<Toaster />
			</div>
		</div>
	);
}
