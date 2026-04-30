import { Avatar, AvatarFallback, AvatarImage } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<a
				href="https://github.com/bnannier"
				target="_blank"
				rel="noopener noreferrer"
				className="inline-block rounded-full transition-opacity hover:opacity-80"
			>
				<Avatar>
					<AvatarImage src="https://github.com/bnannier.png" alt="@bnannier" />
					<AvatarFallback>BN</AvatarFallback>
				</Avatar>
			</a>
		</div>
	);
}
