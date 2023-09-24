import { useCandidateManagementState } from "@/lib/hooks/useCandidateManagementState";
import type { Editor_step, Post_res } from "@/type/Types";
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";
import CandidateList from "./CandidateList";
import ImageUpload from "./ImageUpload";
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

  //파일을 선택했을 때 호출되는 비동기 함수
  async function onSelectFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    // 이벤트 리스너를 먼저 등록한 후에 readAsDataURL 함수를 호출
    const fileReadResult = await new Promise<string>((resolve) => {
      reader.onload = () => resolve(reader.result?.toString() || "");
      reader.onerror = () => resolve("");
      reader.readAsDataURL(file);
    });

    setImgSrc(fileReadResult);
  }

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
