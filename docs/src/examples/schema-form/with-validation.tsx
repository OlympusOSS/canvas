import { type RJSFSchema, SchemaForm } from "@olympusoss/canvas";

const schema: RJSFSchema = {
	type: "object",
	required: ["password"],
	properties: {
		password: {
			type: "string",
			title: "Password",
			minLength: 8,
			pattern: "^(?=.*[A-Z])(?=.*\\d).+$",
		},
	},
};

export default function App() {
	return (
		<div className="mx-auto w-full max-w-sm">
			<SchemaForm
				schema={schema}
				uiSchema={{ password: { "ui:widget": "password" } }}
				onSubmit={(e) => alert(JSON.stringify(e.formData))}
			/>
			<p className="mt-2 text-xs text-muted-foreground">
				Min 8 characters, at least one capital letter and one number.
			</p>
		</div>
	);
}
