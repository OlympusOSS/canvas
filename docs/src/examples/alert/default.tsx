import { Alert, AlertDescription, AlertTitle } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Alert className="max-w-md">
				<AlertTitle>Heads up!</AlertTitle>
				<AlertDescription>You can add components to your app using the CLI.</AlertDescription>
			</Alert>
		</div>
	);
}
