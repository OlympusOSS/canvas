import { type RJSFSchema, SchemaForm } from "@olympusoss/canvas";

const schema: RJSFSchema = {
	type: "object",
	required: ["name", "email"],
	properties: {
		name: { type: "string", title: "Full name" },
		email: { type: "string", format: "email", title: "Email" },
		country: {
			type: "string",
			title: "Country",
			enum: ["United States", "Canada", "United Kingdom", "Germany", "Japan"],
		},
	},
};

export default function App() {
	return (
		<div className="mx-auto w-full max-w-sm">
			<SchemaForm schema={schema} onSubmit={(e) => alert(JSON.stringify(e.formData))} />
		</div>
	);
}
