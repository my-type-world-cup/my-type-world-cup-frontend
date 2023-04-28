import { Contestant, Round } from "@/pages/game";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, MutableRefObject, SetStateAction, useRef } from "react";
type Props = {
  isModal: [boolean, Round];
  twoPeople: Contestant[];
  randomContestant: () => void;

  winnerRef: MutableRefObject<Contestant[]>;
  matchRef: MutableRefObject<Contestant[]>;
  isCheck: [boolean, number];
  setIsCheck: Dispatch<SetStateAction<[boolean, number]>>;
};

export default function InGame({
  isModal,
  twoPeople,
  randomContestant,

  winnerRef,
  matchRef,
  isCheck,
  setIsCheck,
}: Props) {
  const isButtonDisabledRef = useRef(false);
  const router = useRouter();
  const handleClick = (num: number) => {
    if (isButtonDisabledRef.current) {
      return;
    }

    isButtonDisabledRef.current = true; // 버튼 비활성화
    setIsCheck([false, num]); //이펙트 주고 뽑힌 사람 알려줌
    //다시 뽑기 진행해야하고,
    // 원래 상태로 돌려놔야함
    //이긴 사람들 관리해야함

    //여기서 업데이트했을때 속도를 로직을 확인해야함

    winnerRef.current = [...winnerRef.current, twoPeople[num]];
    if (matchRef.current.length === 0 && winnerRef.current.length === 1) {
      // endRef.current = true;
      console.log("끝");
      setIsCheck([true, 4]); //원위치
      return;
    } else if (matchRef.current.length === 0) {
      matchRef.current = winnerRef.current;
      winnerRef.current = [];
    }
    console.log(winnerRef.current, matchRef.current);

    setTimeout(() => {
      console.log(winnerRef.current, matchRef.current, "타이머");
      setIsCheck([true, 3]); //원위치
      randomContestant(); //다시뽑기
      isButtonDisabledRef.current = false; // 버튼 활성화
    }, 2200);
  };

  if (isCheck[1] === 4) {
    console.log(isCheck, "끝");
    return <></>;
  }
  return (
    <div>
      <h2 className="pt-4 text-white text-xl text-center mb-4">
        여자 아이돌 월드컵 {isModal[1]}강
      </h2>
      <div
        className="flex justify-center pt-2 items-center overflow-hidden h-[250px] sm:h-[380px]  "
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
          width={500}
          height={330}
          className="cursor-pointer sm:hover:scale-125 duration-300"
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
        className="flex justify-center items-center overflow-hidden h-[250px] sm:h-[380px]"
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
          width={500}
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
