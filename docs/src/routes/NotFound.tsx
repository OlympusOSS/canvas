import { Button } from "@olympusoss/canvas";
import { Link } from "react-router-dom";

export function NotFound() {
	return (
		<div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
			<div className="space-y-2">
				<p className="font-mono text-sm text-muted-foreground">404</p>
				<h1 className="text-3xl font-bold tracking-tight text-foreground">Page not found</h1>
				<p className="max-w-md text-muted-foreground">
					The page you're looking for doesn't exist in the docs.
				</p>
			</div>
			<Button asChild>
				<Link to="/">Back to overview</Link>
			</Button>
		</div>
	);
}
