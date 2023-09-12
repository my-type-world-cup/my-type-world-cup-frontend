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

const buildURL = (
	baseURL: string,
	index: number,
	sort: SortValue,
	search: string
): string =>
	`${BACK_URL}${baseURL}?page=${index + 1}&size=10&sort=${sort}${search}`;

const useWorldcupsStateWithSWR = (
	url: string,
	initialData: WorldcupsResponse,
	token?: string | null
): ReturnType => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [sort, setSort] = useState<SortValue>("playCount");
	const [search, setSearch] = useState<string>("");

	const { data, setSize, isValidating } = useSWRInfinite<WorldcupsResponse>(
		(index) => buildURL(url, index, sort, search),
		token ? (url: string) => fetcherToken(url, token) : fetcher,
		{
			initialSize: 0 // initialSize를 0으로 설정
		}
	);

	const worldcups: MainWorldcup[] = initialData.data.concat(
		data ? data.flatMap((item) => item.data) : []
	);

	// 더 이상 데이터를 불러올 수 있는지 판단
	const isReachingEnd = data && data[data.length - 1]?.data.length < 10;

	// 로딩 상태 판단
	const isLoading = !data && isValidating;

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
