import { fetcherPost } from "@/api/swr_fetch";
import { rank_res } from "@/type/Types";
import { useState } from "react";
import useSWR from "swr";
import { BACK_URL } from "../config";



const useTableStateWithSWRWithSWR = (worldcupId: number ) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomed, setZoomed] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(10);
  const [sort, setSort] = useState<string>("finalWinCount");

 const { data } = useSWR<rank_res>(
    `${BACK_URL}/worldcups/${worldcupId}/candidates?sort=${sort}&direction=DESC&size=${pageSize}&page=${currentPage}${search}`,
    (url) => fetcherPost(url, { password: null })
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
    search,
    setSearch,
    pageSize,
    setPageSize,
    sort,
    setSort,
    data,  // SWR로 불러온 데이터
  };
};

export default useTableStateWithSWRWithSWR