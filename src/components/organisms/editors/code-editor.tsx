"use client";

import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { markdown as markdownLang } from "@codemirror/lang-markdown";
import { EditorState, type Extension } from "@codemirror/state";
import {
	EditorView,
	keymap,
	lineNumbers as lineNumbersExt,
	placeholder as placeholderExt,
} from "@codemirror/view";
import * as React from "react";

import { cn } from "../../../lib/utils";
import { useCodemirrorTheme } from "./use-codemirror-theme";

export type CodeEditorLanguage = "javascript" | "typescript" | "json" | "markdown" | "html" | "css";

export interface CodeEditorProps {
	value: string;
	onChange: (next: string) => void;
	language: CodeEditorLanguage;
	placeholder?: string;
	disabled?: boolean;
	readonly?: boolean;
	ariaLabel: string;
	className?: string;
	/** Render the gutter with line numbers. Default true. */
	lineNumbers?: boolean;
	/** Pixel height (or any CSS length). Default `240`. */
	height?: number | string;
	/** Extra CodeMirror extensions appended after the canvas defaults. */
	extensions?: Extension[];
}

const LANGUAGE_EXTENSIONS: Record<CodeEditorLanguage, () => Extension> = {
	javascript: () => javascript(),
	typescript: () => javascript({ jsx: true, typescript: true }),
	json: () => json(),
	markdown: () => markdownLang(),
	html: () => html(),
	css: () => css(),
};

/**
 * Source-code editor backed by CodeMirror 6. Pick a language with the
 * `language` prop; the wrapper loads the matching highlighter and applies
 * canvas-themed colours via `useCodemirrorTheme()`.
 */
const CodeEditor = React.forwardRef<HTMLDivElement, CodeEditorProps>(
	(
		{
			value,
			onChange,
			language,
			placeholder,
			disabled = false,
			readonly = false,
			ariaLabel,
			className,
			lineNumbers = true,
			height = 240,
			extensions: extraExtensions,
		},
		ref,
	) => {
		const editorParentRef = React.useRef<HTMLDivElement>(null);
		const viewRef = React.useRef<EditorView | null>(null);
		const onChangeRef = React.useRef(onChange);
		onChangeRef.current = onChange;
		const theme = useCodemirrorTheme();

		React.useEffect(() => {
			if (!editorParentRef.current) return;
			const extensions: Extension[] = [
				history(),
				keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
				LANGUAGE_EXTENSIONS[language](),
				EditorView.lineWrapping,
				theme,
				EditorView.editable.of(!disabled),
				EditorState.readOnly.of(disabled || readonly),
			];
			if (lineNumbers) extensions.push(lineNumbersExt());
			if (placeholder) extensions.push(placeholderExt(placeholder));
			extensions.push(
				EditorView.updateListener.of((update) => {
					if (update.docChanged) {
						onChangeRef.current(update.state.doc.toString());
					}
				}),
			);
			if (extraExtensions) extensions.push(...extraExtensions);

			const v = new EditorView({
				state: EditorState.create({ doc: value, extensions }),
				parent: editorParentRef.current,
			});
			viewRef.current = v;
			return () => {
				v.destroy();
				viewRef.current = null;
			};
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [theme, language, lineNumbers, disabled, readonly, placeholder]);

		React.useEffect(() => {
			const v = viewRef.current;
			if (!v) return;
			const current = v.state.doc.toString();
			if (current !== value) {
				v.dispatch({ changes: { from: 0, to: current.length, insert: value } });
			}
		}, [value]);

		const heightStyle = typeof height === "number" ? `${height}px` : height;

		return (
			<div
				ref={ref}
				role="group"
				aria-label={ariaLabel}
				className={cn(
					"overflow-hidden rounded-md border border-input bg-background shadow-sm focus-within:ring-1 focus-within:ring-ring",
					disabled && "pointer-events-none opacity-50",
					className,
				)}
				style={{ height: heightStyle }}
			>
				<div ref={editorParentRef} className="h-full overflow-y-auto" />
			</div>
		);
	},
);
CodeEditor.displayName = "CodeEditor";

export { CodeEditor };
