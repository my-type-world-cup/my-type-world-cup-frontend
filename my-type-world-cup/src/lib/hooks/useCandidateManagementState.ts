import { fetcherToken } from "@/api/swr_fetch";
import type { Search_Image } from "@/type/Types";
import { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { BACK_URL } from "../config";

interface CandidateManagementProps {
  accessToken: string | null;
}

export const useCandidateManagementState = ({
  accessToken
}: CandidateManagementProps) => {
  const [search, setSearch] = useState<string>("");
  const [imgSrc, setImgSrc] = useState<string>("");
  const [saveList, setSaveList] = useState<number>(0);
  const [isMake, setIsMake] = useState<boolean>(false);
  const [candidateId, setCandidateId] = useState<number>(0);

  const keyword = search.slice(1);

  const { data, setSize } = useSWRInfinite<Search_Image>(
    (index) => {
      // keyword가 비어 있으면 빈 문자열 반환
      if (!keyword) {
        return "";
      }
      return `${BACK_URL}/images?${keyword}&page=${index + 1}&size=20`;
    },
    (url: string) => fetcherToken(url, accessToken)
  );

  const searchData: string[] = data ? data.map((v) => v.data).flat() : [];

  useEffect(() => {
    setSize(1);
  }, [keyword]);

  return {
    setSize,
    keyword,
    setSearch,
    imgSrc,
    setImgSrc,
    saveList,
    setSaveList,
    isMake,
    setIsMake,
    candidateId,
    setCandidateId,
    searchData
  };
};
