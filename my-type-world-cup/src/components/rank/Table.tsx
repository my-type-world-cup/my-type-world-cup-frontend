import { rankDummy } from "@/lib/Dummy";
import Image from "next/image";
import { useState } from "react";
function Table() {
  console.log(rankDummy);
  const [currentPage, setCurrentPage] = useState(1);
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
          <th className="bg-inputGray text-gray font-medium font-bevietnam">
            순위
          </th>
          <th className="bg-inputGray text-gray font-medium font-poppins">
            사진
          </th>
          <th className="bg-inputGray text-gray font-bold font-pretendard">
            이름
          </th>
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
