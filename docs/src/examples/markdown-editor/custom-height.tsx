import { MarkdownEditor } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [value, setValue] = useState("Tall surface: `height={420}`\n\n");
	return (
		<MarkdownEditor
			ariaLabel="Tall markdown editor"
			value={value}
			onChange={setValue}
			height={420}
		/>
	);
}
