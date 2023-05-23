import Card from "@/components/main/Card";
import SearchBar from "@/components/main/SearchBar";
import SortButtons from "@/components/main/SortButtons";
import { fetcher } from "@/lib/Helper";
import { BACK_URL } from "@/lib/config";
import { MainWorldcup, WorldcupsResponse } from "@/type/Types";
import { useEffect, useRef, useState } from "react";
import useSWRInfinite from "swr/infinite";
const PAGE_SIZE = 10;

export type Value = "playCount" | "createdAt" | "commentCount";

export default function Home({}: {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false); //메뉴바 관리
  const [sort, setSort] = useState<Value>("playCount"); //정렬 관리
  const [search, setSearch] = useState<string>(""); //검색 관리
  console.log(sort);

  const { data, mutate, size, setSize, isValidating, isLoading } =
    useSWRInfinite<WorldcupsResponse>(
      (index) =>
        `${BACK_URL}/worldcups?page=${index + 1}&size=10&sort=${sort}${search}`,
      fetcher
    );

  const isReachingEnd = data && data[data.length - 1]?.data.length < PAGE_SIZE;
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current!;
      if (scrollTop + clientHeight >= scrollHeight && !isReachingEnd) {
        setSize((el) => el + 1);
        console.log("하이");
      }
    };
    const container = containerRef.current!;
    container.addEventListener("scroll", handleScroll);

    return () => {
      return container.removeEventListener("scroll", handleScroll);
    };
  }, [isReachingEnd, setSize]);
  const worldcups: MainWorldcup[] = data ? data.map((v) => v.data).flat() : [];

  //예시는 모두다 배열임
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined"); //로딩중

  if (!data) return <div ref={containerRef}>로딩중</div>;

  // 더이상 없을때 체크
  const isRefreshing = isValidating && data && data.length === size; // 요청중

  return (
    <>
      <main
        className="flex h-screen flex-col overflow-y-scroll relative pt-24"
        ref={containerRef}
      >
        <SearchBar setSearch={setSearch} />
        <div className="mt-12 mx-auto">
          <SortButtons setSort={setSort} sort={sort} />
        </div>
        <article className="w-full h-auto ">
          {data ? (
            worldcups.map((v) => <Card key={v.id} worldcup={v} />)
          ) : (
            <div>로딩중입니다.</div>
          )}
        </article>
      </main>
    </>
  );
}
