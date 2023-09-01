import SearchBar from "@/components/main/SearchBar";
import SortButtons from "@/components/main/SortButtons";
import WorldcupList from "@/components/main/WorldcupList";
import useWorldcupsStateWithSWR from "@/lib/hooks/useWorldcupsStateWithSWR";

export default function Home() {
	const { containerRef, sort, setSort, setSearch, worldcups, isLoading } =
		useWorldcupsStateWithSWR("/worldcups");

	return (
		<main
			className="flex h-screen flex-col overflow-y-scroll relative pt-24"
			ref={containerRef}>
			<SearchBar setSearch={setSearch} />
			<SortButtons setSort={setSort} sort={sort} />
			<WorldcupList worldcups={worldcups} isLoading={isLoading} />
		</main>
	);
}
