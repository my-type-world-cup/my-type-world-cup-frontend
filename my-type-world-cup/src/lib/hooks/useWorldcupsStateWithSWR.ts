import { fetcher, fetcherToken } from "@/api/swr_fetch";
import type { SortValue } from "@/type/Types";
import { MainWorldcup, WorldcupsResponse } from "@/type/Types";
import {
	Dispatch,
	RefObject,
	SetStateAction,
	useEffect,
	useRef,
	useState
} from "react";
import useSWRInfinite from "swr/infinite";
import { BACK_URL } from "../config";

type ReturnType = {
	containerRef: RefObject<HTMLDivElement>;
	sort: SortValue;
	setSort: Dispatch<SetStateAction<SortValue>>;
	search: string;
	setSearch: Dispatch<SetStateAction<string>>;
	worldcups: MainWorldcup[];
	isLoading: boolean;
};

const useWorldcupsStateWithSWR = (
	url: string,
	token?: string | null
): ReturnType => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [sort, setSort] = useState<SortValue>("playCount");
	const [search, setSearch] = useState<string>("");

	const { data, setSize, isValidating } = useSWRInfinite<WorldcupsResponse>(
		(index) =>
			`${BACK_URL}${url}?page=${index + 1}&size=10&sort=${sort}${search}`,
		token ? (url: string) => fetcherToken(url, token) : fetcher
	);

	const isReachingEnd = data && data[data.length - 1]?.data.length < 10;
	const isLoading = !data && isValidating; // 로딩 상태를 나타내는 변수
	const worldcups: MainWorldcup[] = data ? data.map((v) => v.data).flat() : [];

	useEffect(() => {
		const handleScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } = containerRef.current!;

			if (scrollTop + clientHeight >= scrollHeight && !isReachingEnd) {
				setSize((el) => el + 1);
			}
		};
		const container = containerRef.current!;
		container.addEventListener("scroll", handleScroll);

		return () => {
			return container.removeEventListener("scroll", handleScroll);
		};
	}, [isReachingEnd, setSize]);

	return {
		containerRef,
		sort,
		setSort,
		search,
		setSearch,
		worldcups,
		isLoading // 로딩 상태를 반환 객체에 포함
	};
};

export default useWorldcupsStateWithSWR;
