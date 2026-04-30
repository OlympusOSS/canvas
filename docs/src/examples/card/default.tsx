import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle>Revoke session</CardTitle>
					<CardDescription>End this session everywhere it's signed in.</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">
						Session id: <code className="font-mono">01HZ7K…8Q</code>
					</p>
				</CardContent>
				<CardFooter className="justify-end gap-2">
					<Button variant="ghost">Cancel</Button>
					<Button variant="destructive">Revoke</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
