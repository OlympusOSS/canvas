import { Avatar, AvatarFallback, AvatarImage } from "@olympusoss/canvas";

const SIZES = [
	{ size: "h-6 w-6", label: "xs" },
	{ size: "h-7 w-7", label: "sm" },
	{ size: "h-9 w-9", label: "md" },
	{ size: "h-11 w-11", label: "lg" },
	{ size: "h-14 w-14", label: "xl" },
];

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="flex items-end gap-3">
				{SIZES.map((s) => (
					<Avatar key={s.label} className={s.size}>
						<AvatarImage src="https://github.com/bnannier.png" alt={`Avatar ${s.label}`} />
						<AvatarFallback>{s.label.toUpperCase()}</AvatarFallback>
					</Avatar>
				))}
			</div>
		</div>
	);
}
