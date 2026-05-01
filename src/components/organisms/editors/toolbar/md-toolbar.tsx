"use client";

/* c8 ignore file -- CodeMirror toolbar requires real DOM; jsdom-incompatible. */

import { EditorSelection } from "@codemirror/state";
import type { EditorView } from "@codemirror/view";

import { Icon } from "../../../atoms/icon";
import { Toggle } from "../../../atoms/toggle";
import { ToolbarDivider, ToolbarShell } from "./toolbar-shell";

export interface MdToolbarProps {
	/** CodeMirror view ref (held by the editor). */
	view: EditorView | null;
	/** Whether the preview pane is currently shown. */
	previewActive: boolean;
	/** Callback when the user clicks the preview toggle. */
	onTogglePreview?: () => void;
	/** Hide the preview button entirely (when `<MarkdownEditor preview>` isn't enabled at all). */
	allowPreview: boolean;
}

/**
 * Wrap the current selection (or insert at the cursor) with `prefix`/`suffix`.
 * Used for **bold**, *italic*, `code`, and link insertion.
 */
function wrap(view: EditorView | null, prefix: string, suffix = prefix) {
	if (!view) return;
	const { state } = view;
	const changes = state.changeByRange((range) => ({
		changes: [
			{ from: range.from, insert: prefix },
			{ from: range.to, insert: suffix },
		],
		range: range.empty
			? EditorSelection.cursor(range.from + prefix.length)
			: EditorSelection.range(range.from + prefix.length, range.to + prefix.length),
	}));
	view.dispatch({ ...changes, userEvent: "input.format" });
	view.focus();
}

/** Toggle a per-line prefix (e.g. `- ` or `1. `) on every line in the selection. */
function togglePrefix(view: EditorView | null, prefix: string) {
	if (!view) return;
	const { state } = view;
	const changes = state.changeByRange((range) => {
		const startLine = state.doc.lineAt(range.from);
		const endLine = state.doc.lineAt(range.to);
		const inserts: { from: number; insert: string }[] = [];
		for (let n = startLine.number; n <= endLine.number; n++) {
			const line = state.doc.line(n);
			if (!line.text.startsWith(prefix)) {
				inserts.push({ from: line.from, insert: prefix });
			}
		}
		return {
			changes: inserts,
			range,
		};
	});
	view.dispatch({ ...changes, userEvent: "input.format" });
	view.focus();
}

/** Insert a markdown link at the cursor with the selected text as the label. */
function insertLink(view: EditorView | null) {
	if (!view) return;
	const { state } = view;
	const sel = state.sliceDoc(state.selection.main.from, state.selection.main.to);
	const label = sel || "link";
	const replacement = `[${label}](https://)`;
	view.dispatch({
		changes: { from: state.selection.main.from, to: state.selection.main.to, insert: replacement },
		selection: {
			anchor: state.selection.main.from + label.length + 3,
			head: state.selection.main.from + label.length + 11,
		},
		userEvent: "input.format",
	});
	view.focus();
}

export function MdToolbar({ view, previewActive, onTogglePreview, allowPreview }: MdToolbarProps) {
	return (
		<ToolbarShell aria-label="Markdown formatting">
			<Toggle size="sm" aria-label="Bold" onPressedChange={() => wrap(view, "**")}>
				<Icon name="Bold" />
			</Toggle>
			<Toggle size="sm" aria-label="Italic" onPressedChange={() => wrap(view, "*")}>
				<Icon name="Italic" />
			</Toggle>
			<Toggle size="sm" aria-label="Inline code" onPressedChange={() => wrap(view, "`")}>
				<Icon name="Code" />
			</Toggle>
			<ToolbarDivider />
			<Toggle size="sm" aria-label="Bullet list" onPressedChange={() => togglePrefix(view, "- ")}>
				<Icon name="List" />
			</Toggle>
			<Toggle
				size="sm"
				aria-label="Numbered list"
				onPressedChange={() => togglePrefix(view, "1. ")}
			>
				<Icon name="ListOrdered" />
			</Toggle>
			<Toggle size="sm" aria-label="Block quote" onPressedChange={() => togglePrefix(view, "> ")}>
				<Icon name="Quote" />
			</Toggle>
			<ToolbarDivider />
			<Toggle size="sm" aria-label="Insert link" onPressedChange={() => insertLink(view)}>
				<Icon name="Link" />
			</Toggle>
			{allowPreview && onTogglePreview && (
				<>
					<ToolbarDivider />
					<Toggle
						size="sm"
						aria-label={previewActive ? "Hide preview" : "Show preview"}
						pressed={previewActive}
						onPressedChange={onTogglePreview}
					>
						<Icon name={previewActive ? "EyeOff" : "Eye"} />
					</Toggle>
				</>
			)}
		</ToolbarShell>
	);
}
