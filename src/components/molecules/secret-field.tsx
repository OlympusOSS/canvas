"use client";

import * as React from "react";

import { cn } from "../../lib/utils";
import { Icon } from "../atoms/icon";
import { Input } from "../atoms/input";
import { Label } from "../atoms/label";

export type SecretFieldStatus = "idle" | "validating" | "valid" | "invalid";

export interface SecretFieldProps {
	id: string;
	value: string;
	onChange: (value: string) => void;
	/**
	 * Async validator. Return `true` (or any string) on success; throw or return
	 * `false` on failure. The thrown message is shown below the input.
	 */
	onValidate?: (value: string) => Promise<boolean | string>;
	/**
	 * Called after successful validation with the validated value.
	 * Use this to persist the value once it's confirmed valid.
	 */
	onSave?: (value: string) => void;
	/**
	 * Notifies when the validation status changes. Useful for parent state.
	 */
	onStatusChange?: (status: SecretFieldStatus) => void;
	placeholder?: string;
	label?: string;
	disabled?: boolean;
	/** Minimum length before auto-validation starts. Default 3. */
	minLength?: number;
	/** Show the reveal (eye) toggle. Default true. */
	revealable?: boolean;
	className?: string;
}

export function SecretField({
	id,
	value,
	onChange,
	onValidate,
	onSave,
	onStatusChange,
	placeholder,
	label,
	disabled,
	minLength = 3,
	revealable = true,
	className,
}: SecretFieldProps) {
	const [visible, setVisible] = React.useState(false);
	const [status, setStatus] = React.useState<SecretFieldStatus>("idle");
	const [error, setError] = React.useState("");
	const debounceRef = React.useRef(0);
	const lastValidatedRef = React.useRef("");

	React.useEffect(() => {
		onStatusChange?.(status);
	}, [status, onStatusChange]);

	React.useEffect(() => {
		if (!onValidate) return;
		if (!value || value.length < minLength) {
			setStatus("idle");
			setError("");
			return;
		}
		/* c8 ignore next -- race-condition guard: only triggered by rapid input */
		if (value === lastValidatedRef.current) return;

		const id = ++debounceRef.current;
		setStatus("validating");
		setError("");

		const timer = setTimeout(async () => {
			/* c8 ignore next -- race-condition guard: debounce re-entry unreachable in tests */
			if (id !== debounceRef.current) return;
			try {
				const result = await onValidate(value);
				/* c8 ignore next -- race-condition guard: await-resolved stale id unreachable in tests */
				if (id !== debounceRef.current) return;
				if (result === true || typeof result === "string") {
					setStatus("valid");
					setError("");
					lastValidatedRef.current = value;
					onSave?.(value);
				} else {
					setStatus("invalid");
					setError("Validation failed");
				}
			} catch (err) {
				/* c8 ignore next -- race-condition guard: await-rejected stale id unreachable in tests */
				if (id !== debounceRef.current) return;
				setStatus("invalid");
				setError(err instanceof Error ? err.message : "Validation failed");
			}
		}, 800);

		return () => clearTimeout(timer);
	}, [value, minLength, onValidate, onSave]);

	const handleChange = (v: string) => {
		onChange(v);
		if (error) setError("");
		lastValidatedRef.current = "";
	};

	return (
		<div className={cn("space-y-1", className)}>
			{label && (
				<Label htmlFor={id} className="text-xs">
					{label}
				</Label>
			)}
			<div className="relative">
				<Input
					id={id}
					type={visible ? "text" : "password"}
					value={value}
					onChange={(e) => handleChange(e.target.value)}
					placeholder={placeholder}
					className={cn(
						"font-mono text-sm",
						revealable && "pr-16",
						!revealable && "pr-10",
						status === "invalid" && "border-destructive",
						status === "valid" && "border-green-500/50",
					)}
					disabled={disabled}
				/>
				<div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
					{status === "validating" && (
						<Icon name="LoaderCircle" className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
					)}
					{status === "valid" && <Icon name="CircleCheck" className="h-3.5 w-3.5 text-green-500" />}
					{status === "invalid" && <Icon name="CircleX" className="h-3.5 w-3.5 text-destructive" />}
					{revealable && (
						<button
							type="button"
							onClick={() => setVisible((v) => !v)}
							aria-label={visible ? "Hide value" : "Show value"}
							className="text-muted-foreground hover:text-foreground transition-colors"
							tabIndex={-1}
						>
							<Icon name={visible ? "EyeOff" : "Eye"} className="h-4 w-4" />
						</button>
					)}
				</div>
			</div>
			{error && <p className="text-xs text-destructive">{error}</p>}
		</div>
	);
}

SecretField.displayName = "SecretField";
