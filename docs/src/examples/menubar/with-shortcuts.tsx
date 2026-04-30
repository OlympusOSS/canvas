import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarShortcut,
	MenubarTrigger,
} from "@olympusoss/canvas";

export default function App() {
	return (
		<div className="flex min-h-[200px] items-center justify-center p-8">
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger>File</MenubarTrigger>
					<MenubarContent>
						<MenubarItem>
							New file <MenubarShortcut>⌘N</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>
							Save <MenubarShortcut>⌘S</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>
							Save As… <MenubarShortcut>⇧⌘S</MenubarShortcut>
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
		</div>
	);
}
