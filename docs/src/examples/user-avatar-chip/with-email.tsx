import { UserAvatarChip } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[120px] flex-col items-center justify-center gap-3 p-8">
			<UserAvatarChip name="Ada Olympus" email="ada@olympus.dev" />
			<UserAvatarChip
				name="Bobby Nannier"
				email="bobby@nannier.com"
				fallback="BN"
				chevron={false}
			/>
		</div>
	);
}
