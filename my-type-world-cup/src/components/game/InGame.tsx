import { Contestant, Round } from "@/pages/game";
import Image from "next/image";
import { Dispatch, MutableRefObject, SetStateAction, useState } from "react";
type Props = {
  isModal: [boolean, Round];
  twoPeople: Contestant[];
  randomContestant: () => void;
  setWinner: Dispatch<SetStateAction<Contestant[]>>;
  winner: Contestant[];
  contestants: Contestant[];
  winnerRef: MutableRefObject<Contestant[]>;
};

export default function InGame({
  isModal,
  twoPeople,
  randomContestant,
  setWinner,
  winner,
  contestants,
  winnerRef,
}: Props) {
  const [isCheck, setIsCheck] = useState<[boolean, number]>([true, 3]);

  const handleClick = (num: number) => {
    setIsCheck([false, num]); //이펙트 주고 뽑힌 사람 알려줌
    //다시 뽑기 진행해야하고,
    // 원래 상태로 돌려놔야함
    //이긴 사람들 관리해야함

    setWinner((prev) => [...prev, twoPeople[num]]);
    console.log(winner, "초기");
    //여기서 업데이트했을때 속도를 로직을 확인해야함
    winnerRef.current = [...winnerRef.current, twoPeople[num]];
    setTimeout(() => {
      console.log(winner, "위너", winnerRef.current, "리퍼");
      setIsCheck([true, 3]); //원위치
      randomContestant(); //다시뽑기
    }, 2200);
  };

  return (
    <div>
      <h2 className="pt-4 text-white text-xl text-center mb-4">
        여자 아이돌 월드컵 {isModal[1]}강
      </h2>
      <div
        className="flex justify-center items-center overflow-hidden h-[250px] sm:h-full  "
        onClick={() => handleClick(0)}
        style={{
          transform: isCheck[0]
            ? "translateY(0%)"
            : isCheck[1] === 0
            ? "translateY(60%)"
            : "translateX(150%)",
          transition:
            !isCheck[0] && isCheck[1] === 0
              ? "transform 1s ease-in-out"
              : "transform 0s",
          visibility: !isCheck[0] && isCheck[1] === 1 ? "hidden" : "visible",
        }}
      >
        <Image
          src={twoPeople[0].image}
          alt="one"
          width={330}
          height={330}
          className="cursor-pointer sm:hover:scale-125  duration-300"
        />
      </div>
      <div
        className="flex justify-center my-4 sm:my-8"
        style={{
          transition: "transform 1s ease-in-out",
          visibility: !isCheck[0] ? "hidden" : "visible",
        }}
      >
        <Image
          src="/icon/arrow.svg"
          alt="Picture of the author"
          width={60}
          height={150}
          style={{ transform: "scaleY(-1)" }}
          className="cursor-pointer"
        />

        <Image
          src="/icon/vs.svg"
          alt="Picture of the author"
          width={60}
          height={150}
          className="mx-4"
        />
        <Image
          src="/icon/arrow.svg"
          alt="Picture of the author"
          width={60}
          height={150}
          className="cursor-pointer hover:scale-125"
        />
      </div>
      <div
        className="flex justify-center items-center overflow-hidden h-[250px] sm:h-full"
        onClick={() => handleClick(1)}
        style={{
          transform: isCheck[0]
            ? "translateY(0%)"
            : isCheck[1] === 1
            ? "translateY(-80%)"
            : "translateX(200%)",
          transition:
            !isCheck[0] && isCheck[1] === 1 ? "transform 1s ease-in-out" : "",
          visibility: !isCheck[0] && isCheck[1] === 0 ? "hidden" : "visible",
        }}
      >
        <Image
          src={twoPeople[1].image}
          alt="two"
          width={330}
          height={150}
          onClick={() => handleClick(1)}
          className="cursor-pointer sm:hover:scale-125 duration-300"
        />
      </div>
    </div>
  );
}
//먼저 2명을 고른다
//둘중 1명을 뽑으면 저장하고 , 새로 뽑는다.
//만약에 이제 후보가 없으면, 새로 뽑을 수가 없다.
//왜냐하면 업데이트 되기전에 새로 뽑아야한다.

//눌렀을 대 업데이트가 되지 않음,
