import { Avatar, AvatarFallback, AvatarImage } from "@olympusoss/canvas";

const PEOPLE = [
	{ src: "https://github.com/bnannier.png", alt: "bnannier" },
	{ src: "https://github.com/vercel.png", alt: "vercel" },
	{ src: "https://github.com/microsoft.png", alt: "microsoft" },
];

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="flex items-center gap-3">
				{PEOPLE.map((p) => (
					<Avatar key={p.alt}>
						<AvatarImage src={p.src} alt={p.alt} />
						<AvatarFallback>{p.alt.slice(0, 2).toUpperCase()}</AvatarFallback>
					</Avatar>
				))}
			</div>
		</div>
	);
}
