import { fetchUserData } from "@/api/user";
import CardSkeleton from "@/components/main/CardSkeleton";
import SearchBar from "@/components/main/SearchBar";
import SortButtons from "@/components/main/SortButtons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { accessTokenState, lastPath, userState } from "../lib/atom/atom";

export default function Callback() {
	const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
	const [lastPathState, setlastPathState] = useRecoilState(lastPath);
	const [forOnlyUI, setForOnlyUI] = useState<any>();

	const router = useRouter();
	const setUser = useSetRecoilState(userState);

	useEffect(() => {
		if (accessToken) {
			fetchUserData(accessToken as string)
				.then((data) => {
					setUser(data);
					if (lastPathState) {
						router.replace(lastPathState); // 이전 페이지로 이동
						setlastPathState(null);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		} else if (router.query.access_token) {
			setAccessToken(router.query.access_token as string); // 토큰 저장
		} else if (!router.query.access_token && !lastPathState) {
			router.replace("/"); // 토큰이 없고 이전 경로가 없으면 메인으로 이동
		}
	}, [router.query.access_token, accessToken, setAccessToken]);

	return (
		<main className="flex h-screen flex-col overflow-y-scroll relative pt-24">
			<SearchBar setSearch={setForOnlyUI} />
			<SortButtons setSort={setForOnlyUI} sort={forOnlyUI} />
			<article className="w-full h-auto ">
				{Array.from({ length: 10 }, (_, i) => (
					<CardSkeleton key={i} />
				))}
			</article>
		</main>
	);
}
