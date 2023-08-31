import { delete_candidates } from "@/api/user";

import { fetcherPost } from "@/api/swr_fetch";
import { BACK_URL } from "@/lib/config";
import { useHandleSearchState } from "@/lib/hooks/useHandleSearchState";
import { rank_Data, rank_res, rank_res_data } from "@/type/Types";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from "swr";
import TablePagiNation from "../rank/TablePagiNation";
import TrComponent from "./TrComponent";

type Props = {
	rankData: rank_Data;
	accessToken: string | null;
	setSaveList: React.Dispatch<React.SetStateAction<number>>;
	setIsMake: React.Dispatch<React.SetStateAction<boolean>>;
	setCandidateId: React.Dispatch<React.SetStateAction<number>>;
};

type Item = {
	name: string;
	value: string;
};

const items: Item[] = [
	{ name: "우승", value: "finalWinCount" },
	{ name: "우승비율", value: "finalWinRatio" },
	{ name: "승리", value: "winCount" },
	{ name: "1대1 승률", value: "winRatio" }
];

const PAGE_SIZE_OPTIONS = [5, 10, 20, 30];
function EditorTable({
	rankData,
	accessToken,
	setSaveList,
	setIsMake,
	setCandidateId
}: Props) {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchText, setSearchText] = useState(""); //작성하면 저장
	const [search, setSearch] = useState(""); //검색 트리거
	const [pageSize, setPageSize] = useState(5);
	const [sort, setSort] = useState("finalWinCount");
	const { data, error, isLoading, mutate } = useSWR<rank_res>(
		`${BACK_URL}/worldcups/${rankData.worldCupId}/candidates?sort=${sort}&direction=DESC&size=${pageSize}&page=${currentPage}${search}`,
		(url) => fetcherPost(url, { password: rankData.password })
	);
	console.log(data, "랭크데이터");
	
const handleSearch = useHandleSearchState({searchText, setSearch})

	useEffect(() => {
		setCurrentPage(1);
	}, [pageSize]);
	useEffect(() => {
		if (data) setSaveList(data!.pageInfo.totalElements);
	}, [data, setSaveList]);

	if (error) return <div>failed to load</div>;
	if (isLoading) return <div>loading...</div>;
	const rankMember: rank_res_data[] = data!.data;
	const totalPage: number = data!.pageInfo.totalPages;




	const handleDelete = (id: number) => {
		delete_candidates(accessToken || "", id).then(() => mutate());
	};

	return (
		<>
			<main className="flex justify-center items-center mt-4 mx-auto">
				<form className="mb-4 mr-4 relative" onSubmit={handleSearch}>
					<input
						type="text"
						className="w-full rounded border-gray border-[1px]  p-1"
						placeholder="Search"
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
					/>
					<Image
						src="/icon/search.svg"
						alt="Search"
						className="absolute right-3 top-2 cursor-pointer"
						width={20}
						height={20}
						onClick={handleSearch}
					/>
				</form>

				{/* 페이지 당 아이템 수 선택 */}
				<div className="mb-4">
					<select
						value={pageSize}
						onChange={(e) => setPageSize(parseInt(e.target.value))}
						className="ml-2 rounded border-gray-300 py-2 outline-none">
						{PAGE_SIZE_OPTIONS.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>
					<label className="hidden sm:inline-block font-bold mr-[1px]  ">
						개씩 보기
					</label>
				</div>

				{/* 목록 */}
			</main>
			<table className=" text-sm mb-4">
				<colgroup>
					<col className="w-1/12 bg-white" />

					<col className="w-3/12 bg-white " />
					<col className="w-2/12 bg-white" />
					<col className="w-3/12 bg-white" />
				</colgroup>
				<thead className="bg-inputGray text-gray ">
					<tr>
						<th>순위</th>
						<th>사진</th>
						<th>이름</th>
						<th>우승</th>
					</tr>
				</thead>
				<tbody>
					{rankMember.map((rank: rank_res_data, i: number) => (
						<TrComponent
							key={rank.id}
							rank={rank}
							i={i}
							currentPage={currentPage}
							pageSize={pageSize}
							handleDelete={handleDelete}
							setIsMake={setIsMake}
							setCandidateId={setCandidateId}
							accessToken={accessToken}
						/>
					))}
				</tbody>
			</table>

			{rankMember.length < 4 && (
				<div className="w-full font-light text-base text-center my-4 sm:my-12">
					<span className="text-main">추가 버튼</span>을 이용하여&nbsp;
					<span className="text-main">후보</span>를 등록해주세요.🙌
				</div>
			)}
			<TablePagiNation
				currentPage={currentPage}
				totalPages={totalPage}
				setCurrentPage={setCurrentPage}
			/>
		</>
	);
}

export default EditorTable;
