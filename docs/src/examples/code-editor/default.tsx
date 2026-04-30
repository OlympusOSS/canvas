import { CodeEditor } from "@olympusoss/canvas";
import { useState } from "react";

const SAMPLE = `# CodeEditor

Default language is whatever you pass in \`language=\`. This one is **markdown**.
`;

export default function App() {
	const [value, setValue] = useState(SAMPLE);
	return (
		<CodeEditor ariaLabel="Code editor" language="markdown" value={value} onChange={setValue} />
	);
}
