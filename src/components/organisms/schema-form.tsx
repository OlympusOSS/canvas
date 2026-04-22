"use client";

import Form, { type IChangeEvent, type FormProps as RJSFFormProps } from "@rjsf/core";
import type {
	FieldTemplateProps,
	ObjectFieldTemplateProps,
	RegistryWidgetsType,
	RJSFSchema,
	SubmitButtonProps,
	TemplatesType,
	UiSchema,
	WidgetProps,
} from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import type * as React from "react";

import { cn } from "../../lib/utils";
import { Input } from "../atoms/input";
import { Label } from "../atoms/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

/* ────────────────────────────────────────────────────────────────
   Default widgets — Canvas-styled inputs for RJSF
   ──────────────────────────────────────────────────────────────── */

const TextWidget: React.FC<WidgetProps> = ({
	id,
	value,
	onChange,
	onBlur,
	onFocus,
	placeholder,
	disabled,
	readonly,
	required,
	label,
	schema,
}) => {
	const isEmail = schema.format === "email";
	const inputType = isEmail ? "email" : "text";
	return (
		<div className="space-y-1.5">
			{label && (
				<Label htmlFor={id}>
					{label}
					{required && <span className="ml-0.5 text-destructive">*</span>}
				</Label>
			)}
			<Input
				id={id}
				type={inputType}
				value={value ?? ""}
				onChange={(e) => onChange(e.target.value === "" ? undefined : e.target.value)}
				onBlur={onBlur ? () => onBlur(id, value) : undefined}
				onFocus={onFocus ? () => onFocus(id, value) : undefined}
				placeholder={placeholder}
				disabled={disabled}
				readOnly={readonly}
			/>
		</div>
	);
};

const SelectWidget: React.FC<WidgetProps> = ({
	id,
	value,
	onChange,
	disabled,
	readonly,
	required,
	options,
	label,
	placeholder,
}) => {
	const enumOptions = (options.enumOptions as Array<{ value: unknown; label: string }>) ?? [];
	return (
		<div className="space-y-1.5">
			{label && (
				<Label htmlFor={id}>
					{label}
					{required && <span className="ml-0.5 text-destructive">*</span>}
				</Label>
			)}
			<Select
				value={value ? String(value) : undefined}
				onValueChange={(v) => onChange(v === "" ? undefined : v)}
				disabled={disabled || readonly}
			>
				<SelectTrigger id={id}>
					<SelectValue placeholder={placeholder ?? "Select…"} />
				</SelectTrigger>
				<SelectContent>
					{enumOptions.map((opt) => (
						<SelectItem key={String(opt.value)} value={String(opt.value)}>
							{opt.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
};

/* ────────────────────────────────────────────────────────────────
   Default templates
   ──────────────────────────────────────────────────────────────── */

const FieldTemplate: React.FC<FieldTemplateProps> = ({
	children,
	description,
	errors,
	help,
	hidden,
}) => {
	if (hidden) return null;
	return (
		<div className="space-y-1">
			{children}
			{description && <div className="text-xs text-muted-foreground">{description}</div>}
			{errors && <div className="text-xs text-destructive">{errors}</div>}
			{help && <div className="text-xs text-muted-foreground">{help}</div>}
		</div>
	);
};

const ObjectFieldTemplate: React.FC<ObjectFieldTemplateProps> = ({
	title,
	description,
	properties,
}) => (
	<div className="space-y-4">
		{title && <h3 className="text-base font-semibold">{title}</h3>}
		{description && <p className="text-sm text-muted-foreground">{description}</p>}
		{properties.map((p) => (
			<div key={p.name}>{p.content}</div>
		))}
	</div>
);

const SubmitButton: React.FC<SubmitButtonProps> = () => null;

/* ────────────────────────────────────────────────────────────────
   Exported widget/template packs
   ──────────────────────────────────────────────────────────────── */

export const canvasSchemaFormWidgets: RegistryWidgetsType = {
	TextWidget,
	EmailWidget: TextWidget,
	URLWidget: TextWidget,
	SelectWidget,
};

export const canvasSchemaFormTemplates: Partial<TemplatesType> = {
	FieldTemplate,
	ObjectFieldTemplate,
	ButtonTemplates: {
		SubmitButton,
		AddButton: () => null,
		MoveDownButton: () => null,
		MoveUpButton: () => null,
		RemoveButton: () => null,
		CopyButton: () => null,
		ClearButton: () => null,
	},
};

/* ────────────────────────────────────────────────────────────────
   SchemaForm — RJSF wrapper with Canvas defaults
   ──────────────────────────────────────────────────────────────── */

export interface SchemaFormProps<T = unknown>
	extends Omit<RJSFFormProps<T>, "validator" | "widgets" | "templates"> {
	schema: RJSFSchema;
	uiSchema?: UiSchema;
	/** Override or extend Canvas's default widget set. */
	widgets?: RegistryWidgetsType;
	/** Override or extend Canvas's default template set. */
	templates?: Partial<TemplatesType>;
	/** Supply a different RJSF validator (defaults to ajv8). */
	validator?: RJSFFormProps<T>["validator"];
	className?: string;
}

export function SchemaForm<T = unknown>({
	schema,
	uiSchema,
	widgets,
	templates,
	validator: customValidator,
	className,
	children,
	...rest
}: SchemaFormProps<T>) {
	return (
		<div className={cn("space-y-4", className)}>
			<Form<T>
				schema={schema}
				uiSchema={uiSchema}
				validator={customValidator ?? validator}
				widgets={{ ...canvasSchemaFormWidgets, ...widgets }}
				templates={{ ...canvasSchemaFormTemplates, ...templates }}
				{...rest}
			>
				{children}
			</Form>
		</div>
	);
}

SchemaForm.displayName = "SchemaForm";

export type { IChangeEvent, RJSFSchema, UiSchema, WidgetProps };
