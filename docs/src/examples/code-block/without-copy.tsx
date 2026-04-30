import { CodeBlock } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<CodeBlock
				showCopy={false}
				code={`# A read-only snippet — no copy button.
	const value = 42;`}
				className="max-w-lg"
			/>
		</div>
	);
}
