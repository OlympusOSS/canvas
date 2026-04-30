import { FieldDisplay } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="max-w-md space-y-4">
				<FieldDisplay label="API key" value="sk_live_a1b2c3d4e5f6g7h8" mono />
				<FieldDisplay label="Account ID" value="acct_29F3xZ7wQ" mono />
				<FieldDisplay label="Build hash" value="9d2f7c1a3b" mono />
			</div>
		</div>
	);
}
