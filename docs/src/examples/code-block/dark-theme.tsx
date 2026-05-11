import { CodeBlock } from "@olympusoss/canvas";

const SNIPPET = `import { OlympusClient } from "@olympusoss/sdk";

const olympus = new OlympusClient({
  issuer: "https://auth.olympus.dev",
  clientId: "site-ciam-client",
  pkce: true,
});

await olympus.signIn();`;

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<CodeBlock language="app/auth.ts" code={SNIPPET} theme="dark" className="w-full max-w-lg" />
		</div>
	);
}
