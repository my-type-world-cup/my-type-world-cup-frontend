import { delete_candidates } from "@/api/user";
import { fetcherPost } from "@/lib/Helper";
import { BACK_URL } from "@/lib/config";
import { rank_Data, rank_res, rank_res_data } from "@/type/Types";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from "swr";
import TablePagiNation from "../rank/TablePagiNation";

type Props = {
  rankData: rank_Data;
  accessToken: string | null;
  setSaveList: React.Dispatch<React.SetStateAction<number>>;
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

const PAGE_SIZE_OPTIONS = [5, 10, 20, 30];
function EditorTable({ rankData, accessToken, setSaveList }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState(""); //작성하면 저장
  const [search, setSearch] = useState(""); //검색 트리거
  const [pageSize, setPageSize] = useState(5);
  const [sort, setSort] = useState("finalWinCount");
  const { data, error, isLoading, mutate } = useSWR<rank_res>(
    `${BACK_URL}/worldcups/${rankData.worldCupId}/candidates?sort=${sort}&direction=DESC&size=${pageSize}&page=${currentPage}${search}`,
    (url) => fetcherPost(url, { password: rankData.password })
  );
  console.log(rankData, "랭크데이터");
  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize]);
  useEffect(() => {
    setSaveList(data!.data.length);
  }, [data, setSaveList]);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  const rankMember: rank_res_data[] = data!.data;
  const totalPage: number = data!.pageInfo.totalPages;

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
  const handleDelete = (id: number) => {
    delete_candidates(accessToken || "", id).then(() => mutate());
  };
  const handleModify = (id: number) => {};

  console.log(rankMember, "랭크멤버");
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
            <tr className="border-hr border" key={rank.id}>
              <td className="text-center text-gray">
                {i + 1 + (currentPage - 1) * pageSize}
              </td>
              <td>
                <div className="overflow-hidden h-20 flex items-center justify-center">
                  <Image
                    className="flex justify-center items-center"
                    src={rank.image}
                    alt="start"
                    width={100}
                    height={60}
                  />
                </div>
              </td>
              <td className="text-gray text-center overflow-hidden whitespace-nowrap max-w-xs">
                <div className="text-ellipsis text-lg font-bold">
                  {rank.name.length > 7
                    ? `${rank.name.slice(0, 7)}...`
                    : rank.name}
                </div>
              </td>
              <td>
                <div
                  className={"flex justify-evenly items-center text-center "}
                >
                  <Image
                    src="/icon/picture.svg"
                    alt="Mypage"
                    className="cursor-pointer hover:scale-125"
                    width={30}
                    height={30}
                    priority
                  />
                  <Image
                    src="/icon/delete.svg"
                    alt="Mypage"
                    className="cursor-pointer hover:scale-125"
                    width={20}
                    height={20}
                    priority
                    onClick={() => handleDelete(rank.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {rankMember.length === 0 && (
        <div className="w-full font-light text-base text-center">
          등록된 후보가 없습니다. <br />
          후보 추가 버튼을 이용해주세요
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
