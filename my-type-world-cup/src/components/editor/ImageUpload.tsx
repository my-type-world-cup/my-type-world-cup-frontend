import { BACK_URL } from "@/lib/config";
import type { Search_Image } from "@/type/Types";
import Image from "next/image";
import { useEffect, useState } from "react";
import SearchBar from "../main/SearchBar";
import DragImage from "./DragImage";
import ImageEditor from "./ImageEditor";
import SearchImage from "./SearchImages";
type Props = {};

export default function ImageUpload({}: Props) {
  const [search, setSearch] = useState<string>("");
  const [images, setImages] = useState<Search_Image | null>(null);
  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    console.log(search.trim(), "결과");
    if (!search.trim()) return;
    const keyword = search.slice(1);
    console.log(search.trim(), "결과1");
    fetch(`${BACK_URL}/images?${keyword}&page=${page}&size=10`)
      .then((res) => res.json())
      .then((res) => setImages(res));
  }, [search, page]);
  console.log(images, "이미지");
  return (
    <section className="mt-12 flex flex-col mx-8 text-lg">
      <div>
        <label className=""> 이미지 업로드</label>
        <DragImage />
      </div>

      <SearchBar setSearch={setSearch} />
      <div className="flex justify-between">
        <h1 className="text-xl mb-4">Image List</h1>
        <div className="flex">
          <button
            type="button"
            className="input-button"
            onClick={() =>
              setPage((prev) => {
                if (prev === images?.pageInfo.totalPages) return prev;
                return prev + 1;
              })
            }
          >
            <Image
              src="/icon/grayPlus.svg"
              alt="plus"
              className="cursor-pointer"
              width={20}
              height={18}
              priority
            />
          </button>
          <button
            type="button"
            className="input-button ml-2"
            onClick={() =>
              setPage((prev) => {
                if (prev === 1) return prev;
                return prev - 1;
              })
            }
          >
            <Image
              src="/icon/grayMinus.svg"
              alt="minus"
              className="cursor-pointer"
              width={20}
              height={18}
              priority
            />
          </button>
        </div>
      </div>
      <SearchImage data={images ? images.data : null} />

      <ImageEditor />
    </section>
  );
}
