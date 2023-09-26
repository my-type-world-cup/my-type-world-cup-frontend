import CandidateList from "@/components/editor/candidateManagementPanel/candidateList/CandidateList";
import ImageUpload from "@/components/editor/candidateManagementPanel/imageupload/ImageUpload";
import { useCandidateManagementState } from "@/lib/hooks/useCandidateManagementState";
import type { Editor_step, Post_res } from "@/type/Types";
import { Dispatch, SetStateAction, useEffect } from "react";

type Props = {
  saveWorldcup: Post_res | null;
  setIsNumber: Dispatch<SetStateAction<Editor_step>>;
  accessToken: string | null;
};

export default function CandidateManagement({
  saveWorldcup,
  setIsNumber,
  accessToken
}: Props) {
  const {
    keyword,
    setSize,
    setSearch,
    imgSrc,
    setImgSrc,
    saveList,
    setSaveList,
    isMake,
    setIsMake,
    candidateId,
    setCandidateId,
    searchData
  } = useCandidateManagementState({ accessToken });

  useEffect(() => {
    //props으로 관리되어서 커스텀훅에서 제외함
    if (!saveWorldcup) {
      setIsNumber(1);
    }
  }, []);

  if (!saveWorldcup) {
    return <></>;
  }

  return (
    <>
      {!isMake ? (
        <CandidateList
          saveList={saveList}
          saveWorldcup={saveWorldcup}
          setIsMake={setIsMake}
          accessToken={accessToken}
          setSaveList={setSaveList}
          setCandidateId={setCandidateId}
        />
      ) : (
        <ImageUpload
          accessToken={accessToken}
          imgSrc={imgSrc}
          setImgSrc={setImgSrc}
          searchData={searchData}
          setSize={setSize}
          keyword={keyword}
          setIsMake={setIsMake}
          setCandidateId={setCandidateId}
          candidateId={candidateId}
          saveWorldcup={saveWorldcup}
          setSearch={setSearch}
        />
      )}
    </>
  );
}
