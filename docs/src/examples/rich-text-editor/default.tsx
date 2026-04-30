import { RichTextEditor } from "@olympusoss/canvas";
import { useState } from "react";

const INITIAL =
	"<h2>Welcome</h2><p>Try the toolbar — <strong>bold</strong>, <em>italic</em>, lists, links.</p>";

export default function App() {
	const [value, setValue] = useState(INITIAL);
	return (
		<RichTextEditor
			ariaLabel="Rich text editor"
			value={value}
			onChange={setValue}
			placeholder="Write something…"
		/>
	);
}
