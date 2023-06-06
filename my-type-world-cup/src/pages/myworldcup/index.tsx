import { delete_worldcup, get_detail } from "@/api/user";
import Card from "@/components/main/Card";
import SearchBar from "@/components/main/SearchBar";
import SortButtons from "@/components/main/SortButtons";
import { fetcherToken } from "@/lib/Helper";
import { BACK_URL } from "@/lib/config";
import { MainWorldcup, WorldcupsResponse } from "@/type/Types";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import useSWRInfinite from "swr/infinite";
import { accessTokenState, postWorldcup, userState } from "../../lib/atom/atom";
const PAGE_SIZE = 10;

export type Value = "playCount" | "createdAt" | "commentCount";

export default function Home({}: {}) {
  const router = useRouter();
  const accessToken = useRecoilValue(accessTokenState);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false); //메뉴바 관리
  const [sort, setSort] = useState<Value>("playCount"); //정렬 관리
  const [search, setSearch] = useState<string>(""); //검색 관리
  const [alarm, setAlarm] = useState<boolean>(false); //알람 관리
  const resetEditor = useResetRecoilState(postWorldcup);
  const setEditor = useSetRecoilState(postWorldcup);
  const memberId = useSetRecoilState(userState);
  useEffect(() => {
    if (!accessToken) {
      router.push("/");
    }
    console.log(accessToken);
  }, [accessToken, router]);
  const { data, mutate, size, setSize, isValidating, isLoading } =
    useSWRInfinite<WorldcupsResponse>(
      (index) =>
        `${BACK_URL}/members/worldcups?page=${
          index + 1
        }&size=10&sort=${sort}${search}`,
      (url: string) => fetcherToken(url, accessToken)
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

  const handlerDelete = async (id: number) => {
    try {
      const res = await delete_worldcup(accessToken || "", id);
      console.log("됏다~");
      console.log(res);
      mutate();

      console.log(res);
    } catch (e) {
      console.log("안됏다~");
      console.log(e);
    }
  };
  const handlerWorldCup = (id: number) => {
    resetEditor();
    get_detail(id, accessToken || "").then((res) => {
      console.log(res);
      setEditor(res);
      router.push("/editors");
    });
  };
  const worldcups: MainWorldcup[] = data ? data.map((v) => v.data).flat() : [];
  //예시는 모두다 배열임
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined"); //로딩중

  // 더이상 없을때 체크
  const isRefreshing = isValidating && data && data.length === size; // 요청중
  console.log(worldcups, data);
  return (
    <>
      <main
        className="flex h-screen flex-col pt-4 overflow-y-scroll relative mt-20"
        ref={containerRef}
      >
        <SearchBar setSearch={setSearch} />
        <div className="mt-8 mx-auto">
          <SortButtons setSort={setSort} sort={sort} />
        </div>
        <article className="w-full h-auto ">
          {worldcups.map((v) => (
            <Card
              key={v.id}
              worldcup={v}
              mine={true}
              handlerDelete={handlerDelete}
              handlerWorldCup={handlerWorldCup}
            />
          ))}
        </article>
      </main>
    </>
  );
}
