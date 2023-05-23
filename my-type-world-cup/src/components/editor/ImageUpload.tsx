import { fetcher } from "@/lib/Helper";
import { BACK_URL } from "@/lib/config";
import type { Search_Image } from "@/type/Types";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import SearchBar from "../main/SearchBar";
import ImageEditor from "./ImageEditor";
import SaveList from "./SaveList";
import SearchImage from "./SearchImages";
type Props = {};

export default function ImageUpload({}: Props) {
  const [search, setSearch] = useState<string>("");
  const [imgSrc, setImgSrc] = useState("");
  const [modal, setModal] = useState<boolean>(true);
  const [saveList, setSaveList] = useState<string[]>([]);
  const [onandoff, setOnandoff] = useState<boolean[]>([true, true]);
  const keyword = search.slice(1);
  const { data, mutate, size, setSize, isValidating, isLoading } =
    useSWRInfinite<Search_Image>((index) => {
      // keyword가 비어 있으면 빈 문자열 반환
      if (!keyword) {
        return "";
      }
      return `${BACK_URL}/images?${keyword}&page=${index + 1}&size=20`;
    }, fetcher);
  const searchData: string[] = data ? data.map((v) => v.data).flat() : [];
  useEffect(() => {
    setSize(1);
  }, [keyword, setSize]);
  console.log(size);
  // useEffect(() => {
  //   if (!imgSrc) return;
  // const formData = new FormData();//외부이미지 우리꺼로 바꿔주기
  // formData.append("image", imgSrc);
  // formData.append("key", IMGBB_KEY);

  // fetch(IMGBB_URL, {
  //   method: "POST",
  //   body: formData,
  // })
  //   .then((res) => res.json())
  //   .then((res) => console.log(res))
  //   .catch((err) => console.error(err));

  // convertToBase64(
  //   "https://i.ibb.co/pfqH7sS/0000600297-001-20230309163602830.jpg"
  // ).then((res) => setImgSrc(res));

  // fetch(imgSrc)//이미지 보내기
  //   .then((response) => response.blob())
  //   .then((blob) => {
  //     // Blob 객체를 사용하여 API 요청 보내기
  //     const formData = new FormData();
  //     formData.append("image", blob);
  //     formData.append("key", IMGBB_KEY);

  //     fetch(IMGBB_URL, {
  //       method: "POST",
  //       body: formData,
  //     })
  //       .then((res) => res.json())
  //       .then((res) => console.log(res))
  //       .catch((err) => console.error(err));
  //   });
  // }, [imgSrc]);

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
      <section className=" flex flex-col mx-8 text-lg relative">
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
          imgSrc={imgSrc}
          setImgSrc={setImgSrc}
          setSaveList={setSaveList}
        />
        <div className="">
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

          <SaveList onandoff={onandoff[0]} />
        </div>
        <button className="bg-main rounded-md text-white w-full h-12 mt-4 mb-2 hover:scale-110">
          최종 확인 하기
        </button>
      </section>
    </>
  );
}
