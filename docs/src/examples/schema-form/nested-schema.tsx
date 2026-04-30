import { type RJSFSchema, SchemaForm } from "@olympusoss/canvas";

const schema: RJSFSchema = {
	type: "object",
	properties: {
		profile: {
			type: "object",
			title: "Profile",
			properties: {
				firstName: { type: "string", title: "First name" },
				lastName: { type: "string", title: "Last name" },
			},
		},
		address: {
			type: "object",
			title: "Address",
			properties: {
				street: { type: "string", title: "Street" },
				city: { type: "string", title: "City" },
				zip: { type: "string", title: "ZIP / Postal code" },
			},
		},
	},
};

export default function App() {
	return (
		<div className="mx-auto w-full max-w-md">
			<SchemaForm schema={schema} onSubmit={(e) => alert(JSON.stringify(e.formData))} />
		</div>
	);
}
