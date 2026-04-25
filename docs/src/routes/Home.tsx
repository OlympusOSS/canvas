import { Button } from "@olympusoss/canvas";
import { Link } from "react-router-dom";

export function Home() {
	return (
		<div className="space-y-12">
			<header className="space-y-4">
				<h1 className="text-4xl font-bold tracking-tight text-foreground">Canvas</h1>
				<p className="max-w-2xl text-lg text-muted-foreground">
					The Olympus design system. A shadcn-derived React component library on Tailwind v4 —
					atomic-design layered, tokens-first, dark-mode-native.
				</p>
				<div className="flex gap-3">
					<Button asChild>
						<Link to="/install">Get started</Link>
					</Button>
					<Button asChild variant="outline">
						<Link to="/components/atoms">Browse components</Link>
					</Button>
				</div>
			</header>

			<section className="space-y-3">
				<h2 className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
					Coming soon
				</h2>
				<p className="text-sm text-muted-foreground">
					Live token previews, per-component pages with code samples, an interactive playground, and
					a "used in" cross-reference to hera/athena/site. This page is the Phase 0 stub — phases
					1-4 ship next.
				</p>
			</section>
		</div>
	);
}
