import { delete_candidates } from "@/api/user";
import SearchForm from "@/components/all/SearchForm";
import { useHandleSearchState } from "@/lib/hooks/useHandleSearchState";
import useTableStateWithSWR from "@/lib/hooks/useTableStateWithSWR";
import type { Rank_res_data } from "@/type/Types";
import { Dispatch, SetStateAction, useEffect } from "react";
import PageSizeSelector from "../../../all/PageSizeSelector";
import TablePagiNation from "../../../all/TablePagiNation";
import TrcomponentWithEditor from "./TrcomponentWithEditor";

type Props = {
  worldcupId: number;
  password: string | null;
  accessToken: string | null;
  setSaveList: Dispatch<SetStateAction<number>>;
  setIsMake: Dispatch<SetStateAction<boolean>>;
  setCandidateId: Dispatch<SetStateAction<number>>;
};

function CandidateEditorTable({
  worldcupId,
  password,
  accessToken,
  setSaveList,
  setIsMake,
  setCandidateId
}: Props) {
  console.log(worldcupId, password, "헐");
  const {
    currentPage,
    setCurrentPage,
    searchText,
    setSearchText,
    setSearch,
    pageSize,
    setPageSize,
    data, // SWR로 불러온 데이터
    error,
    mutate,
    isLoading
  } = useTableStateWithSWR(worldcupId, password);

  const handleSearch = useHandleSearchState({ searchText, setSearch });

  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize]);

  useEffect(() => {
    if (data) setSaveList(data!.pageInfo.totalElements);
  }, [data, setSaveList]);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const rankMember: Rank_res_data[] = data!.data;
  const totalPage: number = data!.pageInfo.totalPages;

  const handleDelete = (id: number) => {
    delete_candidates(accessToken || "", id).then(() => mutate());
  };

  return (
    <>
      <main className="flex justify-center items-center mt-4 mx-auto">
        <SearchForm
          handleSearch={handleSearch}
          searchText={searchText}
          setSearchText={setSearchText}
        />

        {/* 페이지 당 아이템 수 선택 */}
        <PageSizeSelector pageSize={pageSize} setPageSize={setPageSize} />

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
          {rankMember.map((rank: Rank_res_data, i: number) => (
            <TrcomponentWithEditor
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

export default CandidateEditorTable;
