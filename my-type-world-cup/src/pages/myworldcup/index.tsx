import { delete_worldcup, get_detail } from "@/api/user";
import Card from "@/components/main/Card";
import CardSkeleton from "@/components/main/CardSkeleton";
import SearchBar from "@/components/main/SearchBar";
import SortButtons from "@/components/main/SortButtons";
import { fetcherToken } from "@/lib/Helper";
import { BACK_URL } from "@/lib/config";
import { MainWorldcup, WorldcupsResponse } from "@/type/Types";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
	useRecoilValue,
	useResetRecoilState,
	useSetRecoilState
} from "recoil";
import useSWRInfinite from "swr/infinite";
import { accessTokenState, postWorldcup } from "../../lib/atom/atom";
const PAGE_SIZE = 10;

export type Value = "playCount" | "createdAt" | "commentCount";

export default function Home({}: {}) {
	const router = useRouter();
	const accessToken = useRecoilValue(accessTokenState);
	const containerRef = useRef<HTMLDivElement>(null);

	const [sort, setSort] = useState<Value>("playCount"); //정렬 관리
	const [search, setSearch] = useState<string>(""); //검색 관리

	const resetEditor = useResetRecoilState(postWorldcup);
	const setEditor = useSetRecoilState(postWorldcup);

	useEffect(() => {
		if (!accessToken) {
			router.push("/");
		}
		console.log(accessToken);
	}, [accessToken, router]);
	const { data, mutate, setSize } = useSWRInfinite<WorldcupsResponse>(
		(index) =>
			`${BACK_URL}/members/worldcups?page=${
				index + 1
			}&size=10&sort=${sort}${search}`,
		(url: string) => fetcherToken(url, accessToken)
	);

	const isReachingEnd =
		data && data[data.length - 1]?.data.length < PAGE_SIZE;
	useEffect(() => {
		const handleScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } =
				containerRef.current!;
			if (
				scrollTop + clientHeight >= scrollHeight &&
				!isReachingEnd
			) {
				setSize((el) => el + 1);
				console.log("하이");
			}
		};
		const container = containerRef.current!;
		container.addEventListener("scroll", handleScroll);

		return () => {
			return container.removeEventListener("scroll", handleScroll);
		};
	}, [isReachingEnd, setSize]);

	const handlerDelete = async (id: number) => {
		try {
			const res = await delete_worldcup(accessToken || "", id);

			mutate();

			console.log(res);
		} catch (e) {
			console.log(e);
		}
	};

	const handlerWorldCup = (id: number) => {
		//월드컵 수정
		resetEditor();
		get_detail(id, accessToken || "").then((res) => {
			console.log(res);
			setEditor(res);
			router.push("/editors");
		});
	};

	const worldcups: MainWorldcup[] = data
		? data.map((v) => v.data).flat()
		: [];
	//예시는 모두다 배열임

	return (
		<main
			className='flex h-screen flex-col overflow-y-scroll relative pt-24'
			ref={containerRef}>
			<SearchBar setSearch={setSearch} />
			<div className='mt-12 mx-auto'>
				<SortButtons setSort={setSort} sort={sort} />
			</div>
			<article className='w-full h-auto '>
				{data ? (
					worldcups.length > 0 ? (
						worldcups.map((v) => (
							<Card
								key={v.id}
								worldcup={v}
								mine={true}
								handlerDelete={handlerDelete}
								handlerWorldCup={handlerWorldCup}
							/>
						))
					) : (
						<div className='flex justify-center items-center flex-col mt-24 pb-[25px]'>
							<Image
								src='/icon/blueDolphin2.svg'
								alt='one'
								width={150}
								height={250}
							/>
							<h3 className='text-xl mt-8 text-center leading-loose tracking-wide'>
								월드컵이 없습니다. <br />
								<span
									onClick={() => router.push("/editors")}
									className='bg-main p-2 text-white cursor-pointer rounded-lg'>
									후보 추가
								</span>
								를 통해 업데이트해주세요
							</h3>
						</div>
					)
				) : (
					new Array(10).fill(1).map((_, i) => {
						return <CardSkeleton key={i} />;
					})
				)}
			</article>
		</main>
	);
}
