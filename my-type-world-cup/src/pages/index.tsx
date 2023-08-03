import Card from "@/components/main/Card";
import CardSkeleton from "@/components/main/CardSkeleton";
import SearchBar from "@/components/main/SearchBar";
import SortButtons from "@/components/main/SortButtons";
import { fetcher } from "@/lib/Helper";
import { BACK_URL } from "@/lib/config";
import { MainWorldcup, WorldcupsResponse } from "@/type/Types";
import { useEffect, useRef, useState } from "react";
import useSWRInfinite from "swr/infinite";

export type Value = "playCount" | "createdAt" | "commentCount";

export default function Home({}: {}) {
	const containerRef = useRef<HTMLDivElement>(null);

	const [sort, setSort] = useState<Value>("playCount"); //정렬 관리
	const [search, setSearch] = useState<string>(""); //검색 관리

	const { data, setSize } = useSWRInfinite<WorldcupsResponse>(
		(index) =>
			`${BACK_URL}/worldcups?page=${
				index + 1
			}&size=10&sort=${sort}${search}`,
		fetcher
	);

	// 이상형 월드컵 스크롤 끝 확인 변수
	const isReachingEnd =
		data && data[data.length - 1]?.data.length < 10;

	useEffect(() => {
		const handleScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } =
				containerRef.current!;

			if (
				scrollTop + clientHeight >= scrollHeight &&
				!isReachingEnd
			) {
				setSize((el) => el + 1);
			}
		};
		const container = containerRef.current!;
		container.addEventListener("scroll", handleScroll);

		return () => {
			return container.removeEventListener("scroll", handleScroll);
		};
	}, [isReachingEnd, setSize]);

	// 관리하기 편한 값으로 수정
	const worldcups: MainWorldcup[] = data
		? data.map((v) => v.data).flat()
		: [];

	return (
		<main
			className='flex h-screen flex-col overflow-y-scroll relative pt-24'
			ref={containerRef}>
			<SearchBar setSearch={setSearch} />
			<div className='mt-12 mx-auto'>
				<SortButtons setSort={setSort} sort={sort} />
			</div>
			<article className='w-full h-auto '>
				{data
					? worldcups.map((v) => <Card key={v.id} worldcup={v} />)
					: new Array(10).fill(1).map((_, i) => {
							return <CardSkeleton key={i} />;
					  })}
			</article>
		</main>
	);
}
