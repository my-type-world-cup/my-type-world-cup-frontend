import { useImageUploadState } from "@/lib/hooks/useImageUploadState";
import type { Editor_step, Post_res } from "@/type/Types";
import { useRouter } from "next/router";
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";
import SearchBar from "../main/SearchBar";
import ImageEditor from "./ImageEditor";
import ImageEditorTable from "./ImageEditorTable";
import SearchImage from "./SearchImages";

type Props = {
  saveWorldcup: Post_res | null;
  setIsNumber: Dispatch<SetStateAction<Editor_step>>;
  accessToken: string | null;
};

export default function ImageUpload({
  saveWorldcup,
  setIsNumber,
  accessToken
}: Props) {
  const router = useRouter();
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
  } = useImageUploadState({ accessToken });

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

  const handleMyWorldCup = () => {
    router.push(`/myworldcup`);
  };

  if (!saveWorldcup) {
    return <></>;
  }

  return (
    <>
      {!isMake ? (
        <section className="flex flex-col mx-8 text-lg">
          <h1 className="mt-8 sm:mt-12 mb-0 sm:mb-2 sm:text-xl  py-4 font-bold">
            후보 목록
          </h1>
          <ImageEditorTable
            rankData={{
              worldCupId: saveWorldcup?.id || 0,
              password: saveWorldcup?.password || null
            }}
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
      ) : (
        <section className=" flex flex-col mx-8 text-lg mb-4 ">
          <h1 className="mt-10 sm:text-xl">사진 업로드</h1>
          <input type="file" onChange={onSelectFile} className="mt-8 mb-4" />
          <div className="flex justify-between">
            <div className="flex w-full   mt-4 sm:mt-8 p-2">
              <h1 className=" sm:text-xl mb-4">검색 업로드</h1>
            </div>
          </div>
          <div className=" mb-4 p-2">
            <SearchBar setSearch={setSearch} />
          </div>
          <SearchImage
            data={searchData ? searchData : null}
            setSize={setSize}
            setImgSrc={setImgSrc}
            keyword={keyword}
          />

          <ImageEditor
            accessToken={accessToken}
            imgSrc={imgSrc}
            setImgSrc={setImgSrc}
            id={saveWorldcup?.id}
            setIsMake={setIsMake}
            setCandidateId={setCandidateId}
            candidateId={candidateId}
          />

          <button
            onClick={() => setIsMake(false)}
            className="bg-main rounded-md text-white w-full h-12 mt-1 mb-2 hover:scale-110"
          >
            돌아가기
          </button>
        </section>
      )}
    </>
  );
}
