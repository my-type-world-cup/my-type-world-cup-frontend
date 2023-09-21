import type { Editor_step } from "@/type/Types";
import { Dispatch, MouseEvent, SetStateAction } from "react";
interface Tab_buttons {
  name: string;
  value: Editor_step;
}

interface TabButtonProps {
  isNumber: Editor_step;
  setIsNumber: Dispatch<SetStateAction<Editor_step>>;
}

const sortButtons: Tab_buttons[] = [
  { name: "정보 입력", value: "1" },
  { name: "후보 등록", value: "2" }
];

const TabButtons = ({ isNumber, setIsNumber }: TabButtonProps) => {
  const sortHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    setIsNumber(e.currentTarget.value as Editor_step);

    //함수로 구현
    // const sortType = e.currentTarget.value
    // const sortedData = await getAllCup(sortType)
    // console.log(sortedData)
  };

  return (
    <div className="flex mt-3 text-xl  z-40">
      {sortButtons.map((button: Tab_buttons) => (
        <button
          key={button.value}
          onClick={(e) => sortHandler(e)}
          value={button.value}
          className={
            button.value === isNumber
              ? "bg-main text-white w-full h-12 p-1"
              : "bg-lightBlue text-gray w-full h-12 p-1"
          }
          style={{ transition: "all 0.2s" }}
        >
          {button.name}
        </button>
      ))}
    </div>
  );
};

export default TabButtons;
