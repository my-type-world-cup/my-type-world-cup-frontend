import type { Round } from "@/type/Types";
import { IngameModalData } from "@/type/Types";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import GameMenubar from "./GameMenubar";
type Props = {
  isModal: [boolean, Round];
  setIsModal: Dispatch<SetStateAction<[boolean, Round]>>;
  randomContestant: () => void;
  data: IngameModalData;
  init: Round;
};

export default function Modal({
  isModal,
  setIsModal,
  randomContestant,
  data,
  init,
}: Props) {
  const handleClick = () => {
    randomContestant();
    setIsModal((el) => {
      return [false, el[1]];
    });
  };

  console.log(data);
  return (
    <div className="absolute top-2/4 rounded-3xl left-1/2 z-20 flex flex-col justify-center items-center transform -translate-x-1/2 -translate-y-1/2 bg-white h-4/6 sm:h-3/6 w-3/4">
      <Image
        src="/icon/trophy.svg"
        alt="Mypage"
        className="mt-4 sm:mt-4"
        width={80}
        height={83}
        priority
      />
      <h2 className="text-main mt-2 text-xl break-all mx-6">{data?.title}</h2>
      <p className="mt-2 text-sm break-all w-10/12 h-12">{data?.description}</p>
      <p className="mt-2 sm:mt-8 text-sm break-all w-10/12">
        라운드를 선택해주세요
      </p>
      <GameMenubar isModal={isModal} setIsModal={setIsModal} init={init} />
      <p className="mt-2 text-sm break-all w-10/12">
        총 {data.candidatesCount}명의 후보 중 {isModal[1]}명과 대결합니다
      </p>

      <input
        className="mt-2 sm:mt-4 w-10/12 h-8 px-4 border-[1px] text-sm border-gray "
        type="password"
        disabled={data.visibility}
        placeholder="비밀번호를 입력해주세요"
      />

      <button
        onClick={() => handleClick()}
        type="button"
        className="bg-main px-4 mt-4 mb-4 h-10 text-white flex items-center space-x-2 rounded-lg hover:scale-110  cursor-pointer"
      >
        <Image src="/icon/start.svg" alt="start" width={17} height={20} />
        <p className="text-lg">시작하기</p>
      </button>
    </div>
  );
}
