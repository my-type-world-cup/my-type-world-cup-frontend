import { Rank_res_data_dummy } from "@/lib/Dummy";
import { useHandleSearchState } from "@/lib/hooks/useHandleSearchState";
import useTableStateWithSWR from "@/lib/hooks/useTableStateWithSWR";
import type { Rank_res_data } from "@/type/Types";
import { useEffect } from "react";
import PageSizeSelector from "../all/PageSizeSelector";
import SearchForm from "../all/SearchForm";
import TablePagiNation from "../all/TablePagiNation";
import ZoomedImage from "../all/modal/ZoomImage";
import TableHeader from "./TableHeader";
import TrComponentWithRank from "./TrcomponentWithRank";

type Props = {
  worldcupId: number;
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

const calculateRatio = (WinCount: number, matchUpWorldCupCount: number) => {
  return matchUpWorldCupCount
    ? ((WinCount / matchUpWorldCupCount) * 100).toFixed(2)
    : 0;
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
    setSearch,
    pageSize,
    setPageSize,
    sort,
    setSort,
    data // SWR로 불러온 데이터
  } = useTableStateWithSWR(worldcupId);

  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize]);

  const handleSearch = useHandleSearchState({ searchText, setSearch });

  const zoomedHandler = (image: string) => {
    setImage(image);
    setZoomed(true);
  };

  const rankMember: Rank_res_data[] = data ? data!.data : Rank_res_data_dummy;
  const totalPage: number = data ? data!.pageInfo.totalPages : 1;

  return (
    <>
      <main className="flex justify-center items-center mt-20 mx-auto">
        {/* 검색창 */}
        <SearchForm
          handleSearch={handleSearch}
          searchText={searchText}
          setSearchText={setSearchText}
        />

        {/* 페이지 당 아이템 수 선택 */}
        <PageSizeSelector pageSize={pageSize} setPageSize={setPageSize} />

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
            <TableHeader
              label="우승"
              sortKey="finalWinCount"
              sort={sort}
              setSort={setSort}
            />
            <TableHeader
              label="우승비율"
              sortKey="finalWinRatio"
              sort={sort}
              setSort={setSort}
            />
            <TableHeader
              label="승리"
              sortKey="winCount"
              sort={sort}
              setSort={setSort}
            />
            <TableHeader
              label="1:1 승률"
              sortKey="winRatio"
              sort={sort}
              setSort={setSort}
            />
          </tr>
        </thead>
        <tbody>
          {rankMember.map((rank: Rank_res_data, i: number) => (
            <TrComponentWithRank
              key={rank.id}
              rank={rank}
              i={i}
              currentPage={currentPage}
              pageSize={pageSize}
              sort={sort}
              zoomedHandler={zoomedHandler}
            />
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
