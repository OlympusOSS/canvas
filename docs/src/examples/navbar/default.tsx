import { BrandMark, Button, NavBar } from "@olympusoss/canvas";

const ACME_PATH = "M12 2 L22 20 L2 20 Z M12 8 L7 18 L17 18 Z";

export default function App() {
	return (
		<NavBar
			sticky={false}
			logo={
				<div className="flex items-center gap-2">
					<BrandMark path={ACME_PATH} className="h-5 w-5 text-primary" />
					<span className="text-sm font-semibold text-foreground">Acme</span>
				</div>
			}
			links={[
				{ label: "Docs", href: "#" },
				{ label: "Components", href: "#" },
				{ label: "Pricing", href: "#" },
			]}
			actions={<Button size="sm">Sign in</Button>}
		/>
	);
}
