import { rank_res_data_dummy } from "@/lib/Dummy";
import { useHandleSearchState } from "@/lib/hooks/useHandleSearchState";
import useTableStateWithSWRWithSWR from "@/lib/hooks/useTableStateWithSWR";
import { rank_res_data } from "@/type/Types";
import Image from "next/image";
import { useEffect } from "react";
import ZoomedImage from "../all/ZoomImage";
import ImageContainer from "./ImageContainer";
import TablePagiNation from "./TablePagiNation";
type Props = {
	
	worldcupId:number;
};

// type ItemValueType = {
// 	name: string;
// 	value: string;
// };

// const ItemValue: ItemValueType[] = [
// 	{ name: "우승", value: "finalWinCount" },
// 	{ name: "우승비율", value: "finalWinRatio" },
// 	{ name: "승리", value: "winCount" },
// 	{ name: "1대1 승률", value: "winRatio" }
// ];


const PAGE_SIZE_OPTIONS = [10, 20, 30];
const SORT_OPTIONS = ["finalWinCount", "finalWinRatio", "winCount", "winRatio"];
const calculateRatio = (WinCount:number, matchUpWorldCupCount:number) => {
  return matchUpWorldCupCount? ((WinCount / matchUpWorldCupCount) * 100).toFixed(2) : 0;
};


function Table({ worldcupId }: Props) {
 const {
    currentPage,
    setCurrentPage,
    zoomed,
    setZoomed,
    image,
    setImage,
    searchText,
    setSearchText,
    search,
    setSearch,
    pageSize,
    setPageSize,
    sort,
    setSort,
    data,  // SWR로 불러온 데이터
  } = useTableStateWithSWRWithSWR(worldcupId);
  
	useEffect(() => {
		setCurrentPage(1);
	}, [pageSize]);


	const rankMember: rank_res_data[] = data ? data!.data : rank_res_data_dummy;
	const totalPage: number = data ? data!.pageInfo.totalPages : 1;

const handleSearch = useHandleSearchState({searchText, setSearch})

	const zoomedHandler = (image: string) => {
		setImage(image);
		setZoomed(true);
	};

	return (
		<>
			<main className="flex justify-center items-center mt-20 mx-auto">
				{/* 검색창 */}
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
						className="absolute right-2 top-2 cursor-pointer"
						width={18}
						height={18}
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
					<label className="font-bold mr-[1px]">개씩 보기</label>
				</div>

				{/* 목록 */}
			</main>
			<table className=" text-sm mx-2 mb-4">
				<colgroup>
					<col className="w-1/12 bg-white" />

					<col className="w-2/12 bg-white " />
					<col className="w-2/12 bg-white" />
					<col className="w-1/12 bg-white mr-1" />
					<col className="w-1/12 bg-white mr-1" />
					<col className="w-1/12 bg-white mr-1" />
					<col className="w-1/12 bg-white" />
				</colgroup>
				<thead className="bg-inputGray text-gray ">
					<tr>
						<th>순위</th>
						<th>사진</th>
						<th>이름</th>
						<th
							className={
								sort === "finalWinCount"
									? "text-main border-b-4 border-main"
									: "cursor-pointer"
							}
							onClick={() => {
								setSort("finalWinCount");
							}}>
							우승
						</th>
						<th
							className={
								sort === "finalWinRatio"
									? "text-main border-b-4 border-main"
									: "cursor-pointer"
							}
							onClick={() => setSort("finalWinRatio")}>
							우승비율
						</th>
						<th
							className={
								sort === "winCount"
									? "text-main border-b-4 border-main"
									: "cursor-pointer"
							}
							onClick={() => setSort("winCount")}>
							승리
						</th>
						<th
							className={
								sort === "winRatio"
									? "text-main border-b-4 border-main"
									: "cursor-pointer"
							}
							onClick={() => setSort("winRatio")}>
							1:1 승률
						</th>
					</tr>
				</thead>
				<tbody>
					{rankMember.map((rank: rank_res_data, i: number) => (
						<tr className="border-hr border" key={rank.id}>
							<td className="text-center text-gray">
								{i + 1 + (currentPage - 1) * pageSize}
							</td>
							<td>
								<div className="overflow-hidden h-12 flex justify-center ">
									{/* <Image
                    className="flex justify-center items-center cursor-pointer"
                    src={rank.thumb}
                    alt="start"
                    width={60}
                    height={60}
                    onClick={() => zoomedHandler(rank.image)}
                    onError={(e) => {
                      console.log("하이");
                    }}
                  /> */}
									<ImageContainer
										thumb={rank.thumb}
										image={rank.image}
										zoomedHandler={zoomedHandler}
									/>
								</div>
							</td>
							<td className="text-gray">
								<div className="truncate w-20 text-center mx-auto text-xs">
									{rank.name}
								</div>
							</td>
							<td
								className={
									sort === "finalWinCount"
										? " bg-inputGray text-center "
										: "text-gray text-center"
								}>
								{rank.finalWinCount}
							</td>
							<td
								className={
									sort === "finalWinRatio"
										? " bg-inputGray text-center "
										: "text-gray text-center"
								}>
								{calculateRatio(rank.finalWinCount, rank.matchUpWorldCupCount)}%
								
							</td>
							<td
								className={
									sort === "winCount"
										? " bg-inputGray text-center "
										: "text-gray text-center"
								}>
								{rank.winCount}
							</td>
							<td
								className={
									sort === "winRatio"
										? " bg-inputGray text-center "
										: "text-gray text-center"
								}>
								{rank.winCount / rank.matchUpGameCount
									? ((rank.winCount / rank.matchUpGameCount) * 100).toFixed(2)
									: 0}
								%
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<TablePagiNation
				currentPage={currentPage}
				totalPages={totalPage}
				setCurrentPage={setCurrentPage}
			/>
			{zoomed && (
				<ZoomedImage zoomed={zoomed} setZoomed={setZoomed} imageUrl={image} />
			)}
		</>
	);
}

export default Table;
