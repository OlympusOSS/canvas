import { ErrorState } from "@olympusoss/canvas";

export default function App() {
	return (
		<ErrorState
			message="We couldn't reach the server. Check your connection and retry."
			onRetry={() => {}}
			retryLabel="Retry"
		/>
	);
}
