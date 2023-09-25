// CandidateList.tsx
import type { Post_res } from "@/type/Types";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import CandidateEditorTable from "./CandidateEditorTable";

interface CandidateListProps {
  saveWorldcup: Post_res | null;
  setIsMake: Dispatch<SetStateAction<boolean>>;
  accessToken: string | null;
  setSaveList: Dispatch<SetStateAction<number>>;
  setCandidateId: Dispatch<SetStateAction<number>>;
  saveList: number;
}

const CandidateList = ({
  saveWorldcup,
  setIsMake,
  accessToken,
  setSaveList,
  setCandidateId,
  saveList
}: CandidateListProps) => {
  const router = useRouter();

  const handleMyWorldCup = () => {
    router.push(`/myworldcup`);
  };
  console.log(saveWorldcup, "헐");
  return (
    <section className="flex flex-col mx-8 text-lg">
      <h1 className="mt-8 sm:mt-12 mb-0 sm:mb-2 sm:text-xl  py-4 font-bold">
        후보 목록
      </h1>
      <CandidateEditorTable
        worldcupId={saveWorldcup?.id || 0} // worldCupId
        password={saveWorldcup?.password || null} // password
        setIsMake={setIsMake}
        accessToken={accessToken}
        setSaveList={setSaveList}
        setCandidateId={setCandidateId}
      />

      {!(saveList >= 4) ? (
        <p className="flex justify-between text-sm text-error mx-2 mt-8">
          <span>현재 후보 수 : {saveList}</span>
          <span> 최소 4명이 필요합니다.</span>
        </p>
      ) : (
        <div className="flex justify-between text-sm mx-2 mt-2">
          <span>현재 후보 수 : {saveList}</span>
          <span> 월드컵이 등록되었습니다</span>
        </div>
      )}

      <button
        onClick={() => {
          setIsMake(true);
          setCandidateId(0);
        }}
        className="bg-main rounded-md text-white w-full h-12 mt-8 mb-2 hover:scale-110"
      >
        후보 추가하기
      </button>

      {saveList >= 4 && (
        <button
          onClick={handleMyWorldCup}
          className="bg-main rounded-md text-white w-full h-12 mt-4 mb-2 hover:scale-110"
        >
          나만의 월드컵 보러가기
        </button>
      )}
    </section>
  );
};

export default CandidateList;
