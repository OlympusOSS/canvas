import { CodeBlock } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="max-w-lg space-y-4">
				<CodeBlock language="bash" code={`bun install @olympusoss/canvas`} />
				<CodeBlock
					language="json"
					code={`{
	  "name": "my-app",
	  "dependencies": {
	    "@olympusoss/canvas": "^3.0.0"
	  }
	}`}
				/>
				<CodeBlock language="css" code={`@import "@olympusoss/canvas/styles/tokens.css";`} />
			</div>
		</div>
	);
}
