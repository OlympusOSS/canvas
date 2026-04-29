import { UserAvatarChip } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[120px] items-center justify-center gap-4 p-8">
			<UserAvatarChip name="admin@olympus.dev" />
			<UserAvatarChip name="Bobby Nannier" email="bobby@nannier.com" />
			<UserAvatarChip name="AO" collapsed />
		</div>
	);
}
