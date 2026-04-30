import { CodeEditor } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [value, setValue] = useState(`echo "no gutter, just code"\nls -la\n`);
	return (
		<CodeEditor
			ariaLabel="Code editor without line numbers"
			language="markdown"
			value={value}
			onChange={setValue}
			lineNumbers={false}
		/>
	);
}
