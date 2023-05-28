import { fetcherToken } from "@/lib/Helper";
import { saveWorldcups } from "@/lib/atom/atom";
import { BACK_URL } from "@/lib/config";
import type { Post_res, Save_data, Search_Image } from "@/type/Types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import useSWRInfinite from "swr/infinite";
import SearchBar from "../main/SearchBar";
import EditorTable from "./EditorTable";
import ImageEditor from "./ImageEditor";
import SearchImage from "./SearchImages";

import type { Step } from "./TabButton";

type Props = {
  saveWorldcup: Post_res | null;
  setIsNumber: React.Dispatch<React.SetStateAction<Step>>;
  accessToken: string | null;
};

export default function ImageUpload({
  saveWorldcup,
  setIsNumber,
  accessToken,
}: Props) {
  console.log(saveWorldcup, "saveWorldcup");
  const [search, setSearch] = useState<string>("");
  const [imgSrc, setImgSrc] = useState("");
  const [saveList, setSaveList] = useRecoilState<Save_data[]>(saveWorldcups);
  const [onandoff, setOnandoff] = useState<boolean[]>([true, true]);
  const [isMake, setIsMake] = useState<boolean>(false);
  const keyword = search.slice(1);
  const { data, mutate, size, setSize, isValidating, isLoading } =
    useSWRInfinite<Search_Image>(
      (index) => {
        // keyword가 비어 있으면 빈 문자열 반환
        if (!keyword) {
          return "";
        }
        return `${BACK_URL}/images?${keyword}&page=${index + 1}&size=20`;
      },
      (url: string) => fetcherToken(url, accessToken)
    );
  console.log(saveList, "saveList");
  const searchData: string[] = data ? data.map((v) => v.data).flat() : [];
  useEffect(() => {
    setSize(1);
  }, [keyword, setSize]);

  useEffect(() => {
    if (!saveWorldcup) {
      setIsNumber("1");
    }
    // deleteImage("https://ibb.co/FVM8BWM/8a86410147f09597e85d2dd8f5e60e2a");
  }, [saveWorldcup, setIsNumber]);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      // console.log(e.target.files);
      // setCrop(undefined); //이미지 간 자르기 미리보기를 업데이트합니다
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        setImgSrc(reader.result?.toString() || "");
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  return (
    <>
      {!isMake ? (
        <section className=" flex flex-col mx-8 text-lg mb-4 ">
          <EditorTable
            rankData={{
              worldCupId: saveWorldcup?.id || 0,
              password: saveWorldcup?.password || null,
            }}
            accessToken={accessToken}
          />
          {!(saveList.length >= 4) ? (
            <p className="flex justify-between text-sm text-error mx-2 mt-2">
              <span>현재 후보 수 : {saveList.length}</span>
              <span> 최소 4명이 필요합니다.</span>
            </p>
          ) : (
            <div className="flex justify-between text-sm mx-2 mt-2">
              <span>현재 후보 수 : {saveList.length}</span>
              <span> 월드컵이 등록되었습니다</span>
            </div>
          )}
          {saveList.length >= 4 && (
            <button className="bg-main rounded-md text-white w-full h-12 mt-4 mb-2 hover:scale-110">
              최종 확인 하기
            </button>
          )}
          <button
            onClick={() => setIsMake(true)}
            className="bg-main rounded-md text-white w-full h-12 mt-8 mb-2 hover:scale-110"
          >
            후보 추가하기
          </button>
          {/* <div className="flex justify-between">
            <div className="flex w-full   mt-4 sm:mt-8 p-2">
              <h1 className=" sm:text-xl">검색 목록</h1>
              <Image
                src="/icon/onandoff.svg"
                alt="Login"
                className="cursor-pointer ml-2"
                width={18}
                height={18}
                priority
                style={{
                  transform: onandoff[1] ? "rotate(-90deg)" : "rotate(0deg)",
                  transition: "all 0.3s ease-in-out",
                }}
                onClick={() => {
                  setOnandoff((el) => [el[0], !el[1]]);
                }}
              />
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
            onandoff={onandoff[1]}
          />
          <h1 className="mt-4 sm:text-xl">이미지 업로드</h1>
          <input type="file" onChange={onSelectFile} className="mt-4" />

          <ImageEditor
            accessToken={accessToken}
            imgSrc={imgSrc}
            setImgSrc={setImgSrc}
            setSaveList={setSaveList}
            id={saveWorldcup?.id}
          /> */}
          <div className="">
            {/* <div className=" flex  p-2">
            <label className="sm:text-xl">이미지 업로드</label>

            <Image
              src="/icon/onandoff.svg"
              alt="Login"
              className="cursor-pointer ml-2"
              width={18}
              height={18}
              priority
              style={{
                transform: onandoff[0] ? "rotate(-90deg)" : "rotate(0deg)",
                transition: "all 0.3s ease-in-out",
              }}
              onClick={() => {
                setOnandoff((el) => [!el[0], el[1]]);
              }}
            />
          </div> */}

            {/* <SaveList
            onandoff={onandoff[0]}
            saveList={saveList}
            accessToken={accessToken}
          /> */}
          </div>
        </section>
      ) : (
        <section className=" flex flex-col mx-8 text-lg mb-4 ">
          <div className="flex justify-between">
            <div className="flex w-full   mt-4 sm:mt-8 p-2">
              <h1 className=" sm:text-xl">검색 목록</h1>
              <Image
                src="/icon/onandoff.svg"
                alt="Login"
                className="cursor-pointer ml-2"
                width={18}
                height={18}
                priority
                style={{
                  transform: onandoff[1] ? "rotate(-90deg)" : "rotate(0deg)",
                  transition: "all 0.3s ease-in-out",
                }}
                onClick={() => {
                  setOnandoff((el) => [el[0], !el[1]]);
                }}
              />
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
            onandoff={onandoff[1]}
          />
          <h1 className="mt-4 sm:text-xl">이미지 업로드</h1>
          <input type="file" onChange={onSelectFile} className="mt-4" />

          <ImageEditor
            accessToken={accessToken}
            imgSrc={imgSrc}
            setImgSrc={setImgSrc}
            setSaveList={setSaveList}
            id={saveWorldcup?.id}
            setIsMake={setIsMake}
          />
          {/* <div className="">
            <div className=" flex  p-2">
              <label className="sm:text-xl">이미지 업로드</label>

              <Image
                src="/icon/onandoff.svg"
                alt="Login"
                className="cursor-pointer ml-2"
                width={18}
                height={18}
                priority
                style={{
                  transform: onandoff[0] ? "rotate(-90deg)" : "rotate(0deg)",
                  transition: "all 0.3s ease-in-out",
                }}
                onClick={() => {
                  setOnandoff((el) => [!el[0], el[1]]);
                }}
              />
            </div>

            <SaveList
              onandoff={onandoff[0]}
              saveList={saveList}
              accessToken={accessToken}
            />
          </div> */}
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
