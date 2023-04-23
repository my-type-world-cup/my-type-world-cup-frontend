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
      <h2 className="pt-4 text-white text-xl text-center">
        여자 아이돌 월드컵 ${isModal[1]}강
      </h2>
      <div className="flex justify-center items-center overflow-hidden h-2/5">
        <Image
          src={twoPeople[0].image}
          alt="Picture of the author"
          width={250}
          height={150}
        />
      </div>
      <div className="flex justify-center items-center overflow-hidden h-2/5">
        <Image
          src={twoPeople[1].image}
          alt="Picture of the author"
          width={250}
          height={150}
        />
      </div>
    </div>
  );
}
