import { MarkdownEditor } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [value, setValue] = useState("Just a clean markdown surface — no chrome.\n");
	return (
		<MarkdownEditor
			ariaLabel="Markdown without toolbar"
			value={value}
			onChange={setValue}
			toolbar={false}
		/>
	);
}
