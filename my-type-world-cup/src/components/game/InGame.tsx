import { Contestant, Round } from "@/pages/game";
import Image from "next/image";
import { useState } from "react";
type Props = {
  isModal: [boolean, Round];
  twoPeople: Contestant[];
  randomContestant: () => void;
};

export default function InGame({
  isModal,
  twoPeople,
  randomContestant,
}: Props) {
  const [isCheck, setIsCheck] = useState<[boolean, number]>([true, 3]);
  const handleClick = (num: number) => {
    setIsCheck([false, num]);
  };
  console.log(twoPeople, isCheck);
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
          width={250}
          height={150}
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
          width={250}
          height={150}
          onClick={() => handleClick(1)}
          className="cursor-pointer sm:hover:scale-125 duration-300"
        />
      </div>
    </div>
  );
}
