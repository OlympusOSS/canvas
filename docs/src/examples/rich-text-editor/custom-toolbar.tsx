import { RichTextEditor } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [value, setValue] = useState(
		"<p>This editor only exposes <strong>bold</strong>, <em>italic</em>, and lists.</p>",
	);
	return (
		<RichTextEditor
			ariaLabel="Custom toolbar editor"
			value={value}
			onChange={setValue}
			toolbarItems={["bold", "italic", "bulletList", "orderedList"]}
		/>
	);
}
