import { Alert, AlertDescription, AlertTitle } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="max-w-md space-y-3">
				<Alert>
					<AlertTitle>Default</AlertTitle>
					<AlertDescription>An informational message.</AlertDescription>
				</Alert>
				<Alert variant="destructive">
					<AlertTitle>Destructive</AlertTitle>
					<AlertDescription>Something went wrong while saving.</AlertDescription>
				</Alert>
			</div>
		</div>
	);
}
