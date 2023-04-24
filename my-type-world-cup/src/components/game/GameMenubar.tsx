import type { Round } from "@/pages/game";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  isModal: [boolean, Round];
  setIsModal: Dispatch<SetStateAction<[boolean, Round]>>;
};

export default function GameMenubar({ isModal, setIsModal }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleRoundSelect = (round: Round) => {
    setIsModal((el) => {
      return [el[0], round];
    });
    setIsOpen(false);
  };
  const rounds: Round[] = [32, 16, 8, 4];
  return (
    <>
      <div
        className="w-10/12 border-[1px] mt-1 border-gray flex justify-between px-2 cursor-pointer"
        onClick={handleClick}
      >
        <h3 className=" py-1 text-sm ">{isModal[1]}강</h3>
        <Image
          src="/icon/down.svg"
          alt="arrow"
          width={15}
          height={28}
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
          {rounds.map((round: Round) => (
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
