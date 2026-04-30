import { Button } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="flex items-center gap-3">
				<Button>Active</Button>
				<Button disabled>Disabled</Button>
				<Button variant="outline" disabled>
					Disabled outline
				</Button>
			</div>
		</div>
	);
}
