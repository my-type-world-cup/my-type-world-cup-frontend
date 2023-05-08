import Image from "next/image";
import Router from "next/router";
import { MutableRefObject } from "react";
import type { Contestant } from "../../type/Types";
import GameSet from "../all/GameSet";
type Props = {
  winnerRef: MutableRefObject<Contestant[]>;
};

export default function Result({ winnerRef }: Props) {
  const router = Router;

  return (
    <>
      <div className="h-auto mt-28 ">
        <div className=" relative flex flex-col justify-center pt-4 items-center overflow-hidden mx-12 h-[300px] ">
          <Image
            src={winnerRef.current[0].image}
            alt="one"
            width={500}
            height={330}
            className="duration-300"
          />
        </div>
        <h3 className="my-4 text-black mx-8 text-center text-xl font-bold">
          {winnerRef.current[0].name}
        </h3>

        <h3 className="text-center text-2xl mb-12  ">
          여자 아이돌 월드컵 우승자
        </h3>
        <GameSet />
      </div>
    </>
  );
}
