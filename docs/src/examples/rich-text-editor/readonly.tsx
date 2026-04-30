import { RichTextEditor } from "@olympusoss/canvas";

const PUBLISHED =
	"<h3>Read-only article</h3><p><strong>readonly</strong> hides chrome focus, blocks edits, but keeps text selectable for copy.</p><blockquote>Useful for previews of saved drafts.</blockquote>";

export default function App() {
	return (
		<RichTextEditor
			ariaLabel="Read-only article preview"
			value={PUBLISHED}
			onChange={() => {}}
			readonly
			toolbar={false}
		/>
	);
}
