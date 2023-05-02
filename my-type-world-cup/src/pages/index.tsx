import Card from "@/components/main/Card";
import SearchBar from "@/components/main/SearchBar";
import SortButtons from "@/components/main/SortButtons";
import { BACK_URL } from "@/lib/config";
import { Worldcup, WorldcupsResponse } from "@/type/Types";
import { useEffect, useRef, useState } from "react";
import useSWRInfinite from "swr/infinite";
const fetcher = (url: string) => fetch(url).then((res) => res.json());
const PAGE_SIZE = 10;

export default function Home({}: {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false); //메뉴바 관리
  const { data, mutate, size, setSize, isValidating, isLoading } =
    useSWRInfinite<WorldcupsResponse>(
      (index) => `${BACK_URL}/worldcups?page=${index + 1}&size=10`,
      fetcher
    );
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current!;
      if (scrollTop + clientHeight >= scrollHeight) {
        console.log("하이");
      }
    };
    const container = containerRef.current!;
    container.addEventListener("scroll", handleScroll);

    return () => {
      return container.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const worldcups: Worldcup[] = data ? data.map((v) => v.data).flat() : [];

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.data.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.data.length < PAGE_SIZE); // 더이상 없을때 체크
  const isRefreshing = isValidating && data && data.length === size;
  console.log(data);
  return (
    <>
      <main
        className="flex h-screen flex-col pt-24 overflow-y-scroll"
        ref={containerRef}
      >
        <SearchBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="mt-8 mx-auto">
          <SortButtons />
          <button
            onClick={() => {
              setSize(size + 1);
            }}
          >
            이거야
          </button>
        </div>
        <article className="w-full ">
          <Card />
        </article>
      </main>
    </>
  );
}
