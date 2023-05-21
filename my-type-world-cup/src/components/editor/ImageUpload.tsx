import { fetcher } from "@/lib/Helper";
import { BACK_URL } from "@/lib/config";
import type { Search_Image } from "@/type/Types";
import Image from "next/image";
import { useState } from "react";
import useSWRInfinite from "swr/infinite";
import SearchBar from "../main/SearchBar";
import ImageEditor from "./ImageEditor";
import SearchImage from "./SearchImages";
type Props = {};

export default function ImageUpload({}: Props) {
  const [search, setSearch] = useState<string>("");
  const [imgSrc, setImgSrc] = useState("");
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
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", () => {
        setImgSrc(reader.result?.toString() || "");
      });
    }
  }

  return (
    <section className="mt-12 flex flex-col mx-8 text-lg">
      <div>
        <label className=""> 이미지 업로드</label>
      </div>

      <SearchBar setSearch={setSearch} />
      <div className="flex justify-between">
        <h1 className="text-xl mb-4">Image List</h1>
      </div>
      <SearchImage
        data={searchData ? searchData : null}
        setSize={setSize}
        setImgSrc={setImgSrc}
      />
      <input type="file" onChange={onSelectFile} />
      {imgSrc && (
        <Image
          src={imgSrc}
          width={250}
          height={250}
          alt="Picture of the author"
        />
      )}
      <ImageEditor imgSrc={imgSrc} setImgSrc={setImgSrc} />
    </section>
  );
}
