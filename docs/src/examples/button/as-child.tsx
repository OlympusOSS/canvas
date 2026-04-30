import { Button } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Button asChild>
				<a href="https://github.com/OlympusOSS/canvas" target="_blank" rel="noopener noreferrer">
					View on GitHub
				</a>
			</Button>
		</div>
	);
}
