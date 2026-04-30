import { CodeBlock } from "@olympusoss/canvas";

const SNIPPET = `import { Button } from "@olympusoss/canvas";

export function Save() {
  return <Button>Save changes</Button>;
}`;

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<CodeBlock language="tsx" code={SNIPPET} className="max-w-lg" />
		</div>
	);
}
