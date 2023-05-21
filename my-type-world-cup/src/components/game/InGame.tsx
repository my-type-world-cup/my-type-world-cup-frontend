import { rank_result_fetch } from "@/api/post_rank";
import type { Contestant, Round, result_data } from "@/type/Types";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";
type Props = {
  isModal: [boolean, Round];
  twoPeople: Contestant[];
  randomContestant: () => void;
  setIsModal: Dispatch<SetStateAction<[boolean, Round]>>;
  winnerRef: MutableRefObject<Contestant[]>;
  matchRef: MutableRefObject<Contestant[]>;
  isCheck: [boolean, number];
  setIsCheck: Dispatch<SetStateAction<[boolean, number]>>;
};

export default function InGame({
  isModal,
  twoPeople,
  randomContestant,
  setIsModal,
  winnerRef,
  matchRef,
  isCheck,
  setIsCheck,
}: Props) {
  const isResult = useRef<result_data[]>([]);
  const [count, setCount] = useState<number>(1);
  const isButtonDisabledRef = useRef(false);
  const router = useRouter();
  const handleClick = async (num: number) => {
    if (isButtonDisabledRef.current) {
      return;
    }

    isButtonDisabledRef.current = true; // 버튼 비활성화
    setIsCheck([false, num]); //이펙트 주고 뽑힌 사람 알려줌
    // 패자만 모와서 저장?
    //패자는 무조건 n경기당 n-1승을함
    //최종 승자는 마지막에 n경기당 n승임
    if (num === 0) {
      winnerRef.current = [...winnerRef.current, twoPeople[0]];
      isResult.current = [
        ...isResult.current,
        { id: twoPeople[1].id, matchUpGameCount: count, winCount: count - 1 },
      ];
    } else if (num === 1) {
      winnerRef.current = [...winnerRef.current, twoPeople[1]];
      isResult.current = [
        ...isResult.current,
        { id: twoPeople[0].id, matchUpGameCount: count, winCount: count - 1 },
      ];
    }

    if (matchRef.current.length === 0 && winnerRef.current.length === 1) {
      // endRef.current = true;
      isResult.current = isResult.current.concat([
        {
          id: winnerRef.current[0].id,
          matchUpGameCount: count,
          winCount: count,
        },
      ]);

      await rank_result_fetch(isResult.current);

      setIsCheck([true, 4]); //원위치
      return;
    } else if (matchRef.current.length === 0) {
      //다음 라운드로 넘어가기
      setCount((prev) => prev + 1);
      setIsModal((prev) => [prev[0], (prev[1] / 2) as Round]);
      matchRef.current = winnerRef.current;
      winnerRef.current = [];
    }

    setTimeout(() => {
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
      <h2 className="pt-4 text-white text-xl text-center">
        여자 아이돌 월드컵 {isModal[1] === 2 ? `결승` : `${isModal[1]}강`}
      </h2>
      <div
        className="relative flex items-center pt-2 overflow-hidden h-[280px]  mx-12 "
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
        <h3
          className="absolute text-white bottom-10"
          style={{
            textShadow:
              "1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black",
          }}
        >
          {twoPeople[0].name}
        </h3>
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
        className="flex items-center overflow-hidden mx-12 h-[280px]"
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
        <h3
          className="absolute text-white bottom-10"
          style={{
            textShadow:
              "1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black",
          }}
        >
          {twoPeople[1].name}
        </h3>
      </div>
    </div>
  );
}
//먼저 2명을 고른다
//둘중 1명을 뽑으면 저장하고 , 새로 뽑는다.
//만약에 이제 후보가 없으면, 새로 뽑을 수가 없다.
//왜냐하면 업데이트 되기전에 새로 뽑아야한다.

//눌렀을 대 업데이트가 되지 않음,
