import SearchBar from "@/components/main/SearchBar";
import SortButtons from "@/components/main/SortButtons";
import WorldcupList from "@/components/main/WorldcupList";
import useWorldcupsStateWithSWR from "@/lib/hooks/useWorldcupsStateWithSWR";
import type { Sort_buttons } from "@/type/Types";

export const sortButtons: Sort_buttons[] = [
  { name: "인기순", value: "playCount" },
  { name: "최신순", value: "createdAt" },
  { name: "댓글순", value: "commentCount" }
];

export default function Home() {
  const { containerRef, sort, setSort, setSearch, worldcups, isLoading } =
    useWorldcupsStateWithSWR("/worldcups");

  return (
    <main
      className="flex h-screen flex-col overflow-y-scroll relative pt-24"
      ref={containerRef}
    >
      <SearchBar setSearch={setSearch} />
      <SortButtons setSort={setSort} sort={sort} sortButtons={sortButtons} />
      <WorldcupList worldcups={worldcups} isLoading={isLoading} />
    </main>
  );
}
