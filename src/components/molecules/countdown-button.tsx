"use client";

import * as React from "react";

import { cn } from "../../lib/utils";
import { Button, type ButtonProps } from "../atoms/button";

export interface CountdownButtonProps
	extends Omit<ButtonProps, "disabled" | "onClick" | "children"> {
	/**
	 * Seconds to wait before the button becomes clickable. The countdown
	 * starts when the component mounts and resets every time `triggerKey`
	 * changes.
	 * @default 30
	 */
	duration?: number;
	/**
	 * Bump this value to restart the countdown (e.g. after a successful
	 * resend, set it to `Date.now()` so the button locks out again).
	 */
	triggerKey?: string | number;
	/** Called when the button is clicked and the countdown has elapsed. */
	onClick?: () => void;
	/**
	 * Render-prop for the button label. Receives `secondsLeft` (0 when
	 * ready). Default renders `"Resend"` / `"Resend in 23s"`.
	 */
	children?: React.ReactNode | ((secondsLeft: number) => React.ReactNode);
	/**
	 * Action verb shown in the default label. Used as `${verb}` when ready
	 * and `${verb} in Ns` while counting down.
	 * @default "Resend"
	 */
	verb?: string;
}

/**
 * Button that locks out for a duration after mount or after `triggerKey`
 * changes. Renders countdown text while disabled.
 *
 * Use for "resend code" / "resend email" flows where the user shouldn't be
 * able to spam the action. Triggering a new send from elsewhere should
 * update `triggerKey` to restart the lockout.
 */
const CountdownButton = React.forwardRef<HTMLButtonElement, CountdownButtonProps>(
	(
		{ duration = 30, triggerKey, onClick, children, verb = "Resend", className, ...buttonProps },
		ref,
	) => {
		const [secondsLeft, setSecondsLeft] = React.useState(duration);

		React.useEffect(() => {
			setSecondsLeft(duration);
			const interval = setInterval(() => {
				setSecondsLeft((s) => {
					if (s <= 1) {
						clearInterval(interval);
						return 0;
					}
					return s - 1;
				});
			}, 1000);
			return () => clearInterval(interval);
		}, [duration, triggerKey]);

		const ready = secondsLeft <= 0;
		const labelNode =
			typeof children === "function"
				? children(secondsLeft)
				: children !== undefined
					? children
					: ready
						? verb
						: `${verb} in ${secondsLeft}s`;

		return (
			<Button
				ref={ref}
				type="button"
				disabled={!ready}
				onClick={() => ready && onClick?.()}
				className={cn(className)}
				{...buttonProps}
			>
				{labelNode}
			</Button>
		);
	},
);
CountdownButton.displayName = "CountdownButton";

export { CountdownButton };
