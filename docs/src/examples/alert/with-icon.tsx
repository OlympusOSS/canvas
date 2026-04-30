import { Alert, AlertDescription, AlertTitle, Icon } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="max-w-md space-y-3">
				<Alert>
					<Icon name="Terminal" />
					<AlertTitle>Heads up!</AlertTitle>
					<AlertDescription>The CLI now supports custom registries.</AlertDescription>
				</Alert>
				<Alert variant="destructive">
					<Icon name="TriangleAlert" />
					<AlertTitle>Build failed</AlertTitle>
					<AlertDescription>Your build configuration is missing required fields.</AlertDescription>
				</Alert>
			</div>
		</div>
	);
}
