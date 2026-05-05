import { DocsCodeBlock } from "../components/DocsCodeBlock";
import { PackageInstallTabs } from "../components/PackageInstallTabs";

const TOKENS_CSS_IMPORT = `@import "tailwindcss";
@source "../../node_modules/@olympusoss/canvas/src/**/*.{ts,tsx}";
@import "@olympusoss/canvas/styles/tokens.css";`;

const THEME_PROVIDER_USAGE = `import { ThemeProvider } from "@olympusoss/canvas";

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
			</body>
		</html>
	);
}`;

const FIRST_COMPONENT = `import { Button } from "@olympusoss/canvas";

export function Page() {
	return <Button>Hello, Canvas</Button>;
}`;

export function Install() {
	return (
		<div className="space-y-10">
			<header className="space-y-3">
				<h1 className="text-3xl font-bold tracking-tight text-foreground">Installation</h1>
				<p className="max-w-2xl text-muted-foreground">
					Wire Canvas into a React 19 + Tailwind v4 app — Next.js, Vite, Remix, anything. Canvas
					ships from <code className="font-mono">@olympusoss/canvas</code> on the public npm
					registry — no auth setup needed.
				</p>
			</header>

			<section className="space-y-4">
				<header>
					<h2 className="text-xl font-semibold tracking-tight text-foreground">
						1 · Install the package
					</h2>
				</header>
				<PackageInstallTabs pkg="@olympusoss/canvas" />
				<p className="text-xs text-muted-foreground">
					Peer deps: <code className="font-mono">react@&gt;=18</code>,{" "}
					<code className="font-mono">react-dom@&gt;=18</code>. Optional peers (only required if you
					use the related components):{" "}
					<code className="font-mono">@rjsf/core / @rjsf/utils / @rjsf/validator-ajv8</code> for{" "}
					<code className="font-mono">SchemaForm</code>,{" "}
					<code className="font-mono">libphonenumber-js</code> for{" "}
					<code className="font-mono">PhoneInput</code>.
				</p>
			</section>

			<section className="space-y-4">
				<header>
					<h2 className="text-xl font-semibold tracking-tight text-foreground">
						2 · Wire Tailwind v4 + tokens
					</h2>
					<p className="mt-1 text-sm text-muted-foreground">
						In your global stylesheet (e.g. <code className="font-mono">app/globals.css</code>),
						import Tailwind, source canvas's components for classname extraction, and load the token
						CSS variables.
					</p>
				</header>
				<DocsCodeBlock code={TOKENS_CSS_IMPORT} language="css" filename="globals.css" />
				<p className="text-xs text-muted-foreground">
					This file ships <code className="font-mono">--background</code>,{" "}
					<code className="font-mono">--foreground</code>,{" "}
					<code className="font-mono">--primary</code>, … plus the{" "}
					<code className="font-mono">@keyframes orb-float-1/2</code> used by{" "}
					<code className="font-mono">AnimatedBackground</code>.
				</p>
			</section>

			<section className="space-y-4">
				<header>
					<h2 className="text-xl font-semibold tracking-tight text-foreground">
						3 · Mount the ThemeProvider
					</h2>
					<p className="mt-1 text-sm text-muted-foreground">
						Required for dark/light theming. SSR-safe, localStorage-backed, exposes{" "}
						<code className="font-mono">useTheme()</code>.
					</p>
				</header>
				<DocsCodeBlock code={THEME_PROVIDER_USAGE} language="tsx" filename="layout.tsx" />
			</section>

			<section className="space-y-4">
				<header>
					<h2 className="text-xl font-semibold tracking-tight text-foreground">
						4 · Render your first component
					</h2>
				</header>
				<DocsCodeBlock code={FIRST_COMPONENT} language="tsx" filename="page.tsx" />
			</section>

			<section className="rounded-lg border border-border bg-muted/40 p-5">
				<h3 className="text-sm font-semibold text-foreground">Lint guardrails (recommended)</h3>
				<p className="mt-1 text-sm text-muted-foreground">
					Add Biome's <code className="font-mono">noRestrictedImports</code> rule to stop accidental
					direct imports of <code className="font-mono">lucide-react</code>,{" "}
					<code className="font-mono">sonner</code>, and{" "}
					<code className="font-mono">@radix-ui/*</code>. Canvas wraps them all — see the{" "}
					<a
						href="/canvas/principles"
						className="font-medium text-foreground underline-offset-4 hover:underline"
					>
						Principles
					</a>{" "}
					page for the full snippet.
				</p>
			</section>
		</div>
	);
}
