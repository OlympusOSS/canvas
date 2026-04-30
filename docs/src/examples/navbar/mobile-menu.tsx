import { BrandMark, Button, NavBar } from "@olympusoss/canvas";

const ACME_PATH = "M12 2 L22 20 L2 20 Z M12 8 L7 18 L17 18 Z";

export default function App() {
	return (
		<>
			<NavBar
				sticky={false}
				logo={<BrandMark path={ACME_PATH} className="h-5 w-5 text-primary" />}
				links={[
					{ label: "Docs", href: "#" },
					{ label: "Components", href: "#" },
					{ label: "Pricing", href: "#" },
				]}
				actions={<Button size="sm">Sign in</Button>}
			/>
			<p className="px-6 py-3 text-xs text-muted-foreground">
				Toggle the viewport to <strong>Mobile</strong> in the example header — the hamburger menu
				kicks in below the <code className="font-mono">md</code> breakpoint.
			</p>
		</>
	);
}
