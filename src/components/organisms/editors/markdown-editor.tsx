"use client";

/* c8 ignore file -- CodeMirror requires real DOM measurements; jsdom-incompatible.
 * Verified visually in the docs site. */

import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { markdown } from "@codemirror/lang-markdown";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap, placeholder as placeholderExt } from "@codemirror/view";
import * as React from "react";

import { cn } from "../../../lib/utils";
import { renderMarkdown } from "./markdown-renderer";
import { PROSE_CANVAS_CLASSES } from "./prose-canvas-classes";
import { MdToolbar } from "./toolbar/md-toolbar";
import { useCodemirrorTheme } from "./use-codemirror-theme";

export interface MarkdownEditorProps {
	value: string;
	onChange: (next: string) => void;
	placeholder?: string;
	disabled?: boolean;
	readonly?: boolean;
	ariaLabel: string;
	className?: string;
	/** Show the formatting toolbar above the editor. Default true. */
	toolbar?: boolean;
	/** Render a side-by-side preview pane that re-renders on every keystroke. Default false. */
	preview?: boolean;
	/** Pixel height (or any CSS length) of the editing surface. Default `240`. */
	height?: number | string;
}

/**
 * Markdown editor backed by CodeMirror 6 with markdown syntax highlighting,
 * a canvas-styled toolbar, and an optional sanitized preview pane.
 *
 * Controlled component. `value` is the markdown source string; `onChange`
 * fires on every doc change.
 */
const MarkdownEditor = React.forwardRef<HTMLDivElement, MarkdownEditorProps>(
	(
		{
			value,
			onChange,
			placeholder,
			disabled = false,
			readonly = false,
			ariaLabel,
			className,
			toolbar = true,
			preview = false,
			height = 240,
		},
		ref,
	) => {
		const editorParentRef = React.useRef<HTMLDivElement>(null);
		const viewRef = React.useRef<EditorView | null>(null);
		const onChangeRef = React.useRef(onChange);
		onChangeRef.current = onChange;
		const theme = useCodemirrorTheme();
		const [previewOpen, setPreviewOpen] = React.useState(preview);
		const [view, setView] = React.useState<EditorView | null>(null);

		// Mount/teardown the CodeMirror view whenever extensions change.
		React.useEffect(() => {
			if (!editorParentRef.current) return;
			const extensions = [
				history(),
				keymap.of([...defaultKeymap, ...historyKeymap]),
				markdown(),
				EditorView.lineWrapping,
				theme,
				EditorView.editable.of(!disabled),
				EditorState.readOnly.of(disabled || readonly),
				placeholder ? placeholderExt(placeholder) : [],
				EditorView.updateListener.of((update) => {
					if (update.docChanged) {
						onChangeRef.current(update.state.doc.toString());
					}
				}),
			].flat();

			const v = new EditorView({
				state: EditorState.create({ doc: value, extensions }),
				parent: editorParentRef.current,
			});
			viewRef.current = v;
			setView(v);
			return () => {
				v.destroy();
				viewRef.current = null;
				setView(null);
			};
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [theme, disabled, readonly, placeholder]);

		// Sync external `value` changes into the editor (without echoing back).
		React.useEffect(() => {
			const v = viewRef.current;
			if (!v) return;
			const current = v.state.doc.toString();
			if (current !== value) {
				v.dispatch({
					changes: { from: 0, to: current.length, insert: value },
				});
			}
		}, [value]);

		const heightStyle = typeof height === "number" ? `${height}px` : height;

		return (
			<div
				ref={ref}
				role="group"
				aria-label={ariaLabel}
				className={cn(
					"overflow-hidden rounded-md border border-input bg-background text-sm shadow-sm focus-within:ring-1 focus-within:ring-ring",
					disabled && "pointer-events-none opacity-50",
					className,
				)}
			>
				{toolbar && (
					<MdToolbar
						view={view}
						previewActive={previewOpen}
						onTogglePreview={() => setPreviewOpen((p) => !p)}
						allowPreview
					/>
				)}
				<div
					className={cn("grid", previewOpen ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1")}
					style={{ height: heightStyle }}
				>
					<div ref={editorParentRef} className="overflow-y-auto" />
					{previewOpen && (
						<div
							className={cn(
								"overflow-y-auto border-l border-border bg-muted/20 px-4 py-3",
								PROSE_CANVAS_CLASSES,
							)}
							// biome-ignore lint/security/noDangerouslySetInnerHtml: output is sanitized by DOMPurify in renderMarkdown
							dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
						/>
					)}
				</div>
			</div>
		);
	},
);
MarkdownEditor.displayName = "MarkdownEditor";

export { MarkdownEditor };
