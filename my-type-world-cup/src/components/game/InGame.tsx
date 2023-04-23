import { Contestant, Round } from "@/pages/game";
import Image from "next/image";

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
  return (
    <div>
      <h2 className="pt-4 text-white text-xl text-center mb-4">
        여자 아이돌 월드컵 {isModal[1]}강
      </h2>
      <div className="flex justify-center items-center overflow-hidden h-[250px] sm:h-full">
        <Image
          src={twoPeople[0].image}
          alt="Picture of the author"
          width={250}
          height={150}
          className="cursor-pointer hover:scale-125"
        />
      </div>
      <div className="flex justify-center my-4 sm:my-8">
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
      <div className="flex justify-center items-center overflow-hidden h-[250px] sm:h-full">
        <Image
          src={twoPeople[1].image}
          alt="Picture of the author"
          width={250}
          height={150}
          className="cursor-pointer hover:scale-125"
        />
      </div>
    </div>
  );
}
