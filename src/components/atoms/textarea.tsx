import * as React from "react";

import { cn } from "../../lib/utils";

export interface TextareaProps extends React.ComponentProps<"textarea"> {
	/** Controlled value. Pair with `onChange`. */
	value?: string | number | readonly string[];
	/** Uncontrolled initial value. */
	defaultValue?: string | number | readonly string[];
	/** Hint text shown when empty. */
	placeholder?: string;
	/**
	 * Visible row count. Canvas's default min-height is 60px regardless;
	 * `rows` overrides.
	 */
	rows?: number;
	/** Visible column count (width). Canvas overrides this with `w-full`. */
	cols?: number;
	/**
	 * Dim and block input.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Selectable but not editable.
	 * @default false
	 */
	readOnly?: boolean;
	/**
	 * Block native form submit unless the textarea has a value.
	 * @default false
	 */
	required?: boolean;
	/** Form field name for native form submission. */
	name?: string;
	/** DOM id for `<Label htmlFor>` association. */
	id?: string;
	/** Browser autofill hint. */
	autoComplete?: string;
	/**
	 * Focus on mount.
	 * @default false
	 */
	autoFocus?: boolean;
	/** Character count upper limit. */
	maxLength?: number;
	/** Character count lower limit. */
	minLength?: number;
	/** Fires on every keystroke. */
	onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
	/** Fires on focus. */
	onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
	/** Fires on blur. */
	onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
	className?: string;
}

/**
 * Styled wrapper around the native `<textarea>`. 60px min-height, rounded-md,
 * 1px border, transparent background.
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, ...props }, ref) => {
		return (
			<textarea
				className={cn(
					"flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Textarea.displayName = "Textarea";

export { Textarea };
