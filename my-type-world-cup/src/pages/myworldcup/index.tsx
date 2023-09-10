import { delete_worldcup, get_detail } from "@/api/user";
import SearchBar from "@/components/main/SearchBar";
import SortButtons from "@/components/main/SortButtons";
import WorldcupList from "@/components/main/WorldcupList";
import useWorldcupsStateWithSWR from "@/lib/hooks/useWorldcupsStateWithSWR"; // 훅 가져오기
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { sortButtons } from "..";
import { accessTokenState, postWorldcup } from "../../lib/atom/atom";

export default function MyWorldCup({}: {}) {
	const router = useRouter();
	const accessToken = useRecoilValue(accessTokenState);

	const { containerRef, sort, setSort, setSearch, worldcups, isLoading } =
		useWorldcupsStateWithSWR(`/members/worldcups`, accessToken);

	const resetEditor = useResetRecoilState(postWorldcup);
	const setEditor = useSetRecoilState(postWorldcup);

	useEffect(() => {
		if (!accessToken) {
			router.push("/");
		}
		console.log(accessToken);
	}, [accessToken, router]);

	const handlerDelete = async (id: number) => {
		try {
			const res = await delete_worldcup(accessToken || "", id);
			console.log(res);
		} catch (e) {
			console.log(e);
		}
	};

	const handlerEditorWorldCup = (id: number) => {
		resetEditor();
		get_detail(id, accessToken || "").then((res) => {
			console.log(res);
			setEditor(res);
			router.push("/editors");
		});
	};

	return (
		<main
			className="flex h-screen flex-col overflow-y-scroll relative pt-24"
			ref={containerRef}>
			<SearchBar setSearch={setSearch} />
			<SortButtons setSort={setSort} sort={sort} sortButtons={sortButtons} />

			<WorldcupList
				worldcups={worldcups}
				mine={true}
				handlerDelete={handlerDelete}
				handlerEditorWorldCup={handlerEditorWorldCup}
				isLoading={isLoading} // 로딩 상태 전달
			/>
		</main>
	);
}
