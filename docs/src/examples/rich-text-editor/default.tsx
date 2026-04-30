import { RichTextEditor } from "@olympusoss/canvas";
import { useState } from "react";

const INITIAL = `<h2>Welcome</h2><p>This is a <strong>rich text</strong> editor with <em>formatting</em> support.</p><ul><li>Bold, italic, strikethrough</li><li>Links, code, blockquotes</li><li>Ordered and unordered lists</li></ul>`;

export default function App() {
	const [html, setHtml] = useState(INITIAL);
	return (
		<div className="flex min-h-[360px] items-center justify-center p-8">
			<div className="w-full max-w-lg">
				<RichTextEditor value={html} onChange={setHtml} ariaLabel="Rich text editor" height={280} />
			</div>
		</div>
	);
}
