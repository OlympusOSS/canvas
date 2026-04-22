import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Button,
	DataTable,
	type DataTableColumn,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	ErrorBoundary,
	Section,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	useTheme,
} from "@olympusoss/canvas";
import { Showcase } from "../Showcase";

interface Row {
	id: string;
	name: string;
	email: string;
	status: "active" | "inactive";
}

const rows: Row[] = [
	{ id: "1", name: "Alice", email: "alice@example.com", status: "active" },
	{ id: "2", name: "Bob", email: "bob@example.com", status: "inactive" },
	{ id: "3", name: "Carol", email: "carol@example.com", status: "active" },
];

const columns: DataTableColumn<Row>[] = [
	{ field: "id", headerName: "ID", width: 80 },
	{ field: "name", headerName: "Name" },
	{ field: "email", headerName: "Email" },
	{ field: "status", headerName: "Status" },
];

function ThemeControl() {
	const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
	return (
		<div className="space-y-2 text-sm">
			<p>Theme: <code>{theme}</code> · Resolved: <code>{resolvedTheme}</code></p>
			<div className="flex gap-2">
				<Button size="sm" variant="outline" onClick={() => setTheme("light")}>Light</Button>
				<Button size="sm" variant="outline" onClick={() => setTheme("dark")}>Dark</Button>
				<Button size="sm" variant="outline" onClick={() => setTheme("system")}>System</Button>
				<Button size="sm" onClick={toggleTheme}>Toggle</Button>
			</div>
		</div>
	);
}

function Crasher(): never {
	throw new Error("Intentional crash for demo");
}

export function OrganismsPage() {
	return (
		<Section spacing={4}>
			<Showcase title="DataTable" description="Legacy column API shown. Supports selection/search/refresh.">
				<div className="w-full max-w-3xl">
					<DataTable data={rows} columns={columns} keyField="id" pagination={false} />
				</div>
			</Showcase>

			<Showcase title="Dialog">
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline">Open dialog</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Are you sure?</DialogTitle>
							<DialogDescription>This is a Radix Dialog wrapped by Canvas.</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</Showcase>

			<Showcase title="DropdownMenu">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">Menu</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Profile</DropdownMenuItem>
						<DropdownMenuItem>Settings</DropdownMenuItem>
						<DropdownMenuItem>Sign out</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</Showcase>

			<Showcase title="Tabs (Radix)">
				<Tabs defaultValue="a" className="w-96">
					<TabsList>
						<TabsTrigger value="a">Tab A</TabsTrigger>
						<TabsTrigger value="b">Tab B</TabsTrigger>
					</TabsList>
					<TabsContent value="a" className="p-3 text-sm">Content A</TabsContent>
					<TabsContent value="b" className="p-3 text-sm">Content B</TabsContent>
				</Tabs>
			</Showcase>

			<Showcase title="Accordion">
				<Accordion type="single" collapsible className="w-96">
					<AccordionItem value="item-1">
						<AccordionTrigger>Is it accessible?</AccordionTrigger>
						<AccordionContent>Yes. Radix handles keyboard + ARIA.</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger>Is it styled?</AccordionTrigger>
						<AccordionContent>Yes, matches Canvas tokens.</AccordionContent>
					</AccordionItem>
				</Accordion>
			</Showcase>

			<Showcase title="ThemeProvider + useTheme">
				<ThemeControl />
			</Showcase>

			<Showcase title="ErrorBoundary" description="Click to trigger a crash; use Try again to reset.">
				<ErrorBoundary>
					<ErrorBoundaryToggle />
				</ErrorBoundary>
			</Showcase>
		</Section>
	);
}

function ErrorBoundaryToggle() {
	const [boom, setBoom] = useBoom();
	if (boom) return <Crasher />;
	return <Button variant="destructive" onClick={() => setBoom(true)}>Crash it</Button>;
}

// Minimal inlined hook to avoid a state library.
import { useState as useStateInternal } from "react";
function useBoom(): [boolean, (v: boolean) => void] {
	const [v, setV] = useStateInternal(false);
	return [v, setV];
}
