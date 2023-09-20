import { fetcherPost } from "@/api/swr_fetch";
import type { Rank_res } from "@/type/Types";
import { Dispatch, SetStateAction, useState } from "react";
import useSWR from "swr";
import { BACK_URL } from "../config";

type ReturnType = {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  zoomed: boolean;
  setZoomed: Dispatch<SetStateAction<boolean>>;
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  setSearch: Dispatch<SetStateAction<string>>;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
  data: Rank_res | undefined;
  error: Error | null;
  isLoading: boolean;
  mutate: () => void;
};

const useTableStateWithSWR = (
  worldcupId: number,
  password: string | null = null
): ReturnType => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomed, setZoomed] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(10);
  const [sort, setSort] = useState<string>("finalWinCount");

  const { data, error, isLoading, mutate } = useSWR<Rank_res>(
    `${BACK_URL}/worldcups/${worldcupId}/candidates?sort=${sort}&direction=DESC&size=${pageSize}&page=${currentPage}${search}`,
    (url) => fetcherPost(url, { password })
  );

  return {
    currentPage,
    setCurrentPage,
    zoomed,
    setZoomed,
    image,
    setImage,
    searchText,
    setSearchText,
    setSearch,
    pageSize,
    setPageSize,
    sort,
    setSort,
    data, // SWR로 불러온 데이터
    error,
    isLoading,
    mutate
  };
};

export default useTableStateWithSWR;
