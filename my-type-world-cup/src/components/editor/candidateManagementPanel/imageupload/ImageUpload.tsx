// ImageUpload.tsx
import SearchBar from "@/components/main/SearchBar";
import type { Post_res } from "@/type/Types";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import ImageEditor from "./ImageEditor";
import SearchImages from "./SearchImages";

interface ImageUploadProps {
  accessToken: string | null;
  imgSrc: string;
  setImgSrc: Dispatch<SetStateAction<string>>;
  searchData: any; // searchData의 타입을 명시해 주세요.
  setSize: Dispatch<SetStateAction<number>>;
  keyword: string;
  setIsMake: Dispatch<SetStateAction<boolean>>;
  setCandidateId: Dispatch<SetStateAction<number>>;
  candidateId: number;
  setSearch: Dispatch<SetStateAction<string>>;
  saveWorldcup: Post_res | null;
}

const ImageUpload = ({
  accessToken,
  imgSrc,
  setImgSrc,
  searchData,
  setSize,
  keyword,
  setIsMake,
  setCandidateId,
  candidateId,
  setSearch,
  saveWorldcup
}: ImageUploadProps) => {
  // 로컬 파일 업로드
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
  return (
    <section className=" flex flex-col mx-8 text-lg mb-4 ">
      <h1 className="mt-10 sm:text-xl">사진 업로드</h1>
      {/*로컬 업로드*/}
      <input type="file" onChange={onSelectFile} className="mt-8 mb-4" />
      <div className="flex justify-between">
        <div className="flex w-full   mt-4 sm:mt-8 p-2">
          <h1 className=" sm:text-xl mb-4">검색 업로드</h1>
        </div>
      </div>
      <div className=" mb-4 p-2">
        <SearchBar setSearch={setSearch} />
      </div>
      {/*이미지 검색을 통한 업로드*/}
      <SearchImages
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
        className="bg-main rounded-md text-white w-full h-12 mb-2 hover:scale-110"
      >
        돌아가기
      </button>
    </section>
  );
};

export default ImageUpload;
