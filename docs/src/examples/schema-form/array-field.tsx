import { type RJSFSchema, SchemaForm } from "@olympusoss/canvas";

const schema: RJSFSchema = {
	type: "object",
	properties: {
		tags: {
			type: "array",
			title: "Tags",
			items: { type: "string" },
		},
	},
};

export default function App() {
	return (
		<div className="mx-auto w-full max-w-md">
			<SchemaForm
				schema={schema}
				formData={{ tags: ["feature", "bug"] }}
				onSubmit={(e) => alert(JSON.stringify(e.formData))}
			/>
		</div>
	);
}
