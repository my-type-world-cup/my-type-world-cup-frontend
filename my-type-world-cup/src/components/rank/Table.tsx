import { fetcherPost } from "@/lib/Helper";
import { BACK_URL } from "@/lib/config";
import { rank_Data, rank_res, rank_res_data } from "@/type/Types";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
type Props = {
  rankData: rank_Data;
};

type Item = {
  name: string;
  value: string;
};

const items: Item[] = [
  { name: "우승", value: "finalWinCount" },
  { name: "우승비율", value: "finalWinRatio" },
  { name: "승리", value: "winCount" },
  { name: "1대1 승률", value: "winRatio" },
];

const PAGE_SIZE_OPTIONS = [10, 20, 30];
function Table({ rankData }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [word, setWord] = useState("");
  const [searchText, setSearchText] = useState(""); //작성하면 저장
  const [search, setSearch] = useState(""); //검색 트리거
  const [pageSize, setPageSize] = useState(10);
  const { data, error, isLoading } = useSWR<rank_res>(
    `${BACK_URL}/candidates/search?sort=finalWinCount&direction=DESC&size=${pageSize}&page=1${search}`,
    (url) => fetcherPost(url, rankData)
  );

  const wordHandler = (select: string) => {
    setWord(select);
  };

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  const rankMember: rank_res_data[] = data!.data;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedSearchTerm = searchText.trim();

    if (trimmedSearchTerm) {
      setSearch("&keyword=" + trimmedSearchTerm);
    } else {
      setSearch("");
    }
  };
  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    console.log(e.key, "이히");
    if (e.key === "Enter") {
      const trimmedSearchText = searchText.trim();
      console.log("하이");
    }
  }

  return (
    <>
      <main className="flex justify-center items-center mt-20 mx-auto">
        {/* 검색창 */}
        <form className="mb-4 mr-4" onSubmit={handleSearch}>
          <input
            type="text"
            className="w-full rounded border-gray border-[1px]  p-1"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </form>

        {/* 페이지 당 아이템 수 선택 */}
        <div className="mb-4">
          <select
            value={pageSize}
            onChange={(e) => setPageSize(parseInt(e.target.value))}
            className="ml-2 rounded border-gray-300 py-2 outline-none"
          >
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

          <col className="w-1/12 bg-white " />
          <col className="w-2/12 bg-white" />
          <col className="w-1/12 bg-white" />
          <col className="w-1/12 bg-white" />
          <col className="w-1/12 bg-white" />
          <col className="w-1/12 bg-white" />
        </colgroup>
        <thead className="bg-inputGray text-gray ">
          <tr>
            <th>순위</th>
            <th>사진</th>
            <th>이름</th>
            <th>우승</th>
            <th className="text-main border-b-4 border-main">우승비율</th>
            <th>승리</th>
            <th>1:1 승률</th>
          </tr>
        </thead>
        <tbody>
          {rankMember.map((rank: rank_res_data, i: number) => (
            <tr className="border-hr border" key={rank.id}>
              <td className="text-center text-gray">{i + 1}</td>
              <td>
                <div className="overflow-hidden h-12 flex justify-center ">
                  <Image
                    className="flex justify-center items-center"
                    src={rank.image}
                    alt="start"
                    width={60}
                    height={60}
                  />
                </div>
              </td>
              <td className="text-gray text-center overflow-hidden whitespace-nowrap max-w-xs">
                <div className="text-ellipsis text-xs">
                  {rank.name.length > 7
                    ? `${rank.name.slice(0, 7)}...`
                    : rank.name}
                </div>
              </td>
              <td className="text-gray text-center">{rank.finalWinCount}</td>
              <td className=" bg-inputGray text-center ">
                {(
                  (rank.finalWinCount / rank.matchUpWorldCupCount) *
                  100
                ).toFixed(2)}
                %
              </td>
              <td className="text-gray text-center">{rank.winCount}</td>
              <td className="text-gray text-center">
                {((rank.winCount / rank.matchUpGameCount) * 100).toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
