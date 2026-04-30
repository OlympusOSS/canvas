import { Avatar, AvatarFallback, AvatarImage } from "@olympusoss/canvas";

const PEOPLE = [
	{ src: "https://github.com/bnannier.png", alt: "bnannier" },
	{ src: "https://github.com/vercel.png", alt: "vercel" },
	{ src: "https://github.com/microsoft.png", alt: "microsoft" },
	{ src: "https://github.com/google.png", alt: "google" },
];

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<div className="flex -space-x-5">
				{PEOPLE.map((p) => (
					<Avatar key={p.alt} className="border-2 border-background">
						<AvatarImage src={p.src} alt={p.alt} />
						<AvatarFallback>{p.alt.slice(0, 2).toUpperCase()}</AvatarFallback>
					</Avatar>
				))}
				<Avatar className="border-2 border-background">
					<AvatarFallback className="bg-muted text-muted-foreground">+5</AvatarFallback>
				</Avatar>
			</div>
		</div>
	);
}
