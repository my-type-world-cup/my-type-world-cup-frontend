import { rank_res_data } from "@/type/Types";
import Image from "next/image";
import { useState } from "react";
import loadingGif from "../../../public/icon/loading.gif";
type Props = {
  rank: rank_res_data;
  i: number;
  currentPage: number;
  pageSize: number;
  handleDelete: (id: number) => void;
  setIsMake: React.Dispatch<React.SetStateAction<boolean>>;
  setCandidateId: React.Dispatch<React.SetStateAction<number>>;
};

export default function TrComponent({
  rank,
  i,
  currentPage,
  pageSize,
  setIsMake,
  handleDelete,
  setCandidateId,
}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handler = () => {
    setIsMake(true);
    setCandidateId(rank.id);
    // 후보로 바꿔야함,
    // 아이디 넘겨줘야함
  };

  return (
    <tr className="border-hr border" key={rank.id}>
      <td className="text-center text-gray">
        {i + 1 + (currentPage - 1) * pageSize}
      </td>
      <td>
        <div className="relative overflow-hidden h-20 flex items-center justify-center">
          <Image
            className="z-20"
            src={rank.image}
            alt="start"
            width={100}
            height={60}
            onLoadingComplete={() => setIsLoading(true)}
            priority
          />
          {isLoading && (
            <div className="absolute z-10">
              <Image
                src={loadingGif}
                alt={"loading"}
                width={200}
                height={200}
                className="cursor-pointer"
              />
            </div>
          )}
        </div>
      </td>
      <td className="text-gray text-center overflow-hidden whitespace-nowrap max-w-xs">
        <div className="text-ellipsis text-lg font-bold">
          {rank.name.length > 7 ? `${rank.name.slice(0, 7)}...` : rank.name}
        </div>
      </td>
      <td>
        <div className={"flex justify-evenly items-center text-center "}>
          <Image
            src="/icon/picture.svg"
            alt="Mypage"
            className="cursor-pointer hover:scale-125"
            width={30}
            height={30}
            onClick={handler}
            priority
          />
          <Image
            src="/icon/delete.svg"
            alt="Mypage"
            className="cursor-pointer hover:scale-125"
            width={20}
            height={20}
            priority
            onClick={() => handleDelete(rank.id)}
          />
        </div>
      </td>
    </tr>
  );
}
