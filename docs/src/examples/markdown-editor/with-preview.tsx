import { MarkdownEditor } from "@olympusoss/canvas";
import { useState } from "react";

const SAMPLE = `# Live preview

Type on the **left** — see the rendered output on the **right**.

- Lists work
- *Italic* / **bold**
- [Links](https://example.com)
- \`inline code\`

\`\`\`js
const greet = (name) => \`Hello, \${name}\`;
\`\`\`

> Quotes too.
`;

export default function App() {
	const [value, setValue] = useState(SAMPLE);
	return (
		<MarkdownEditor
			ariaLabel="Markdown with preview"
			value={value}
			onChange={setValue}
			preview
			height={360}
		/>
	);
}
