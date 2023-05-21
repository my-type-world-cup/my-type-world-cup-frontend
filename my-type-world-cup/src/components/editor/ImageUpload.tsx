import { fetcher } from "@/lib/Helper";
import { BACK_URL } from "@/lib/config";
import type { Search_Image } from "@/type/Types";
import { useState } from "react";
import useSWRInfinite from "swr/infinite";
import SearchBar from "../main/SearchBar";
import ImageEditor from "./ImageEditor";
import SearchImage from "./SearchImages";
type Props = {};

export default function ImageUpload({}: Props) {
  const [search, setSearch] = useState<string>("");
  const [images, setImages] = useState<Search_Image | null>(null);
  const [page, setPage] = useState<number>(1);
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
  //   console.log(search.trim(), "결과");
  //   if (!search.trim()) return;
  //   const keyword = search.slice(1);
  //   console.log(search.trim(), "결과1");
  //   fetch(`${BACK_URL}/images?${keyword}&page=${page}&size=20`)
  //     .then((res) => res.json())
  //     .then((res) => setImages(res));
  // }, [search, page]);

  console.log(data, images, "이미지");

  return (
    <section className="mt-12 flex flex-col mx-8 text-lg">
      <div>
        <label className=""> 이미지 업로드</label>
        <SearchImage data={searchData ? searchData : null} setSize={setSize} />
      </div>

      <SearchBar setSearch={setSearch} />
      <div className="flex justify-between">
        <h1 className="text-xl mb-4">Image List</h1>
      </div>
      <SearchImage data={searchData ? searchData : null} setSize={setSize} />

      <ImageEditor />
    </section>
  );
}
