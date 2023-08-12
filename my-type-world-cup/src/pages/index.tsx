import Card from "@/components/main/Card";
import CardSkeleton from "@/components/main/CardSkeleton";
import SearchBar from "@/components/main/SearchBar";
import SortButtons from "@/components/main/SortButtons";
import { useWorldcups } from "@/lib/hooks/useWorldcups";

export default function Home() {
	const { containerRef, sort, setSort, setSearch, worldcups } =
		useWorldcups();

	return (
		<main
			className='flex h-screen flex-col overflow-y-scroll relative pt-24'
			ref={containerRef}>
			<SearchBar setSearch={setSearch} />
			<div className='mt-12 mx-auto'>
				<SortButtons setSort={setSort} sort={sort} />
			</div>
			<article className='w-full h-auto '>
				{worldcups.length > 0
					? worldcups.map((v) => <Card key={v.id} worldcup={v} />)
					: Array.from({ length: 10 }, (_, i) => (
							<CardSkeleton key={i} />
					  ))}
			</article>
		</main>
	);
}
