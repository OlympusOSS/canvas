import { MarkdownEditor } from "@olympusoss/canvas";
import { useState } from "react";

const SAMPLE = "# Hello\n\nWrite **markdown** here. Try the toolbar above.\n";

export default function App() {
	const [value, setValue] = useState(SAMPLE);
	return (
		<MarkdownEditor
			ariaLabel="Markdown body"
			value={value}
			onChange={setValue}
			placeholder="Start typing markdown…"
		/>
	);
}
