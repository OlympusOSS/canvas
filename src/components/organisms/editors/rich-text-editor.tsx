"use client";

import { Link } from "@tiptap/extension-link";
import { Placeholder } from "@tiptap/extension-placeholder";
import { EditorContent, type Extensions, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import * as React from "react";

import { cn } from "../../../lib/utils";
import { PROSE_CANVAS_CLASSES } from "./prose-canvas-classes";
import { RteToolbar, type ToolbarItemId } from "./toolbar/rte-toolbar";

export interface RichTextEditorProps {
	value: string;
	onChange: (next: string) => void;
	placeholder?: string;
	disabled?: boolean;
	readonly?: boolean;
	ariaLabel: string;
	className?: string;
	/** Show the toolbar above the editor. Default true. */
	toolbar?: boolean;
	/** Whitelist of toolbar buttons. Default: all. See `TOOLBAR_ITEM_IDS`. */
	toolbarItems?: readonly ToolbarItemId[];
	/** Output format for `value` / `onChange`. Default `"html"`. */
	outputFormat?: "html" | "json";
	/** Pixel height (or any CSS length) of the editing surface. Default `240`. */
	height?: number | string;
	/** Extra Tiptap extensions appended after the canvas defaults. */
	extensions?: Extensions;
}

/**
 * Rich text editor backed by Tiptap (ProseMirror). Ships with bold / italic /
 * strike / code / list / blockquote / code-block / link / heading levels.
 *
 * Controlled component: `value` is an HTML string by default, or a JSON string
 * when `outputFormat="json"`. `onChange` fires on every doc update.
 */
const RichTextEditor = React.forwardRef<HTMLDivElement, RichTextEditorProps>(
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
			toolbarItems,
			outputFormat = "html",
			height = 240,
			extensions: extraExtensions,
		},
		ref,
	) => {
		const onChangeRef = React.useRef(onChange);
		onChangeRef.current = onChange;

		const editor = useEditor({
			extensions: [
				StarterKit,
				Link.configure({ openOnClick: false, autolink: true }),
				...(placeholder ? [Placeholder.configure({ placeholder })] : []),
				...(extraExtensions ?? []),
			],
			content: value,
			editable: !disabled && !readonly,
			editorProps: {
				attributes: {
					"aria-label": ariaLabel,
					"aria-multiline": "true",
					role: "textbox",
					class: cn("min-h-full w-full px-4 py-3 outline-none", PROSE_CANVAS_CLASSES),
				},
			},
			onUpdate: ({ editor: e }) => {
				const next = outputFormat === "json" ? JSON.stringify(e.getJSON()) : e.getHTML();
				onChangeRef.current(next);
			},
			immediatelyRender: false,
		});

		// Keep `editable` in sync with prop changes.
		React.useEffect(() => {
			editor?.setEditable(!disabled && !readonly);
		}, [editor, disabled, readonly]);

		// Sync external `value` changes into the editor (without echoing back).
		React.useEffect(() => {
			if (!editor) return;
			const current = outputFormat === "json" ? JSON.stringify(editor.getJSON()) : editor.getHTML();
			if (current !== value) {
				const incoming = outputFormat === "json" && value ? JSON.parse(value) : value;
				editor.commands.setContent(incoming, false);
			}
		}, [editor, value, outputFormat]);

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
				{toolbar && <RteToolbar editor={editor} items={toolbarItems} />}
				<div className="overflow-y-auto" style={{ height: heightStyle }}>
					<EditorContent editor={editor} className="h-full" />
				</div>
			</div>
		);
	},
);
RichTextEditor.displayName = "RichTextEditor";

export { RichTextEditor };
