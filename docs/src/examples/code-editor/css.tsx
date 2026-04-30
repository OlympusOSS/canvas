import { CodeEditor } from "@olympusoss/canvas";
import { useState } from "react";

const SAMPLE = `.card {
	border-radius: var(--radius);
	border: 1px solid hsl(var(--border));
	background: hsl(var(--card));
	padding: 1rem;
}

.card:hover {
	border-color: hsl(var(--brand));
}
`;

export default function App() {
	const [value, setValue] = useState(SAMPLE);
	return <CodeEditor ariaLabel="CSS editor" language="css" value={value} onChange={setValue} />;
}
