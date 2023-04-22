import { useState } from "react";

interface Sort_buttons {
  name: string;
  value: string;
}
type value = "popular" | "recent" | "like" | "comment";
const SortButtons = () => {
  const [isWord, setIsWord] = useState<value>("popular");
  const sortButtons: Sort_buttons[] = [
    { name: "인기순", value: "popular" },
    { name: "최신순", value: "recent" },

    { name: "댓글순", value: "comment" },
  ];
  console.log(isWord);
  const sortHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsWord(e.currentTarget.value as value); //메모

    //함수로 구현
    // const sortType = e.currentTarget.value
    // const sortedData = await getAllCup(sortType)
    // console.log(sortedData)
  };

  return (
    <div className="flex  ">
      {sortButtons.map((button: Sort_buttons) => (
        <button
          key={button.value}
          onClick={(e) => sortHandler(e)}
          value={button.value}
          className={
            button.value === isWord
              ? "bg-main text-white w-20 h-7"
              : "bg-lightBlue text-gray w-20 h-7"
          }
          style={{ transition: "all 0.2s" }}
        >
          {button.name}
        </button>
      ))}
    </div>
  );
};

export default SortButtons;
