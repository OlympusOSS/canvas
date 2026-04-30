import { CodeEditor } from "@olympusoss/canvas";
import { useState } from "react";

const INITIAL = `function greet(name: string) {
  return \`Hello, \${name}!\`;
}

console.log(greet("Olympus"));
`;

export default function App() {
	const [code, setCode] = useState(INITIAL);
	return (
		<div className="flex min-h-[320px] items-center justify-center p-8">
			<div className="w-full max-w-lg">
				<CodeEditor
					value={code}
					onChange={setCode}
					language="typescript"
					ariaLabel="TypeScript editor"
					height={240}
				/>
			</div>
		</div>
	);
}
