import { PageTabs } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [tab, setTab] = useState("inbox");
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<PageTabs
				value={tab}
				onChange={setTab}
				tabs={[
					{ label: "Inbox", value: "inbox", badge: 12 },
					{ label: "Drafts", value: "drafts", badge: 3 },
					{ label: "Sent", value: "sent" },
					{ label: "Spam", value: "spam", badge: "9+" },
				]}
			/>
		</div>
	);
}
