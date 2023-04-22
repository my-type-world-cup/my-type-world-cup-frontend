import { Dispatch, SetStateAction } from "react";

interface Tab_buttons {
  name: string;
  value: string;
}

interface TabButtonProps {
  isWord: Step;
  setIsWord: Dispatch<SetStateAction<Step>>;
}

export type Step = "first" | "second";
const TabButtons = ({ isWord, setIsWord }: TabButtonProps) => {
  const sortButtons: Tab_buttons[] = [
    { name: "1. 정보 입력", value: "first" },
    { name: "2. 사진 추가", value: "second" },
  ];

  const sortHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsWord(e.currentTarget.value as Step); //메모

    //함수로 구현
    // const sortType = e.currentTarget.value
    // const sortedData = await getAllCup(sortType)
    // console.log(sortedData)
  };

  return (
    <div className="flex mt-8 text-lg">
      {sortButtons.map((button: Tab_buttons) => (
        <button
          key={button.value}
          onClick={(e) => sortHandler(e)}
          value={button.value}
          className={
            button.value === isWord
              ? "bg-main text-white w-full h-10 p-1"
              : "bg-lightBlue text-gray w-full h-10 p-1"
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
