import { CodeEditor } from "@olympusoss/canvas";
import { useState } from "react";

const SAMPLE = `<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>Hello</title>
	</head>
	<body>
		<main>
			<h1>Hello, world.</h1>
		</main>
	</body>
</html>
`;

export default function App() {
	const [value, setValue] = useState(SAMPLE);
	return <CodeEditor ariaLabel="HTML editor" language="html" value={value} onChange={setValue} />;
}
