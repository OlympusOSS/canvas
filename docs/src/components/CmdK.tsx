import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@olympusoss/canvas";
import { load, type Orama, search, type TypedDocument } from "@orama/orama";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SCHEMA = {
	id: "string",
	kind: "string",
	title: "string",
	path: "string",
	body: "string",
	tier: "string",
} as const;

interface SearchHit {
	id: string;
	kind: "page" | "component" | "token";
	title: string;
	path: string;
	tier: string;
}

type IndexDb = Orama<typeof SCHEMA>;

let dbPromise: Promise<IndexDb> | null = null;
async function getDb(): Promise<IndexDb> {
	if (!dbPromise) {
		dbPromise = (async () => {
			const [{ create }, snapshotModule] = await Promise.all([
				import("@orama/orama"),
				import("../data/search-index.json"),
			]);
			const db = create({ schema: SCHEMA }) as IndexDb;
			load(db, snapshotModule.default as Parameters<typeof load>[1]);
			return db;
		})();
	}
	return dbPromise;
}

const KIND_LABEL: Record<SearchHit["kind"], string> = {
	page: "Pages",
	component: "Components",
	token: "Tokens",
};

export function CmdK() {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [hits, setHits] = useState<SearchHit[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault();
				setOpen((prev) => !prev);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	useEffect(() => {
		if (!query.trim()) {
			setHits([]);
			return;
		}
		let cancelled = false;
		(async () => {
			const db = await getDb();
			const result = await search(db, { term: query, limit: 30 });
			if (cancelled) return;
			type Doc = TypedDocument<typeof db>;
			setHits(result.hits.map((h) => h.document as Doc as unknown as SearchHit));
		})();
		return () => {
			cancelled = true;
		};
	}, [query]);

	const grouped: Record<SearchHit["kind"], SearchHit[]> = {
		page: [],
		component: [],
		token: [],
	};
	for (const hit of hits) {
		grouped[hit.kind].push(hit);
	}

	const onSelect = (path: string) => {
		setOpen(false);
		setQuery("");
		const [pathname, hash] = path.split("#");
		navigate(hash ? `${pathname}#${hash}` : pathname);
	};

	return (
		<CommandDialog open={open} onOpenChange={setOpen}>
			<CommandInput
				placeholder="Search components, tokens, pages…"
				value={query}
				onValueChange={setQuery}
			/>
			<CommandList>
				<CommandEmpty>{query ? "No results." : "Type to search."}</CommandEmpty>
				{(["component", "token", "page"] as const).map((kind) =>
					grouped[kind].length > 0 ? (
						<CommandGroup key={kind} heading={KIND_LABEL[kind]}>
							{grouped[kind].map((hit) => (
								<CommandItem
									key={hit.id}
									value={`${hit.title} ${hit.path}`}
									onSelect={() => onSelect(hit.path)}
								>
									<span className="font-mono text-sm">{hit.title}</span>
									<span className="ml-auto truncate font-mono text-xs text-muted-foreground">
										{hit.path}
									</span>
								</CommandItem>
							))}
						</CommandGroup>
					) : null,
				)}
			</CommandList>
		</CommandDialog>
	);
}
