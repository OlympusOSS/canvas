"use client";

/* c8 ignore file -- Tiptap toolbar requires real DOM; jsdom-incompatible. */

import type { Editor } from "@tiptap/react";

import { Button } from "../../../atoms/button";
import { Icon } from "../../../atoms/icon";
import { Toggle } from "../../../atoms/toggle";
import { ToolbarDivider, ToolbarShell } from "./toolbar-shell";

export const TOOLBAR_ITEM_IDS = [
	"heading",
	"bold",
	"italic",
	"underline",
	"strike",
	"code",
	"codeBlock",
	"bulletList",
	"orderedList",
	"blockquote",
	"link",
	"undo",
	"redo",
] as const;
export type ToolbarItemId = (typeof TOOLBAR_ITEM_IDS)[number];

export interface RteToolbarProps {
	editor: Editor | null;
	/** Whitelist of toolbar items to render. Default: every item in `TOOLBAR_ITEM_IDS`. */
	items?: readonly ToolbarItemId[];
}

function show(items: readonly ToolbarItemId[] | undefined, id: ToolbarItemId) {
	return !items || items.includes(id);
}

export function RteToolbar({ editor, items }: RteToolbarProps) {
	if (!editor) return null;

	const setHeading = (level: 1 | 2 | 3 | null) => {
		if (level === null) editor.chain().focus().setParagraph().run();
		else editor.chain().focus().toggleHeading({ level }).run();
	};

	const insertLink = () => {
		const previous = editor.getAttributes("link").href as string | undefined;
		const url = window.prompt("URL", previous ?? "https://");
		if (url === null) return;
		if (url === "") editor.chain().focus().unsetLink().run();
		else
			editor
				.chain()
				.focus()
				.extendMarkRange("link")
				.setLink({ href: url, target: "_blank", rel: "noopener noreferrer" })
				.run();
	};

	return (
		<ToolbarShell aria-label="Rich text formatting">
			{show(items, "heading") && (
				<>
					<Toggle
						size="sm"
						aria-label="Heading 1"
						pressed={editor.isActive("heading", { level: 1 })}
						onPressedChange={() => setHeading(1)}
					>
						<Icon name="Heading1" />
					</Toggle>
					<Toggle
						size="sm"
						aria-label="Heading 2"
						pressed={editor.isActive("heading", { level: 2 })}
						onPressedChange={() => setHeading(2)}
					>
						<Icon name="Heading2" />
					</Toggle>
					<Toggle
						size="sm"
						aria-label="Heading 3"
						pressed={editor.isActive("heading", { level: 3 })}
						onPressedChange={() => setHeading(3)}
					>
						<Icon name="Heading3" />
					</Toggle>
					<ToolbarDivider />
				</>
			)}
			{show(items, "bold") && (
				<Toggle
					size="sm"
					aria-label="Bold"
					pressed={editor.isActive("bold")}
					onPressedChange={() => editor.chain().focus().toggleBold().run()}
				>
					<Icon name="Bold" />
				</Toggle>
			)}
			{show(items, "italic") && (
				<Toggle
					size="sm"
					aria-label="Italic"
					pressed={editor.isActive("italic")}
					onPressedChange={() => editor.chain().focus().toggleItalic().run()}
				>
					<Icon name="Italic" />
				</Toggle>
			)}
			{show(items, "strike") && (
				<Toggle
					size="sm"
					aria-label="Strikethrough"
					pressed={editor.isActive("strike")}
					onPressedChange={() => editor.chain().focus().toggleStrike().run()}
				>
					<Icon name="Strikethrough" />
				</Toggle>
			)}
			{show(items, "code") && (
				<Toggle
					size="sm"
					aria-label="Inline code"
					pressed={editor.isActive("code")}
					onPressedChange={() => editor.chain().focus().toggleCode().run()}
				>
					<Icon name="Code" />
				</Toggle>
			)}
			<ToolbarDivider />
			{show(items, "bulletList") && (
				<Toggle
					size="sm"
					aria-label="Bullet list"
					pressed={editor.isActive("bulletList")}
					onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
				>
					<Icon name="List" />
				</Toggle>
			)}
			{show(items, "orderedList") && (
				<Toggle
					size="sm"
					aria-label="Ordered list"
					pressed={editor.isActive("orderedList")}
					onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
				>
					<Icon name="ListOrdered" />
				</Toggle>
			)}
			{show(items, "blockquote") && (
				<Toggle
					size="sm"
					aria-label="Block quote"
					pressed={editor.isActive("blockquote")}
					onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
				>
					<Icon name="Quote" />
				</Toggle>
			)}
			{show(items, "codeBlock") && (
				<Toggle
					size="sm"
					aria-label="Code block"
					pressed={editor.isActive("codeBlock")}
					onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
				>
					<Icon name="SquareCode" />
				</Toggle>
			)}
			<ToolbarDivider />
			{show(items, "link") && (
				<Toggle
					size="sm"
					aria-label="Insert link"
					pressed={editor.isActive("link")}
					onPressedChange={insertLink}
				>
					<Icon name="Link" />
				</Toggle>
			)}
			<ToolbarDivider />
			{show(items, "undo") && (
				<Button
					type="button"
					variant="ghost"
					size="sm"
					aria-label="Undo"
					disabled={!editor.can().undo()}
					onClick={() => editor.chain().focus().undo().run()}
				>
					<Icon name="Undo2" />
				</Button>
			)}
			{show(items, "redo") && (
				<Button
					type="button"
					variant="ghost"
					size="sm"
					aria-label="Redo"
					disabled={!editor.can().redo()}
					onClick={() => editor.chain().focus().redo().run()}
				>
					<Icon name="Redo2" />
				</Button>
			)}
		</ToolbarShell>
	);
}
