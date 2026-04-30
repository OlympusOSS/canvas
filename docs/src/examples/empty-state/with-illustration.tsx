import { EmptyState } from "@olympusoss/canvas";

export default function App() {
	return (
		<EmptyState
			icon={
				<div className="grid h-16 w-16 place-content-center rounded-full bg-primary/10 text-primary">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth={1.5}
						className="h-8 w-8"
					>
						<path d="M3 10h18M3 14h18" strokeLinecap="round" />
						<rect x="3" y="6" width="18" height="12" rx="2" />
					</svg>
				</div>
			}
			message="No transactions yet"
			description="Your first transaction will appear here once it clears."
			action={{ label: "Connect a bank", onClick: () => {} }}
		/>
	);
}
