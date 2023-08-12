import { fetcher } from "@/lib/Helper";
import { BACK_URL } from "@/lib/config";
import { MainWorldcup, WorldcupsResponse } from "@/type/Types";
import { useEffect, useRef, useState } from "react";
import useSWRInfinite from "swr/infinite";

export type SortValue = "playCount" | "createdAt" | "commentCount";

export function useWorldcups() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [sort, setSort] = useState<SortValue>("playCount");
	const [search, setSearch] = useState<string>("");

	const { data, setSize } = useSWRInfinite<WorldcupsResponse>(
		(index) =>
			`${BACK_URL}/worldcups?page=${
				index + 1
			}&size=10&sort=${sort}${search}`,
		fetcher
	);

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

	const worldcups: MainWorldcup[] = data
		? data.map((v) => v.data).flat()
		: [];

	return {
		containerRef,
		sort,
		setSort,
		search,
		setSearch,
		worldcups
	};
}
