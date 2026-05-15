"use client";

import { Eye, EyeOff } from "lucide-react";
import * as React from "react";

import { cn } from "../../lib/utils";
import { Button } from "../atoms/button";
import { Input } from "../atoms/input";

export interface PasswordInputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
	/**
	 * Initial visibility state. Pair with `onVisibilityChange` for a
	 * controlled input.
	 * @default false
	 */
	defaultVisible?: boolean;
	/** Controlled visibility. Overrides `defaultVisible`. */
	visible?: boolean;
	/** Fired when the user clicks the eye toggle. */
	onVisibilityChange?: (visible: boolean) => void;
	/**
	 * Accessible label on the eye toggle button.
	 * @default "Toggle password visibility"
	 */
	toggleLabel?: string;
}

/**
 * Password input with a show/hide eye toggle. Renders as an `Input` (atom)
 * with a `Button` (atom) absolutely positioned at the trailing edge.
 *
 * Use anywhere a password field is needed: login, registration, settings,
 * reset flows.
 */
const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
	(
		{
			defaultVisible = false,
			visible: controlledVisible,
			onVisibilityChange,
			toggleLabel = "Toggle password visibility",
			className,
			...props
		},
		ref,
	) => {
		const [internalVisible, setInternalVisible] = React.useState(defaultVisible);
		const visible = controlledVisible ?? internalVisible;

		const toggle = () => {
			const next = !visible;
			if (controlledVisible === undefined) setInternalVisible(next);
			onVisibilityChange?.(next);
		};

		return (
			<div className="relative">
				<Input
					ref={ref}
					type={visible ? "text" : "password"}
					className={cn("pr-10", className)}
					{...props}
				/>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					onClick={toggle}
					aria-label={toggleLabel}
					aria-pressed={visible}
					className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:text-foreground"
					tabIndex={-1}
				>
					{visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
				</Button>
			</div>
		);
	},
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
