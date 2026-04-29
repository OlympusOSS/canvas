import { UserAvatarChip } from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[120px] items-center justify-center gap-3 p-8">
			<UserAvatarChip name="Ada Olympus" collapsed />
			<UserAvatarChip name="Bobby Nannier" collapsed />
			<UserAvatarChip name="admin@olympus.dev" fallback="AO" collapsed />
		</div>
	);
}
