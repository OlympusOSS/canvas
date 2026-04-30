import { type RJSFSchema, SchemaForm, type UiSchema } from "@olympusoss/canvas";

const schema: RJSFSchema = {
	type: "object",
	properties: {
		title: { type: "string", title: "Project title" },
		notes: { type: "string", title: "Notes" },
		secret: { type: "string", title: "Webhook secret" },
	},
};

const uiSchema: UiSchema = {
	notes: { "ui:widget": "textarea", "ui:placeholder": "Optional release notes…" },
	secret: { "ui:widget": "password" },
};

export default function App() {
	return (
		<div className="mx-auto w-full max-w-sm">
			<SchemaForm
				schema={schema}
				uiSchema={uiSchema}
				onSubmit={(e) => alert(JSON.stringify(e.formData))}
			/>
		</div>
	);
}
