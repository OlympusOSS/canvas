import { Alert, AlertDescription, AlertTitle, Button, Icon } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Alert className="flex max-w-md items-center justify-between gap-4">
				<div className="flex items-start gap-3">
					<Icon name="Info" />
					<div>
						<AlertTitle>Available update</AlertTitle>
						<AlertDescription>Canvas v3.1 is ready to install.</AlertDescription>
					</div>
				</div>
				<Button size="sm" variant="outline">
					Update
				</Button>
			</Alert>
		</div>
	);
}
