import { PageTabs } from "@olympusoss/canvas";
import { useState } from "react";

export default function App() {
	const [tab, setTab] = useState("overview");
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<PageTabs
				value={tab}
				onChange={setTab}
				tabs={[
					{ label: "Overview", value: "overview" },
					{ label: "Activity", value: "activity" },
					{ label: "Settings", value: "settings" },
				]}
			/>
		</div>
	);
}
