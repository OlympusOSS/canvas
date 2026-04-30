import { CodeEditor } from "@olympusoss/canvas";
import { useState } from "react";

const SAMPLE = JSON.stringify(
	{
		name: "@olympusoss/canvas",
		version: "2.3.1",
		license: "proprietary",
		dependencies: { react: "^19" },
	},
	null,
	2,
);

export default function App() {
	const [value, setValue] = useState(SAMPLE);
	return <CodeEditor ariaLabel="JSON editor" language="json" value={value} onChange={setValue} />;
}
