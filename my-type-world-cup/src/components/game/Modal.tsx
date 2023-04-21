import React from "react";
import Image from "next/image";
import GameMenubar from "./GameMenubar";

import { useState } from "react";
export type round = "32강" | "16강" | "8강" | "4강";
type Props = {};

export default function Modal({}: Props) {
  const [selectedRound, setSelectedRound] = useState<round>("32강");
  const number = selectedRound.match(/\d+/)?.[0]; //알아서 다시됨
  return (
    <div className="absolute top-2/4 rounded-3xl left-1/2 z-20 flex flex-col justify-center items-center transform -translate-x-1/2 -translate-y-1/2 bg-white h-3/6 w-3/4">
      <Image
        src="/icon/trophy.svg"
        alt="Mypage"
        className="mt-4 sm:mt-4"
        width={80}
        height={60}
        priority
      />
      <h2 className="text-main mt-2 text-xl break-all mx-6">
        여자 아이돌 이상형 월드컵
      </h2>
      <p className="mt-2 text-sm break-all w-10/12 h-12">
        2023년도 여자 아이돌 월드컵 당신의 이상형은 누구인가요?
      </p>
      <p className="mt-2 sm:mt-8 text-sm break-all w-10/12">
        라운드를 선택해주세요
      </p>
      <GameMenubar
        selectedRound={selectedRound}
        setSelectedRound={setSelectedRound}
      />
      <p className="mt-2 text-sm break-all w-10/12">
        총 n명의 후보 중 {number}명과 대결합니다
      </p>
      <div className="bg-main px-4 mt-2 sm:mt-4 mb-4 h-10 text-white flex items-center space-x-2 rounded-lg hover:scale-110  cursor-pointer">
        <Image src="/icon/start.svg" alt="start" width={17} height={15} />
        <button className="text-lg" value={"game"}>
          시작하기
        </button>
      </div>
    </div>
  );
}
