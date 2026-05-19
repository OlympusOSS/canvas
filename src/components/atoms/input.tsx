import * as React from "react";

import { cn } from "../../lib/utils";

export interface InputProps extends React.ComponentProps<"input"> {
	/**
	 * Native input type. Drives keyboard, validation, and on iOS the
	 * picker.
	 * @default "text"
	 */
	type?: React.HTMLInputTypeAttribute;
	/**
	 * Controlled value. Pair with `onChange`. For uncontrolled inputs use
	 * `defaultValue` instead.
	 */
	value?: string | number | readonly string[];
	/** Initial value for an uncontrolled input. Ignored if `value` is also passed. */
	defaultValue?: string | number | readonly string[];
	/** Hint text shown when the input is empty. Renders in `text-muted-foreground`. */
	placeholder?: string;
	/**
	 * Visually dims to 50% and blocks all input. Pair with `Label` so the
	 * dim cascades.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Selectable but not editable. Useful for displaying server-set values.
	 * @default false
	 */
	readOnly?: boolean;
	/**
	 * Block native form submit unless the input has a value.
	 * @default false
	 */
	required?: boolean;
	/** Form field name. Required when relying on uncontrolled native form submission. */
	name?: string;
	/** DOM id. Match this from `<Label htmlFor>` for screen-reader association. */
	id?: string;
	/** Browser autofill hint. See MDN for the full token list. */
	autoComplete?: string;
	/**
	 * Focus the input on mount. Use sparingly — surprises keyboard users.
	 * @default false
	 */
	autoFocus?: boolean;
	/** Native HTML5 validation regex. Triggers `:invalid` if the value doesn't match. */
	pattern?: string;
	/** Character count limit for text inputs. */
	maxLength?: number;
	/** Minimum character count for text inputs. */
	minLength?: number;
	/** Numeric / date lower bound. Honoured by `type="number"` / `"date"` / `"time"` / `"range"`. */
	min?: string | number;
	/** Numeric / date upper bound. */
	max?: string | number;
	/** Step increment for `number` / `range` / `date` types. */
	step?: string | number;
	/** Fires on every keystroke. Read `e.target.value`. Required if you pass `value`. */
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	/** Focus event. Common for focus-driven typeahead lookups. */
	onFocus?: React.FocusEventHandler<HTMLInputElement>;
	/** Blur event. Common for blur-validation. */
	onBlur?: React.FocusEventHandler<HTMLInputElement>;
	className?: string;
}

/**
 * Styled wrapper around the native `<input>` — 36px tall, rounded-md, 1px
 * border, transparent background, canvas focus ring. Forwards every native
 * input attribute through to the underlying element.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				data-slot="input"
				className={cn(
					"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = "Input";

export { Input };
