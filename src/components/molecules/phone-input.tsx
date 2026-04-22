"use client";

import parsePhoneNumber, {
	type CountryCode,
	getCountries,
	getCountryCallingCode,
	isValidPhoneNumber,
} from "libphonenumber-js";
import * as React from "react";

import { cn } from "../../lib/utils";
import { Input } from "../atoms/input";
import { Label } from "../atoms/label";

export interface PhoneInputProps {
	id: string;
	value?: string;
	onChange: (e164Value: string | undefined) => void;
	label?: string;
	placeholder?: string;
	disabled?: boolean;
	readonly?: boolean;
	required?: boolean;
	/** Default country ISO code if the value is empty. Default: "US". */
	defaultCountry?: CountryCode;
	/** Override the list of selectable countries (defaults to all). */
	countryCodes?: CountryCode[];
	/** Called with error string (or "" when valid/cleared). */
	onValidityChange?: (error: string) => void;
	className?: string;
}

interface CountryOption {
	code: CountryCode;
	name: string;
	callingCode: string;
	label: string;
}

function buildCountryOptions(codes?: CountryCode[]): CountryOption[] {
	const list = codes ?? getCountries();
	const displayNames = new Intl.DisplayNames(["en"], { type: "region" });
	return list
		.map((code) => {
			const callingCode = getCountryCallingCode(code);
			const name = displayNames.of(code) || code;
			return {
				code,
				name,
				callingCode: `+${callingCode}`,
				label: `${name} (+${callingCode})`,
			};
		})
		.sort((a, b) => a.name.localeCompare(b.name));
}

export function PhoneInput({
	id,
	value,
	onChange,
	label,
	placeholder,
	disabled,
	readonly,
	required,
	defaultCountry = "US",
	countryCodes,
	onValidityChange,
	className,
}: PhoneInputProps) {
	const [selectedCountry, setSelectedCountry] = React.useState<CountryCode>(defaultCountry);
	const [localValue, setLocalValue] = React.useState("");
	const [error, setError] = React.useState("");

	const countryOptions = React.useMemo(() => buildCountryOptions(countryCodes), [countryCodes]);

	// Hydrate state from an external E.164 value.
	React.useEffect(() => {
		if (!value) {
			setLocalValue("");
			return;
		}
		try {
			const parsed = parsePhoneNumber(value);
			if (parsed) {
				if (parsed.country) setSelectedCountry(parsed.country);
				setLocalValue(parsed.nationalNumber ?? "");
			} else {
				setLocalValue(value);
			}
		} catch {
			setLocalValue(value);
		}
	}, [value]);

	const updateValidity = React.useCallback(
		(e164: string) => {
			if (!e164) {
				const err = required ? "Phone number is required" : "";
				setError(err);
				onValidityChange?.(err);
				return;
			}
			const valid = isValidPhoneNumber(e164);
			const err = valid ? "" : "Enter a valid phone number";
			setError(err);
			onValidityChange?.(err);
		},
		[required, onValidityChange],
	);

	const emit = (country: CountryCode, national: string) => {
		if (!national.trim()) {
			onChange(undefined);
			updateValidity("");
			return;
		}
		const callingCode = getCountryCallingCode(country);
		const e164 = `+${callingCode}${national.replace(/\D/g, "")}`;
		onChange(e164);
		updateValidity(e164);
	};

	return (
		<div className={cn("space-y-1.5", className)}>
			{label && (
				<Label htmlFor={id}>
					{label}
					{required && <span className="ml-0.5 text-destructive">*</span>}
				</Label>
			)}
			<div className="flex gap-2">
				<select
					aria-label="Country"
					value={selectedCountry}
					onChange={(e) => {
						const next = e.target.value as CountryCode;
						setSelectedCountry(next);
						emit(next, localValue);
					}}
					disabled={disabled || readonly}
					className={cn(
						"h-9 rounded-md border border-input bg-background px-2 text-sm",
						"focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
					)}
				>
					{countryOptions.map((opt) => (
						<option key={opt.code} value={opt.code}>
							{opt.label}
						</option>
					))}
				</select>
				<Input
					id={id}
					type="tel"
					inputMode="tel"
					value={localValue}
					onChange={(e) => {
						const v = e.target.value;
						setLocalValue(v);
						emit(selectedCountry, v);
					}}
					placeholder={placeholder}
					disabled={disabled}
					readOnly={readonly}
					className={cn(error && "border-destructive focus-visible:ring-destructive")}
				/>
			</div>
			{error && <p className="text-xs text-destructive">{error}</p>}
		</div>
	);
}

PhoneInput.displayName = "PhoneInput";
