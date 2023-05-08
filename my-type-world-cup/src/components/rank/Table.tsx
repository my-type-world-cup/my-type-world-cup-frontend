import { rankDummy } from "@/lib/Dummy";
import { fetcherPost } from "@/lib/Helper";
import { BACK_URL } from "@/lib/config";
import { rank_Data } from "@/type/Types";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";

type Props = {
  rankData: rank_Data;
};

function Table({ rankData }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading } = useSWR(
    `${BACK_URL}/candidates/search?sort=finalWinCount&direction=DESC&size=10&page=1`,
    (url) => fetcherPost(url, rankData)
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  console.log(data);

  //   calculatePageNumbers
  //   const [pageNumbers, currentItems] = calculatePageNumbers(
  //     rankDummy,
  //     currentPage
  //   );
  return (
    <table className="mt-28 text-sm mx-2">
      <colgroup>
        <col className="w-1/12 bg-white" />

        <col className="w-2/12 bg-white" />
        <col className="w-2/12 bg-white" />
        <col className="w-1/12 bg-white" />
        <col className="w-1/12 bg-white" />
        <col className="w-1/12 bg-white" />
        <col className="w-1/12 bg-white" />
      </colgroup>
      <thead className="bg-inputGray text-gray ">
        <tr>
          <th>순위</th>
          <th>사진</th>
          <th>이름</th>
          <th>우승</th>
          <th className="text-main border-b-4 border-main">우승비율</th>
          <th>승리</th>
          <th>1:1 승률</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-hr border">
          <td className="text-center text-gray">1</td>
          <td>
            <div className="overflow-hidden h-24 w-24">
              <Image
                className="flex justify-center items-center"
                src={rankDummy[3].image}
                alt="start"
                width={60}
                height={60}
              />
            </div>
          </td>
          <td className="text-gray text-center">에스파 카리나</td>
          <td className="text-gray text-center">20회</td>
          <td className=" bg-inputGray text-center ">45.72%</td>
          <td className="text-gray text-center">50회</td>
          <td className="text-gray text-center">70.24%</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Table;
