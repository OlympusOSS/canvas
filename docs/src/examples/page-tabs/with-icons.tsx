import { Icon, PageTabs } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [tab, setTab] = useState("home");
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<PageTabs
				value={tab}
				onChange={setTab}
				tabs={[
					{ label: "Home", value: "home", icon: <Icon name="House" /> },
					{ label: "Inbox", value: "inbox", icon: <Icon name="Inbox" /> },
					{ label: "Settings", value: "settings", icon: <Icon name="Settings" /> },
				]}
			/>
		</div>
	);
}
