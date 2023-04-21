import Image from "next/image";
import { useState } from "react";
import type { round } from "./Modal";

type Props = {
  selectedRound: round;
  setSelectedRound: (round: round) => void;
};

export default function GameMenubar({
  selectedRound,
  setSelectedRound,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleRoundSelect = (round: round) => {
    setSelectedRound(round);
    setIsOpen(false);
  };
  const rounds: round[] = ["32강", "16강", "8강", "4강"];
  return (
    <>
      <div
        className="w-10/12 border-[1px] mt-1 border-gray flex justify-between px-2 cursor-pointer"
        onClick={handleClick}
      >
        <h3 className=" py-1 text-sm ">{selectedRound}</h3>
        <Image
          src="/icon/down.svg"
          alt="arrow"
          width={15}
          height={15}
          priority
        />
      </div>
      <div className="relative w-full">
        <div
          className="absolute top-0 left-[8.5%] w-10/12 bg-white shadow-lg rounded-b-lg p-2 border-[1px] border-gray z-50 "
          style={{
            display: isOpen ? "block" : "none",
            transition: "all 0.5s ease-in-out",
          }}
        >
          {rounds.map((round: round) => (
            <button
              key={round}
              className="w-full h-6 text-sm text-left hover:bg-gray-200  hover:bg-main "
              onClick={() => handleRoundSelect(round)}
            >
              {round}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
