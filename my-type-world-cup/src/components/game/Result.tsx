import GameButtons from "@/components/main/GameButtons";
import type { Contestant } from "@/pages/game/[id]";
import Image from "next/image";
import Router from "next/router";
import { MutableRefObject } from "react";
import Comment from "./Comment";
import CommentList from "./CommentList";
type Props = {
  winnerRef: MutableRefObject<Contestant[]>;
};

export default function Result({ winnerRef }: Props) {
  const router = Router;

  return (
    <>
      <div className="h-auto mt-20 ">
        <div className=" relative flex justify-center pt-2 items-center overflow-hidden h-[380px] sm:h-[380px]  ">
          <Image
            src={winnerRef.current[0].image}
            alt="one"
            width={500}
            height={330}
            className="cursor-pointer sm:hover:scale-125 duration-300"
          />
          <h3
            className="absolute text-white bottom-10 text-xl"
            style={{
              textShadow:
                "1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black",
            }}
          >
            {winnerRef.current[0].name}
          </h3>
        </div>
        <h3
          className="text-center text-2xl mt-4
    "
        >
          여자 아이돌 월드컵 우승자
        </h3>
        <GameButtons isreload={true} />
        <div className="flex justify-center  mt-4">
          <button
            className="flex items-center cursor-pointer hover:scale-125 "
            onClick={() => router.push("/")}
          >
            홈으로 가기
          </button>
        </div>
        <hr className="border-gray border-1 mt-12" />
        <Comment />
        <hr className="border-gray border-1 " />
        <CommentList />
      </div>
    </>
  );
}
