import { fetcher } from "@/api/swr_fetch";
import SearchBar from "@/components/main/SearchBar";
import SortButtons from "@/components/main/SortButtons";
import WorldcupList from "@/components/main/WorldcupList";
import { BACK_URL } from "@/lib/config";
import useWorldcupsStateWithSWR from "@/lib/hooks/useWorldcupsStateWithSWR";
import type { WorldcupsResponse } from "@/type/Types";
import { Sort_buttons } from "@/type/Types";

type HomeProps = {
	initialData: WorldcupsResponse;
};

export const sortButtons: Sort_buttons[] = [
	{ name: "인기순", value: "playCount" },
	{ name: "최신순", value: "createdAt" },
	{ name: "댓글순", value: "commentCount" }
];

export default function Home({ initialData }: HomeProps) {
	const { containerRef, sort, setSort, setSearch, worldcups, isLoading } =
		useWorldcupsStateWithSWR("/worldcups", initialData);

	return (
		<main
			className="flex h-screen flex-col overflow-y-scroll relative pt-24"
			ref={containerRef}>
			<SearchBar setSearch={setSearch} />
			<SortButtons setSort={setSort} sort={sort} sortButtons={sortButtons} />
			<WorldcupList worldcups={worldcups} isLoading={isLoading} />
		</main>
	);
}

export const getServerSideProps = async () => {
	const sort = "playCount"; // 정렬 방식
	const page = 1; // 초기 페이지 번호
	const size = 10; // 페이지당 데이터 수

	const url = `${BACK_URL}/worldcups?page=${page}&size=${size}&sort=${sort}`;

	// 서버에서 초기 데이터를 불러옵니다.
	const initialData = await fetcher(url);

	return {
		props: {
			initialData
		}
	};
};
